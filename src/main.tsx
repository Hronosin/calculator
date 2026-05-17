/**
 * Entry point.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS
import './ui/styles/global.css';

// Initialize registries
import './core/formulas/registry';
import './core/converters/registry';

// Populate formula registry
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
import './core/formulas/aerodynamics';
import './core/formulas/nuclear';
import './core/formulas/acoustics';
import './core/formulas/crypto';
import './core/formulas/materials';
import './core/formulas/statistics';
import './core/formulas/earth';
import './core/formulas/numbertheory';
import './core/formulas/heattransfer';

// Populate converter registry — base
import './core/converters/length';
import './core/converters/mass';
import './core/converters/temperature';
// Standard
import './core/converters/area';
import './core/converters/volume';
import './core/converters/time';
import './core/converters/speed';
import './core/converters/pressure';
import './core/converters/energy';
import './core/converters/power';
import './core/converters/angle';
import './core/converters/data';
import './core/converters/frequency';
import './core/converters/radioactivity';
// Exotic
import './core/converters/density';
import './core/converters/force';
import './core/converters/torque';
import './core/converters/lighting';
import './core/converters/magnetism';
import './core/converters/flow';
import './core/converters/music';
import './core/converters/radiation-rate';
import './core/converters/carbon';
import './core/converters/cooking';
import './core/converters/alcohol';
import './core/converters/typing';
import './core/converters/cosmic';
import './core/converters/gaming';
import './core/converters/purchasing';
// Historical & cultural
import './core/converters/old-russian-length';
import './core/converters/old-russian-mass';
import './core/converters/old-russian-volume';
import './core/converters/japanese';
import './core/converters/chinese';
import './core/converters/ancient';
import './core/converters/wine-bottles';
import './core/converters/paper-size';
import './core/converters/clothing';
import './core/converters/nature-speeds';

// Plugin loader
import { plugins } from './plugins/PluginManager';
plugins.loadBuiltins().catch((err) => console.warn('[plugins] init error', err));

// Extra translations (must come after dictionaries.ts is loaded — happens
// transitively via UnitConverter.tsx — but we import explicitly to be safe)
import './i18n/dictionaries-extra';

// Mount React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
