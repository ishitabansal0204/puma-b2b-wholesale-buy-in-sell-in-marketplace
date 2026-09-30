import React, { useState, useMemo } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product, ProductCategory, ProductGender, AvailabilityStatus } from '../../types';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Check, 
  Clock, 
  Plus
} from 'lucide-react';

interface ProductCatalogProps {
  onOpenDetail: (prod: Product) => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onOpenDetail, 
  onOpenSizeCurve 
}) => {
  const { products, myBuyItems } = useWholesale();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'margin' | 'availability'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.styleNumber.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.franchise.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Gender
      if (selectedGender !== 'All' && p.gender !== selectedGender) return false;

      // Availability
      if (selectedAvailability !== 'All' && p.status !== selectedAvailability) return false;

      // Delivery Window
      if (selectedDelivery !== 'All' && p.deliveryWindow !== selectedDelivery) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.wholesalePrice - b.wholesalePrice;
      if (sortBy === 'priceDesc') return b.wholesalePrice - a.wholesalePrice;
      if (sortBy === 'margin') return b.marginPercent - a.marginPercent;
      if (sortBy === 'availability') return b.totalAvailable - a.totalAvailable;
      // Recommended default
      return (b.isStrategicPriority ? 1 : 0) - (a.isStrategicPriority ? 1 : 0);
    });
  }, [products, search, selectedCategory, selectedGender, selectedAvailability, selectedDelivery, sortBy]);

  const categories: (ProductCategory | 'All')[] = [
    'All', 'Running', 'Training', 'Football', 'Basketball', 'Lifestyle', 'Motorsport', 'Apparel', 'Accessories'
  ];

  const deliveryWindows = ['All', 'Jan 2027', 'Feb 2027', 'Mar 2027'];

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase font-mono">
            SS27 Wholesale Assortment Catalog
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Displaying {filteredProducts.length} orderable styles for seasonal booking
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Dense B2B Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 space-y-4">
        {/* Row 1: Search and Main Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by style, name, franchise..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Gender */}
          <div>
            <select
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="All">All Genders</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Delivery Window */}
          <div>
            <select
              value={selectedDelivery}
              onChange={e => setSelectedDelivery(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="All">All Delivery Windows</option>
              {deliveryWindows.filter(w => w !== 'All').map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="recommended">Sort: Priority / Franchise</option>
              <option value="priceAsc">Wholesale Price: Low to High</option>
              <option value="priceDesc">Wholesale Price: High to Low</option>
              <option value="margin">Highest Retail Margin %</option>
              <option value="availability">Highest Central Stock</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none border-t border-neutral-800/80">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-red-500" /> Category:
          </span>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-neutral-200 text-black font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Catalog View: Grid or Dense Table */}
      {viewMode === 'grid' ? (
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
      ) : (
        /* Dense Enterprise B2B Table View */
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Style & Details</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Gender</th>
                  <th className="py-3 px-3 text-right">Wholesale (W/S)</th>
                  <th className="py-3 px-3 text-right">MSRP</th>
                  <th className="py-3 px-3 text-right">Margin</th>
                  <th className="py-3 px-3">Delivery</th>
                  <th className="py-3 px-3">Availability</th>
                  <th className="py-3 px-3 text-center">In Buy</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {filteredProducts.map(product => {
                  const buyItem = myBuyItems.find(i => i.productId === product.id);
                  const selectedUnits = buyItem?.totalUnits || 0;

                  return (
                    <tr 
                      key={product.id}
                      className="hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                      onClick={() => onOpenDetail(product)}
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={product.heroImage}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded bg-neutral-950 border border-neutral-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {product.name}
                          </div>
                          <div className="text-[11px] font-mono text-neutral-400">
                            {product.styleNumber} · {product.colorway}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-neutral-300 font-medium">
                        {product.category}
                      </td>
                      <td className="py-3 px-3 text-neutral-400 font-mono">
                        {product.gender}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white tabular-nums">
                        ₹{product.wholesalePrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-neutral-400 tabular-nums">
                        ₹{product.msrp.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                        {product.marginPercent}%
                      </td>
                      <td className="py-3 px-3 text-neutral-300 font-mono text-[11px]">
                        {product.deliveryWindow}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        {product.status === 'Available' && <span className="text-emerald-400">● In Stock</span>}
                        {product.status === 'Limited' && <span className="text-amber-400">● Limited</span>}
                        {product.status === 'Low' && <span className="text-orange-400">● Low</span>}
                        {product.status === 'Unavailable' && <span className="text-rose-500">✕ Out</span>}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        {selectedUnits > 0 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/60">
                            <Check className="w-3 h-3" /> {selectedUnits}
                          </span>
                        ) : (
                          <span className="text-neutral-600">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSizeCurve(product);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-600 text-white font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{selectedUnits > 0 ? 'Edit' : 'Add'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
          <p className="text-neutral-400 text-sm">No styles match your active filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedGender('All');
              setSelectedAvailability('All');
              setSelectedDelivery('All');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-neutral-800 text-white text-xs font-semibold hover:bg-neutral-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
