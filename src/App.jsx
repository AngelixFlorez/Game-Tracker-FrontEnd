import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import BibliotecaJuegos from './paginas/BibliotecaJuegos.jsx';
import ListaResenasPage from './paginas/ListaResenas.jsx';
import EstadisticasPersonales from './paginas/EstadisticasPersonales.jsx';
import GestionJuegos from './paginas/GestionJuegos.jsx';
import NotFound from './paginas/NotFound.jsx';
import HomePage from './paginas/HomePage.jsx';
import { useEffect, useState } from 'react';

// Componente de Barra de Navegación
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para detectar scroll
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para el menú de usuario
  const location = useLocation(); // Hook para obtener la ruta actual

  // Efecto para cambiar el fondo del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Limpieza del evento
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/70 to-transparent'}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        {/* Logo y Enlaces de Navegación */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-[#e50914] text-2xl font-bold tracking-wide">GAMETRACKER</Link>
          <nav className="hidden md:flex gap-4 text-sm text-[#e5e5e5]">
            <Link to="/" className="hover:text-[#b3b3b3] transition">Inicio</Link>
            <Link to="/biblioteca" className="hover:text-[#b3b3b3] transition">Biblioteca</Link>
            <Link to="/resenas" className="hover:text-[#b3b3b3] transition">Reseñas</Link>
            <Link to="/estadisticas" className="hover:text-[#b3b3b3] transition">Estadísticas</Link>
            <Link to="/gestion" className="hover:text-[#b3b3b3] transition">Gestión</Link>
          </nav>
        </div>

        {/* Menú de Usuario */}
        <div className="flex items-center gap-4 relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="w-8 h-8 bg-[#e50914] rounded flex items-center justify-center text-white font-bold text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium hidden sm:block">Invitado</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-white transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Dropdown del Menú de Usuario */}
          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#181818] border border-[#2f2f2f] rounded shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-[#2f2f2f] mb-2">
                <p className="text-xs text-[#b3b3b3]">Bienvenido</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2f2f2f] transition-colors">
                Iniciar Sesión
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2f2f2f] transition-colors">
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Componente Principal de la Aplicación
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#141414] text-white font-sans">
        <Navbar />
        <main>
          {/* Definición de Rutas */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/biblioteca" element={<div className="pt-20 px-4 md:px-12"><BibliotecaJuegos /></div>} />
            <Route path="/resenas" element={<div className="pt-20 px-4 md:px-12"><ListaResenasPage /></div>} />
            <Route path="/estadisticas" element={<div className="pt-20 px-4 md:px-12"><EstadisticasPersonales /></div>} />
            <Route path="/gestion" element={<div className="pt-20 px-4 md:px-12"><GestionJuegos /></div>} />
            {/* Ruta para manejar páginas no encontradas (404) */}
            <Route path="*" element={<div className="pt-20 px-4 md:px-12"><NotFound /></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;