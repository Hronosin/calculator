/**
 * Ядерная физика и радиация.
 */

import { register } from './registry';

const C = 299792458;
const E_CHARGE = 1.602176634e-19;
const U_AMU = 931.494102; // MeV per amu

register({
  id: 'nuc.activity',
  name: 'Активность радионуклида',
  category: 'Ядерная физика',
  description: 'A = λ N',
  expression: 'A = λ · N',
  inputs: [
    { name: 'lambda', label: 'Постоянная распада', unit: '1/с', default: 1e-5 },
    { name: 'N', label: 'Число ядер', default: 1e20 },
  ],
  compute: ({ lambda, N }) => ({
    result: lambda * N,
    unit: 'Бк',
    latex: `A = \\lambda N`,
  }),
});

register({
  id: 'nuc.decay-constant',
  name: 'Постоянная распада из периода полураспада',
  category: 'Ядерная физика',
  description: 'λ = ln(2) / T₁/₂',
  expression: 'λ = ln(2) / T₁/₂',
  inputs: [{ name: 'T_half', label: 'Период полураспада', unit: 'с', default: 138.4 * 86400 }],
  compute: ({ T_half }) => {
    if (T_half <= 0) throw new Error('T₁/₂ должен быть положительным');
    return {
      result: Math.LN2 / T_half,
      unit: '1/с',
      latex: `\\lambda = \\frac{\\ln 2}{T_{1/2}}`,
    };
  },
});

register({
  id: 'nuc.decay-remaining',
  name: 'Оставшееся количество ядер после времени t',
  category: 'Ядерная физика',
  description: 'N(t) = N₀ · (1/2)^(t / T₁/₂)',
  expression: 'N(t) = N₀ · (1/2)^(t / T₁/₂)',
  inputs: [
    { name: 'N0', label: 'Начальное число ядер', default: 1e10 },
    { name: 't', label: 'Прошедшее время', unit: 'с', default: 86400 },
    { name: 'T_half', label: 'Период полураспада', unit: 'с', default: 86400 },
  ],
  compute: ({ N0, t, T_half }) => {
    if (T_half <= 0) throw new Error('T₁/₂ должен быть положительным');
    return {
      result: N0 * Math.pow(0.5, t / T_half),
      latex: `N(t) = N_0 \\cdot 2^{-t/T_{1/2}}`,
    };
  },
});

register({
  id: 'nuc.binding-energy',
  name: 'Энергия связи ядра (по дефекту массы)',
  category: 'Ядерная физика',
  description: 'E = Δm · c² (в МэВ через 931.494)',
  expression: 'E = Δm · 931.494 МэВ/а.е.м.',
  inputs: [{ name: 'dm', label: 'Дефект массы', unit: 'а.е.м.', default: 0.03 }],
  compute: ({ dm }) => ({
    result: dm * U_AMU,
    unit: 'МэВ',
    latex: `E = \\Delta m \\cdot 931.494\\,\\text{МэВ/а.е.м.}`,
  }),
});

register({
  id: 'nuc.dose-rate',
  name: 'Эквивалентная доза',
  category: 'Ядерная физика',
  description: 'H = Q · D — взвешенная доза с учётом типа излучения',
  expression: 'H = Q · D',
  inputs: [
    { name: 'Q', label: 'Коэффициент качества (фотоны=1, α=20)', default: 1 },
    { name: 'D', label: 'Поглощённая доза', unit: 'Гр', default: 0.01 },
  ],
  compute: ({ Q, D }) => ({
    result: Q * D,
    unit: 'Зв',
    latex: `H = Q \\cdot D`,
  }),
});

register({
  id: 'nuc.kinetic-energy-relativistic',
  name: 'Кинетическая энергия релятивистской частицы',
  category: 'Ядерная физика',
  description: 'T = (γ − 1) m c²',
  expression: 'T = (γ − 1) · m · c²',
  inputs: [
    { name: 'm', label: 'Масса покоя', unit: 'кг', default: 9.10938356e-31 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e8 },
  ],
  compute: ({ m, v }) => {
    const beta2 = (v * v) / (C * C);
    if (beta2 >= 1) throw new Error('Скорость не может достигать или превышать c');
    const gamma = 1 / Math.sqrt(1 - beta2);
    const T_joules = (gamma - 1) * m * C * C;
    return {
      result: T_joules / (E_CHARGE * 1e6),
      unit: 'МэВ',
      latex: `T = (\\gamma - 1) m c^2`,
    };
  },
});
