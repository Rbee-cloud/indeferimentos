import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message || 'Unexpected rendering error' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f2ed] text-[#1a1715] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white border border-[#46372d]/15 p-6 rounded-sm shadow-xs space-y-3">
            <h1 className="text-lg font-bold">Unable to render interface</h1>
            <p className="text-xs text-[#786f66] font-mono break-words">{this.state.errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#1a1715] text-white text-xs font-bold uppercase tracking-wider rounded-full"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
