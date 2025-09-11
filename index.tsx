import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';
import { Toaster } from 'react-hot-toast';

const ThemedApp: React.FC = () => {
  const { effectiveTheme } = useTheme();

  return (
    <>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: effectiveTheme === 'dark' ? '#1e293b' : '#ffffff', // --card
            color: effectiveTheme === 'dark' ? '#e2e8f0' : '#26667F', // --foreground
            border: `1px solid ${effectiveTheme === 'dark' ? '#334155' : '#BDE9D3'}` // --border
          },
          success: {
            iconTheme: {
              primary: effectiveTheme === 'dark' ? '#14b8a6' : '#67C090', // --primary
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // red-500
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <HashRouter>
          <ThemedApp />
        </HashRouter>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);