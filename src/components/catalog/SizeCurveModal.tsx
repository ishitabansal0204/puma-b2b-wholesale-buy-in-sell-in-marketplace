import React, { useState, useEffect, useMemo } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product, SizeQuantitySelection } from '../../types';
import { X, Sparkles, AlertCircle, ShoppingBag, Plus, Minus } from 'lucide-react';

interface SizeCurveModalProps {
  product: Product | null;
  onClose: () => void;
}

export const SizeCurveModal: React.FC<SizeCurveModalProps> = ({ product, onClose }) => {
  const { addToBuy, myBuyItems, showToast } = useWholesale();

  const [quantities, setQuantities] = useState<SizeQuantitySelection>({});
  const [targetTotalUnits, setTargetTotalUnits] = useState<number>(60);
  const [customCurveMode, setCustomCurveMode] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (!product) return;
    // Check if product is already in buy
    const existing = myBuyItems.find(i => i.productId === product.id);
    if (existing) {
      setQuantities({ ...existing.sizeQuantities });
      setNotes(existing.notes || '');
    } else {
      // Default to recommended curve for 60 units (or MOQ)
      const initialTotal = Math.max(product.moq, 60);
      setTargetTotalUnits(initialTotal);
      applyRecommendedCurve(initialTotal, product);
    }
  }, [product, myBuyItems]);

  const applyRecommendedCurve = (total: number, prod: Product) => {
    const newQty: SizeQuantitySelection = {};
    prod.sizeCurve.forEach(sc => {
      if (sc.status === 'Unavailable') {
        newQty[sc.size] = 0;
      } else {
        newQty[sc.size] = Math.round(total * sc.recommendedRatio);
      }
    });
    setQuantities(newQty);
    setCustomCurveMode(false);
  };

  const handleApplyRecommended = () => {
    if (!product) return;
    applyRecommendedCurve(targetTotalUnits, product);
    showToast('Applied Recommended Curve', `Optimized size distribution based on PUMA historical sell-through.`, 'info');
  };

  const handleQuantityChange = (size: string, val: number) => {
    const cleanVal = Math.max(0, val);
    setQuantities(prev => ({
      ...prev,
      [size]: cleanVal,
    }));
    setCustomCurveMode(true);
  };

  const totalSelectedUnits = useMemo(() => {
    return Object.values(quantities).reduce((a, b) => a + b, 0);
  }, [quantities]);

  const totalValue = useMemo(() => {
    return product ? totalSelectedUnits * product.wholesalePrice : 0;
  }, [product, totalSelectedUnits]);

  // Check size curve deviation
  const isHighDeviation = useMemo(() => {
    if (!product || totalSelectedUnits === 0) return false;
    let deviationSum = 0;
    product.sizeCurve.forEach(sc => {
      const actualRatio = (quantities[sc.size] || 0) / totalSelectedUnits;
      deviationSum += Math.abs(actualRatio - sc.recommendedRatio);
    });
    return deviationSum > 0.65;
  }, [product, quantities, totalSelectedUnits]);

  if (!product) return null;

  const isBelowMoq = totalSelectedUnits > 0 && totalSelectedUnits < product.moq;

  const handleSaveToBuy = () => {
    if (totalSelectedUnits === 0) {
      showToast('Zero units selected', 'Please select units across sizes before adding.', 'warning');
      return;
    }
    if (isBelowMoq) {
      showToast('Below Minimum Order Quantity', `This style has a Minimum Order Quantity (MOQ) of ${product.moq} units.`, 'error');
      return;
    }

    addToBuy(product, quantities, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <img 
              src={product.heroImage} 
              alt={product.name} 
              className="w-14 h-14 object-cover rounded-lg border border-neutral-800 bg-neutral-950" 
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xs font-mono text-neutral-400">Style: {product.styleNumber} · {product.category}</div>
              <h3 className="text-base font-bold text-white tracking-tight">{product.name}</h3>
              <div className="text-xs text-neutral-400 mt-0.5">
                Wholesale: <strong className="text-white font-mono font-medium">₹{product.wholesalePrice.toLocaleString()}</strong> · MSRP: ₹{product.msrp.toLocaleString()} · MOQ: {product.moq} units
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Size Curve Controls */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Quick Curve Presets */}
          <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-white">Assortment Sizing Mode</div>
              <div className="text-[11px] text-neutral-400">
                {customCurveMode ? 'Custom size curve configured' : 'Using PUMA AI-calibrated benchmark curve'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyRecommended}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-400 text-xs font-semibold transition-colors border border-cyan-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Apply Recommended Curve
              </button>
            </div>
          </div>

          {/* Size Matrix Table */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-neutral-950 px-4 py-2.5 text-[11px] font-mono text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
              <div>Size</div>
              <div>Allocation Status</div>
              <div>Benchmark %</div>
              <div className="text-right">Buy Units</div>
            </div>

            <div className="divide-y divide-neutral-800/60">
              {product.sizeCurve.map(sc => {
                const qty = quantities[sc.size] || 0;
                const isUnavailable = sc.status === 'Unavailable';

                return (
                  <div key={sc.size} className={`grid grid-cols-4 items-center px-4 py-3 text-xs ${isUnavailable ? 'opacity-40 bg-neutral-950/40' : 'hover:bg-neutral-800/30'}`}>
                    <div className="font-semibold text-white font-mono">{sc.size}</div>
                    <div>
                      {sc.status === 'Available' && <span className="text-emerald-400 text-[11px]">● In Stock ({sc.allocatedRemaining})</span>}
                      {sc.status === 'Limited' && <span className="text-amber-400 text-[11px]">● Limited ({sc.allocatedRemaining})</span>}
                      {sc.status === 'Low' && <span className="text-orange-400 text-[11px]">● Low Stock ({sc.allocatedRemaining})</span>}
                      {sc.status === 'Unavailable' && <span className="text-rose-500 text-[11px]">✕ Out of Stock</span>}
                    </div>
                    <div className="text-neutral-400 font-mono text-[11px]">
                      {Math.round(sc.recommendedRatio * 100)}%
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        disabled={isUnavailable || qty <= 0}
                        onClick={() => handleQuantityChange(sc.size, qty - 5)}
                        className="w-7 h-7 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        disabled={isUnavailable}
                        min="0"
                        step="1"
                        value={qty}
                        onChange={e => handleQuantityChange(sc.size, parseInt(e.target.value) || 0)}
                        className="w-14 text-center py-1 bg-neutral-950 border border-neutral-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-red-500"
                      />
                      <button
                        disabled={isUnavailable}
                        onClick={() => handleQuantityChange(sc.size, qty + 5)}
                        className="w-7 h-7 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Size Curve Comparison Visualization */}
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
              <span>Your Selected Size Curve vs Benchmark</span>
              <span className="font-mono text-[11px]">{totalSelectedUnits} total units</span>
            </div>
            <div className="h-6 w-full bg-neutral-950 rounded-lg flex overflow-hidden border border-neutral-800">
              {product.sizeCurve.map((sc, i) => {
                const qty = quantities[sc.size] || 0;
                const pct = totalSelectedUnits > 0 ? (qty / totalSelectedUnits) * 100 : 0;
                const colors = ['#e10600', '#00f0ff', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
                if (pct <= 0) return null;
                return (
                  <div
                    key={sc.size}
                    style={{ width: `${pct}%`, backgroundColor: colors[i % colors.length] }}
                    className="h-full flex items-center justify-center text-[10px] font-bold text-black truncate px-0.5"
                    title={`${sc.size}: ${qty} units (${Math.round(pct)}%)`}
                  >
                    {sc.size}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deviation Warning */}
          {isHighDeviation && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong>Advisory:</strong> Your current size curve departs significantly from the recommended regional distribution. High concentration in edge sizes may increase markdown risk.
              </div>
            </div>
          )}

          {/* MOQ Warning */}
          {isBelowMoq && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <strong>Minimum Order Quantity:</strong> Current selection ({totalSelectedUnits} units) is below the required MOQ of {product.moq} units for this tier.
              </div>
            </div>
          )}

          {/* Assortment Notes */}
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">
              Store Assortment Notes / Buyer Comments (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Flagship store display order, allocate 60% to downtown branch..."
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
            />
          </div>
        </div>

        {/* Footer Summary & Save CTA */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-400">Total Selection Value</div>
            <div className="text-lg font-bold text-white font-mono">
              ₹{totalValue.toLocaleString()}
              <span className="text-xs font-normal text-neutral-400 ml-2">({totalSelectedUnits} units)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveToBuy}
              disabled={totalSelectedUnits === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold tracking-tight transition-colors shadow-lg shadow-red-600/20"
            >
              <ShoppingBag className="w-4 h-4" />
              Update Seasonal Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
