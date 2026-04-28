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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchUserListings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://ecoshare-backend.onrender.com/api/products/user/${currentUser.id}`);
      if (res.ok) setUserListings(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser.id]);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://ecoshare-backend.onrender.com/api/favorites/${currentUser.id}`);
      if (res.ok) setFavoriteListings(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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

  const handleDelete = async (id: number | string) => {
    if (!window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')) return;
    try {
      const response = await fetch(`https://ecoshare-backend.onrender.com/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setUserListings(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await fetch(`https://ecoshare-backend.onrender.com/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      if (response.ok) {
        setUserListings(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
        setEditingProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    try {
      const res = await fetch(`https://ecoshare-backend.onrender.com/api/users/avatar/${currentUser.id}`, { method: 'POST', body: formData });
      if (res.ok) {
        const { avatarUrl } = await res.json();
        const updatedUser = { ...currentUser, avatar_url: avatarUrl };
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser.id) return null;

  return (
    <div className="max-w-[1000px] mx-auto pb-10 px-4 animate-in fade-in duration-500 pt-8">
      <div className="bg-white rounded-2xl border border-border p-8 mb-8 shadow-sm flex items-center gap-6 relative">
        <button onClick={() => { localStorage.removeItem('user'); navigate('/'); }} className="absolute top-4 right-4 text-[13px] font-bold text-red hover:bg-red-light/20 px-3 py-1.5 rounded-lg">
          Kirjaudu ulos
        </button>
        <div onClick={() => fileInputRef.current?.click()} className="group relative w-24 h-24 bg-green-light rounded-full border-4 border-white shadow-md cursor-pointer overflow-hidden shrink-0">
          {currentUser.avatar_url ? <img src={`https://ecoshare-backend.onrender.com${currentUser.avatar_url}`} className="w-full h-full object-cover" /> : <span className="flex h-full items-center justify-center text-4xl">👤</span>}
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
                  <button onClick={() => setEditingProduct(item)} className="w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-fill-1">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-red hover:bg-red-light">🗑️</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95">
            <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-fill-2 rounded-full font-bold hover:bg-fill-3">✕</button>
            <h3 className="text-xl font-bold mb-4">Muokkaa ilmoitusta</h3>
            <form onSubmit={handleUpdateProduct} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-bold text-text-3 mb-1">Otsikko</label>
                <input type="text" value={editingProduct.title} onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})} className="w-full bg-fill-1 border border-border rounded-lg px-4 py-2 outline-none focus:border-green" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-text-3 mb-1">Kuvaus</label>
                <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-fill-1 border border-border rounded-lg px-4 py-2 h-24 resize-none outline-none focus:border-green" />
              </div>
              {editingProduct.status === 'sell' && (
                <div>
                  <label className="block text-[13px] font-bold text-text-3 mb-1">Hinta (€)</label>
                  <input type="number" value={editingProduct.price || ''} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-fill-1 border border-border rounded-lg px-4 py-2 outline-none focus:border-green" />
                </div>
              )}
              <button type="submit" className="w-full bg-green text-white font-bold py-3 rounded-xl mt-2 hover:bg-[#2fb350] transition-colors">Tallenna muutokset</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};