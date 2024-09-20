import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { LanguageProvider } from './LanguageProvider';

// Créez un root avec createRoot
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </React.StrictMode>
  );
}
