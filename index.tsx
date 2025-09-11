import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { PatientProvider } from './context/PatientContext';
import { LocaleProvider } from './context/LocaleContext';
import { UserProvider } from './context/UserContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <UserProvider>
          <PatientProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </PatientProvider>
        {/* FIX: Corrected typo in closing tag from User-Provider to UserProvider */}
        </UserProvider>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);
