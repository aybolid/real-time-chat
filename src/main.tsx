import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './components/Providers';
// Styles
import './index.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
