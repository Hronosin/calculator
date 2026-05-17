/**
 * Давление. Базовая единица — паскаль.
 */

import { register } from './registry';

register({
  id: 'pressure',
  name: 'Давление',
  category: 'pressure',
  units: [
    { code: 'Pa', label: 'паскаль', toBase: 1 },
    { code: 'hPa', label: 'гектопаскаль', toBase: 100 },
    { code: 'kPa', label: 'килопаскаль', toBase: 1000 },
    { code: 'MPa', label: 'мегапаскаль', toBase: 1e6 },
    { code: 'GPa', label: 'гигапаскаль', toBase: 1e9 },
    { code: 'bar', label: 'бар', toBase: 1e5 },
    { code: 'mbar', label: 'миллибар', toBase: 100 },
    { code: 'atm', label: 'физическая атмосфера', toBase: 101325 },
    { code: 'at', label: 'техническая атмосфера', toBase: 98066.5 },
    { code: 'Torr', label: 'торр', toBase: 133.322368421 },
    { code: 'mmHg', label: 'миллиметр рт. ст.', toBase: 133.322387415 },
    { code: 'inHg', label: 'дюйм рт. ст.', toBase: 3386.389 },
    { code: 'mmH₂O', label: 'миллиметр вод. ст.', toBase: 9.80665 },
    { code: 'psi', label: 'фунт на кв. дюйм', toBase: 6894.757293168 },
    { code: 'ksi', label: 'тыс. фунтов на кв. дюйм', toBase: 6894757.293168 },
  ],
});
