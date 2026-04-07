import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../types';
import { ProductCard } from '../components/domain/ProductCard';

type TabType = 'listings' | 'favorites';

export const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [activeTab, setActiveTab] = useState<TabType>('listings');
  const [userListings, setUserListings] = useState<Product[]>([]);
  const [favoriteListings, setFavoriteListings] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserListings = useCallback(async () => {
    setIsLoading(true); // Перенесли сюда
    try {
      const res = await fetch(`http://localhost:5000/api/products/user/${currentUser.id}`);
      if (res.ok) setUserListings(await res.json());
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  }, [currentUser.id]);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true); // И сюда
    try {
      const res = await fetch(`http://localhost:5000/api/favorites/${currentUser.id}`);
      if (res.ok) setFavoriteListings(await res.json());
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  }, [currentUser.id]);

  useEffect(() => {
    if (!currentUser.id) {
      navigate('/login');
      return;
    }
    
    if (activeTab === 'listings') {
      fetchUserListings();
    } else {
      fetchFavorites();
    }
  }, [activeTab, currentUser.id, navigate, fetchUserListings, fetchFavorites]);

  // Остальной код (handleDelete, handleAvatarChange, return) оставляем как был
  // ...
  
  const handleDelete = async (id: number | string) => {
    if (!window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setUserListings(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    try {
      const res = await fetch(`http://localhost:5000/api/users/avatar/${currentUser.id}`, { method: 'POST', body: formData });
      if (res.ok) {
        const { avatarUrl } = await res.json();
        const updatedUser = { ...currentUser, avatar_url: avatarUrl };
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!currentUser.id) return null;

  return (
    <div className="max-w-[1000px] mx-auto pb-10 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-border p-8 mb-8 shadow-sm flex items-center gap-6 relative">
        <button onClick={handleLogout} className="absolute top-4 right-4 text-[13px] font-bold text-red hover:bg-red-light/20 px-3 py-1.5 rounded-lg">Kirjaudu ulos</button>
        <div onClick={() => fileInputRef.current?.click()} className="group relative w-24 h-24 bg-green-light rounded-full border-4 border-white shadow-md cursor-pointer overflow-hidden shrink-0">
          {currentUser.avatar_url ? <img src={`http://localhost:5000${currentUser.avatar_url}`} className="w-full h-full object-cover" /> : <span className="flex h-full items-center justify-center text-4xl">👤</span>}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold uppercase">Vaihda</div>
        </div>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
        <div>
          <h1 className="text-2xl font-black text-text-1">{currentUser.firstname} {currentUser.lastname}</h1>
          <p className="text-text-3 font-medium">@{currentUser.username}</p>
        </div>
      </div>

      <div className="flex border-b border-border mb-8 gap-8">
        <button onClick={() => setActiveTab('listings')} className={`pb-4 text-[15px] font-bold relative ${activeTab === 'listings' ? 'text-green' : 'text-text-3'}`}>
          Omat ilmoitukset ({userListings.length})
          {activeTab === 'listings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green rounded-t-full" />}
        </button>
        <button onClick={() => setActiveTab('favorites')} className={`pb-4 text-[15px] font-bold relative ${activeTab === 'favorites' ? 'text-green' : 'text-text-3'}`}>
          Suosikit ({favoriteListings.length})
          {activeTab === 'favorites' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green rounded-t-full" />}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10 font-medium text-text-3">Ladataan...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(activeTab === 'listings' ? userListings : favoriteListings).map(item => (
            <div key={item.id} className="relative group">
              <ProductCard 
                product={item} 
                onClick={() => {}} 
                showFavorite={activeTab === 'favorites'} 
              />
              {activeTab === 'listings' && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button className="w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-fill-1">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-red">🗑️</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};