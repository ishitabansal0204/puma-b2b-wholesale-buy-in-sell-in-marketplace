import React from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Distributor } from '../../types';
import { 
  Building2, 
  ArrowLeft, 
  Send, 
  Eye, 
  Calendar, 
  MapPin, 
  Award, 
  ShoppingBag, 
  TrendingUp, 
  FileText 
} from 'lucide-react';

interface DistributorDetailViewProps {
  distributor: Distributor;
  onBack: () => void;
}

export const DistributorDetailView: React.FC<DistributorDetailViewProps> = ({ 
  distributor, 
  onBack 
}) => {
  const { 
    sendDistributorReminder, 
    setCurrentDistributor, 
    setActiveTab, 
    products, 
    submittedOrders 
  } = useWholesale();

  const handleOpenBuy = () => {
    setCurrentDistributor(distributor);
    setActiveTab('my-buy');
  };

  const distOrders = submittedOrders.filter(o => o.distributorId === distributor.id);

  return (
    <div className="space-y-8 pb-24">
      {/* Back button & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-mono text-neutral-400">
              Account Code: {distributor.code} · {distributor.region} Zone
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono mt-0.5">
              {distributor.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => sendDistributorReminder(distributor.id)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            Send Seasonal Reminder
          </button>
          <button
            onClick={handleOpenBuy}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/20"
          >
            <Eye className="w-4 h-4" />
            Open SS27 Assortment Buy
          </button>
        </div>
      </div>

      {/* Profile Overview Card (Section 25 in prompt) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Commercial Tier</div>
          <div className="text-base font-bold text-white mt-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            {distributor.tier}
          </div>
          <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
            {distributor.city}, Maharashtra
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Account Mgr: <strong className="text-neutral-200">{distributor.accountManagerName}</strong>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Annual Wholesale Target</div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            ₹{(distributor.annualTarget / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            FY 2026-27 Commitment
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase">SS27 Target</div>
          <div className="text-2xl font-black text-neutral-200 font-mono mt-1">
            ₹{(distributor.seasonalTarget / 100000).toFixed(1)}L
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            Current Buy: <strong className="text-white">₹{(distributor.currentBuyValue / 100000).toFixed(1)}L</strong>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Target Achievement</div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
            {distributor.targetAchievementPercent}%
          </div>
          <div className="w-full bg-neutral-950 h-2 rounded-full mt-2 overflow-hidden border border-neutral-800">
            <div
              style={{ width: `${Math.min(100, distributor.targetAchievementPercent)}%` }}
              className="h-full bg-cyan-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Historical Seasons Track Record */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Historical Seasonal Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {distributor.historicalSeasons.map(hs => {
            const ach = Math.round((hs.actual / hs.target) * 100);
            return (
              <div key={hs.season} className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white">{hs.season} Season</span>
                  <span className={ach >= 100 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {ach}% Target Met
                  </span>
                </div>
                <div className="text-lg font-black text-white font-mono mt-2 tabular-nums">
                  ₹{(hs.actual / 100000).toFixed(1)}L
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  Target: ₹{(hs.target / 100000).toFixed(1)}L
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order History for This Account */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Order History for {distributor.name}
          </span>
        </div>

        {distOrders.length === 0 ? (
          <div className="p-8 text-center text-neutral-400 text-xs">
            No historical submitted orders on record for this account. Current SS27 buy is in Draft state.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-3">Season</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Value</th>
                  <th className="py-3 px-3 text-right">Units</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {distOrders.map(ord => (
                  <tr key={ord.id} className="hover:bg-neutral-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                    <td className="py-3.5 px-3 font-mono text-cyan-400">{ord.seasonId}</td>
                    <td className="py-3.5 px-3 font-mono text-neutral-400">{ord.submittedAt}</td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                      ₹{(ord.totalValue / 100000).toFixed(2)}L
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-neutral-300">
                      {ord.totalUnits}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-400 font-mono font-semibold">
                        ● {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
