/**
 * Кулинарные меры. Базовая — миллилитр.
 * Включает национальные системы (США/Великобритания/Япония/Австралия).
 */

import { register } from './registry';

register({
  id: 'cooking',
  name: 'Кулинарные меры',
  category: 'cooking',
  units: [
    { code: 'drop', label: 'капля', toBase: 0.05 },
    { code: 'pinch', label: 'щепотка', toBase: 0.31 },
    { code: 'dash', label: 'dash (US)', toBase: 0.62 },
    { code: 'ml', label: 'миллилитр', toBase: 1 },
    { code: 'tsp_US', label: 'чайная ложка (США)', toBase: 4.92892159 },
    { code: 'tsp_metric', label: 'чайная ложка (метрическая)', toBase: 5 },
    { code: 'tbsp_US', label: 'столовая ложка (США)', toBase: 14.78676478 },
    { code: 'tbsp_AU', label: 'столовая ложка (Австралия)', toBase: 20 },
    { code: 'fl_oz_US', label: 'жидкая унция (США)', toBase: 29.5735296 },
    { code: 'fl_oz_UK', label: 'жидкая унция (Великобритания)', toBase: 28.4130625 },
    { code: 'jigger', label: 'джиггер (1.5 fl oz)', toBase: 44.36029 },
    { code: 'gill', label: 'джилл (US)', toBase: 118.294118 },
    { code: 'cup_US', label: 'чашка (США)', toBase: 236.5882365 },
    { code: 'cup_metric', label: 'чашка (метрическая)', toBase: 250 },
    { code: 'cup_JP', label: 'чашка 合 (Япония, 200 мл)', toBase: 200 },
    { code: 'pint_US', label: 'пинта (США)', toBase: 473.176473 },
    { code: 'pint_UK', label: 'пинта (Великобритания)', toBase: 568.26125 },
    { code: 'quart_US', label: 'кварта (США)', toBase: 946.352946 },
    { code: 'l', label: 'литр', toBase: 1000 },
    { code: 'gallon_US', label: 'галлон (США)', toBase: 3785.411784 },
    { code: 'gallon_UK', label: 'галлон (Великобритания)', toBase: 4546.09 },
  ],
});
