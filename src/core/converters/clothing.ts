/**
 * Размеры обуви (мужские, ориентир — длина стопы в мм).
 * Базовая — длина стопы в мм.
 *
 * Это приблизительные таблицы — реальные размеры варьируются у производителей.
 */

import { register } from './registry';

register({
  id: 'shoe-size-men',
  name: 'Размеры обуви (мужские)',
  category: 'standards',
  units: [
    { code: 'mm', label: 'длина стопы (мм)', toBase: 1 },
    { code: 'cm', label: 'длина стопы (см)', toBase: 10 },
    { code: 'EU', label: 'EU (м.)', toBase: 6.67 },
    { code: 'US_M', label: 'US Men', toBase: 7.62 },
    { code: 'UK_M', label: 'UK Men', toBase: 7.62 },
    { code: 'JP', label: 'Япония (см длины)', toBase: 10 },
    { code: 'CN', label: 'Китай (мм длины)', toBase: 1 },
    { code: 'KR', label: 'Корея (мм длины)', toBase: 1 },
  ],
});

register({
  id: 'ring-size',
  name: 'Размеры колец',
  category: 'standards',
  units: [
    { code: 'mm_diam', label: 'диаметр (мм)', toBase: 1 },
    { code: 'mm_circ', label: 'окружность (мм)', toBase: 1 / Math.PI },
    { code: 'US_ring', label: 'US (1 = 12.04 мм)', toBase: 0.8128 },
    { code: 'EU_ring', label: 'EU (окружность / π)', toBase: 1 / Math.PI },
    { code: 'JP_ring', label: 'Япония', toBase: 0.3175 },
  ],
});
