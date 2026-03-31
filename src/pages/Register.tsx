import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const calculateScore = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const score = calculateScore(password);

  const levels = [
    { w: '0%', bg: 'bg-fill-3', textClass: 'text-text-4', label: 'Syötä salasana' },
    { w: '25%', bg: 'bg-red', textClass: 'text-red', label: 'Heikko' },
    { w: '50%', bg: 'bg-orange', textClass: 'text-orange', label: 'Kohtalainen' },
    { w: '75%', bg: 'bg-blue', textClass: 'text-blue', label: 'Hyvä' },
    { w: '100%', bg: 'bg-green', textClass: 'text-green', label: 'Vahva 🔒' }
  ];

  const currentLevel = password.length === 0 ? levels[0] : levels[Math.max(1, score)];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 flex items-center justify-center py-10">
      <div className="bg-bg rounded-xl border border-border shadow-sm w-full max-w-[420px] p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-text-1 mb-2 tracking-tight">Luo tili</h1>
          <p className="text-[15px] font-medium text-text-3">Liity kiertotalouden edelläkävijöihin</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-text-2 mb-1.5 uppercase tracking-wide">
              Nimi
            </label>
            <input
              type="text"
              required
              placeholder="esim. Matti Meikäläinen"
              className="w-full bg-fill-1 border border-border rounded-lg px-4 py-3 text-[15px] font-medium text-text-1 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
            />
          </div>

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
            <label className="block text-[13px] font-bold text-text-2 mb-1.5 uppercase tracking-wide">
              Salasana
            </label>
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Vähintään 8 merkkiä"
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
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-fill-2 h-1.5 rounded-pill overflow-hidden">
                <div 
                  className={`h-full rounded-pill transition-all duration-300 ${currentLevel.bg}`}
                  style={{ width: currentLevel.w }}
                ></div>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider w-24 text-right ${currentLevel.textClass}`}>
                {currentLevel.label}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white rounded-lg py-3.5 text-[15px] font-bold shadow-sm hover:-translate-y-[1px] hover:bg-green-dark transition-all mt-4"
          >
            Luo tili
          </button>
        </form>

        <div className="mt-8 text-center text-[14px] font-medium text-text-3">
          Onko sinulla jo tili?{' '}
          <Link to="/login" className="text-green font-bold hover:underline">
            Kirjaudu sisään
          </Link>
        </div>
        
      </div>
    </div>
  );
};