import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { Product } from '../../types';
import { X, ShoppingBag, Download, Share2, Layers, CheckCircle2 } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeCurve: (prod: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  onClose, 
  onOpenSizeCurve 
}) => {
  const { showToast } = useWholesale();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const images = [
    product.heroImage,
    product.heroImage, // simulated side/detail angles
    product.heroImage,
  ];

  const handleDownloadSheet = () => {
    showToast('Product Spec Sheet Generated', `PDF tech-pack for Style ${product.styleNumber} downloaded.`, 'info');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Direct assortment link copied to clipboard.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              Style ID: <strong className="text-white">{product.styleNumber}</strong>
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-medium">
              Season: <span className="text-red-500 font-semibold">SS27</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Share Style"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadSheet}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Download Product Spec Sheet"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Left Gallery + Right Commercial Specs */}
        <div className="flex-1 overflow-y-auto py-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Gallery & Story */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative group">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.isNewForSeason && (
                  <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    NEW SS27
                  </span>
                )}
                {product.isStrategicPriority && (
                  <span className="bg-cyan-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    STRATEGIC PRIORITY
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 gap-2">
              {['Lateral Angle', 'Medial View', 'Sole & Traction'].map((angle, idx) => (
                <button
                  key={angle}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`p-1 rounded-lg border text-left transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-red-500 bg-neutral-800/80 ring-1 ring-red-500/30' 
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <img
                    src={product.heroImage}
                    alt={angle}
                    className="w-full h-14 object-cover rounded"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] text-neutral-400 block text-center mt-1 truncate">
                    {angle}
                  </span>
                </button>
              ))}
            </div>

            {/* Product Story & Material */}
            <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Technology & Materials
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{product.story}</p>
              <div className="pt-2 text-[11px] text-neutral-500">
                <strong>Material Composition:</strong> {product.material}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.technology.map(tech => (
                  <span
                    key={tech}
                    className="text-[11px] bg-neutral-800/80 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700/50 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Commercial Information, Pricing & Size Status */}
          <div className="space-y-6">
            <div>
              <div className="text-xs text-neutral-400 font-mono">
                {product.franchise} · {product.category} · {product.gender}
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                {product.name}
              </h2>
              <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                <span>Colorway:</span>
                <span className="font-semibold text-neutral-200">{product.colorway}</span>
              </div>
            </div>

            {/* B2B Commercial Price Box */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Wholesale Price</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  ₹{product.wholesalePrice.toLocaleString()}
                </div>
              </div>
              <div className="border-x border-neutral-800">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Recommended MSRP</div>
                <div className="text-xl font-bold text-neutral-300 font-mono mt-0.5">
                  ₹{product.msrp.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Retail Margin</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                  {product.marginPercent}%
                </div>
              </div>
            </div>

            {/* Commercial Parameters */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-900/50 p-3.5 rounded-xl border border-neutral-800">
              <div>
                <span className="text-neutral-400">Minimum Order (MOQ):</span>
                <span className="font-mono font-bold text-white ml-1.5">{product.moq} units</span>
              </div>
              <div>
                <span className="text-neutral-400">Delivery Window:</span>
                <span className="font-mono font-bold text-cyan-400 ml-1.5">{product.deliveryWindow}</span>
              </div>
              <div>
                <span className="text-neutral-400">Factory Allocation:</span>
                <span className="font-mono font-bold text-white ml-1.5">{product.totalAvailable.toLocaleString()} units</span>
              </div>
              <div>
                <span className="text-neutral-400">Current Reserved:</span>
                <span className="font-mono font-bold text-amber-400 ml-1.5">
                  {product.reservedUnits.toLocaleString()} units ({Math.round((product.reservedUnits / product.totalAvailable) * 100)}%)
                </span>
              </div>
            </div>

            {/* Size Level Availability Matrix */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                <span>Size-Level Inventory Allocation</span>
                <span className="text-[11px] text-neutral-400 font-mono">PUMA SS27 Global Central Stock</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.sizeCurve.map(sc => {
                  let badgeColor = 'bg-emerald-950/60 border-emerald-800 text-emerald-400';
                  if (sc.status === 'Limited') badgeColor = 'bg-amber-950/60 border-amber-800 text-amber-400';
                  if (sc.status === 'Low') badgeColor = 'bg-orange-950/60 border-orange-800 text-orange-400';
                  if (sc.status === 'Unavailable') badgeColor = 'bg-neutral-900/80 border-neutral-800 text-neutral-600 line-through';

                  return (
                    <div
                      key={sc.size}
                      className={`p-2.5 rounded-lg border text-center ${badgeColor}`}
                    >
                      <div className="font-mono font-bold text-xs">{sc.size}</div>
                      <div className="text-[10px] mt-0.5 truncate">{sc.status}</div>
                      <div className="text-[10px] font-mono opacity-80 mt-0.5">
                        {sc.status === 'Unavailable' ? '0' : sc.allocatedRemaining}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenSizeCurve(product);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-tight transition-all shadow-lg shadow-red-600/25"
              >
                <ShoppingBag className="w-4 h-4" />
                Configure Size Curve & Add to Buy
              </button>
              <p className="text-[11px] text-neutral-400 text-center mt-2">
                Adds directly into your SS27 draft assortment with MOQ & size curve distribution checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
