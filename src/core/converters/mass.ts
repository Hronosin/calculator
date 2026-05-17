/**
 * Масса. Базовая единица — килограмм.
 */

import { register } from './registry';

register({
  id: 'mass',
  name: 'Масса',
  category: 'weight',
  units: [
    { code: 'Da', label: 'дальтон (а.е.м.)', toBase: 1.66053906660e-27 },
    { code: 'μg', label: 'микрограмм', toBase: 1e-9 },
    { code: 'mg', label: 'миллиграмм', toBase: 1e-6 },
    { code: 'ct', label: 'карат', toBase: 2e-4 },
    { code: 'gr', label: 'гран', toBase: 6.479891e-5 },
    { code: 'g', label: 'грамм', toBase: 0.001 },
    { code: 'oz', label: 'унция', toBase: 0.028349523125 },
    { code: 'lb', label: 'фунт', toBase: 0.45359237 },
    { code: 'kg', label: 'килограмм', toBase: 1 },
    { code: 'st', label: 'стоун', toBase: 6.35029318 },
    { code: 'slug', label: 'слаг', toBase: 14.59390294 },
    { code: 'tsh', label: 'центнер', toBase: 100 },
    { code: 't', label: 'тонна', toBase: 1000 },
    { code: 'M☉', label: 'солнечная масса', toBase: 1.98892e30 },
  ],
});
