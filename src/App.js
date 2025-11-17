import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BibliotecaJuegos from './paginas/BibliotecaJuegos'; // Importaremos después
// Agrega imports para otras pages

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl">GameTracker</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<BibliotecaJuegos />} />
            {/* Agregaremos más rutas */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;