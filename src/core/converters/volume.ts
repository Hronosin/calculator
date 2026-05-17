/**
 * Объём. Базовая единица — литр.
 */

import { register } from './registry';

register({
  id: 'volume',
  name: 'Объём',
  category: 'volume',
  units: [
    { code: 'mm³', label: 'кубический миллиметр', toBase: 1e-6 },
    { code: 'ml', label: 'миллилитр', toBase: 0.001 },
    { code: 'cm³', label: 'кубический сантиметр', toBase: 0.001 },
    { code: 'cl', label: 'сантилитр', toBase: 0.01 },
    { code: 'dl', label: 'децилитр', toBase: 0.1 },
    { code: 'l', label: 'литр', toBase: 1 },
    { code: 'dm³', label: 'кубический дециметр', toBase: 1 },
    { code: 'hl', label: 'гектолитр', toBase: 100 },
    { code: 'm³', label: 'кубический метр', toBase: 1000 },
    { code: 'km³', label: 'кубический километр', toBase: 1e12 },
    { code: 'tsp', label: 'чайная ложка (US)', toBase: 4.92892159375e-3 },
    { code: 'tbsp', label: 'столовая ложка (US)', toBase: 14.7867647812e-3 },
    { code: 'fl oz', label: 'жидкая унция (US)', toBase: 29.5735295625e-3 },
    { code: 'cup', label: 'чашка (US)', toBase: 0.2365882365 },
    { code: 'pt', label: 'пинта (US)', toBase: 0.473176473 },
    { code: 'qt', label: 'кварта (US)', toBase: 0.946352946 },
    { code: 'gal US', label: 'галлон США', toBase: 3.785411784 },
    { code: 'gal UK', label: 'галлон Великобритании', toBase: 4.54609 },
    { code: 'bbl', label: 'баррель нефтяной', toBase: 158.987294928 },
    { code: 'in³', label: 'кубический дюйм', toBase: 0.016387064 },
    { code: 'ft³', label: 'кубический фут', toBase: 28.316846592 },
    { code: 'yd³', label: 'кубический ярд', toBase: 764.554857984 },
  ],
});
