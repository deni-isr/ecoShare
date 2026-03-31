import { useState } from 'react';
import { ProductCard } from '../components/domain/ProductCard';
import { ProductModal } from '../components/domain/ProductModal';
import { type Product } from '../types';

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Moccamaster KBG982',
    categoryEmoji: '☕',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    status: 'repair',
    description: 'Ei lämmitä vettä kunnolla. Vastus luultavasti poikki. Muuten täysin siisti ja ehjä lasikannu mukaan.',
    location: 'Helsinki',
    time: '2 t sitten'
  },
  {
    id: '2',
    title: 'iPhone 13 Pro 128GB',
    categoryEmoji: '📱',
    bgGradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    status: 'sell',
    price: '150€',
    description: 'Näyttö säröillä ja FaceID ei toimi tiputuksen jälkeen. Akku 86%.',
    location: 'Espoo',
    time: '5 t sitten'
  },
  {
    id: '3',
    title: 'Ikea työtuoli',
    categoryEmoji: '🪑',
    bgGradient: 'linear-gradient(135deg, #e8f8ed 0%, #c8e6c9 100%)',
    status: 'donate',
    description: 'Kaasujousi vajoaa alas istuessa. Hae pois tilaa viemästä!',
    location: 'Vantaa',
    time: 'Eilen'
  }
];

export const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-white rounded-xl p-10 md:p-14 mb-8 shadow-sm border border-border text-center relative overflow-hidden">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-green-glow rounded-[100%] blur-[40px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-light text-[#1b5e20] rounded-pill text-xs font-extrabold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 bg-green rounded-full"></span>
            Beta-versio
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-1 mb-4 tracking-tight">
            Anna tavaroille <span className="text-green">uusi elämä.</span>
          </h1>
          <p className="text-text-3 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
            Suomen ensimmäinen kiertotalousalusta, joka yhdistää rikkinäiset tavarat ja osaavat korjaajat.
          </p>
          
          <div className="max-w-xl mx-auto flex gap-2">
            <input 
              type="text" 
              placeholder="Etsi tavaroita tai projekteja..." 
              className="flex-1 px-5 py-3.5 bg-fill-1 border border-border rounded-lg text-text-1 font-medium focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
            />
            <button className="bg-text-1 text-white px-6 py-3.5 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Etsi
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-1 tracking-tight">Uusimmat ilmoitukset</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {DUMMY_PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)} 
            />
          ))}
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        isOpen={selectedProduct !== null} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};