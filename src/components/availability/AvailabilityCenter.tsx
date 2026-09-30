import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product } from '../../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Search, 
  Filter, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface AvailabilityCenterProps {
  onOpenDetail: (prod: Product) => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const AvailabilityCenter: React.FC<AvailabilityCenterProps> = ({ 
  onOpenDetail, 
  onOpenSizeCurve 
}) => {
  const { 
    products, 
    inventorySimulationActive, 
    setInventorySimulationActive, 
    replaceProductInBuy,
    myBuyItems,
    showToast 
  } = useWholesale();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [selectedAlternativeSource, setSelectedAlternativeSource] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.styleNumber.toLowerCase().includes(q)) return false;
    }
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  const handleToggleSimulation = () => {
    const newState = !inventorySimulationActive;
    setInventorySimulationActive(newState);
    if (newState) {
      showToast(
        'Inventory Constriction Simulated',
        'Velocity NITRO 4 central stock constricted by 18 units due to Olympic qualifier surge. Alternative recommendation triggered.',
        'warning'
      );
    } else {
      showToast('Inventory Reset', 'Stock allocations returned to standard SS27 baseline.', 'info');
    }
  };

  // Alternative products generator for a constrained style
  const getAlternativesFor = (prod: Product) => {
    return products.filter(p => p.id !== prod.id && p.category === prod.category && p.status === 'Available').slice(0, 3);
  };

  const handleExecuteReplacement = (oldProd: Product, newProd: Product) => {
    replaceProductInBuy(oldProd.id, newProd.id);
    setSelectedAlternativeSource(null);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Title & Live Simulation Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono">
            SS27 Central Stock & Allocation Center
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time central inventory, reserved bookings, and factory production pipeline
          </p>
        </div>

        {/* Live Simulation Button (Section 19 in prompt) */}
        <button
          onClick={handleToggleSimulation}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
            inventorySimulationActive
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20 ring-2 ring-amber-400/40'
              : 'bg-neutral-800 hover:bg-neutral-700 text-cyan-400 border border-cyan-500/30'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${inventorySimulationActive ? 'animate-spin' : ''}`} />
          {inventorySimulationActive ? 'Reset Inventory Simulation' : 'Simulate Live Stock Drop / Shortage'}
        </button>
      </div>

      {/* Simulated Constriction Alert Banner if Active (Section 19 & 20) */}
      {inventorySimulationActive && (
        <div className="bg-gradient-to-r from-amber-950/70 via-neutral-900 to-neutral-950 border border-amber-600/60 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Live Stock Update Alert
                </span>
                <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                  Velocity NITRO 4 (Style: 310123_01) Allocation Adjusted
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed max-w-2xl">
                  Central inventory updated. <strong>18 units of your requested size UK 9 are no longer available</strong> due to regional demand spike. Choose an alternative franchise or adjust quantities.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAlternativeSource(products[0])}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 transition-colors shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              View Recommended Alternatives
            </button>
          </div>
        </div>
      )}

      {/* Modal / Panel: Alternative Product Experience (Section 20 in prompt) */}
      {selectedAlternativeSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  Alternative Replacement Engine
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Replace {selectedAlternativeSource.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedAlternativeSource(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs text-neutral-400">
                To keep your SS27 delivery window intact, PUMA systems suggest these 3 fully available substitutes with matching price tiers and sell-through potential:
              </p>

              <div className="space-y-3">
                {getAlternativesFor(selectedAlternativeSource).map(alt => (
                  <div
                    key={alt.id}
                    className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={alt.heroImage}
                        alt={alt.name}
                        className="w-12 h-12 object-cover rounded-xl bg-neutral-900 border border-neutral-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{alt.name}</div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          Style: {alt.styleNumber} · W/S: ₹{alt.wholesalePrice.toLocaleString()} · Delivery: {alt.deliveryWindow}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                          ● Fully Available ({alt.totalAvailable - alt.reservedUnits} units remaining)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleExecuteReplacement(selectedAlternativeSource, alt)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shrink-0 transition-colors shadow flex items-center gap-1.5"
                    >
                      <span>Replace Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setSelectedAlternativeSource(null)}
                className="px-4 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Total Factory Allocation</div>
          <div className="text-2xl font-black text-white font-mono mt-1">78,500</div>
          <div className="text-xs text-neutral-400 mt-1">SS27 Committed Batch</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Reserved by Orders</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">51,400</div>
          <div className="text-xs text-neutral-400 mt-1">65.5% reservation rate</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Remaining Open Stock</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">27,100</div>
          <div className="text-xs text-neutral-400 mt-1">Unclaimed seasonal units</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Delivery Lead Time</div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">Jan–Mar '27</div>
          <div className="text-xs text-neutral-400 mt-1">Bhiwandi Hub Dispatches</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by style or name..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none font-mono"
          >
            <option value="All">All Categories</option>
            <option value="Running">Running</option>
            <option value="Training">Training</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Motorsport">Motorsport</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none font-mono"
          >
            <option value="All">All Stock Statuses</option>
            <option value="Available">Available Only (Green)</option>
            <option value="Limited">Limited Stock (Amber)</option>
            <option value="Low">Critical Low (Orange)</option>
            <option value="Unavailable">Sold Out (Red)</option>
          </select>
        </div>

        <span className="text-xs font-mono text-neutral-400">
          Showing {filteredProducts.length} styles
        </span>
      </div>

      {/* Availability Stock Table (Section 18 in prompt) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4">Style & Product</th>
                <th className="py-3.5 px-3">Delivery Window</th>
                <th className="py-3.5 px-3 text-right">Factory Total</th>
                <th className="py-3.5 px-3 text-right">Reserved Units</th>
                <th className="py-3.5 px-3 text-right">Remaining Open</th>
                <th className="py-3.5 px-4">Allocation Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredProducts.map(product => {
                const remaining = Math.max(0, product.totalAvailable - product.reservedUnits);
                const percentReserved = Math.round((product.reservedUnits / product.totalAvailable) * 100);

                let statusBadge = (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold font-mono">
                    🟢 Available
                  </span>
                );
                if (product.status === 'Limited') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold font-mono">
                      🟡 Limited Availability
                    </span>
                  );
                } else if (product.status === 'Low') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 text-orange-400 font-semibold font-mono">
                      🟠 Critical Low
                    </span>
                  );
                } else if (product.status === 'Unavailable') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 text-rose-500 font-semibold font-mono">
                      🔴 Sold Out
                    </span>
                  );
                }

                return (
                  <tr key={product.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={product.heroImage}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded bg-neutral-950 border border-neutral-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div 
                          onClick={() => onOpenDetail(product)}
                          className="font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors"
                        >
                          {product.name}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          {product.styleNumber} · {product.category}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-neutral-300">
                      {product.deliveryWindow}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-medium text-neutral-400 tabular-nums">
                      {product.totalAvailable.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-amber-400 tabular-nums">
                      {product.reservedUnits.toLocaleString()} ({percentReserved}%)
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-black text-white tabular-nums">
                      {remaining.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      {statusBadge}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {product.status === 'Unavailable' || product.status === 'Low' ? (
                        <button
                          onClick={() => setSelectedAlternativeSource(product)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-400 text-xs font-semibold transition-colors"
                        >
                          Alternatives
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenSizeCurve(product)}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
                        >
                          Add to Buy
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
