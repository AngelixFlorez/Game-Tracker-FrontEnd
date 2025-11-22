import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css' // Importar estilos globales

// Componente ErrorBoundary para capturar errores en la interfaz de usuario
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null }; // Estado inicial sin errores
  }

  // Ciclo de vida: Actualiza el estado cuando ocurre un error
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Ciclo de vida: Se ejecuta después de que un error ha sido capturado
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo); // Log del error
  }

  render() {
    // Si hay un error, muestra una interfaz de respaldo
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', background: 'white' }}>
          <h1>Algo salió mal.</h1>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }

    // Si no hay error, renderiza los componentes hijos normalmente
    return this.props.children;
  }
}

// Renderizado de la aplicación en el elemento raíz del DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolver la aplicación en ErrorBoundary para manejo de errores */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)