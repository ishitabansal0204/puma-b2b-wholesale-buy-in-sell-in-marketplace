import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { SeasonalOrder, OrderStatus } from '../../types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Download, 
  Printer, 
  PhoneCall, 
  ChevronRight,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';

interface OrderHistoryViewProps {
  initialSelectedOrderId?: string;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({ initialSelectedOrderId }) => {
  const { submittedOrders, updateOrderStatus, showToast, currentDistributor } = useWholesale();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialSelectedOrderId || (submittedOrders[0]?.id || '')
  );

  const selectedOrder = submittedOrders.find(o => o.id === selectedOrderId) || submittedOrders[0];

  const statusTimelineOrder: OrderStatus[] = [
    'Draft',
    'Submitted',
    'Under Review',
    'Confirmed',
    'Allocated',
    'In Production',
    'Ready for Delivery',
    'Delivered'
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    showToast('Download Ready', `Order_Summary_${selectedOrder?.orderNumber}.pdf exported.`, 'success');
  };

  const handleContactSales = () => {
    showToast('Sales Inquiry Sent', `Commercial rep ${currentDistributor.accountManagerName} notified regarding order ${selectedOrder?.orderNumber}.`, 'info');
  };

  const handleSimulateStatusStep = () => {
    if (!selectedOrder) return;
    const currentIndex = statusTimelineOrder.indexOf(selectedOrder.status);
    if (currentIndex < statusTimelineOrder.length - 1) {
      const nextStatus = statusTimelineOrder[currentIndex + 1];
      updateOrderStatus(selectedOrder.id, nextStatus);
    } else {
      updateOrderStatus(selectedOrder.id, 'Submitted');
    }
  };

  if (submittedOrders.length === 0) {
    return (
      <div className="py-20 text-center bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
        <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white">No Seasonal Orders Placed Yet</h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
          Orders submitted during seasonal buy-in windows will appear here with live tracking.
        </p>
      </div>
    );
  }

  const currentStatusIndex = selectedOrder ? statusTimelineOrder.indexOf(selectedOrder.status) : 0;

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono">
            Seasonal Orders & Fulfillment Tracking
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Monitor real-time allocation status, factory production schedule, and delivery logistics
          </p>
        </div>

        {selectedOrder && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSummary}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Summary
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
              title="Print Order"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleContactSales}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Contact Sales Rep
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Orders Sidebar + Detailed Order Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Orders List */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider px-1">
            Orders ({submittedOrders.length})
          </div>
          <div className="space-y-2">
            {submittedOrders.map(order => {
              const isSelected = order.id === selectedOrder?.id;
              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-neutral-800/90 border-red-600 shadow-lg ring-1 ring-red-500/20'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white text-xs">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] bg-neutral-950 px-2 py-0.5 rounded font-mono text-cyan-400 border border-neutral-800">
                      {order.seasonId}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-300 mt-1 font-semibold">
                    {order.distributorName}
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-2 font-mono">
                    <span className="text-white font-bold tabular-nums">
                      ₹{(order.totalValue / 100000).toFixed(2)}L
                    </span>
                    <span className="text-[11px] text-amber-400">
                      ● {order.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1 font-mono">
                    Submitted: {order.submittedAt} · {order.totalUnits} units
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Order Deep Dive */}
        {selectedOrder && (
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <div className="text-xs font-mono text-neutral-400">
                    Order Reference: <strong className="text-white">{selectedOrder.orderNumber}</strong>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase font-mono tracking-tight mt-0.5">
                    Live Status: <span className="text-red-500">{selectedOrder.status}</span>
                  </h3>
                </div>

                {/* Simulated Status Advance Button */}
                <button
                  onClick={handleSimulateStatusStep}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-cyan-400 text-xs font-semibold transition-colors border border-cyan-500/20"
                  title="Simulate progression to next workflow stage"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Simulate Next Status Stage
                </button>
              </div>

              {/* Visual Horizontal Timeline (Section 23 in prompt) */}
              <div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {statusTimelineOrder.map((step, idx) => {
                    const isPassed = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;

                    return (
                      <div key={step} className="flex flex-col items-center text-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1.5 ${
                            isCurrent
                              ? 'bg-red-600 text-white ring-4 ring-red-600/20'
                              : isPassed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                          }`}
                        >
                          {isPassed && !isCurrent ? '✓' : idx + 1}
                        </div>
                        <span
                          className={`text-[10px] font-mono leading-tight ${
                            isCurrent
                              ? 'text-white font-bold'
                              : isPassed
                              ? 'text-neutral-300'
                              : 'text-neutral-600'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metadata details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Season</div>
                  <div className="font-bold text-white font-mono mt-0.5">{selectedOrder.seasonId}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Submitted</div>
                  <div className="font-bold text-white font-mono mt-0.5">{selectedOrder.submittedAt}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Payment Terms</div>
                  <div className="font-bold text-neutral-200 mt-0.5 truncate">{selectedOrder.commercialTerms}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Logistics</div>
                  <div className="font-bold text-neutral-200 mt-0.5 truncate">{selectedOrder.shippingTerms}</div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Order Assortment Specification ({selectedOrder.items.length} Styles)
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Total Value: ₹{selectedOrder.totalValue.toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-3">Delivery</th>
                      <th className="py-3 px-3">Sizes Ordered</th>
                      <th className="py-3 px-3 text-right">Units</th>
                      <th className="py-3 px-4 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {selectedOrder.items.map(item => (
                      <tr key={item.id} className="hover:bg-neutral-800/30">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img
                            src={item.product.heroImage}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded bg-neutral-950 border border-neutral-800 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-white">{item.product.name}</div>
                            <div className="text-[11px] font-mono text-neutral-400">
                              {item.product.styleNumber} · {item.product.category}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-neutral-300 text-[11px]">
                          {item.deliveryWindow}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {Object.entries(item.sizeQuantities).map(([sz, qty]) => {
                              if (qty === 0) return null;
                              return (
                                <span key={sz} className="text-[10px] font-mono bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                                  {sz}: {qty}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold text-white tabular-nums">
                          {item.totalUnits}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-200 tabular-nums">
                          ₹{item.totalValue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
