import { type Product } from '../../types';

export interface Props {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: Props) => {
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

  return (
    <div 
      onClick={onClick}
      className="bg-bg rounded-lg border border-border overflow-hidden cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col h-full"
    >
      <div className="w-full h-40 flex items-center justify-center text-5xl relative" style={{ background: product.bgGradient }}>
        <span className="drop-shadow-md transition-transform duration-200 hover:scale-110 hover:-rotate-3">{product.categoryEmoji}</span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-[10px] font-extrabold uppercase tracking-wide ${getBadgeStyles()}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`}></span>
            {getStatusText()}
          </span>
        </div>
        <h3 className="text-base font-bold text-text-1 mb-1 tracking-tight leading-tight">{product.title}</h3>
        <p className="text-xs font-medium text-text-3 mb-3 leading-relaxed line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-text-3">📍 {product.location}</div>
          {product.status === 'sell' && product.price ? (
             <span className="inline-flex items-center gap-1 bg-[#e3f2fd] text-[#0d47a1] rounded-pill px-2.5 py-1 text-[13px] font-extrabold">{product.price}</span>
          ) : (
            <span className="text-[11.5px] font-medium text-text-4">{product.time}</span>
          )}
        </div>
      </div>
    </div>
  );
};