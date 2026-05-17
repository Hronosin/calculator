/**
 * Частота. Базовая единица — герц.
 */

import { register } from './registry';

register({
  id: 'frequency',
  name: 'Частота',
  category: 'frequency',
  units: [
    { code: 'μHz', label: 'микрогерц', toBase: 1e-6 },
    { code: 'mHz', label: 'миллигерц', toBase: 1e-3 },
    { code: 'Hz', label: 'герц', toBase: 1 },
    { code: 'rpm', label: 'оборот в минуту', toBase: 1 / 60 },
    { code: 'rps', label: 'оборот в секунду', toBase: 1 },
    { code: '/day', label: 'периодов в сутки', toBase: 1 / 86400 },
    { code: 'kHz', label: 'килогерц', toBase: 1000 },
    { code: 'MHz', label: 'мегагерц', toBase: 1e6 },
    { code: 'GHz', label: 'гигагерц', toBase: 1e9 },
    { code: 'THz', label: 'терагерц', toBase: 1e12 },
  ],
});
