import { useState } from 'react';
import { type Product } from '../../types';

/**
 * Пропсы для компонента карточки товара
 * @param product - объект товара из БД
 * @param onClick - функция при клике на саму карточку
 * @param showFavorite - показывать ли кнопку сердечка
 */
export interface Props {
  product: Product;
  onClick: () => void;
  showFavorite?: boolean;
}

export const ProductCard = ({ product, onClick, showFavorite = true }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  /**
   * Обработка клика по сердечку (Добавление в избранное)
   */
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (!currentUser.id) {
      alert("Kirjaudu sisään lisätäksesi suosikkeihin!");
      return;
    }

    try {
      const response = await fetch('https://ecoshare-backend.onrender.com/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          productId: product.id 
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isFavorite);
      }
    } catch (err) {
      console.error("Virhe suosikeissa:", err);
    }
  };

  /**
   * Обработка путей к изображениям
   */
  let imageUrl = null;
  if (product.images) {
    try {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (Array.isArray(parsed) && parsed.length > 0) {
        imageUrl = `https://ecoshare-backend.onrender.com${parsed[0]}`;
      }
    } catch {
      // Убрали переменную 'e', так как она не использовалась
      console.error("Kuvan jäsennysvirhe");
    }
  }

  const getCategoryTheme = (category?: string) => {
    switch(category) {
      case 'Kodinkoneet': return { emoji: '☕', bg: 'linear-gradient(145deg, #fff8f2, #ffe0c0)' };
      case 'Huonekalut':  return { emoji: '🛋️', bg: 'linear-gradient(145deg, #f0f5ff, #d5e6ff)' };
      case 'Urheilu':     return { emoji: '🚲', bg: 'linear-gradient(145deg, #f0fff4, #c6f0d4)' };
      case 'Vaatteet':    return { emoji: '👕', bg: 'linear-gradient(145deg, #fffde7, #fff9c4)' };
      case 'Kirjat':      return { emoji: '📚', bg: 'linear-gradient(145deg, #e8f5e9, #c8e6c9)' };
      case 'Työkalut':    return { emoji: '🔧', bg: 'linear-gradient(145deg, #f3e5f5, #e1c4f5)' };
      default:            return { emoji: '📦', bg: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)' };
    }
  };

  const theme = getCategoryTheme(product.category);

  const getStatusLabel = () => {
    switch (product.status) {
      case 'repair': return 'Kaipaa korjausta';
      case 'donate': return 'Lahjoitetaan';
      case 'sell': return 'Myydään';
      default: return '';
    }
  };

  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-xl border border-border overflow-hidden cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col h-full group"
    >
      <div className="w-full h-[180px] flex items-center justify-center text-[56px] relative overflow-hidden" style={{ background: theme.bg }}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <span className="transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
            {theme.emoji}
          </span>
        )}
        
        {showFavorite && (
          <button 
            onClick={handleLike}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm z-10 ${
              isLiked ? 'bg-[#ffebee] scale-110' : 'bg-white/90 hover:scale-110'
            }`}
          >
            <svg viewBox="0 0 24 24" fill={isLiked ? '#FF3B30' : 'none'} stroke={isLiked ? '#FF3B30' : '#666'} strokeWidth="2.5" className="w-[15px] h-[15px]">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
        )}

        {product.status === 'sell' && product.price && (
          <div className="absolute top-3 left-3 bg-[#0d47a1]/90 text-white rounded-pill px-2.5 py-1 text-[11px] font-black tracking-tight backdrop-blur-md z-10 shadow-sm">
            {product.price} €
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-fill-1 text-text-3 border border-border`}>
            {getStatusLabel()}
          </span>
        </div>
        
        <h3 className="text-[16px] font-bold text-text-1 mb-1 tracking-tight leading-tight line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-[13px] font-medium text-text-3 mb-3 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-border flex justify-between items-center text-[12px] font-bold text-text-4">
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {product.location ? product.location.split(',')[0] : 'Suomi'}
          </div>
          {product.status !== 'sell' && (
            <span className="text-green text-[11px] font-black uppercase tracking-tighter">
              {product.status === 'donate' ? 'ILMAINEN' : 'REPAIR'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};