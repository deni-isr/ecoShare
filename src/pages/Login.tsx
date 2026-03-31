import { useState } from 'react';
import { Link } from 'react-router';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 flex items-center justify-center py-10">
      <div className="bg-bg rounded-xl border border-border shadow-sm w-full max-w-[420px] p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-text-1 mb-2 tracking-tight">Tervetuloa takaisin</h1>
          <p className="text-[15px] font-medium text-text-3">Kirjaudu sisään jatkaaksesi</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-text-2 mb-1.5 uppercase tracking-wide">
              Sähköposti
            </label>
            <input
              type="email"
              required
              placeholder="esim. matti@meikalainen.fi"
              className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium text-text-1 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="block text-[13px] font-bold text-text-2 uppercase tracking-wide">
                Salasana
              </label>
              <a href="#" className="text-[13px] font-bold text-green hover:underline">
                Unohtuiko?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium text-text-1 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-4 hover:text-text-2 transition-colors"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M10.73 5.08A10.43 10.43 0 0112 5c7 0 11 8 11 8a18.45 18.45 0 01-2.16 3.19" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white rounded-lg py-3.5 text-[15px] font-bold shadow-sm hover:-translate-y-[1px] hover:bg-green-dark transition-all mt-2"
          >
            Kirjaudu sisään
          </button>
        </form>

        <div className="mt-8 text-center text-[14px] font-medium text-text-3">
          Eikö sinulla ole tiliä?{' '}
          <Link to="/register" className="text-green font-bold hover:underline">
            Rekisteröidy
          </Link>
        </div>
        
      </div>
    </div>
  );
};