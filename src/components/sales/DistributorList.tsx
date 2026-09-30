import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Distributor } from '../../types';
import { 
  Search, 
  Filter, 
  Send, 
  ExternalLink, 
  ChevronRight, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Eye
} from 'lucide-react';

interface DistributorListProps {
  onSelectDistributor: (dist: Distributor) => void;
}

export const DistributorList: React.FC<DistributorListProps> = ({ onSelectDistributor }) => {
  const { 
    distributors, 
    sendDistributorReminder, 
    setActiveTab, 
    setCurrentDistributor 
  } = useWholesale();

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredDistributors = distributors.filter(d => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.city.toLowerCase().includes(q) && !d.code.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (regionFilter !== 'All' && d.region !== regionFilter) return false;
    if (statusFilter !== 'All' && d.buyStatus !== statusFilter) return false;
    return true;
  });

  const handleOpenBuy = (dist: Distributor) => {
    setCurrentDistributor(dist);
    setActiveTab('my-buy');
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono">
            Assigned Distributors & Sell-In Pipeline
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Monitor partner buying status, track target gaps, and initiate immediate follow-ups
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search distributor, city, or account ID..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none font-mono"
          >
            <option value="All">All Regions</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="Central">Central</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none font-mono"
          >
            <option value="All">All Buying Statuses</option>
            <option value="Draft">Draft in Progress</option>
            <option value="Submitted">Submitted Orders</option>
            <option value="Under Review">Under Review</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Not Started">Not Started (Needs Action)</option>
          </select>
        </div>

        <span className="text-xs font-mono text-neutral-400">
          Showing {filteredDistributors.length} of {distributors.length} accounts
        </span>
      </div>

      {/* Distributors Master Table (Section 26 & 27 in prompt) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4">Distributor Account</th>
                <th className="py-3.5 px-3">Region & Rep</th>
                <th className="py-3.5 px-3 text-right">SS27 Target</th>
                <th className="py-3.5 px-3 text-right">Current Buy</th>
                <th className="py-3.5 px-3">Achievement</th>
                <th className="py-3.5 px-3">Buy Status</th>
                <th className="py-3.5 px-3">Last Active</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredDistributors.map(dist => {
                const targetAchievement = dist.targetAchievementPercent;

                return (
                  <tr 
                    key={dist.id} 
                    className="hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectDistributor(dist)}
                  >
                    {/* Account */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {dist.name}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        {dist.code} · {dist.city} ({dist.tier})
                      </div>
                    </td>

                    {/* Region */}
                    <td className="py-3.5 px-3">
                      <div className="text-neutral-200 font-medium">{dist.region} Zone</div>
                      <div className="text-[11px] text-neutral-400">{dist.accountManagerName}</div>
                    </td>

                    {/* Seasonal Target */}
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-neutral-300 tabular-nums">
                      ₹{(dist.seasonalTarget / 100000).toFixed(1)}L
                    </td>

                    {/* Current Buy */}
                    <td className="py-3.5 px-3 text-right font-mono font-black text-white tabular-nums">
                      ₹{(dist.currentBuyValue / 100000).toFixed(1)}L
                    </td>

                    {/* Achievement Bar */}
                    <td className="py-3.5 px-3 w-32">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-neutral-300 font-bold">{targetAchievement}%</span>
                      </div>
                      <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                        <div
                          style={{ width: `${Math.min(100, targetAchievement)}%` }}
                          className={`h-full rounded-full ${
                            targetAchievement >= 90 ? 'bg-emerald-500' : targetAchievement >= 60 ? 'bg-amber-500' : 'bg-red-600'
                          }`}
                        />
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 font-mono">
                      {dist.buyStatus === 'Confirmed' && <span className="text-emerald-400 font-semibold">● Confirmed</span>}
                      {dist.buyStatus === 'Submitted' && <span className="text-cyan-400 font-semibold">● Submitted</span>}
                      {dist.buyStatus === 'Under Review' && <span className="text-amber-400 font-semibold">● Under Review</span>}
                      {dist.buyStatus === 'Draft' && <span className="text-neutral-300">● Draft ({dist.selectedStylesCount} styles)</span>}
                      {dist.buyStatus === 'Not Started' && <span className="text-rose-500 font-bold">✕ Not Started</span>}
                    </td>

                    {/* Last active */}
                    <td className="py-3.5 px-3 font-mono text-neutral-400 text-[11px]">
                      {dist.lastActive}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenBuy(dist)}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1"
                          title="Open and edit distributor assortment"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Buy</span>
                        </button>
                        <button
                          onClick={() => sendDistributorReminder(dist.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-colors flex items-center gap-1"
                          title="Send automated follow-up reminder via WhatsApp/Email"
                        >
                          <Send className="w-3 h-3" />
                          <span>Remind</span>
                        </button>
                      </div>
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
