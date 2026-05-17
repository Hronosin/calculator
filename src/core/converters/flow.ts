/**
 * Расход (объёмный). Базовая — м³/с.
 */

import { register } from './registry';

register({
  id: 'flow-rate',
  name: 'Расход',
  category: 'flow',
  units: [
    { code: 'mL/s', label: 'миллилитр в секунду', toBase: 1e-6 },
    { code: 'L/min', label: 'литр в минуту', toBase: 1.6666666666667e-5 },
    { code: 'L/h', label: 'литр в час', toBase: 2.7777777777778e-7 },
    { code: 'L/s', label: 'литр в секунду', toBase: 0.001 },
    { code: 'm³/h', label: 'кубический метр в час', toBase: 2.7777777777778e-4 },
    { code: 'm³/min', label: 'кубический метр в минуту', toBase: 0.016666666666667 },
    { code: 'm³/s', label: 'кубический метр в секунду', toBase: 1 },
    { code: 'GPM', label: 'галлон США в минуту', toBase: 6.30901964e-5 },
    { code: 'cfm', label: 'кубический фут в минуту', toBase: 4.7194745e-4 },
    { code: 'cusec', label: 'кубический фут в секунду (cusec)', toBase: 0.02831685 },
    { code: 'bbl/d', label: 'баррель нефти в сутки', toBase: 1.84013e-6 },
  ],
});
