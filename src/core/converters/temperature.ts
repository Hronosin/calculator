/**
 * Температура. Использует функции — нелинейные шкалы.
 * Базовая единица: Кельвин.
 */

import { register } from './registry';

register({
  id: 'temperature',
  name: 'Температура',
  category: 'temperature',
  units: [
    {
      code: 'K',
      label: 'кельвин',
      toBase: (x: number) => x,
      fromBase: (x: number) => x,
    },
    {
      code: '°C',
      label: 'градус Цельсия',
      toBase: (x: number) => x + 273.15,
      fromBase: (x: number) => x - 273.15,
    },
    {
      code: '°F',
      label: 'градус Фаренгейта',
      toBase: (x: number) => (x - 32) * (5 / 9) + 273.15,
      fromBase: (x: number) => (x - 273.15) * (9 / 5) + 32,
    },
    {
      code: '°R',
      label: 'градус Ранкина',
      toBase: (x: number) => x * (5 / 9),
      fromBase: (x: number) => x * (9 / 5),
    },
    {
      code: '°Ré',
      label: 'градус Реомюра',
      toBase: (x: number) => x * 1.25 + 273.15,
      fromBase: (x: number) => (x - 273.15) * 0.8,
    },
  ],
});
