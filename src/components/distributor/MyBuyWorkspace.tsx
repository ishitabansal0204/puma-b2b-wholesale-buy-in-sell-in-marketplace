import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product } from '../../types';
import { 
  ShoppingBag, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Plus, 
  Minus, 
  Copy, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Layers
} from 'lucide-react';

interface MyBuyWorkspaceProps {
  onOpenSizeCurve: (prod: Product) => void;
  onOpenReview: () => void;
}

export const MyBuyWorkspace: React.FC<MyBuyWorkspaceProps> = ({ 
  onOpenSizeCurve, 
  onOpenReview 
}) => {
  const { 
    myBuyItems, 
    products, 
    removeBuyItem, 
    updateBuyItemQuantity, 
    totalBuyValue, 
    totalBuyUnits, 
    totalBuyStyles, 
    seasonalTarget, 
    targetAchievementPercent, 
    targetGap,
    currentDistributor,
    activeSeasonId,
    addToBuy,
    showToast,
    setActiveTab
  } = useWholesale();

  const [groupBy, setGroupBy] = useState<'all' | 'category' | 'delivery'>('all');

  // Intelligent recommendations to close target gap
  const recommendedGapClosers = products
    .filter(p => !myBuyItems.some(i => i.productId === p.id) && (p.isStrategicPriority || p.isRecommended))
    .slice(0, 3);

  const handleDuplicateItem = (item: typeof myBuyItems[0]) => {
    addToBuy(item.product, item.sizeQuantities, `${item.notes || ''} (Duplicated Batch)`);
    showToast('Assortment Batch Duplicated', `Added duplicate run of ${item.product.name}.`, 'info');
  };

  const handleExportCSV = () => {
    showToast('Export Generated', `SS27_Buy_Assortment_${currentDistributor.code}.csv downloaded.`, 'success');
  };

  const handleQuickAddRecommendation = (prod: Product) => {
    onOpenSizeCurve(prod);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-neutral-400">
            Account: <strong className="text-white">{currentDistributor.name}</strong> ({currentDistributor.code})
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono mt-0.5">
            {activeSeasonId} Assortment Buy-In Workspace
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Assortment Sheet
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            Add More Styles
          </button>
        </div>
      </div>

      {/* Target Planning & KPI Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Buy Value */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Total Assortment Value
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">
            ₹{(totalBuyValue / 100000).toFixed(2)}L
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            {totalBuyUnits.toLocaleString()} units · {totalBuyStyles} unique styles
          </div>
        </div>

        {/* Seasonal Target */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Distributor SS27 Target
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">
            ₹{(seasonalTarget / 100000).toFixed(2)}L
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Contracted seasonal commitment
          </div>
        </div>

        {/* Target Achievement */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            <span>Target Achievement</span>
            <span className="font-bold text-white font-mono">{targetAchievementPercent}%</span>
          </div>
          <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden mt-3 border border-neutral-800">
            <div
              style={{ width: `${Math.min(100, targetAchievementPercent)}%` }}
              className={`h-full transition-all duration-500 rounded-full ${
                targetAchievementPercent >= 90 ? 'bg-emerald-500' : 'bg-red-600'
              }`}
            />
          </div>
          <div className="text-xs text-neutral-400 mt-2 font-mono">
            {targetAchievementPercent >= 100 ? (
              <span className="text-emerald-400 font-semibold">Target Achieved</span>
            ) : (
              <span>₹{(targetGap / 100000).toFixed(1)}L gap remaining</span>
            )}
          </div>
        </div>

        {/* Ready to Submit Action Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-red-500 uppercase font-bold tracking-wider">
              Ready for Review
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              15 days remaining before allocation lock
            </div>
          </div>
          <button
            onClick={onOpenReview}
            disabled={myBuyItems.length === 0}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs tracking-tight transition-all shadow-md shadow-red-600/20"
          >
            Review & Submit Buy
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Buy vs Target Gap Recommendations */}
      {targetGap > 0 && recommendedGapClosers.length > 0 && (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                Recommended Additions to Close Target Gap (₹{(targetGap / 100000).toFixed(1)}L Remaining)
              </h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">System Suggestions · Advisory Only</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedGapClosers.map(prod => (
              <div
                key={prod.id}
                className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.heroImage}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded-lg bg-neutral-900 border border-neutral-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-white tracking-tight line-clamp-1">
                      {prod.name}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400">
                      ₹{prod.wholesalePrice.toLocaleString()} W/S · {prod.deliveryWindow}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                      ● High Regional Demand
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickAddRecommendation(prod)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Order Building Table */}
      <div className="space-y-4">
        {/* Table Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Assortment Breakdown ({myBuyItems.length} Styles)
            </span>
          </div>

          {/* Grouping Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Group view:</span>
            <div className="flex items-center p-0.5 bg-neutral-900 rounded-lg border border-neutral-800">
              <button
                onClick={() => setGroupBy('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  groupBy === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Flat List
              </button>
              <button
                onClick={() => setGroupBy('category')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  groupBy === 'category' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                By Category
              </button>
              <button
                onClick={() => setGroupBy('delivery')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  groupBy === 'delivery' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                By Delivery
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        {myBuyItems.length === 0 ? (
          <div className="py-20 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6">
            <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white">Your seasonal buy is empty</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Start building your SS27 assortment by browsing the digital showroom or product catalog.
            </p>
            <button
              onClick={() => setActiveTab('products')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors"
            >
              Browse SS27 Collection
            </button>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4">Style & Details</th>
                    <th className="py-3.5 px-3">Delivery</th>
                    <th className="py-3.5 px-4">Size Curve Breakdown</th>
                    <th className="py-3.5 px-3 text-right">Units</th>
                    <th className="py-3.5 px-3 text-right">Wholesale Price</th>
                    <th className="py-3.5 px-4 text-right">Total (W/S)</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/70">
                  {myBuyItems.map(item => {
                    return (
                      <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors group">
                        {/* Product info */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.heroImage}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-lg bg-neutral-950 border border-neutral-800 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-bold text-white text-sm tracking-tight">
                                {item.product.name}
                              </div>
                              <div className="text-[11px] font-mono text-neutral-400">
                                Style: {item.product.styleNumber} · {item.product.category} · {item.product.gender}
                              </div>
                              {item.notes && (
                                <div className="text-[10px] text-cyan-400 italic mt-0.5">
                                  Note: "{item.notes}"
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Delivery window */}
                        <td className="py-4 px-3 font-mono text-neutral-300">
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {item.deliveryWindow}
                          </span>
                        </td>

                        {/* Size quantities pills */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {Object.entries(item.sizeQuantities).map(([sz, qty]) => {
                              if (qty === 0) return null;
                              return (
                                <span
                                  key={sz}
                                  className="inline-flex items-center gap-1 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-[11px] font-mono"
                                >
                                  <span className="text-neutral-400">{sz}:</span>
                                  <strong className="text-white">{qty}</strong>
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        {/* Total units */}
                        <td className="py-4 px-3 text-right font-mono font-bold text-white text-sm tabular-nums">
                          {item.totalUnits}
                        </td>

                        {/* Unit wholesale price */}
                        <td className="py-4 px-3 text-right font-mono text-neutral-300 tabular-nums">
                          ₹{item.product.wholesalePrice.toLocaleString()}
                        </td>

                        {/* Total value */}
                        <td className="py-4 px-4 text-right font-mono font-extrabold text-white text-sm tabular-nums">
                          ₹{item.totalValue.toLocaleString()}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenSizeCurve(item.product)}
                              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
                              title="Edit Size Curve"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDuplicateItem(item)}
                              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                              title="Duplicate Item Row"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeBuyItem(item.id)}
                              className="p-1 text-neutral-500 hover:text-rose-400 rounded hover:bg-neutral-800 transition-colors"
                              title="Remove from Buy"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Footer Row */}
            <div className="bg-neutral-950 px-6 py-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs text-neutral-400 font-mono">
                <span>Styles: <strong className="text-white font-bold">{totalBuyStyles}</strong></span>
                <span>Total Units: <strong className="text-white font-bold">{totalBuyUnits.toLocaleString()}</strong></span>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[11px] text-neutral-400 font-mono uppercase">Grand Total (Excl. Tax)</div>
                  <div className="text-xl font-black text-white font-mono">
                    ₹{totalBuyValue.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={onOpenReview}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-tight transition-all shadow-lg shadow-red-600/25 flex items-center gap-2"
                >
                  Proceed to Order Review
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
