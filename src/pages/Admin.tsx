import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  is_admin: number;
  is_master?: number;
}

interface AdminProduct {
  id: number;
  title: string;
  category: string;
  status: string;
  user_id: number;
}

export const Admin = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (currentUser.is_admin !== 1) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch('https://ecoshare-backend.onrender.com/api/admin/users'), // Замени на свой API если нужно
          fetch('https://ecoshare-backend.onrender.com/api/products')
        ]);
        
        if (usersRes.ok) setUsers(await usersRes.json());
        if (productsRes.ok) setProducts(await productsRes.json());
      } catch (error) {
        console.error('Virhe tietojen latauksessa:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleMaster = async (id: number, currentStatus: number | undefined) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const res = await fetch(`https://ecoshare-backend.onrender.com/api/admin/users/${id}/master`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_master: newStatus })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, is_master: newStatus } : u));
      }
    } catch (err) {
      console.error('Virhe roolin vaihdossa', err);
    }
  };

  const editProductTitle = async (id: number, currentTitle: string) => {
    const newTitle = window.prompt('Syötä uusi otsikko:', currentTitle);
    if (!newTitle || newTitle === currentTitle) return; // Если отменили или не изменили

    try {
      const res = await fetch(`https://ecoshare-backend.onrender.com/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, title: newTitle } : p));
      }
    } catch (err) {
      console.error('Virhe muokkauksessa', err);
    }
  };


  const deleteUser = async (id: number) => {
    if (!window.confirm('Haluatko varmasti poistaa tämän käyttäjän?')) return;
    try {
      await fetch(`https://ecoshare-backend.onrender.com/api/admin/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) { console.error(err); }
  };


  const deleteProduct = async (id: number) => {
    if (!window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')) return;
    try {
      await fetch(`https://ecoshare-backend.onrender.com/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) { console.error(err); }
  };

  if (isLoading) return <div className="text-center p-10">Ladataan hallintapaneelia...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-text-1">Hallintapaneeli</h1>
        <div className="bg-orange/10 text-orange px-4 py-2 rounded-lg font-bold text-sm border border-orange/20">
          Admin-tila
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2.5 rounded-pill font-bold transition-all ${activeTab === 'users' ? 'bg-green text-white shadow-md' : 'bg-fill-1 text-text-2 hover:bg-fill-2'}`}
        >
          Käyttäjät ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2.5 rounded-pill font-bold transition-all ${activeTab === 'products' ? 'bg-green text-white shadow-md' : 'bg-fill-1 text-text-2 hover:bg-fill-2'}`}
        >
          Ilmoitukset ({products.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-fill-1 border-b border-border text-text-2 text-sm">
                <th className="p-4 font-bold">Nimi</th>
                <th className="p-4 font-bold">Sähköposti</th>
                <th className="p-4 font-bold">Rooli</th>
                <th className="p-4 font-bold text-right">Toiminnot</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-fill-1/50">
                  <td className="p-4 font-semibold text-text-1">{u.firstname} {u.lastname}</td>
                  <td className="p-4 text-text-3">{u.email}</td>
                  <td className="p-4">
                    {u.is_admin === 1 ? (
                      <span className="bg-blue/10 text-blue px-2 py-1 rounded text-xs font-bold">Admin</span>
                    ) : u.is_master === 1 ? (
                      <span className="bg-orange/10 text-orange px-2 py-1 rounded text-xs font-bold uppercase">🛠️ Master</span>
                    ) : (
                      <span className="bg-fill-2 text-text-3 px-2 py-1 rounded text-xs font-bold">Käyttäjä</span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    {u.is_admin !== 1 && (
                      <button 
                        onClick={() => toggleMaster(u.id, u.is_master)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${u.is_master === 1 ? 'bg-orange/10 text-orange hover:bg-orange/20' : 'bg-green/10 text-green hover:bg-green/20'}`}
                      >
                        {u.is_master === 1 ? 'Poista Master' : 'Tee Master'}
                      </button>
                    )}
                    <button 
                      onClick={() => deleteUser(u.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-bold bg-[#ffebee] text-[#d32f2f] hover:bg-[#ffcdd2]"
                    >
                      Poista
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-fill-1 border-b border-border text-text-2 text-sm">
                <th className="p-4 font-bold">Otsikko</th>
                <th className="p-4 font-bold">Kategoria</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Toiminnot</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-fill-1/50">
                  <td className="p-4 font-semibold text-text-1 line-clamp-1">{p.title}</td>
                  <td className="p-4 text-text-3">{p.category}</td>
                  <td className="p-4">
                    <span className="bg-fill-2 text-text-3 px-2 py-1 rounded text-xs font-bold uppercase">{p.status}</span>
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    <button 
                      onClick={() => editProductTitle(p.id, p.title)}
                      className="px-3 py-1.5 rounded-md text-xs font-bold bg-blue/10 text-blue hover:bg-blue/20"
                    >
                      Muokkaa
                    </button>
                    <button 
                      onClick={() => deleteProduct(p.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-bold bg-[#ffebee] text-[#d32f2f] hover:bg-[#ffcdd2]"
                    >
                      Poista
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};