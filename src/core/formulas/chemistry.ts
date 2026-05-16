/**
 * Chemistry formulas.
 */

import { register } from './registry';

register({
  id: 'chem.ideal-gas',
  name: 'Уравнение Менделеева-Клапейрона',
  category: 'Химия',
  description: 'PV = nRT',
  expression: 'P = n · R · T / V',
  inputs: [
    { name: 'n', label: 'Количество вещества', unit: 'моль', default: 1 },
    { name: 'T', label: 'Температура', unit: 'К', default: 273.15 },
    { name: 'V', label: 'Объём', unit: 'м³', default: 0.0224 },
  ],
  compute: ({ n, T, V }) => {
    if (V === 0) throw new Error('Volume cannot be zero');
    const R = 8.314462618;
    return {
      result: (n * R * T) / V,
      unit: 'Па',
      latex: `P = \\frac{nRT}{V} = \\frac{${n} \\cdot ${R} \\cdot ${T}}{${V}}`,
    };
  },
});

register({
  id: 'chem.ph',
  name: 'pH раствора',
  category: 'Химия',
  description: 'pH = -log₁₀[H⁺]',
  expression: 'pH = −log₁₀(c)',
  inputs: [{ name: 'c', label: 'Концентрация H⁺', unit: 'моль/л', default: 1e-7 }],
  compute: ({ c }) => {
    if (c <= 0) throw new Error('Concentration must be positive');
    return {
      result: -Math.log10(c),
      unit: '',
      latex: `pH = -\\log_{10}(${c})`,
    };
  },
});

register({
  id: 'chem.heat-capacity',
  name: 'Количество теплоты',
  category: 'Химия',
  description: 'Q = c m ΔT',
  expression: 'Q = c · m · ΔT',
  inputs: [
    { name: 'c', label: 'Удельная теплоёмкость', unit: 'Дж/(кг·К)', default: 4186 },
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'dT', label: 'Изменение температуры', unit: 'К', default: 10 },
  ],
  compute: ({ c, m, dT }) => ({
    result: c * m * dT,
    unit: 'Дж',
    latex: `Q = ${c} \\cdot ${m} \\cdot ${dT}`,
  }),
});
