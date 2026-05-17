/**
 * Химия.
 */

import { register } from './registry';

const R_GAS = 8.314462618;
const N_A = 6.02214076e23;
const F_FARADAY = 96485.33212;

register({
  id: 'chem.ideal-gas',
  name: 'Уравнение Менделеева–Клапейрона',
  category: 'Химия',
  description: 'PV = nRT',
  expression: 'P = n · R · T / V',
  inputs: [
    { name: 'n', label: 'Количество вещества', unit: 'моль', default: 1 },
    { name: 'T', label: 'Температура', unit: 'К', default: 273.15 },
    { name: 'V', label: 'Объём', unit: 'м³', default: 0.0224 },
  ],
  compute: ({ n, T, V }) => {
    if (V === 0) throw new Error('V cannot be zero');
    return {
      result: (n * R_GAS * T) / V,
      unit: 'Па',
      latex: `P = \\frac{nRT}{V}`,
    };
  },
});

register({
  id: 'chem.ph',
  name: 'pH раствора',
  category: 'Химия',
  description: 'pH = −log₁₀[H⁺]',
  expression: 'pH = −log₁₀(c)',
  inputs: [{ name: 'c', label: 'Концентрация H⁺', unit: 'моль/л', default: 1e-7 }],
  compute: ({ c }) => {
    if (c <= 0) throw new Error('Concentration must be positive');
    return {
      result: -Math.log10(c),
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

register({
  id: 'chem.avogadro',
  name: 'Число молекул через моль',
  category: 'Химия',
  description: 'N = n · N_A',
  expression: 'N = n · N_A',
  inputs: [{ name: 'n', label: 'Количество вещества', unit: 'моль', default: 1 }],
  compute: ({ n }) => ({
    result: n * N_A,
    latex: `N = n N_A`,
  }),
});

register({
  id: 'chem.molarity',
  name: 'Молярная концентрация',
  category: 'Химия',
  description: 'c = n / V',
  expression: 'c = n / V',
  inputs: [
    { name: 'n', label: 'Количество вещества', unit: 'моль', default: 1 },
    { name: 'V', label: 'Объём раствора', unit: 'л', default: 1 },
  ],
  compute: ({ n, V }) => {
    if (V === 0) throw new Error('V cannot be zero');
    return {
      result: n / V,
      unit: 'моль/л',
      latex: `c = \\frac{n}{V}`,
    };
  },
});

register({
  id: 'chem.arrhenius',
  name: 'Уравнение Аррениуса',
  category: 'Химия',
  description: 'k = A · exp(−Eₐ/RT)',
  expression: 'k = A · e^(−Ea / (R·T))',
  inputs: [
    { name: 'A', label: 'Предэкспоненциальный множитель', default: 1e10 },
    { name: 'Ea', label: 'Энергия активации', unit: 'Дж/моль', default: 50000 },
    { name: 'T', label: 'Температура', unit: 'К', default: 298.15 },
  ],
  compute: ({ A, Ea, T }) => ({
    result: A * Math.exp(-Ea / (R_GAS * T)),
    latex: `k = A e^{-E_a / (RT)}`,
  }),
});

register({
  id: 'chem.henderson-hasselbalch',
  name: 'Уравнение Гендерсона–Хассельбаха',
  category: 'Химия',
  description: 'pH = pKa + log([A⁻]/[HA])',
  expression: 'pH = pKa + log₁₀([A⁻] / [HA])',
  inputs: [
    { name: 'pKa', label: 'pKa кислоты', default: 4.76 },
    { name: 'cBase', label: 'Концентрация сопряжённого основания [A⁻]', unit: 'моль/л', default: 0.1 },
    { name: 'cAcid', label: 'Концентрация кислоты [HA]', unit: 'моль/л', default: 0.1 },
  ],
  compute: ({ pKa, cBase, cAcid }) => {
    if (cAcid <= 0) throw new Error('[HA] must be positive');
    return {
      result: pKa + Math.log10(cBase / cAcid),
      latex: `pH = pK_a + \\log_{10}\\frac{[A^-]}{[HA]}`,
    };
  },
});

register({
  id: 'chem.faraday-electrolysis',
  name: 'Закон электролиза Фарадея',
  category: 'Химия',
  description: 'm = M I t / (z F)',
  expression: 'm = M · I · t / (z · F)',
  inputs: [
    { name: 'M', label: 'Молярная масса', unit: 'кг/моль', default: 0.0635 },
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
    { name: 't', label: 'Время', unit: 'с', default: 3600 },
    { name: 'z', label: 'Валентность', default: 2 },
  ],
  compute: ({ M, I, t, z }) => {
    if (z * F_FARADAY === 0) throw new Error('Invalid z');
    return {
      result: (M * I * t) / (z * F_FARADAY),
      unit: 'кг',
      latex: `m = \\frac{M I t}{z F}`,
    };
  },
});
