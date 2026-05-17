/**
 * Мощность. Базовая единица — ватт.
 */

import { register } from './registry';

register({
  id: 'power',
  name: 'Мощность',
  category: 'power',
  units: [
    { code: 'mW', label: 'милливатт', toBase: 0.001 },
    { code: 'W', label: 'ватт', toBase: 1 },
    { code: 'kW', label: 'киловатт', toBase: 1000 },
    { code: 'hp', label: 'лошадиная сила (мех.)', toBase: 745.69987158227 },
    { code: 'hpM', label: 'лошадиная сила (метрич.)', toBase: 735.49875 },
    { code: 'BTU/h', label: 'БТЕ в час', toBase: 0.29307107 },
    { code: 'ft·lbf/s', label: 'фут-фунт-сила в сек.', toBase: 1.355817948 },
    { code: 'MW', label: 'мегаватт', toBase: 1e6 },
    { code: 'GW', label: 'гигаватт', toBase: 1e9 },
    { code: 'TW', label: 'тераватт', toBase: 1e12 },
    { code: 'L☉', label: 'светимость Солнца', toBase: 3.828e26 },
  ],
});
