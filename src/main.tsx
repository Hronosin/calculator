/**
 * Entry point.
 *
 * - Imports global styles
 * - Force-imports core registries so they self-populate before render
 * - Loads user plugins from /plugins/
 * - Mounts React
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS
import './ui/styles/global.css';

// Side-effect imports — these populate the formula & converter registries
import './core/formulas/registry';
import './core/converters/registry';

// Plugin loader
import { plugins } from './plugins/PluginManager';

// Load user plugins from /plugins/*.js (Vite glob)
plugins.loadBuiltins().catch((err) => console.warn('[plugins] init error', err));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
