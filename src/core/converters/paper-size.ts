/**
 * Размеры бумаги (ISO 216 серии A/B + американские).
 * Базовая — м² (площадь листа).
 *
 * A-серия: A_n = (1/√2)^n м², A0 = 1 м². То есть A4 = 1/16 м² = 0.0625 м².
 */

import { register } from './registry';

register({
  id: 'paper-size',
  name: 'Размеры бумаги',
  category: 'standards',
  units: [
    { code: 'm²', label: 'квадратный метр (м²)', toBase: 1 },
    { code: 'A0', label: 'A0 (841 × 1189 мм)', toBase: 0.999949 },
    { code: 'A1', label: 'A1 (594 × 841 мм)', toBase: 0.499674 },
    { code: 'A2', label: 'A2 (420 × 594 мм)', toBase: 0.24948 },
    { code: 'A3', label: 'A3 (297 × 420 мм)', toBase: 0.12474 },
    { code: 'A4', label: 'A4 (210 × 297 мм)', toBase: 0.06237 },
    { code: 'A5', label: 'A5 (148 × 210 мм)', toBase: 0.03108 },
    { code: 'A6', label: 'A6 (105 × 148 мм)', toBase: 0.01554 },
    { code: 'A7', label: 'A7 (74 × 105 мм)', toBase: 0.00777 },
    { code: 'A8', label: 'A8 (52 × 74 мм)', toBase: 0.003848 },
    { code: 'B0', label: 'B0 (1000 × 1414 мм)', toBase: 1.414 },
    { code: 'B1', label: 'B1 (707 × 1000 мм)', toBase: 0.707 },
    { code: 'B4', label: 'B4 (250 × 353 мм)', toBase: 0.088 },
    { code: 'B5', label: 'B5 (176 × 250 мм)', toBase: 0.044 },
    { code: 'Letter', label: 'US Letter (216 × 279 мм)', toBase: 0.06032 },
    { code: 'Legal', label: 'US Legal (216 × 356 мм)', toBase: 0.07688 },
    { code: 'Tabloid', label: 'US Tabloid (279 × 432 мм)', toBase: 0.12068 },
    { code: 'Executive', label: 'US Executive (184 × 267 мм)', toBase: 0.04913 },
  ],
});
