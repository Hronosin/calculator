/**
 * Древнерусские меры длины (Россия XIX в.).
 * Базовая — метр.
 */

import { register } from './registry';

register({
  id: 'old-russian-length',
  name: 'Древнерусские меры (длина)',
  category: 'historical',
  units: [
    { code: 'м', label: 'метр', toBase: 1 },
    { code: 'точка', label: 'точка', toBase: 0.000254 },
    { code: 'линия', label: 'линия (10 точек)', toBase: 0.00254 },
    { code: 'дюйм', label: 'дюйм русский', toBase: 0.0254 },
    { code: 'вершок', label: 'вершок', toBase: 0.04445 },
    { code: 'пядь', label: 'пядь малая', toBase: 0.1778 },
    { code: 'четверть', label: 'четверть аршина', toBase: 0.1778 },
    { code: 'фут', label: 'фут русский', toBase: 0.3048 },
    { code: 'локоть', label: 'локоть', toBase: 0.4445 },
    { code: 'аршин', label: 'аршин', toBase: 0.7112 },
    { code: 'сажень', label: 'сажень', toBase: 2.1336 },
    { code: 'верста', label: 'верста', toBase: 1066.8 },
    { code: 'миля', label: 'миля русская (7 вёрст)', toBase: 7467.6 },
  ],
});
