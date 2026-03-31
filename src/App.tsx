import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddItem } from './pages/AddItem';
import { Profile } from './pages/Profile';

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8">
      <Outlet />
    </main>
    <footer className="py-8 text-center text-sm font-medium text-text-3 border-t border-border">
      © {new Date().getFullYear()} EcoShare. Kiertotalouden uusi standardi.
    </footer>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add" element={<AddItem />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}