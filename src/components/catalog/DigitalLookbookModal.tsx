import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Download, ZoomIn } from 'lucide-react';

export const DigitalLookbookModal: React.FC = () => {
  const { 
    isCatalogViewerOpen, 
    setIsCatalogViewerOpen, 
    products, 
    setSelectedProductForSizeCurve, 
    showToast 
  } = useWholesale();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  if (!isCatalogViewerOpen) return null;

  const getPageContent = () => {
    switch (currentPage) {
      case 1:
        return {
          title: 'SS27 HERO CAMPAIGN // SPEED & PRECISION',
          subtitle: 'NITROFOAM Elite Technology Launch for Marathons and Daily Speed',
          image: '/src/assets/images/hero_puma_ss27_campaign_1790787634064.jpg',
          featuredProducts: products.slice(0, 2),
          notes: 'Global campaign debut across Olympic trials and marathon majors. Target consumer: competitive runners and trend-conscious athletes.',
        };
      case 2:
        return {
          title: 'NITRO RUNNING FRANCHISE SPREAD',
          subtitle: 'From Velocity NITRO 4 to Fast-R Elite 2 Aerodynamic Carbon Plate',
          image: '/src/assets/images/product_velocity_nitro_1790787649084.jpg',
          featuredProducts: products.filter(p => p.category === 'Running').slice(0, 3),
          notes: 'Standardized delivery schedule: Jan–Feb 2027. Dual-density nitrogen infused cushioning.',
        };
      case 3:
        return {
          title: 'MARATHON RACING & CARBON TECH',
          subtitle: 'Deviate NITRO Elite 3: Ultralight 185g Marathon Racer',
          image: '/src/assets/images/product_deviate_elite_1790787661627.jpg',
          featuredProducts: [products[1], products[3]],
          notes: 'Limited factory batch. Key distributors receive prioritized allocation for Spring races.',
        };
      case 4:
        return {
          title: 'T7 HERITAGE & TECH APPAREL CAPSULE',
          subtitle: 'Iconic 1968 7cm Stripes Engineered with dryCELL Weatherproof Fabrics',
          image: '/src/assets/images/product_puma_apparel_track_1790787672048.jpg',
          featuredProducts: products.filter(p => p.category === 'Apparel').slice(0, 3),
          notes: 'High-margin seasonal anchor line for lifestyle athletic boutiques and sport specialty.',
        };
      case 5:
        return {
          title: 'TERRACE CULTURE & ARCHIVE SPEEDCAT',
          subtitle: 'Palermo OG & Speedcat F1 Archival Silhouettes',
          image: '/src/assets/images/hero_puma_ss27_campaign_1790787634064.jpg',
          featuredProducts: products.filter(p => p.category === 'Lifestyle' || p.category === 'Motorsport').slice(0, 3),
          notes: 'Global cultural virality driver. High sell-through velocity on low profile racing footwear.',
        };
      default:
        return {
          title: 'PUMA FOOTBALL & HOOPS FRANCHISES',
          subtitle: 'FUTURE 7 Ultimate & LaMelo Ball Signature Line',
          image: '/src/assets/images/product_velocity_nitro_1790787649084.jpg',
          featuredProducts: products.filter(p => p.category === 'Football' || p.category === 'Basketball').slice(0, 3),
          notes: 'Adaptive FUZIONFIT360 upper and responsive nitrogen cushioning for maximum multi-directional traction.',
        };
    }
  };

  const page = getPageContent();

  const handleDownloadPDF = () => {
    showToast('Download Started', 'PUMA SS27 Seasonal Lookbook (High-Res B2B PDF) is being exported.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded">
              DIGITAL LOOKBOOK
            </span>
            <span className="text-xs font-mono text-neutral-300">
              PUMA SS27 Wholesale Collection Catalog · Spread {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              Download PDF Catalog
            </button>
            <button
              onClick={() => setIsCatalogViewerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lookbook Double-Page Spread View */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-b from-neutral-950 to-neutral-900">
          {/* Left Page: Editorial Graphic */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-black aspect-[4/3] lg:aspect-auto lg:h-[65vh] shadow-2xl">
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono text-red-500 font-bold uppercase tracking-widest">
                PUMA LOOKBOOK // SS27
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                {page.title}
              </h2>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                {page.subtitle}
              </p>
            </div>
          </div>

          {/* Right Page: Products Featured in this Story with 1-Click "Add to Buy" */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-neutral-800 pb-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Featured Seasonal Assortment
                </span>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {page.notes}
                </p>
              </div>

              {/* Product Cards on this Lookbook Page */}
              <div className="space-y-3">
                {page.featuredProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/90 flex items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.heroImage}
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded-lg bg-neutral-900 border border-neutral-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white tracking-tight">
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          Style: {prod.styleNumber} · W/S: ₹{prod.wholesalePrice.toLocaleString()} · MSRP: ₹{prod.msrp.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                          Delivery: {prod.deliveryWindow} · {prod.status}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProductForSizeCurve(prod);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shrink-0 transition-colors shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Buy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-neutral-800 disabled:opacity-30 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Spread
              </button>

              <span className="text-xs font-mono text-neutral-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-neutral-800 disabled:opacity-30 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Next Spread <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
