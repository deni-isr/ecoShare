import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../types';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  is_admin: number;
}

export const Admin = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<'users' | 'products'>('users');

  useEffect(() => {
    if (currentUser.is_admin !== 1) { navigate('/'); return; }
    fetch('https://ecoshare-backend.onrender.com/api/admin/users').then(r => r.json()).then(setUsers);
    fetch('https://ecoshare-backend.onrender.com/api/products').then(r => r.json()).then(setProducts);
  }, []);

  const deleteUser = async (id: number) => {
    if (confirm('Poistetaanko käyttäjä?')) {
      await fetch(`https://ecoshare-backend.onrender.com/api/admin/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const deleteProduct = async (id: number | string) => {
    if (confirm('Poistetaanko ilmoitus?')) {
      await fetch(`https://ecoshare-backend.onrender.com/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 pb-20 animate-in fade-in duration-300">
      <h1 className="text-2xl md:text-3xl font-black mb-6 text-text-1">Ylläpito</h1>
      
      {/* Адаптивные вкладки: на телефоне они занимают всю ширину (flex-1) */}
      <div className="flex gap-2 md:gap-4 mb-6">
        <button 
          onClick={() => setTab('users')} 
          className={`flex-1 md:flex-none px-3 py-2.5 md:px-4 md:py-2 rounded-lg font-bold text-[14px] md:text-[16px] transition-all ${tab === 'users' ? 'bg-green text-white shadow-md' : 'bg-fill-2 text-text-2 hover:bg-fill-1'}`}
        >
          Käyttäjät
        </button>
        <button 
          onClick={() => setTab('products')} 
          className={`flex-1 md:flex-none px-3 py-2.5 md:px-4 md:py-2 rounded-lg font-bold text-[14px] md:text-[16px] transition-all ${tab === 'products' ? 'bg-green text-white shadow-md' : 'bg-fill-2 text-text-2 hover:bg-fill-1'}`}
        >
          Ilmoitukset
        </button>
      </div>

      {/* Обертка для таблицы с overflow-x-auto для горизонтального свайпа на телефонах */}
      <div className="bg-white border border-border rounded-xl overflow-x-auto shadow-sm">
        {tab === 'users' ? (
          <table className="w-full text-left min-w-[500px]">
            <thead className="bg-fill-1">
              <tr>
                <th className="p-3 md:p-4 text-[13px] md:text-[14px] text-text-2 uppercase">Nimi</th>
                <th className="p-3 md:p-4 text-[13px] md:text-[14px] text-text-2 uppercase">Email</th>
                <th className="p-3 md:p-4 text-[13px] md:text-[14px] text-text-2 uppercase text-right">Toiminto</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-border hover:bg-fill-1/30 transition-colors">
                  <td className="p-3 md:p-4 font-bold text-[14px] md:text-[15px] text-text-1">{u.firstname} {u.lastname}</td>
                  <td className="p-3 md:p-4 text-[14px] md:text-[15px] text-text-2">{u.email}</td>
                  <td className="p-3 md:p-4 text-right">
                    {u.is_admin !== 1 && (
                      <button 
                        onClick={() => deleteUser(u.id)} 
                        className="text-red font-bold text-[13px] md:text-[14px] bg-red/10 px-3 py-1.5 rounded-md hover:bg-red hover:text-white transition-colors"
                      >
                        Poista
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left min-w-[500px]">
            <thead className="bg-fill-1">
              <tr>
                <th className="p-3 md:p-4 text-[13px] md:text-[14px] text-text-2 uppercase">Otsikko</th>
                <th className="p-3 md:p-4 text-[13px] md:text-[14px] text-text-2 uppercase">Kategoria</th>
                <th className="p-3 md:p-4 text-[13px] md:text-[14px] text-text-2 uppercase text-right">Toiminto</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-border hover:bg-fill-1/30 transition-colors">
                  <td className="p-3 md:p-4 font-bold text-[14px] md:text-[15px] text-text-1 max-w-[150px] md:max-w-[300px] truncate">
                    {p.title}
                  </td>
                  <td className="p-3 md:p-4 text-[14px] md:text-[15px] text-text-2">{p.category}</td>
                  <td className="p-3 md:p-4 text-right">
                    <button 
                      onClick={() => deleteProduct(p.id)} 
                      className="text-red font-bold text-[13px] md:text-[14px] bg-red/10 px-3 py-1.5 rounded-md hover:bg-red hover:text-white transition-colors"
                    >
                      Poista
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};