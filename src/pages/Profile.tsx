import { type Product } from '../types';
import { ProductCard } from '../components/domain/ProductCard';

export const Profile = () => {
  const userListings: Product[] = [
    {
      id: '1',
      title: 'Moccamaster KBG982',
      categoryEmoji: '☕',
      bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
      status: 'repair',
      description: 'Vastus luultavasti poikki.',
      location: 'Helsinki',
      time: '2 t sitten',
      views: 124
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-xl border border-border p-8 mb-8 flex items-center gap-6 shadow-sm">
        <div className="w-24 h-24 bg-green-light rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-md">
          👤
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-text-1 tracking-tight">Random123</h1>
          <p className="text-text-3 font-medium mb-2">Liittynyt maaliskuussa 2026</p>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-text-1">1</div>
              <div className="text-[10px] uppercase font-extrabold text-text-4 tracking-widest">Ilmoitusta</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-text-1">4.8</div>
              <div className="text-[10px] uppercase font-extrabold text-text-4 tracking-widest">Arvio</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-text-1 mb-6">Omat ilmoitukset</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {userListings.map(item => (
          <ProductCard key={item.id} product={item} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};