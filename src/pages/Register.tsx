import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateScore = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const score = calculateScore(formData.password);
  const levels = [
    { w: '0%', bg: 'bg-fill-3', textClass: 'text-text-4', label: 'Syötä salasana' },
    { w: '25%', bg: 'bg-red', textClass: 'text-red', label: 'Heikko' },
    { w: '50%', bg: 'bg-orange', textClass: 'text-orange', label: 'Kohtalainen' },
    { w: '75%', bg: 'bg-[#007AFF]', textClass: 'text-[#007AFF]', label: 'Hyvä' },
    { w: '100%', bg: 'bg-green', textClass: 'text-green', label: 'Vahva 🔒' }
  ];
  const currentLevel = formData.password.length === 0 ? levels[0] : levels[Math.max(1, score)];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('https://ecoshare-backend.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Rekisteröinti epäonnistui');
      }

      navigate('/login', { state: { message: 'Tili luotu! Voit nyt kirjautua sisään.' } });
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
      <div className="bg-white rounded-[22px] border border-border shadow-md w-full max-w-[460px] p-10">
        
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center shadow-[0_3px_10px_rgba(52,199,89,0.3)]">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.5c-.19.31.27.73.54.43C5.07 18.5 7.34 17 9 17c1.66 0 2.99 1.5 5 1.5 4 0 7-3.5 7-7 0-.47-.09-.92-.22-1.35C19.48 9.37 18.34 8 17 8z"/>
            </svg>
          </div>
          <span className="text-[19px] font-extrabold tracking-tight text-text-1">EcoShare</span>
        </div>

        <div className="mb-6">
          <h1 className="text-[22px] font-extrabold text-text-1 mb-1 tracking-tight">Rekisteröityminen</h1>
          <p className="text-[14px] font-medium text-text-3">Luo tili ilmaiseksi.</p>
        </div>

        {errorMsg && (
          <div className="bg-[#ffebee] text-[#c62828] px-4 py-3 rounded-lg text-[14px] font-bold mb-6 flex items-center gap-2">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-2">Etunimi <span className="text-red">*</span></label>
              <input
                type="text"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Mikko"
                className="w-full h-[50px] bg-fill-1 border-[1.5px] border-transparent rounded-lg px-4 text-[15px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-2">Sukunimi <span className="text-red">*</span></label>
              <input
                type="text"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Salminen"
                className="w-full h-[50px] bg-fill-1 border-[1.5px] border-transparent rounded-lg px-4 text-[15px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-text-2">Sähköpostiosoite <span className="text-red">*</span></label>
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

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-text-2">Käyttäjänimi <span className="text-red">*</span></label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="@mikko_hki"
              className="w-full h-[50px] bg-fill-1 border-[1.5px] border-transparent rounded-lg px-4 text-[15px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-text-2">Salasana <span className="text-red">*</span></label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 merkkiä"
                className="w-full h-[50px] bg-fill-1 border-[1.5px] border-transparent rounded-lg pl-4 pr-12 text-[15px] font-medium text-text-1 outline-none transition-all focus:bg-white focus:border-green focus:shadow-[0_0_0_4px_rgba(52,199,89,0.12)]"
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
            
            <div className="mt-1.5">
              <div className="h-1 bg-fill-2 rounded-pill overflow-hidden mb-1">
                <div 
                  className={`h-full rounded-pill transition-all duration-400 ease-out ${currentLevel.bg}`}
                  style={{ width: currentLevel.w }}
                ></div>
              </div>
              <div className={`text-[11.5px] font-bold ${currentLevel.textClass}`}>
                {currentLevel.label}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[52px] bg-green text-white rounded-lg font-bold text-[16px] shadow-[0_4px_16px_rgba(52,199,89,0.3)] hover:-translate-y-[2px] hover:bg-[#2fb350] hover:shadow-[0_7px_22px_rgba(52,199,89,0.38)] active:scale-95 transition-all mt-2 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Luodaan tiliä...' : 'Luo tili'}
          </button>
        </form>

        <div className="mt-6 text-center text-[14px] font-medium text-text-3">
          Onko sinulla jo tili?{' '}
          <Link to="/login" className="text-green font-bold hover:underline">
            Kirjaudu sisään
          </Link>
        </div>
        
      </div>
    </div>
  );
};