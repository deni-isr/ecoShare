import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="h-16 flex items-center px-6 md:px-10 bg-white/88 backdrop-blur-xl border-b border-border sticky top-0 z-50">
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-green tracking-tight hover:opacity-80 transition-opacity no-underline">
          EcoShare
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/about" className="text-[15px] font-medium text-text-2 hover:text-green transition-colors no-underline">Tietoa</Link>
          <Link to="/profile" className="w-9 h-9 bg-fill-2 rounded-full flex items-center justify-center hover:bg-fill-3 transition-colors no-underline">👤</Link>
          <Link to="/add" className="bg-green text-white px-5 py-2 rounded-pill text-[14px] font-bold shadow-sm hover:-translate-y-[1px] hover:bg-green-dark transition-all no-underline">
            + Lisää
          </Link>
        </nav>
      </div>
    </header>
  );
};