import React, { useState, useMemo } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Search, X, Package, Store, FileText, ChevronRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    distributors, 
    submittedOrders,
    setSelectedProductForDetail,
    setCurrentDistributor,
    setActiveTab,
  } = useWholesale();

  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.styleNumber.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.franchise.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [products, query]);

  const filteredDistributors = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return distributors.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.code.toLowerCase().includes(q) || 
      d.city.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [distributors, query]);

  const filteredOrders = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return submittedOrders.filter(o => 
      o.orderNumber.toLowerCase().includes(q) || 
      o.distributorName.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [submittedOrders, query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: typeof products[0]) => {
    setSelectedProductForDetail(product);
    setIsSearchOpen(false);
  };

  const handleSelectDistributor = (dist: typeof distributors[0]) => {
    setCurrentDistributor(dist);
    setActiveTab('distributors');
    setIsSearchOpen(false);
  };

  const handleSelectOrder = () => {
    setActiveTab('orders');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search styles, products, distributors, or orders (e.g. Velocity, 310123, Mumbai, SS27)..."
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-neutral-500 hover:text-neutral-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-mono text-neutral-400 bg-neutral-800 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-neutral-800/60">
          {!query.trim() ? (
            <div className="py-8 text-center text-neutral-500 text-xs">
              Type to instantly search across SS27 catalog, distributor accounts, and seasonal orders.
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 && (
                <div className="py-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-3 pb-1.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-cyan-400" /> Products & Styles ({filteredProducts.length})
                  </div>
                  {filteredProducts.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-800/70 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.heroImage} 
                          alt={p.name} 
                          className="w-9 h-9 object-cover rounded bg-neutral-800 border border-neutral-700/50" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {p.name}
                          </div>
                          <div className="text-xs text-neutral-400">
                            Style: {p.styleNumber} · {p.category} · ₹{p.wholesalePrice.toLocaleString()} W/S
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {filteredDistributors.length > 0 && (
                <div className="py-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-3 pb-1.5 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-amber-400" /> Distributors ({filteredDistributors.length})
                  </div>
                  {filteredDistributors.map(d => (
                    <button
                      key={d.id}
                      onClick={() => handleSelectDistributor(d)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-800/70 text-left transition-colors group"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {d.name}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {d.city} ({d.region}) · Target: ₹{(d.seasonalTarget / 100000).toFixed(1)}L · {d.buyStatus}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {filteredOrders.length > 0 && (
                <div className="py-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-3 pb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" /> Seasonal Orders ({filteredOrders.length})
                  </div>
                  {filteredOrders.map(o => (
                    <button
                      key={o.id}
                      onClick={handleSelectOrder}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-800/70 text-left transition-colors group"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {o.orderNumber} · {o.distributorName}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {o.submittedAt} · ₹{(o.totalValue / 100000).toFixed(1)}L · {o.status}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && filteredDistributors.length === 0 && filteredOrders.length === 0 && (
                <div className="py-8 text-center text-neutral-400 text-xs">
                  No matching items found for "{query}". Try checking style numbers or categories.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
