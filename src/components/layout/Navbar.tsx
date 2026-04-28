import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!currentUser.id;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="h-16 flex items-center px-4 md:px-10 bg-white/95 backdrop-blur-xl border-b border-border sticky top-0 z-50">
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        
        <Link to="/" onClick={closeMenu} className="text-xl font-extrabold text-green tracking-tight hover:opacity-80 transition-opacity no-underline">
          EcoShare
        </Link>

        <button 
          className="md:hidden p-2 text-text-1 hover:bg-fill-1 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-6 h-6"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-[15px] font-medium text-text-2 hover:text-green transition-colors no-underline">Etusivu</Link>
          <Link to="/about" className="text-[15px] font-medium text-text-2 hover:text-green transition-colors no-underline">Tietoa</Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-[15px] font-medium text-text-2 hover:text-green transition-colors no-underline flex items-center gap-2">
                {currentUser.avatar_url ? (
                  <img src={`https://ecoshare-backend.onrender.com${currentUser.avatar_url}`} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <span>👤</span>
                )}
                Profiili
              </Link>
              <Link to="/add" className="bg-green text-white px-5 py-2 rounded-pill text-[14px] font-bold shadow-sm hover:-translate-y-[1px] hover:bg-green-dark transition-all no-underline">
                + Lisää
              </Link>
            </>
          ) : (
            <Link to="/login" className="bg-green text-white px-5 py-2 rounded-pill text-[14px] font-bold shadow-sm hover:-translate-y-[1px] hover:opacity-90 transition-all no-underline">
              Kirjaudu
            </Link>
          )}

          {currentUser.is_admin === 1 && (
            <Link to="/admin" className="text-red font-extrabold bg-red/10 px-3 py-1.5 rounded-lg no-underline">
              Admin
            </Link>
          )}
        </nav>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-xl md:hidden flex flex-col p-4 gap-4 animate-in slide-in-from-top-2 duration-200">
          <Link to="/" onClick={closeMenu} className="font-bold text-text-1 p-2 hover:bg-fill-1 rounded-lg">Etusivu</Link>
          <Link to="/about" onClick={closeMenu} className="font-bold text-text-1 p-2 hover:bg-fill-1 rounded-lg">Tietoa</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={closeMenu} className="font-bold text-text-1 p-2 hover:bg-fill-1 rounded-lg flex items-center gap-2">
                👤 Profiili
              </Link>
              <Link to="/add" onClick={closeMenu} className="bg-green text-white p-3 rounded-xl font-bold text-center mt-2 shadow-sm">
                + Lisää ilmoitus
              </Link>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className="bg-green text-white p-3 rounded-xl font-bold text-center mt-2 shadow-sm">
              Kirjaudu sisään
            </Link>
          )}

          {currentUser.is_admin === 1 && (
            <Link to="/admin" onClick={closeMenu} className="text-red font-bold p-2 bg-red/10 rounded-lg text-center mt-2">
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  );
};