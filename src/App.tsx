import React, { useState } from 'react';
import { WholesaleProvider, useWholesale } from './context/WholesaleContext';
import { TopNavigation } from './components/common/TopNavigation';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ToastContainer } from './components/common/ToastContainer';
import { DigitalShowroom } from './components/catalog/DigitalShowroom';
import { ProductCatalog } from './components/catalog/ProductCatalog';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { SizeCurveModal } from './components/catalog/SizeCurveModal';
import { DigitalLookbookModal } from './components/catalog/DigitalLookbookModal';
import { MyBuyWorkspace } from './components/distributor/MyBuyWorkspace';
import { OrderReviewModal } from './components/distributor/OrderReviewModal';
import { OrderHistoryView } from './components/distributor/OrderHistoryView';
import { DistributorDashboard } from './components/distributor/DistributorDashboard';
import { SalesDashboard } from './components/sales/SalesDashboard';
import { DistributorList } from './components/sales/DistributorList';
import { DistributorDetailView } from './components/sales/DistributorDetailView';
import { TaskCenter } from './components/sales/TaskCenter';
import { AvailabilityCenter } from './components/availability/AvailabilityCenter';
import { ProductPerformanceMatrix } from './components/manager/ProductPerformanceMatrix';
import { Product, Distributor, SeasonalOrder } from './types';

const MainAppContent: React.FC = () => {
  const { 
    userRole, 
    activeTab, 
    setActiveTab, 
    selectedProductForDetail, 
    setSelectedProductForDetail,
    selectedProductForSizeCurve,
    setSelectedProductForSizeCurve,
    isReviewOrderOpen,
    setIsReviewOrderOpen,
    activeSeasonId
  } = useWholesale();

  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [selectedDistributorProfile, setSelectedDistributorProfile] = useState<Distributor | null>(null);
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<SeasonalOrder | null>(null);

  const handleOpenDetail = (prod: Product) => {
    setSelectedProductForDetail(prod);
  };

  const handleOpenSizeCurve = (prod: Product) => {
    setSelectedProductForSizeCurve(prod);
  };

  const handleSelectDistributor = (dist: Distributor) => {
    setSelectedDistributorProfile(dist);
  };

  const handleOrderSubmitted = (order: SeasonalOrder) => {
    setLastSubmittedOrder(order);
    setActiveTab('orders');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Bar Navigation */}
      <TopNavigation onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)} />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        {/* Route views based on activeTab */}
        {activeTab === 'home' && (
          userRole === 'distributor' ? (
            <DistributorDashboard
              onOpenDetail={handleOpenDetail}
              onOpenSizeCurve={handleOpenSizeCurve}
            />
          ) : (
            <SalesDashboard />
          )
        )}

        {activeTab === 'showroom' && (
          <DigitalShowroom
            onOpenDetail={handleOpenDetail}
            onOpenSizeCurve={handleOpenSizeCurve}
          />
        )}

        {activeTab === 'products' && (
          <ProductCatalog
            onOpenDetail={handleOpenDetail}
            onOpenSizeCurve={handleOpenSizeCurve}
          />
        )}

        {activeTab === 'my-buy' && (
          <MyBuyWorkspace
            onOpenSizeCurve={handleOpenSizeCurve}
            onOpenReview={() => setIsReviewOrderOpen(true)}
          />
        )}

        {activeTab === 'availability' && (
          <AvailabilityCenter
            onOpenDetail={handleOpenDetail}
            onOpenSizeCurve={handleOpenSizeCurve}
          />
        )}

        {activeTab === 'distributors' && (
          selectedDistributorProfile ? (
            <DistributorDetailView
              distributor={selectedDistributorProfile}
              onBack={() => setSelectedDistributorProfile(null)}
            />
          ) : (
            <DistributorList onSelectDistributor={handleSelectDistributor} />
          )
        )}

        {activeTab === 'orders' && (
          <OrderHistoryView initialSelectedOrderId={lastSubmittedOrder?.id} />
        )}

        {activeTab === 'performance' && (
          <ProductPerformanceMatrix
            onOpenDetail={handleOpenDetail}
            onOpenSizeCurve={handleOpenSizeCurve}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskCenter />
        )}
      </main>

      {/* Enterprise Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">PUMA</span>
            <span>PUMA SE Wholesale Commercial Portal · Season {activeSeasonId}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Central Logistics: Bhiwandi Global Hub</span>
            <span>·</span>
            <span>Support: wholesale-ops@puma.com</span>
            <span>·</span>
            <span>Confidential B2B Platform</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <RoleSwitcherModal
        isOpen={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
      />

      <GlobalSearchModal />

      <DigitalLookbookModal />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onOpenSizeCurve={handleOpenSizeCurve}
      />

      <SizeCurveModal
        product={selectedProductForSizeCurve}
        onClose={() => setSelectedProductForSizeCurve(null)}
      />

      <OrderReviewModal
        isOpen={isReviewOrderOpen}
        onClose={() => setIsReviewOrderOpen(false)}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Sleek Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <WholesaleProvider>
      <MainAppContent />
    </WholesaleProvider>
  );
}
