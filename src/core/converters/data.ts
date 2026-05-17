/**
 * Цифровая информация. Базовая единица — байт.
 * Десятичные приставки (К, М, Г) кратны 1000, двоичные (Ki, Mi) — 1024.
 */

import { register } from './registry';

register({
  id: 'data',
  name: 'Данные',
  category: 'data',
  units: [
    { code: 'bit', label: 'бит', toBase: 1 / 8 },
    { code: 'B', label: 'байт', toBase: 1 },
    { code: 'kbit', label: 'килобит', toBase: 1000 / 8 },
    { code: 'kB', label: 'килобайт (10³)', toBase: 1000 },
    { code: 'KiB', label: 'кибибайт (2¹⁰)', toBase: 1024 },
    { code: 'Mbit', label: 'мегабит', toBase: 1e6 / 8 },
    { code: 'MB', label: 'мегабайт (10⁶)', toBase: 1e6 },
    { code: 'MiB', label: 'мебибайт (2²⁰)', toBase: 1048576 },
    { code: 'Gbit', label: 'гигабит', toBase: 1e9 / 8 },
    { code: 'GB', label: 'гигабайт (10⁹)', toBase: 1e9 },
    { code: 'GiB', label: 'гибибайт (2³⁰)', toBase: 1073741824 },
    { code: 'TB', label: 'терабайт (10¹²)', toBase: 1e12 },
    { code: 'TiB', label: 'тебибайт (2⁴⁰)', toBase: 1099511627776 },
    { code: 'PB', label: 'петабайт (10¹⁵)', toBase: 1e15 },
    { code: 'PiB', label: 'пебибайт (2⁵⁰)', toBase: 1125899906842624 },
    { code: 'EB', label: 'эксабайт (10¹⁸)', toBase: 1e18 },
  ],
});
