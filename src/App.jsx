import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BibliotecaJuegos from './páginas/BibliotecaJuegos';
import ListaResenasPage from './páginas/ListaResenas';
import EstadisticasPersonales from './páginas/EstadisticasPersonales';
import NotFound from './páginas/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">GameTracker</h1>
            <nav className="space-x-6">
              <a href="/" className="hover:underline">Biblioteca</a>
              <a href="/resenas" className="hover:underline">Reseñas</a>
              <a href="/estadisticas" className="hover:underline">Estadísticas</a>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<BibliotecaJuegos />} />
            <Route path="/resenas" element={<ListaResenasPage />} />
            <Route path="/estadisticas" element={<EstadisticasPersonales />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;