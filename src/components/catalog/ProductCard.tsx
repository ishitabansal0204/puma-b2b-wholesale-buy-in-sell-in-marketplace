import React from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product } from '../../types';
import { Plus, Check, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (prod: Product) => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onOpenDetail, 
  onOpenSizeCurve 
}) => {
  const { myBuyItems } = useWholesale();

  const buyItem = myBuyItems.find(i => i.productId === product.id);
  const selectedUnits = buyItem?.totalUnits || 0;

  const getStatusBadge = () => {
    switch (product.status) {
      case 'Available':
        return <span className="text-emerald-400 font-medium">● Available</span>;
      case 'Limited':
        return <span className="text-amber-400 font-medium">● Limited Stock</span>;
      case 'Low':
        return <span className="text-orange-400 font-medium">● Critical Low</span>;
      case 'Unavailable':
        return <span className="text-rose-500 font-medium">✕ Sold Out</span>;
      default:
        return null;
    }
  };

  return (
    <div className="group bg-neutral-900 border border-neutral-800/90 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between shadow-sm">
      {/* Top Image Container (65-70% visual height) */}
      <div 
        onClick={() => onOpenDetail(product)} 
        className="relative aspect-[4/3] bg-neutral-950 overflow-hidden cursor-pointer"
      >
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isNewForSeason && (
            <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded tracking-wider shadow">
              SS27
            </span>
          )}
          {product.isStrategicPriority && (
            <span className="bg-cyan-500/90 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded tracking-wider shadow backdrop-blur-xs">
              PRIORITY
            </span>
          )}
        </div>

        {/* In Buy Indicator */}
        {selectedUnits > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-neutral-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
            <Check className="w-3.5 h-3.5" />
            <span>{selectedUnits} in Buy</span>
          </div>
        )}

        {/* Hover Quick Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenSizeCurve(product);
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-transform scale-95 group-hover:scale-100 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Configure Size Curve
          </button>
        </div>
      </div>

      {/* Metadata & Pricing Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>{product.styleNumber}</span>
            <span>{product.category} · {product.gender}</span>
          </div>
          <h3 
            onClick={() => onOpenDetail(product)}
            className="text-sm font-bold text-white tracking-tight mt-1 hover:text-cyan-400 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>
          <div className="text-xs text-neutral-400 truncate mt-0.5">
            {product.colorway}
          </div>
        </div>

        {/* Commercial Grid */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Wholesale Price</div>
            <div className="text-base font-extrabold text-white font-mono tabular-nums">
              ₹{product.wholesalePrice.toLocaleString()}
            </div>
            <div className="text-[11px] text-neutral-400 font-mono">
              MSRP: ₹{product.msrp.toLocaleString()} ({product.marginPercent}% margin)
            </div>
          </div>

          <div className="text-right text-[11px]">
            <div className="text-neutral-400 flex items-center justify-end gap-1 font-mono">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>{product.deliveryWindow}</span>
            </div>
            <div className="mt-1 font-mono text-[11px]">
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
