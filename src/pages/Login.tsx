import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kirjautuminen epäonnistui');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
      
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Tuntematon virhe tapahtui');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-10 animate-in fade-in duration-300">
      <div className="bg-white rounded-[22px] border border-border shadow-md w-full max-w-[420px] p-10">
        
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center shadow-[0_3px_10px_rgba(52,199,89,0.3)]">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.5c-.19.31.27.73.54.43C5.07 18.5 7.34 17 9 17c1.66 0 2.99 1.5 5 1.5 4 0 7-3.5 7-7 0-.47-.09-.92-.22-1.35C19.48 9.37 18.34 8 17 8z"/>
            </svg>
          </div>
          <span className="text-[19px] font-extrabold tracking-tight text-text-1">EcoShare</span>
        </div>

        <div className="mb-6">
          <h1 className="text-[22px] font-extrabold text-text-1 mb-1 tracking-tight">Tervetuloa takaisin</h1>
          <p className="text-[14px] font-medium text-text-3">Kirjaudu sisään jatkaaksesi.</p>
        </div>

        {successMessage && (
          <div className="bg-green-light text-green-dark px-4 py-3 rounded-lg text-[14px] font-bold mb-6 flex items-center gap-2 border border-green/20">
            ✅ {successMessage}
          </div>
        )}

        {errorMsg && (
          <div className="bg-[#ffebee] text-[#c62828] px-4 py-3 rounded-lg text-[14px] font-bold mb-6 flex items-center gap-2">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-text-2">Sähköpostiosoite</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="mikko@esimerkki.fi"
              className="w-full h-[50px] bg-fill-1 border-[1.5px] border-transparent rounded-lg px-4 text-[15px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)]"
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-text-2">Salasana</label>
              <a href="#" className="text-[12.5px] font-bold text-green hover:underline">Unohtuiko?</a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full h-[50px] bg-fill-1 border-[1.5px] border-transparent rounded-lg px-4 text-[15px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[52px] bg-text-1 text-white rounded-lg font-bold text-[16px] shadow-md hover:-translate-y-[2px] hover:bg-black hover:shadow-lg active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
          </button>
        </form>

        <div className="mt-6 text-center text-[14px] font-medium text-text-3">
          Eikö sinulla ole vielä tiliä?{' '}
          <Link to="/register" className="text-green font-bold hover:underline">
            Rekisteröidy ilmaiseksi
          </Link>
        </div>
        
      </div>
    </div>
  );
};