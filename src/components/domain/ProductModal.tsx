import { useState, useEffect } from 'react';
import { type Product } from '../../types';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-bg w-full max-w-[540px] rounded-[24px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-20 font-bold backdrop-blur-md"
        >
          ✕
        </button>

        {product.images && product.images.length > 0 ? (
          <div className="w-full h-[320px] relative group bg-fill-2">
            <img 
              src={product.images[currentImageIndex]} 
              className="w-full h-full object-cover" 
              alt={product.title} 
            />
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-sm hover:bg-white text-text-1"
                >
                  ❮
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-sm hover:bg-white text-text-1"
                >
                  ❯
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-3 py-1.5 rounded-pill backdrop-blur-sm">
                  {product.images.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-4 bg-white' : 'w-2 bg-white/50'}`} 
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            className="h-[240px] w-full flex items-center justify-center text-[80px]"
            style={{ background: product.bgGradient }}
          >
            <span className="drop-shadow-lg">{product.categoryEmoji}</span>
          </div>
        )}

        <div className="p-7">
          <h2 className="text-[28px] font-extrabold text-text-1 mb-2 tracking-tight leading-tight">{product.title}</h2>
          <p className="text-[15.5px] text-text-3 mb-6 leading-relaxed">
            {product.description}
          </p>

          {product.status === 'repair' && (
            <div className="bg-fill-1 rounded-xl p-5 mb-6">
              <div className="font-bold text-[15px] text-text-1 mb-3">Vian tiedot</div>
              <div className="border-t border-border pt-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[14.5px] text-text-2 font-medium">
                  <span className="text-red text-lg">⚠️</span> Vastus luultavasti poikki
                </div>
                <div className="flex items-center gap-2.5 text-[14.5px] text-text-2 font-medium">
                  <span className="text-orange text-lg">⚠️</span> Kalkinpoisto tekemättä
                </div>
              </div>
            </div>
          )}

          <button className="w-full bg-green text-white font-bold text-[16px] py-4 rounded-xl shadow-sm hover:bg-green-dark transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
            Ota yhteyttä (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
};