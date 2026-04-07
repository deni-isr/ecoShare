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
    setCurrentImageIndex(0);
  }, [product]);

  if (!isOpen || !product) return null;

  let imageUrls: string[] = [];
  if (product.images) {
    try {
      const parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        imageUrls = parsedImages.map(img => `http://localhost:5000${img}`);
      }
    } catch (e) {
      console.error('Kuvan lukeminen epäonnistui', e);
    }
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const getCategoryStyles = (category?: string) => {
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

  const visual = getCategoryStyles(product.category);

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return product.time || 'Nyt';
    return new Date(dateString).toLocaleDateString('fi-FI');
  };

  const cleanPhone = product.contact_phone?.replace(/\s+/g, '') || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="bg-bg w-full max-w-[760px] rounded-[24px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between px-8 pt-6 pb-4 shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-[12px] font-extrabold uppercase tracking-wide ${getBadgeStyles()}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`}></span>
            {getStatusText()}
          </span>
          <button 
            onClick={onClose} 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-fill-1 text-text-2 hover:bg-text-1 hover:text-white transition-colors z-20 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-8 pb-8 custom-scrollbar">
          
          <div 
            className="h-[360px] w-full rounded-2xl flex items-center justify-center text-[80px] mb-3 shadow-sm relative overflow-hidden bg-fill-1 border border-border group" 
            style={imageUrls.length === 0 ? { background: visual.bg } : {}}
          >
            {imageUrls.length > 0 ? (
              <>
                <img 
                  src={imageUrls[currentImageIndex]} 
                  alt={`${product.title} - kuva ${currentImageIndex + 1}`} 
                  className="w-full h-full object-contain bg-black/5 backdrop-blur-xl transition-opacity duration-300" 
                />
                
                {imageUrls.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-text-1 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-105"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-text-1 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-105"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[12px] font-bold px-2 py-1 rounded-lg backdrop-blur-md">
                      {currentImageIndex + 1} / {imageUrls.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <span className="drop-shadow-lg">{visual.emoji}</span>
            )}
          </div>

          {imageUrls.length > 1 && (
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
              {imageUrls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-[70px] h-[70px] shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    currentImageIndex === idx ? 'border-green scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {imageUrls.length <= 1 && <div className="mb-6"></div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-[28px] font-extrabold text-text-1 mb-4 tracking-tight leading-tight">
                {product.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-5 text-[14px] font-semibold text-text-3">
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-[16px] h-[16px]"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {product.location ? product.location.split(',')[0] : 'Sijainti puuttuu'}
                </div>
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[16px] h-[16px]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {formatDate(product.created_at)}
                </div>
              </div>

              <div className="h-[1px] w-full bg-border mb-6"></div>

              <div>
                <div className="font-bold text-[16px] text-text-1 mb-3">Kuvaus & Tiedot</div>
                <p className="text-[15px] text-text-2 leading-relaxed whitespace-pre-wrap bg-fill-1 p-5 rounded-xl border border-border">
                  {product.description}
                </p>
                {product.item_condition && (
                    <div className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-text-2 bg-fill-1 px-4 py-2 rounded-lg border border-border">
                      <span className="text-text-4">Kunto:</span> {product.item_condition}
                    </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white border-2 border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div className="text-[13px] font-bold text-text-3 uppercase tracking-wider">Hinta</div>
                {product.status === 'sell' && product.price ? (
                  <div className="text-[22px] font-black text-text-1">
                    {product.price} <span className="text-[18px] text-text-3">€</span>
                  </div>
                ) : (
                  <div className="text-[18px] font-extrabold text-green">
                    {product.status === 'donate' ? 'Ilmainen' : 'Neuvoteltavissa'}
                  </div>
                )}
              </div>

              <a 
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (!cleanPhone) {
                    e.preventDefault();
                    alert('Myyjä ei ole lisännyt puhelinnumeroa.');
                  }
                }}
                className="w-full bg-green text-white font-bold text-[15px] py-3.5 rounded-xl shadow-[0_4px_16px_rgba(52,199,89,0.3)] hover:bg-[#2fb350] hover:-translate-y-0.5 active:translate-y-0 transition-all flex flex-col items-center justify-center gap-1 mt-auto"
              >
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="white" className="w-[20px] h-[20px]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.545 5.875L.057 23.869l6.186-1.481A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-5.025-1.384l-.36-.214-3.724.892.934-3.618-.235-.372A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  <span>WhatsApp</span>
                </div>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};