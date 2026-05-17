/**
 * Entry point.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1. CSS
import './ui/styles/global.css';

// 2. Initialize registries
import './core/formulas/registry';
import './core/converters/registry';

// 3. Populate registries — formula domains
import './core/formulas/physics';
import './core/formulas/mechanics';
import './core/formulas/thermodynamics';
import './core/formulas/optics';
import './core/formulas/electromagnetism';
import './core/formulas/relativity';
import './core/formulas/quantum';
import './core/formulas/astronomy';
import './core/formulas/geometry';
import './core/formulas/electric';
import './core/formulas/chemistry';
import './core/formulas/biology';
import './core/formulas/finance';
// Niche additions
import './core/formulas/aerodynamics';
import './core/formulas/nuclear';
import './core/formulas/acoustics';
import './core/formulas/crypto';
import './core/formulas/materials';
import './core/formulas/statistics';
import './core/formulas/earth';
import './core/formulas/numbertheory';
import './core/formulas/heattransfer';

// Converters
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
