/**
 * Момент силы / крутящий момент. Базовая — Н·м.
 */

import { register } from './registry';

register({
  id: 'torque',
  name: 'Момент силы',
  category: 'torque',
  units: [
    { code: 'dyn·cm', label: 'дина-сантиметр', toBase: 1e-7 },
    { code: 'N·mm', label: 'ньютон-миллиметр', toBase: 0.001 },
    { code: 'N·cm', label: 'ньютон-сантиметр', toBase: 0.01 },
    { code: 'kgf·cm', label: 'килограмм-сила-сантиметр', toBase: 0.0980665 },
    { code: 'lbf·in', label: 'фунт-сила-дюйм', toBase: 0.1129848290276167 },
    { code: 'N·m', label: 'ньютон-метр', toBase: 1 },
    { code: 'kgf·m', label: 'килограмм-сила-метр', toBase: 9.80665 },
    { code: 'lbf·ft', label: 'фунт-сила-фут', toBase: 1.3558179483314004 },
    { code: 'kN·m', label: 'килоньютон-метр', toBase: 1000 },
  ],
});
