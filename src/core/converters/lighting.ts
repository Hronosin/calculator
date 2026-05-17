/**
 * Освещённость и сила света / световой поток.
 * Базовая для освещённости — люкс.
 * Базовая для светового потока — люмен.
 */

import { register } from './registry';

register({
  id: 'illuminance',
  name: 'Освещённость',
  category: 'lighting',
  units: [
    { code: 'nox', label: 'нокс', toBase: 1e-3 },
    { code: 'lx', label: 'люкс', toBase: 1 },
    { code: 'fc', label: 'фут-кандела', toBase: 10.7639104167097 },
    { code: 'ph', label: 'фот', toBase: 10000 },
    { code: 'klx', label: 'килолюкс', toBase: 1000 },
    // Bench-marks
    { code: 'moonlight', label: 'полная луна (≈ 0.25 lx)', toBase: 0.25 },
    { code: 'office', label: 'офисное освещение (≈ 500 lx)', toBase: 500 },
    { code: 'daylight', label: 'дневной свет (≈ 10 000 lx)', toBase: 10000 },
    { code: 'sun-direct', label: 'прямой солнечный свет (≈ 100 000 lx)', toBase: 100000 },
  ],
});

register({
  id: 'luminous-flux',
  name: 'Световой поток',
  category: 'lighting',
  units: [
    { code: 'lm', label: 'люмен', toBase: 1 },
    { code: 'klm', label: 'килолюмен', toBase: 1000 },
    { code: 'Mlm', label: 'мегалюмен', toBase: 1e6 },
    { code: 'cd·sr', label: 'кандела-стерадиан', toBase: 1 },
    // Bench-marks
    { code: 'candle', label: 'свеча (≈ 12 lm)', toBase: 12 },
    { code: 'led-bulb', label: 'светодиодная лампа 10 Вт (≈ 1000 lm)', toBase: 1000 },
    { code: 'sun', label: 'Солнце (≈ 3.75×10²⁸ lm)', toBase: 3.75e28 },
  ],
});
