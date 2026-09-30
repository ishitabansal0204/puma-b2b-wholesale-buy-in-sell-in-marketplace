import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { SeasonalOrder } from '../../types';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Truck,
  CreditCard
} from 'lucide-react';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSubmitted: (order: SeasonalOrder) => void;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({ 
  isOpen, 
  onClose, 
  onOrderSubmitted 
}) => {
  const { 
    myBuyItems, 
    totalBuyValue, 
    totalBuyUnits, 
    totalBuyStyles, 
    currentDistributor, 
    activeSeasonId,
    submitCurrentBuy 
  } = useWholesale();

  const [confirmedTerms, setConfirmedTerms] = useState(false);
  const [commercialTerms, setCommercialTerms] = useState('Net 60 Days / Approved LC');
  const [shippingTerms, setShippingTerms] = useState('FOB PUMA Central Logistics Hub (Bhiwandi)');

  if (!isOpen) return null;

  // Category breakdown calculation
  const categoryBreakdown = myBuyItems.reduce((acc, item) => {
    const cat = item.product.category;
    let group = 'Other';
    if (cat === 'Running' || cat === 'Football' || cat === 'Basketball' || cat === 'Lifestyle' || cat === 'Footwear') {
      group = 'Footwear';
    } else if (cat === 'Apparel' || cat === 'Training' || cat === 'Motorsport') {
      group = 'Apparel';
    } else {
      group = 'Accessories';
    }
    acc[group] = (acc[group] || 0) + item.totalValue;
    return acc;
  }, {} as Record<string, number>);

  const deliveryWindows = Array.from(new Set(myBuyItems.map(i => i.deliveryWindow)));

  const handleSubmit = () => {
    if (!confirmedTerms) return;
    const order = submitCurrentBuy(commercialTerms, shippingTerms);
    onOrderSubmitted(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
              Commercial Review // {activeSeasonId}
            </span>
            <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
              Review Seasonal Wholesale Buy-In
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {currentDistributor.name} ({currentDistributor.city})
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Key Summary Stats */}
          <div className="grid grid-cols-3 gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-center">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Total Buy Value</div>
              <div className="text-xl font-black text-white font-mono mt-0.5">
                ₹{(totalBuyValue / 100000).toFixed(2)}L
              </div>
            </div>
            <div className="border-x border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Total Units</div>
              <div className="text-xl font-black text-neutral-200 font-mono mt-0.5">
                {totalBuyUnits.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Unique Styles</div>
              <div className="text-xl font-black text-neutral-200 font-mono mt-0.5">
                {totalBuyStyles}
              </div>
            </div>
          </div>

          {/* Assortment Category Mix */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Category Distribution
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {['Footwear', 'Apparel', 'Accessories'].map(cat => {
                const val = categoryBreakdown[cat] || 0;
                const pct = totalBuyValue > 0 ? Math.round((val / totalBuyValue) * 100) : 0;
                return (
                  <div key={cat} className="p-3 bg-neutral-950/70 border border-neutral-800/80 rounded-xl">
                    <div className="text-xs text-neutral-400">{cat}</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">
                      ₹{(val / 100000).toFixed(1)}L
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">{pct}% of assortment</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Windows Scheduled */}
          <div className="bg-neutral-950/50 p-3.5 rounded-xl border border-neutral-800 space-y-1.5">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-red-500" />
              Scheduled Delivery Windows:
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {deliveryWindows.map(dw => (
                <span key={dw} className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg border border-neutral-700">
                  {dw}
                </span>
              ))}
            </div>
          </div>

          {/* Commercial & Payment Terms Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-neutral-500" /> Payment & Credit Terms
              </label>
              <select
                value={commercialTerms}
                onChange={e => setCommercialTerms(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-red-500"
              >
                <option value="Net 60 Days / Approved LC">Net 60 Days / Approved Bank LC</option>
                <option value="Net 45 Days Commercial">Net 45 Days Commercial Account</option>
                <option value="Net 30 Days Standard">Net 30 Days Standard Terms</option>
                <option value="Advance Bank Transfer">100% Advance Bank Guarantee</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-500" /> Shipping & Logistics Routing
              </label>
              <input
                type="text"
                value={shippingTerms}
                onChange={e => setShippingTerms(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Validation Warnings (Section 21 in prompt) */}
          <div className="space-y-2">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong>Allocation Advisory:</strong> 2 styles in this buy (Velocity NITRO 4, Speedcat OG) have limited central stock. Allocation will be confirmed upon operations review.
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
              <div>
                <strong>MOQ Compliance:</strong> All selected styles meet the minimum threshold for Tier 1 Authorized Wholesale Distributors.
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
            <input
              type="checkbox"
              checked={confirmedTerms}
              onChange={e => setConfirmedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-neutral-900 border-neutral-700"
            />
            <span className="text-xs text-neutral-300 leading-relaxed">
              I confirm that I have reviewed my seasonal assortment, size curve selections, and committed quantities for <strong>PUMA {activeSeasonId}</strong>.
            </span>
          </label>
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            Back to Edit Buy
          </button>

          <button
            onClick={handleSubmit}
            disabled={!confirmedTerms}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs tracking-tight transition-all shadow-lg shadow-red-600/20"
          >
            Submit {activeSeasonId} Buy
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
