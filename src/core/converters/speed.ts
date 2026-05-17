/**
 * Скорость. Базовая единица — м/с.
 */

import { register } from './registry';

register({
  id: 'speed',
  name: 'Скорость',
  category: 'speed',
  units: [
    { code: 'mm/s', label: 'миллиметр в секунду', toBase: 0.001 },
    { code: 'cm/s', label: 'сантиметр в секунду', toBase: 0.01 },
    { code: 'm/s', label: 'метр в секунду', toBase: 1 },
    { code: 'km/h', label: 'километр в час', toBase: 1 / 3.6 },
    { code: 'km/s', label: 'километр в секунду', toBase: 1000 },
    { code: 'ft/s', label: 'фут в секунду', toBase: 0.3048 },
    { code: 'mph', label: 'миля в час', toBase: 0.44704 },
    { code: 'kn', label: 'узел', toBase: 0.514444 },
    { code: 'Mach', label: 'Мах (на уровне моря)', toBase: 343 },
    { code: 'c', label: 'скорость света (доля c)', toBase: 299792458 },
  ],
});
