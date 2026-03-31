import { useState, useEffect } from 'react';
import { type Product } from '../../types';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isOpen) setShowDetails(false);
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-bg w-full max-w-md rounded-[24px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-text-1 hover:bg-black/20 transition-colors z-20 font-bold"
        >
          ✕
        </button>

        <div
          className="h-48 w-full flex items-center justify-center text-7xl"
          style={{ background: product.bgGradient }}
        >
          <span className="drop-shadow-lg">{product.categoryEmoji}</span>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-text-1 mb-2">{product.title}</h2>
          <p className="text-[15px] text-text-3 mb-6 leading-relaxed">
            {product.description}
          </p>

          {product.status === 'repair' && (
            <div className="bg-fill-1 rounded-xl p-4 mb-6">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => setShowDetails(!showDetails)}
              >
                <div className="font-bold text-[15px] text-text-1">Näytä vian tiedot</div>
                <div className={`w-12 h-7 rounded-full transition-colors duration-300 relative ${showDetails ? 'bg-green' : 'bg-fill-3'}`}>
                  <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${showDetails ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className={`overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-3 border-t border-border flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[14px] text-text-2 font-medium">
                    <span className="text-red">⚠️</span> Vastus luultavasti poikki
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-text-2 font-medium">
                    <span className="text-orange">⚠️</span> Kalkinpoisto tekemättä
                  </div>
                </div>
              </div>
            </div>
          )}

          <button className="w-full bg-green text-white font-bold text-[16px] py-3.5 rounded-xl shadow-sm hover:bg-green-dark transition-colors flex items-center justify-center gap-2">
            Ota yhteyttä (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
};