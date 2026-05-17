/**
 * Entry point.
 *
 * Order matters here:
 *  1. Global styles
 *  2. Registry modules (define register() functions)
 *  3. Formula/converter modules (call register() — must come AFTER step 2)
 *  4. Plugin manager
 *  5. Mount React
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1. CSS
import './ui/styles/global.css';

// 2. Initialize registries (no side effects — just sets up Map and register fn)
import './core/formulas/registry';
import './core/converters/registry';

// 3. Populate registries by importing modules that call register() at top-level
import './core/formulas/physics';
import './core/formulas/electric';
import './core/formulas/chemistry';
import './core/converters/length';
import './core/converters/mass';
import './core/converters/temperature';

// 4. Plugin loader
import { plugins } from './plugins/PluginManager';
plugins.loadBuiltins().catch((err) => console.warn('[plugins] init error', err));

// 5. Mount React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
