/**
 * Temperature converter — uses function-based conversion (non-linear).
 * Base unit: Kelvin.
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
  ],
});
