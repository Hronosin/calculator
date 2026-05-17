/**
 * Радиационный фон. Базовая — микрозиверт в час (μSv/h).
 * Включает шуточный banana equivalent dose для масштаба.
 */

import { register } from './registry';

register({
  id: 'radiation-rate',
  name: 'Радиационный фон',
  category: 'radioactivity',
  units: [
    { code: 'nSv/h', label: 'наносиверт в час', toBase: 0.001 },
    { code: 'μSv/h', label: 'микрозиверт в час', toBase: 1 },
    { code: 'mSv/h', label: 'миллизиверт в час', toBase: 1000 },
    { code: 'Sv/h', label: 'зиверт в час', toBase: 1e6 },
    { code: 'μrem/h', label: 'микробэр в час', toBase: 0.01 },
    { code: 'mrem/h', label: 'миллибэр в час', toBase: 10 },
    { code: 'rem/h', label: 'бэр в час', toBase: 10000 },
    // Bench-marks
    { code: 'banana', label: 'банановый эквивалент BED (0.1 μSv разово)', toBase: 0.0001 },
    { code: 'natural', label: 'естественный фон (≈ 0.1–0.3 μSv/h)', toBase: 0.2 },
    { code: 'flight', label: 'трансатлантический рейс (≈ 5 μSv/h)', toBase: 5 },
    { code: 'chest-xray', label: 'рентген грудной клетки (разово ≈ 100 μSv)', toBase: 100 },
    { code: 'ct-scan', label: 'КТ всего тела (разово ≈ 10 mSv)', toBase: 1e4 },
    { code: 'chernobyl-acute', label: 'острый фон Чернобыля 1986 (5 Sv/h)', toBase: 5e6 },
  ],
});
