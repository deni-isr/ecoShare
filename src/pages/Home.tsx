import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/domain/ProductCard';
import { ProductModal } from '../components/domain/ProductModal';
import { type Product } from '../types';

const CATEGORIES = ['Kaikki', 'Kodinkoneet', 'Huonekalut', 'Urheilu', 'Vaatteet', 'Kirjat', 'Työkalut'];

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Kaikki');
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!currentUser.id) {
      const timer = setTimeout(() => setShowBanner(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [currentUser.id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Virhe haettaessa ilmoituksia:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
  const matchesCategory = activeCategory === 'Kaikki' || p.category === activeCategory;
  const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-500 relative pb-10">
      
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-extrabold tracking-tight text-text-1">
            {activeCategory === 'Kaikki' ? 'Uusimmat ilmoitukset' : `${activeCategory} (${filteredProducts.length})`}
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-text-3 font-medium">Ladataan ilmoituksia...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-text-1 mb-1">Ei ilmoituksia vielä</h3>
            <p className="text-text-3 text-sm">Tässä kategoriassa ei ole vielä yhtään ilmoitusta. Ole ensimmäinen!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)} 
              />
            ))}
          </div>
        )}
      </section>

      <ProductModal 
        product={selectedProduct} 
        isOpen={selectedProduct !== null} 
        onClose={() => setSelectedProduct(null)} 
      />

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