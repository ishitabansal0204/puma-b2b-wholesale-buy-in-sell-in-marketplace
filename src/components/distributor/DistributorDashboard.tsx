import React from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product } from '../../types';
import { 
  ShoppingBag, 
  Target, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Package, 
  Sparkles, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface DistributorDashboardProps {
  onOpenDetail: (prod: Product) => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const DistributorDashboard: React.FC<DistributorDashboardProps> = ({ 
  onOpenDetail, 
  onOpenSizeCurve 
}) => {
  const { 
    currentDistributor, 
    activeSeasonId, 
    totalBuyValue, 
    seasonalTarget, 
    targetAchievementPercent, 
    targetGap, 
    totalBuyUnits, 
    totalBuyStyles, 
    setActiveTab, 
    products 
  } = useWholesale();

  const keyFranchises = products.filter(p => p.isStrategicPriority).slice(0, 3);

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Welcome Banner (Section 9 in prompt) */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded tracking-wider">
              {activeSeasonId} BUY-IN ACTIVE
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Account: {currentDistributor.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-mono">
            {activeSeasonId} Collection is now open
          </h1>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Build your seasonal assortment and submit your buy by <strong>15 October 2026</strong>. Central inventory allocations are claimed on a first-confirmed basis.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('my-buy')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-tight transition-all shadow-lg shadow-red-600/25"
            >
              Continue Your Buy (₹{(totalBuyValue / 100000).toFixed(1)}L)
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('showroom')}
              className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className="px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-cyan-400 text-xs font-semibold transition-colors"
            >
              View Central Availability
            </button>
          </div>
        </div>

        {/* Decorative Watermark Silhouette */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
          <span className="text-9xl font-black font-mono tracking-tighter text-white">
            PUMA
          </span>
        </div>
      </div>

      {/* Target & Buy Metrics (Section 9 in prompt) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Your Buy */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Your Buy</div>
          <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">
            ₹{(totalBuyValue / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 font-mono">
            {totalBuyUnits.toLocaleString()} total pairs/units
          </div>
        </div>

        {/* Target */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Target</div>
          <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">
            ₹{(seasonalTarget / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Contract target</div>
        </div>

        {/* Achievement */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Achievement</div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1 tabular-nums">
            {targetAchievementPercent}%
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 font-mono">
            ₹{(targetGap / 100000).toFixed(1)}L to go
          </div>
        </div>

        {/* Products Selected */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Products Selected</div>
          <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">
            {totalBuyStyles} / 120
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Curated styles</div>
        </div>

        {/* Order Status */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Order Status</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">
            {currentDistributor.buyStatus}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Unsubmitted draft</div>
        </div>

        {/* Deadline */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Deadline</div>
          <div className="text-2xl font-black text-red-500 font-mono mt-1">
            15 Days
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 font-mono">15 Oct 2026</div>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">
            Current Assortment: <strong className="text-white">₹{(totalBuyValue / 100000).toFixed(2)}L</strong>
          </span>
          <span className="text-neutral-400">
            Target: <strong className="text-white">₹{(seasonalTarget / 100000).toFixed(2)}L</strong>
          </span>
        </div>
        <div className="w-full bg-neutral-950 h-3 rounded-full overflow-hidden border border-neutral-800">
          <div
            style={{ width: `${Math.min(100, targetAchievementPercent)}%` }}
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500 rounded-full"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{targetAchievementPercent}% achieved</span>
          {targetGap > 0 ? (
            <span className="text-amber-400 font-mono">
              Add ₹{(targetGap / 100000).toFixed(1)}L to meet full allocation rebate tier
            </span>
          ) : (
            <span className="text-emerald-400 font-mono">Target achieved</span>
          )}
        </div>
      </div>

      {/* Key Franchise Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Strategic Priority Launches for {activeSeasonId}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('showroom')}
            className="text-xs text-red-400 hover:text-red-300 font-semibold"
          >
            View All Showroom Highlights →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyFranchises.map(product => (
            <div
              key={product.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div 
                onClick={() => onOpenDetail(product)}
                className="aspect-[4/3] bg-neutral-950 cursor-pointer overflow-hidden relative group"
              >
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  KEY LAUNCH
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="text-[11px] font-mono text-neutral-400">{product.category} · Style {product.styleNumber}</div>
                  <h3 
                    onClick={() => onOpenDetail(product)}
                    className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {product.story}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase font-mono">Wholesale Price</div>
                    <div className="text-sm font-extrabold text-white font-mono">
                      ₹{product.wholesalePrice.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenSizeCurve(product)}
                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors"
                  >
                    Add to Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
