// --- Core React & DOM Imports ---
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// --- Routing ---
import { BrowserRouter } from 'react-router-dom';
// --- Root Component ---
import App from './App.jsx';
// --- Global Stylesheets ---
// Place global CSS imports at the top level.
import './index.css';
// import '@fontsource/jost/200.css';

// --- App Initialization ---
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the main application component into the DOM.
// - StrictMode: Activates additional checks and warnings for its descendants.
// - BrowserRouter: Enables routing capabilities for the entire app.
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);