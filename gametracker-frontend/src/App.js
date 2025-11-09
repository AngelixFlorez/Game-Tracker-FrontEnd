// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BibliotecaJuegos from './views/BibliotecaJuegos';
import FormularioJuego from './views/FormularioJuego';
import EstadisticasPersonales from './views/EstadisticasPersonales';
import DetalleJuego from './views/DetalleJuego';

// Componente de Navegación simple (Navbar)
const Navbar = () => (
  <nav className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-lg">
    <Link to="/" className="text-2xl font-extrabold text-purple-400 hover:text-purple-300 transition duration-200">
        🎮 GameTracker
    </Link>
    <div className="flex space-x-6">
      <Link to="/" className="hover:text-purple-400 transition duration-200">Biblioteca</Link>
      <Link to="/agregar" className="hover:text-purple-400 transition duration-200">Agregar Juego</Link>
      <Link to="/estadisticas" className="hover:text-purple-400 transition duration-200">Estadísticas</Link>
    </div>
  </nav>
);

function App() {
  return (
    <Router>
      <Navbar />
      {/* Contenedor principal con fondo ligero */}
      <main className="bg-gray-100 min-h-screen">
        <Routes>
          {/* 1. Vista de la colección completa */}
          <Route path="/" element={<BibliotecaJuegos />} /> 
          
          {/* 2. Rutas para agregar y editar juegos */}
          <Route path="/agregar" element={<FormularioJuego />} />
          <Route path="/editar/:id" element={<FormularioJuego />} />

          {/* 3. Ruta para el detalle del juego (donde irán las reseñas) */} 
          <Route path="/juego/:id" element={<DetalleJuego />} /> 
          
          {/* 4. Dashboard de estadísticas */}
          <Route path="/estadisticas" element={<EstadisticasPersonales />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
