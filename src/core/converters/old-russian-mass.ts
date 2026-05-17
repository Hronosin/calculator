/**
 * Древнерусские меры массы. Базовая — килограмм.
 */

import { register } from './registry';

register({
  id: 'old-russian-mass',
  name: 'Древнерусские меры (масса)',
  category: 'historical',
  units: [
    { code: 'кг', label: 'килограмм', toBase: 1 },
    { code: 'доля', label: 'доля', toBase: 4.4434842e-5 },
    { code: 'золотник', label: 'золотник', toBase: 4.265754e-3 },
    { code: 'лот', label: 'лот (3 золотника)', toBase: 0.012797 },
    { code: 'фунт_рус', label: 'фунт русский', toBase: 0.4095124 },
    { code: 'гривенка', label: 'гривенка большая', toBase: 0.40951 },
    { code: 'безмен', label: 'безмен (2.5 фунта)', toBase: 1.02378 },
    { code: 'пуд', label: 'пуд', toBase: 16.380496 },
    { code: 'берковец', label: 'берковец (10 пудов)', toBase: 163.8049 },
  ],
});
