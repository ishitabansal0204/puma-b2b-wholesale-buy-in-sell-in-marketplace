import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product, ProductCategory } from '../../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface DigitalShowroomProps {
  onOpenDetail: (prod: Product) => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const DigitalShowroom: React.FC<DigitalShowroomProps> = ({ 
  onOpenDetail, 
  onOpenSizeCurve 
}) => {
  const { products, setActiveTab, setIsCatalogViewerOpen } = useWholesale();
  const [selectedShowcase, setSelectedShowcase] = useState<'new' | 'franchise' | 'recommended' | 'bestsellers'>('new');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Running',
    'Training',
    'Football',
    'Basketball',
    'Lifestyle',
    'Motorsport',
    'Apparel',
    'Accessories',
  ];

  const filteredProducts = products.filter(p => {
    // Category filter
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

    // Showcase tab filter
    if (selectedShowcase === 'new') return p.isNewForSeason;
    if (selectedShowcase === 'franchise') return p.isStrategicPriority;
    if (selectedShowcase === 'recommended') return p.isRecommended;
    if (selectedShowcase === 'bestsellers') return p.isBestSeller;
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Campaign Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl min-h-[420px] flex items-end">
        {/* Campaign Hero Image with Gradient Scrim */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_puma_ss27_campaign_1790787634064.jpg"
            alt="PUMA SS27 Collection Campaign"
            className="w-full h-full object-cover object-center filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white font-mono text-xs font-black uppercase px-2.5 py-1 rounded tracking-wider">
              SS27 SHOWROOM OPEN
            </span>
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wide">
              DELIVERY WINDOW: JAN – MAR 2027
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none font-mono">
            FOREVER. FASTER. <br />
            <span className="text-neutral-300">NITRO REVOLUTION.</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
            Welcome to the official PUMA SS27 Seasonal Buy-In platform. Explore next-generation nitrogen-infused race day footwear, iconic terrace retros, and technical apparel with real-time central stock allocations.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('products')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-tight transition-all shadow-xl shadow-red-600/30"
            >
              Explore Full Catalog ({products.length} Styles)
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCatalogViewerOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold text-sm transition-colors backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Open Digital Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-white text-black border-white shadow-sm'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Curated Showcase Segmented Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-500" />
            SS27 Curated Assortments
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Showing {filteredProducts.length} styles tailored for seasonal distributor buy-in
          </p>
        </div>

        {/* Functional segmented button control */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-xl border border-neutral-800 text-xs font-semibold">
          {[
            { id: 'new', label: 'New for SS27', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
            { id: 'franchise', label: 'Strategic Priorities' },
            { id: 'recommended', label: 'Recommended for You' },
            { id: 'bestsellers', label: 'High Sell-Through' },
          ].map(tab => {
            const isTabActive = selectedShowcase === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedShowcase(tab.id as typeof selectedShowcase)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  isTabActive
                    ? 'bg-neutral-800 text-white shadow-xs font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetail={onOpenDetail}
            onOpenSizeCurve={onOpenSizeCurve}
          />
        ))}
      </div>
    </div>
  );
};
