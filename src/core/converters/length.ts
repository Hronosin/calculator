/**
 * Длина. Базовая единица — метр.
 */

import { register } from './registry';

register({
  id: 'length',
  name: 'Длина',
  category: 'distance',
  units: [
    // Метрические
    { code: 'pm', label: 'пикометр', toBase: 1e-12 },
    { code: 'Å', label: 'ангстрем', toBase: 1e-10 },
    { code: 'nm', label: 'нанометр', toBase: 1e-9 },
    { code: 'μm', label: 'микрометр', toBase: 1e-6 },
    { code: 'mm', label: 'миллиметр', toBase: 0.001 },
    { code: 'cm', label: 'сантиметр', toBase: 0.01 },
    { code: 'dm', label: 'дециметр', toBase: 0.1 },
    { code: 'm', label: 'метр', toBase: 1 },
    { code: 'km', label: 'километр', toBase: 1000 },
    // Имперские/американские
    { code: 'in', label: 'дюйм', toBase: 0.0254 },
    { code: 'ft', label: 'фут', toBase: 0.3048 },
    { code: 'yd', label: 'ярд', toBase: 0.9144 },
    { code: 'fur', label: 'фурлонг', toBase: 201.168 },
    { code: 'mi', label: 'миля', toBase: 1609.344 },
    { code: 'lea', label: 'лига (морская)', toBase: 5556 },
    { code: 'nmi', label: 'морская миля', toBase: 1852 },
    // Астрономические
    { code: 'AU', label: 'астрономическая единица', toBase: 1.495978707e11 },
    { code: 'ly', label: 'световой год', toBase: 9.4607304725808e15 },
    { code: 'pc', label: 'парсек', toBase: 3.0856775814913673e16 },
  ],
});
