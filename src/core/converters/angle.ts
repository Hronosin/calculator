/**
 * Угол. Базовая единица — радиан.
 */

import { register } from './registry';

register({
  id: 'angle',
  name: 'Угол',
  category: 'angle',
  units: [
    { code: 'rad', label: 'радиан', toBase: 1 },
    { code: 'mrad', label: 'миллирадиан', toBase: 0.001 },
    { code: '°', label: 'градус', toBase: Math.PI / 180 },
    { code: 'gon', label: 'град (gon)', toBase: Math.PI / 200 },
    { code: '′', label: 'угловая минута', toBase: Math.PI / 10800 },
    { code: '″', label: 'угловая секунда', toBase: Math.PI / 648000 },
    { code: 'turn', label: 'оборот', toBase: 2 * Math.PI },
    { code: 'quad', label: 'квадрант', toBase: Math.PI / 2 },
    { code: 'sextant', label: 'секстант', toBase: Math.PI / 3 },
  ],
});
