import React from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product } from '../../types';
import { 
  BarChart3, 
  Layers, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

interface ProductPerformanceMatrixProps {
  onOpenDetail: (prod: Product) => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const ProductPerformanceMatrix: React.FC<ProductPerformanceMatrixProps> = ({ 
  onOpenDetail, 
  onOpenSizeCurve 
}) => {
  const { products, activeSeasonId } = useWholesale();

  // 4 Quadrants
  // 1. High Demand + Low Availability (Bottlenecks / Constrained)
  const highDemandLowAvail = products.filter(p => p.reservedUnits > 1500 && (p.status === 'Limited' || p.status === 'Low'));

  // 2. High Demand + High Availability (Stars / Growth Drivers)
  const highDemandHighAvail = products.filter(p => p.reservedUnits > 1200 && p.status === 'Available');

  // 3. Low Demand + High Availability (Excess Inventory / Push Needed)
  const lowDemandHighAvail = products.filter(p => p.reservedUnits < 1200 && p.status === 'Available');

  // 4. Low Demand + Low Availability (Specialty / Tail end)
  const lowDemandLowAvail = products.filter(p => p.reservedUnits < 1200 && (p.status === 'Limited' || p.status === 'Low' || p.status === 'Unavailable'));

  return (
    <div className="space-y-8 pb-24">
      {/* Title */}
      <div>
        <div className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
          Portfolio Analytics // {activeSeasonId}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono mt-0.5">
          Demand vs. Allocation 2x2 Matrix
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          BCG-style commercial analysis identifying franchise bottlenecks, inventory risk, and sell-in drivers
        </p>
      </div>

      {/* 2x2 Matrix Container (Section 29 in prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quadrant 1: High Demand + Low Availability */}
        <div className="bg-neutral-900 border border-amber-600/50 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                High Demand · Low Availability
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">
              Supply Bottleneck
            </span>
          </div>
          <p className="text-xs text-neutral-300">
            Styles experiencing intense wholesale demand with factory stock exhaustion risk. Prioritize allocation to Tier 1 accounts.
          </p>

          <div className="space-y-2.5 pt-2">
            {highDemandLowAvail.map(p => (
              <div 
                key={p.id}
                onClick={() => onOpenDetail(p)}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between hover:border-neutral-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={p.heroImage} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-900" />
                  <div>
                    <div className="text-xs font-bold text-white">{p.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {p.styleNumber} · {p.reservedUnits} booked / {p.totalAvailable} total
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-amber-400 font-bold">
                  {Math.round((p.reservedUnits / p.totalAvailable) * 100)}% Reserved
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 2: High Demand + High Availability */}
        <div className="bg-neutral-900 border border-emerald-600/50 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                High Demand · High Availability
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
              Core Growth Drivers
            </span>
          </div>
          <p className="text-xs text-neutral-300">
            Golden franchises with ample production capacity and strong wholesale velocity. Recommended for aggressive sell-in push.
          </p>

          <div className="space-y-2.5 pt-2">
            {highDemandHighAvail.map(p => (
              <div 
                key={p.id}
                onClick={() => onOpenDetail(p)}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between hover:border-neutral-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={p.heroImage} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-900" />
                  <div>
                    <div className="text-xs font-bold text-white">{p.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {p.styleNumber} · {p.reservedUnits} booked / {p.totalAvailable} total
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  In Stock ({p.totalAvailable - p.reservedUnits} open)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 3: Low Demand + High Availability */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Low Demand · High Availability
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
              Merchandising Push
            </span>
          </div>
          <p className="text-xs text-neutral-300">
            Abundant stock ready for booking with underutilized distributor adoption. Recommend bundling into seasonal tier discount programs.
          </p>

          <div className="space-y-2.5 pt-2">
            {lowDemandHighAvail.map(p => (
              <div 
                key={p.id}
                onClick={() => onOpenDetail(p)}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between hover:border-neutral-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={p.heroImage} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-900" />
                  <div>
                    <div className="text-xs font-bold text-white">{p.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {p.styleNumber} · {p.reservedUnits} booked / {p.totalAvailable} total
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {p.totalAvailable - p.reservedUnits} units unallocated
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Low Demand + Low Availability */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-neutral-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Low Demand · Low Availability
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
              Niche / Specialty
            </span>
          </div>
          <p className="text-xs text-neutral-300">
            Limited production specialty runs (e.g. carbon plate marathon super-shoes, official match balls) with boutique distributor distribution.
          </p>

          <div className="space-y-2.5 pt-2">
            {lowDemandLowAvail.map(p => (
              <div 
                key={p.id}
                onClick={() => onOpenDetail(p)}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between hover:border-neutral-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img src={p.heroImage} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-900" />
                  <div>
                    <div className="text-xs font-bold text-white">{p.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {p.styleNumber} · {p.reservedUnits} booked / {p.totalAvailable} total
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Specialty Tier
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
