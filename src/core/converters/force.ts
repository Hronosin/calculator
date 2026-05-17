/**
 * Сила. Базовая — ньютон.
 */

import { register } from './registry';

register({
  id: 'force',
  name: 'Сила',
  category: 'force',
  units: [
    { code: 'dyn', label: 'дина', toBase: 1e-5 },
    { code: 'mN', label: 'миллиньютон', toBase: 0.001 },
    { code: 'N', label: 'ньютон', toBase: 1 },
    { code: 'gf', label: 'грамм-сила', toBase: 9.80665e-3 },
    { code: 'kgf', label: 'килограмм-сила', toBase: 9.80665 },
    { code: 'ozf', label: 'унция-сила', toBase: 0.2780138509537812 },
    { code: 'lbf', label: 'фунт-сила', toBase: 4.4482216152605 },
    { code: 'kN', label: 'килоньютон', toBase: 1000 },
    { code: 'tf', label: 'тонна-сила', toBase: 9806.65 },
    { code: 'kip', label: 'кип (1000 lbf)', toBase: 4448.2216152605 },
    { code: 'MN', label: 'меганьютон', toBase: 1e6 },
  ],
});
