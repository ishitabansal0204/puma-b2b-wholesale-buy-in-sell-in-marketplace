import React from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const SalesDashboard: React.FC = () => {
  const { 
    activeSeasonId, 
    distributors, 
    products, 
    submittedOrders, 
    setActiveTab, 
    sendDistributorReminder 
  } = useWholesale();

  const distributorsBuying = distributors.filter(d => d.buyStatus !== 'Not Started').length;
  const distributorsYetToBuy = distributors.filter(d => d.buyStatus === 'Not Started').length;

  // Regional breakdown data
  const regions = [
    { name: 'West Zone', target: 145000000, actual: 104200000, achievement: 71.8 },
    { name: 'North Zone', target: 135000000, actual: 92400000, achievement: 68.4 },
    { name: 'South Zone', target: 125000000, actual: 88100000, achievement: 70.4 },
    { name: 'East Zone', target: 45000000, actual: 21500000, achievement: 47.7 },
    { name: 'Central Zone', target: 35000000, actual: 12000000, achievement: 34.2 },
  ];

  // Category breakdown
  const categoryPerformance = [
    { name: 'Running', share: 34, targetPct: 82, status: 'Behind Target' },
    { name: 'Terrace & Lifestyle', share: 26, targetPct: 104, status: 'Exceeding' },
    { name: 'Motorsport F1', share: 15, targetPct: 91, status: 'On Track' },
    { name: 'Football (Cleats)', share: 13, targetPct: 74, status: 'Behind Target' },
    { name: 'Apparel & Accessories', share: 12, targetPct: 68, status: 'Action Needed' },
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Top Banner / Executive Lead */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
            Executive Sell-In Intelligence // {activeSeasonId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono mt-0.5">
            PUMA Commercial Wholesale Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Consolidated seasonal sell-in progress across all distributor tiers and territories
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('distributors')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/20"
          >
            <Users className="w-3.5 h-3.5" />
            Manage Distributors ({distributors.length})
          </button>
        </div>
      </div>

      {/* Top KPIs (Section 8 in prompt) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Sell-In vs Target */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Current Sell-In
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 tabular-nums">
            ₹31.8 Cr
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            Target: <strong className="text-white">₹48.5 Cr</strong> (65.6% Achievement)
          </div>
          <div className="w-full bg-neutral-950 h-2 rounded-full mt-2.5 overflow-hidden border border-neutral-800">
            <div style={{ width: '65.6%' }} className="h-full bg-red-600 rounded-full" />
          </div>
        </div>

        {/* Distributors Buying Status */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Distributors Buying
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1 tabular-nums">
            128 / 175
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            {distributorsYetToBuy} accounts yet to submit SS27 draft
          </div>
          <div className="w-full bg-neutral-950 h-2 rounded-full mt-2.5 overflow-hidden border border-neutral-800">
            <div style={{ width: '73.1%' }} className="h-full bg-cyan-400 rounded-full" />
          </div>
        </div>

        {/* Open Order Pipeline */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Open Order Pipeline
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1 tabular-nums">
            42 Orders
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            ₹16.7 Cr currently under ops review
          </div>
          <div className="w-full bg-neutral-950 h-2 rounded-full mt-2.5 overflow-hidden border border-neutral-800">
            <div style={{ width: '55%' }} className="h-full bg-amber-400 rounded-full" />
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Average Order Value (AOV)
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 tabular-nums">
            ₹24.8L
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            +14% vs SS26 baseline
          </div>
          <div className="w-full bg-neutral-950 h-2 rounded-full mt-2.5 overflow-hidden border border-neutral-800">
            <div style={{ width: '85%' }} className="h-full bg-emerald-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Critical Commercial Alerts (Section 8 in prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-rose-300">24 Distributors Inactive</h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
              24 key accounts have not initiated their SS27 buy draft with 15 days remaining.
            </p>
            <button
              onClick={() => setActiveTab('distributors')}
              className="text-[11px] font-semibold text-rose-400 hover:underline mt-1.5 flex items-center gap-1"
            >
              Trigger batch follow-up <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-300">Running Category Gap</h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
              Performance Running is currently tracking 18% below seasonal target across Northern hubs.
            </p>
            <button
              onClick={() => setActiveTab('products')}
              className="text-[11px] font-semibold text-amber-400 hover:underline mt-1.5 flex items-center gap-1"
            >
              Review Running assortment <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
          <Package className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-cyan-300">High-Demand Stock Constrained</h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
              12 high-demand styles (Velocity NITRO, Speedcat) have &gt;75% allocation reserved.
            </p>
            <button
              onClick={() => setActiveTab('availability')}
              className="text-[11px] font-semibold text-cyan-400 hover:underline mt-1.5 flex items-center gap-1"
            >
              Inspect Central Stock <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Regional Performance vs Target */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Breakdown Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Territorial Sell-In Achievement
            </h3>
            <span className="text-xs text-neutral-400 font-mono">5 Commercial Zones</span>
          </div>

          <div className="space-y-4 pt-2">
            {regions.map(r => (
              <div key={r.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{r.name}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-neutral-400">
                      ₹{(r.actual / 10000000).toFixed(1)} Cr / ₹{(r.target / 10000000).toFixed(1)} Cr
                    </span>
                    <span className={`font-bold ${r.achievement >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {r.achievement}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    style={{ width: `${r.achievement}%` }}
                    className={`h-full rounded-full ${
                      r.achievement >= 70 ? 'bg-emerald-500' : r.achievement >= 50 ? 'bg-amber-500' : 'bg-red-600'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Contribution Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Category Contribution & Health
            </h3>
            <span className="text-xs text-neutral-400 font-mono">SS27 Target Index</span>
          </div>

          <div className="space-y-3 pt-2">
            {categoryPerformance.map(cat => (
              <div key={cat.name} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{cat.name}</div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {cat.share}% of total sell-in volume
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold font-mono ${
                    cat.targetPct >= 100 ? 'text-emerald-400' : cat.targetPct >= 80 ? 'text-cyan-400' : 'text-amber-400'
                  }`}>
                    {cat.targetPct}% Index
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {cat.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Styles */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            SS27 High-Velocity Franchise Ranking
          </h3>
          <span className="text-xs text-neutral-400 font-mono">By Booking Volume</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {products.slice(0, 4).map((p, idx) => (
            <div key={p.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-3">
              <span className="text-2xl font-black font-mono text-neutral-700">0{idx + 1}</span>
              <img
                src={p.heroImage}
                alt={p.name}
                className="w-12 h-12 object-cover rounded-xl bg-neutral-900 border border-neutral-800 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{p.name}</div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  {p.reservedUnits.toLocaleString()} units reserved
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  ₹{((p.reservedUnits * p.wholesalePrice) / 100000).toFixed(1)}L booked
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
