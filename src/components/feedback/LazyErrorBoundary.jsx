import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * Error Boundary para manejar errores en componentes lazy
 */
class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error de carga lazy:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    // Forzar recarga de la página como último recurso
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/60 dark:bg-slate-900/60 p-8 rounded-2xl shadow-lg backdrop-blur-lg ring-1 ring-slate-900/5 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Error al cargar la página
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Hubo un problema al cargar el contenido. Por favor, intenta de nuevo.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LazyErrorBoundary;