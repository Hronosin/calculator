/**
 * Время. Базовая единица — секунда.
 */

import { register } from './registry';

register({
  id: 'time',
  name: 'Время',
  category: 'time',
  units: [
    { code: 'tP', label: 'планковское время', toBase: 5.391247e-44 },
    { code: 'ys', label: 'йоктосекунда', toBase: 1e-24 },
    { code: 'fs', label: 'фемтосекунда', toBase: 1e-15 },
    { code: 'ps', label: 'пикосекунда', toBase: 1e-12 },
    { code: 'ns', label: 'наносекунда', toBase: 1e-9 },
    { code: 'μs', label: 'микросекунда', toBase: 1e-6 },
    { code: 'ms', label: 'миллисекунда', toBase: 0.001 },
    { code: 's', label: 'секунда', toBase: 1 },
    { code: 'min', label: 'минута', toBase: 60 },
    { code: 'h', label: 'час', toBase: 3600 },
    { code: 'd', label: 'сутки', toBase: 86400 },
    { code: 'wk', label: 'неделя', toBase: 604800 },
    { code: 'fortnight', label: 'фортнайт (2 нед.)', toBase: 1209600 },
    { code: 'mo', label: 'месяц (30.44 д.)', toBase: 2629746 },
    { code: 'yr', label: 'год (юлианский)', toBase: 31557600 },
    { code: 'decade', label: 'десятилетие', toBase: 315576000 },
    { code: 'century', label: 'век', toBase: 3155760000 },
    { code: 'millennium', label: 'тысячелетие', toBase: 31557600000 },
    { code: 'age-universe', label: 'возраст Вселенной', toBase: 4.35e17 },
  ],
});
