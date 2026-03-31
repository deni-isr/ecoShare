import { useState } from 'react';
import { type Product } from '../../types';

export interface Props {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const getBadgeStyles = () => {
    switch (product.status) {
      case 'repair': return 'bg-[#fff3e0] text-[#bf360c]';
      case 'donate': return 'bg-green-light text-[#1b5e20]';
      case 'sell': return 'bg-[#e3f2fd] text-[#0d47a1]';
      default: return 'bg-fill-2 text-text-2';
    }
  };

  const getDotColor = () => {
    switch (product.status) {
      case 'repair': return 'bg-[#e65100]';
      case 'donate': return 'bg-green';
      case 'sell': return 'bg-blue';
      default: return 'bg-text-3';
    }
  };

  const getStatusText = () => {
    switch (product.status) {
      case 'repair': return 'Kaipaa korjausta';
      case 'donate': return 'Lahjoitetaan';
      case 'sell': return 'Myydään';
      default: return '';
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Чтобы при лайке не открывалось окно товара
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-bg rounded-lg border border-border overflow-hidden cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col h-full group"
    >
      <div className="w-full h-[160px] flex items-center justify-center text-[56px] relative overflow-hidden" style={{ background: product.bgGradient }}>
        <span className="drop-shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">
          {product.categoryEmoji}
        </span>
        
        {/* Кнопка "В избранное" */}
        <button 
          onClick={handleLike}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 ${isLiked ? 'bg-[#ffebee]' : 'bg-white/85'}`}
        >
          <svg viewBox="0 0 24 24" fill={isLiked ? '#FF3B30' : 'none'} stroke={isLiked ? '#FF3B30' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {product.status === 'sell' && product.price && (
          <div className="absolute top-2.5 left-2.5 bg-[#0d47a1]/90 text-white rounded-pill px-2.5 py-1 text-[12px] font-extrabold tracking-tight backdrop-blur-md shadow-sm">
            {product.price}
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-[10px] font-extrabold uppercase tracking-wide ${getBadgeStyles()}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`}></span>
            {getStatusText()}
          </span>
        </div>
        <h3 className="text-[16px] font-bold text-text-1 mb-1 tracking-tight leading-tight">{product.title}</h3>
        <p className="text-[12.5px] font-medium text-text-3 mb-2.5 leading-relaxed line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-[12px] font-semibold text-text-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-[11px] h-[11px]">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {product.location.split(',')[0]}
          </div>
          {product.status === 'sell' && product.price ? (
             <span className="inline-flex items-center gap-1 bg-[#e3f2fd] text-[#0d47a1] rounded-pill px-2 py-0.5 text-[13px] font-extrabold">
               {product.price}
             </span>
          ) : (
            <span className="text-[11.5px] font-medium text-text-4">{product.time}</span>
          )}
        </div>
      </div>
    </div>
  );
};