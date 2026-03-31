import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/domain/ProductCard';
import { ProductModal } from '../components/domain/ProductModal';
import { type Product } from '../types';

const CATEGORIES = ['Kaikki', 'Kodinkoneet', 'Huonekalut', 'Vaatteet', 'Kirjat', 'Työkalut'];

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Moccamaster KB 741',
    categoryEmoji: '☕',
    bgGradient: 'linear-gradient(145deg, #fff8f2, #ffe0c0)',
    status: 'repair',
    description: 'Vastus poikki — kahvi ei kuumene. Virtajohto viallinen.',
    location: 'Helsinki, Kallio',
    time: '2 t sitten',
    images: [
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    title: 'IKEA EKTORP -sohva',
    categoryEmoji: '🛋️',
    bgGradient: 'linear-gradient(145deg, #f0f5ff, #d5e6ff)',
    status: 'donate',
    description: '3-istuttava · beige · Pieni tahra vasemmalla istuimella.',
    location: 'Espoo, Tapiola',
    time: '5 t sitten'
  },
  {
    id: '3',
    title: 'Naisten polkupyörä 26"',
    categoryEmoji: '🚲',
    bgGradient: 'linear-gradient(145deg, #f0fff4, #c6f0d4)',
    status: 'repair',
    description: 'Takajarru ei toimi kunnolla. Ketju vaatii voitelun.',
    location: 'Vantaa, Tikkurila',
    time: '1 pv sitten'
  },
  {
    id: '4',
    title: 'Akustinen kitara Yamaha',
    categoryEmoji: '🎸',
    bgGradient: 'linear-gradient(145deg, #f3e5f5, #e1c4f5)',
    status: 'sell',
    price: '45 €',
    description: 'Pintanaarmuja kaulassa. Yksi kiristysnuppi löysällä.',
    location: 'Tampere, Keskusta',
    time: '4 t sitten'
  },
  {
    id: '5',
    title: 'Vintage-lattiavalaisin',
    categoryEmoji: '🪔',
    bgGradient: 'linear-gradient(145deg, #fffde7, #fff9c4)',
    status: 'sell',
    price: '28 €',
    description: '1970-luku · messinki · toimii täydellisesti.',
    location: 'Turku, Läntinen',
    time: '6 t sitten'
  },
  {
    id: '6',
    title: 'Monstera-kasvi (iso)',
    categoryEmoji: '🪴',
    bgGradient: 'linear-gradient(145deg, #e8f5e9, #c8e6c9)',
    status: 'donate',
    description: 'Iso · istutettu 2022 · terve ja hyvinvoiva.',
    location: 'Helsinki, Töölö',
    time: '3 t sitten'
  }
];

export const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Kaikki');
  const [showBanner, setShowBanner] = useState(false);

  // Логика появления баннера через 1.8с (как в твоем HTML)
  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 relative pb-10">
      
      {/* ── HERO ── */}
      <section className="bg-white rounded-xl py-12 px-10 mb-8 shadow-sm border border-border text-center relative overflow-hidden">
        <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[radial-gradient(ellipse,rgba(52,199,89,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-green-light text-green-dark px-3.5 py-1.5 rounded-pill text-[12px] font-bold tracking-wide mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.5c-.19.31.27.73.54.43C5.07 18.5 7.34 17 9 17c1.66 0 2.99 1.5 5 1.5 4 0 7-3.5 7-7 0-.47-.09-.92-.22-1.35C19.48 9.37 18.34 8 17 8z"/>
            </svg>
            Annetaan tavaroille uusi elämä
          </div>
          
          <h1 className="text-[38px] font-extrabold text-text-1 mb-2 tracking-tight leading-tight">
            Mitä haluat <em className="not-italic text-green">pelastaa</em>?
          </h1>
          <p className="text-[15.5px] text-text-3 font-medium mb-7">
            Löydä korjattavaa, lahjoitettavaa ja myytävää läheltäsi.
          </p>
          
          <div className="relative max-w-[540px] mx-auto">
            <svg className="absolute left-[18px] top-1/2 -translate-y-1/2 text-text-4 w-[18px] h-[18px] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Mitä haluat pelastaa?" 
              className="w-full h-[52px] bg-fill-1 border-[1.5px] border-transparent rounded-pill pl-[50px] pr-[56px] text-[15.5px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.15)]"
            />
            <button className="absolute right-[6px] top-1/2 -translate-y-1/2 w-10 h-10 bg-green text-white rounded-pill flex items-center justify-center hover:bg-[#2fb350] hover:scale-105 transition-all shadow-[0_2px_8px_rgba(52,199,89,0.22)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <div className="flex items-center gap-2 mb-7 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat, i) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-pill text-[13.5px] font-semibold border-[1.5px] whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-green border-green text-white shadow-[0_2px_10px_rgba(52,199,89,0.22)]' 
                : 'bg-white border-border text-text-2 hover:border-green hover:text-green hover:-translate-y-[1px] hover:shadow-sm'
            }`}
          >
            {i === 0 && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* ── GRID ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-extrabold tracking-tight text-text-1">Uusimmat ilmoitukset</h2>
          <button className="text-[14px] font-semibold text-green hover:opacity-75 transition-opacity">
            Näytä kaikki →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {DUMMY_PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)} 
            />
          ))}
        </div>
        
        <div className="text-center pt-8">
          <button className="inline-flex items-center gap-1.5 px-7 py-3 bg-white border-[1.5px] border-border rounded-pill text-[14px] font-semibold text-text-2 hover:border-green hover:text-green hover:-translate-y-[1px] transition-all shadow-xs">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            Lataa lisää
          </button>
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        isOpen={selectedProduct !== null} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* ── GUEST BANNER ── */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-border/50 py-4 px-6 md:px-10 z-[90] transition-transform duration-500 ease-[cubic-bezier(0.32,1.1,0.64,1)] shadow-[0_-4px_32px_rgba(0,0,0,0.08)] ${
          showBanner ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-[42px] h-[42px] bg-green-light rounded-xl flex items-center justify-center text-[20px] shrink-0">🌿</div>
            <div>
              <div className="text-[15px] font-bold text-text-1 mb-0.5">Liity EcoShare-yhteisöön</div>
              <div className="text-[13px] font-medium text-text-3">Rekisteröidy ilmaiseksi ja aloita tavaroiden pelastaminen tänään.</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <Link to="/login" className="px-5 py-2.5 bg-fill-1 text-text-2 hover:bg-fill-2 rounded-pill text-[14px] font-bold transition-colors">Kirjaudu</Link>
            <Link to="/register" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-green text-white hover:bg-[#2fb350] rounded-pill text-[14px] font-bold shadow-[0_2px_10px_rgba(52,199,89,0.3)] hover:-translate-y-[1px] transition-all">Rekisteröidy ilmaiseksi</Link>
            <button 
              onClick={() => setShowBanner(false)} 
              className="w-8 h-8 rounded-full bg-fill-1 hover:bg-fill-2 flex items-center justify-center text-text-3 transition-colors shrink-0 ml-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};