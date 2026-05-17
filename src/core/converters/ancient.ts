/**
 * Античные меры (римские, греческие, библейские).
 * Базовая длина — метр, масса — килограмм.
 */

import { register } from './registry';

register({
  id: 'ancient-length',
  name: 'Античные меры (длина)',
  category: 'historical',
  units: [
    { code: 'm', label: 'метр', toBase: 1 },
    // Древнеегипетские
    { code: 'цубит', label: 'локоть египетский (cubit)', toBase: 0.5236 },
    { code: 'royal cubit', label: 'царский локоть', toBase: 0.525 },
    // Древнееврейские
    { code: 'ладонь', label: 'ладонь (tefah)', toBase: 0.075 },
    { code: 'span', label: 'span (zeret)', toBase: 0.225 },
    { code: 'локоть_евр', label: 'локоть еврейский (ammah)', toBase: 0.4572 },
    // Греческие
    { code: 'daktylos', label: 'дактиль (греч.)', toBase: 0.01927 },
    { code: 'pous', label: 'pous / фут греческий', toBase: 0.30833 },
    { code: 'pechys', label: 'pechys / локоть греческий', toBase: 0.4625 },
    { code: 'orguia', label: 'orguia / сажень греческая', toBase: 1.85 },
    { code: 'plethron', label: 'plethron', toBase: 30.83 },
    { code: 'stadion', label: 'стадий (греческий)', toBase: 185 },
    // Римские
    { code: 'digitus', label: 'digitus / палец римский', toBase: 0.01848 },
    { code: 'uncia', label: 'uncia (1/12 фута)', toBase: 0.024665 },
    { code: 'pes', label: 'pes / фут римский', toBase: 0.2965 },
    { code: 'cubitus', label: 'cubitus / локоть римский', toBase: 0.4445 },
    { code: 'passus', label: 'passus / шаг двойной', toBase: 1.4825 },
    { code: 'stadium_rom', label: 'стадий римский', toBase: 185.25 },
    { code: 'mille_passuum', label: 'mille passuum / римская миля', toBase: 1482.5 },
  ],
});

register({
  id: 'ancient-mass',
  name: 'Античные меры (масса)',
  category: 'historical',
  units: [
    { code: 'kg', label: 'килограмм', toBase: 1 },
    // Римские
    { code: 'scrupulum', label: 'scrupulum', toBase: 1.137e-3 },
    { code: 'siliqua', label: 'siliqua', toBase: 1.892e-4 },
    { code: 'denarius_mass', label: 'denarius (вес монеты)', toBase: 3.41e-3 },
    { code: 'uncia_mass', label: 'uncia (1/12 либры)', toBase: 0.02728 },
    { code: 'libra', label: 'libra / римский фунт', toBase: 0.32745 },
    // Греческие
    { code: 'drachma_mass', label: 'драхма (вес)', toBase: 4.31e-3 },
    { code: 'mina', label: 'мина', toBase: 0.4309 },
    { code: 'talanton', label: 'талант (греческий)', toBase: 25.85 },
    // Древнееврейские
    { code: 'shekel_mass', label: 'шекель (вес)', toBase: 0.01142 },
    { code: 'kikkar', label: 'киккар (талант евр.)', toBase: 34.27 },
  ],
});
