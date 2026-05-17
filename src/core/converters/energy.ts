/**
 * Энергия. Базовая единица — джоуль.
 */

import { register } from './registry';

register({
  id: 'energy',
  name: 'Энергия',
  category: 'energy',
  units: [
    { code: 'eV', label: 'электронвольт', toBase: 1.602176634e-19 },
    { code: 'keV', label: 'килоэлектронвольт', toBase: 1.602176634e-16 },
    { code: 'MeV', label: 'мегаэлектронвольт', toBase: 1.602176634e-13 },
    { code: 'erg', label: 'эрг', toBase: 1e-7 },
    { code: 'J', label: 'джоуль', toBase: 1 },
    { code: 'cal', label: 'калория (термохим.)', toBase: 4.184 },
    { code: 'kJ', label: 'килоджоуль', toBase: 1000 },
    { code: 'BTU', label: 'британская тепловая единица', toBase: 1055.05585262 },
    { code: 'kcal', label: 'килокалория (пищевая)', toBase: 4184 },
    { code: 'Wh', label: 'ватт-час', toBase: 3600 },
    { code: 'MJ', label: 'мегаджоуль', toBase: 1e6 },
    { code: 'kWh', label: 'киловатт-час', toBase: 3.6e6 },
    { code: 'therm', label: 'терм (US)', toBase: 1.054804e8 },
    { code: 'GJ', label: 'гигаджоуль', toBase: 1e9 },
    { code: 'MWh', label: 'мегаватт-час', toBase: 3.6e9 },
    { code: 'tTNT', label: 'тонна тротилового эквивалента', toBase: 4.184e9 },
    { code: 'ktTNT', label: 'килотонна ТНТ', toBase: 4.184e12 },
    { code: 'MtTNT', label: 'мегатонна ТНТ', toBase: 4.184e15 },
  ],
});
