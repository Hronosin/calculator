/**
 * Площадь. Базовая единица — м².
 */

import { register } from './registry';

register({
  id: 'area',
  name: 'Площадь',
  category: 'area',
  units: [
    { code: 'mm²', label: 'квадратный миллиметр', toBase: 1e-6 },
    { code: 'cm²', label: 'квадратный сантиметр', toBase: 1e-4 },
    { code: 'dm²', label: 'квадратный дециметр', toBase: 0.01 },
    { code: 'm²', label: 'квадратный метр', toBase: 1 },
    { code: 'a', label: 'ар (сотка)', toBase: 100 },
    { code: 'ha', label: 'гектар', toBase: 10000 },
    { code: 'km²', label: 'квадратный километр', toBase: 1e6 },
    { code: 'in²', label: 'квадратный дюйм', toBase: 6.4516e-4 },
    { code: 'ft²', label: 'квадратный фут', toBase: 0.09290304 },
    { code: 'yd²', label: 'квадратный ярд', toBase: 0.83612736 },
    { code: 'ac', label: 'акр', toBase: 4046.8564224 },
    { code: 'mi²', label: 'квадратная миля', toBase: 2589988.110336 },
  ],
});
