/**
 * Электротехника (схемотехника, цепи).
 * Физика полей и фундаментальные законы — в electromagnetism.ts.
 */

import { register } from './registry';

register({
  id: 'elec.ohms-law',
  name: 'Закон Ома',
  category: 'Электротехника',
  description: 'U = I R',
  expression: 'U = I · R',
  inputs: [
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
    { name: 'R', label: 'Сопротивление', unit: 'Ом', default: 100 },
  ],
  compute: ({ I, R }) => ({
    result: I * R,
    unit: 'В',
    latex: `U = ${I} \\cdot ${R}`,
  }),
});

register({
  id: 'elec.power',
  name: 'Электрическая мощность (P = UI)',
  category: 'Электротехника',
  description: 'P = U I',
  expression: 'P = U · I',
  inputs: [
    { name: 'U', label: 'Напряжение', unit: 'В', default: 220 },
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
  ],
  compute: ({ U, I }) => ({
    result: U * I,
    unit: 'Вт',
    latex: `P = ${U} \\cdot ${I}`,
  }),
});

register({
  id: 'elec.power-i2r',
  name: 'Мощность (P = I²R)',
  category: 'Электротехника',
  description: 'P = I² R',
  expression: 'P = I² · R',
  inputs: [
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
    { name: 'R', label: 'Сопротивление', unit: 'Ом', default: 100 },
  ],
  compute: ({ I, R }) => ({
    result: I * I * R,
    unit: 'Вт',
    latex: `P = I^2 R = ${I}^2 \\cdot ${R}`,
  }),
});

register({
  id: 'elec.series-resistance',
  name: 'Последовательное соединение резисторов',
  category: 'Электротехника',
  description: 'R = R₁ + R₂',
  expression: 'R = R₁ + R₂',
  inputs: [
    { name: 'R1', label: 'Сопротивление 1', unit: 'Ом', default: 100 },
    { name: 'R2', label: 'Сопротивление 2', unit: 'Ом', default: 200 },
  ],
  compute: ({ R1, R2 }) => ({
    result: R1 + R2,
    unit: 'Ом',
    latex: `R = R_1 + R_2`,
  }),
});

register({
  id: 'elec.parallel-resistance',
  name: 'Параллельное соединение резисторов',
  category: 'Электротехника',
  description: 'R = R₁R₂ / (R₁+R₂)',
  expression: 'R = (R₁ · R₂) / (R₁ + R₂)',
  inputs: [
    { name: 'R1', label: 'Сопротивление 1', unit: 'Ом', default: 100 },
    { name: 'R2', label: 'Сопротивление 2', unit: 'Ом', default: 200 },
  ],
  compute: ({ R1, R2 }) => {
    if (R1 + R2 === 0) throw new Error('Sum is zero');
    return {
      result: (R1 * R2) / (R1 + R2),
      unit: 'Ом',
      latex: `R = \\frac{R_1 R_2}{R_1 + R_2}`,
    };
  },
});

register({
  id: 'elec.parallel-capacitance',
  name: 'Параллельное соединение конденсаторов',
  category: 'Электротехника',
  description: 'C = C₁ + C₂',
  expression: 'C = C₁ + C₂',
  inputs: [
    { name: 'C1', label: 'Ёмкость 1', unit: 'Ф', default: 1e-6 },
    { name: 'C2', label: 'Ёмкость 2', unit: 'Ф', default: 2e-6 },
  ],
  compute: ({ C1, C2 }) => ({
    result: C1 + C2,
    unit: 'Ф',
    latex: `C = C_1 + C_2`,
  }),
});

register({
  id: 'elec.series-capacitance',
  name: 'Последовательное соединение конденсаторов',
  category: 'Электротехника',
  description: 'C = C₁C₂ / (C₁+C₂)',
  expression: 'C = (C₁ · C₂) / (C₁ + C₂)',
  inputs: [
    { name: 'C1', label: 'Ёмкость 1', unit: 'Ф', default: 1e-6 },
    { name: 'C2', label: 'Ёмкость 2', unit: 'Ф', default: 2e-6 },
  ],
  compute: ({ C1, C2 }) => {
    if (C1 + C2 === 0) throw new Error('Sum is zero');
    return {
      result: (C1 * C2) / (C1 + C2),
      unit: 'Ф',
      latex: `C = \\frac{C_1 C_2}{C_1 + C_2}`,
    };
  },
});

register({
  id: 'elec.capacitor-plate',
  name: 'Ёмкость плоского конденсатора',
  category: 'Электротехника',
  description: 'C = ε₀ ε A / d',
  expression: 'C = ε₀ · ε · A / d',
  inputs: [
    { name: 'epsilon', label: 'Относительная диэлектрическая', default: 1 },
    { name: 'A', label: 'Площадь обкладок', unit: 'м²', default: 0.01 },
    { name: 'd', label: 'Расстояние между обкладками', unit: 'м', default: 0.001 },
  ],
  compute: ({ epsilon, A, d }) => {
    if (d === 0) throw new Error('Distance cannot be zero');
    return {
      result: (8.8541878128e-12 * epsilon * A) / d,
      unit: 'Ф',
      latex: `C = \\frac{\\varepsilon_0 \\varepsilon A}{d}`,
    };
  },
});

register({
  id: 'elec.material-resistance',
  name: 'Сопротивление проводника',
  category: 'Электротехника',
  description: 'R = ρ L / A',
  expression: 'R = ρ · L / A',
  inputs: [
    { name: 'rho', label: 'Удельное сопротивление', unit: 'Ом·м', default: 1.68e-8 },
    { name: 'L', label: 'Длина', unit: 'м', default: 1 },
    { name: 'A', label: 'Сечение', unit: 'м²', default: 1e-6 },
  ],
  compute: ({ rho, L, A }) => {
    if (A === 0) throw new Error('Cross-section cannot be zero');
    return {
      result: (rho * L) / A,
      unit: 'Ом',
      latex: `R = \\frac{\\rho L}{A}`,
    };
  },
});

register({
  id: 'elec.voltage-divider',
  name: 'Делитель напряжения',
  category: 'Электротехника',
  description: 'U_out = U_in · R₂ / (R₁ + R₂)',
  expression: 'U_out = U_in · R₂ / (R₁ + R₂)',
  inputs: [
    { name: 'Uin', label: 'Входное напряжение', unit: 'В', default: 12 },
    { name: 'R1', label: 'Сопротивление 1', unit: 'Ом', default: 1000 },
    { name: 'R2', label: 'Сопротивление 2', unit: 'Ом', default: 1000 },
  ],
  compute: ({ Uin, R1, R2 }) => {
    if (R1 + R2 === 0) throw new Error('Total resistance cannot be zero');
    return {
      result: (Uin * R2) / (R1 + R2),
      unit: 'В',
      latex: `U_{out} = U_{in} \\frac{R_2}{R_1 + R_2}`,
    };
  },
});

register({
  id: 'elec.rc-time',
  name: 'Постоянная времени RC-цепи',
  category: 'Электротехника',
  description: 'τ = R C',
  expression: 'τ = R · C',
  inputs: [
    { name: 'R', label: 'Сопротивление', unit: 'Ом', default: 1000 },
    { name: 'C', label: 'Ёмкость', unit: 'Ф', default: 1e-6 },
  ],
  compute: ({ R, C }) => ({
    result: R * C,
    unit: 'с',
    latex: `\\tau = RC`,
  }),
});

register({
  id: 'elec.rl-time',
  name: 'Постоянная времени RL-цепи',
  category: 'Электротехника',
  description: 'τ = L / R',
  expression: 'τ = L / R',
  inputs: [
    { name: 'L', label: 'Индуктивность', unit: 'Гн', default: 1e-3 },
    { name: 'R', label: 'Сопротивление', unit: 'Ом', default: 100 },
  ],
  compute: ({ L, R }) => {
    if (R === 0) throw new Error('R cannot be zero');
    return {
      result: L / R,
      unit: 'с',
      latex: `\\tau = \\frac{L}{R}`,
    };
  },
});

register({
  id: 'elec.capacitive-reactance',
  name: 'Реактивное сопротивление конденсатора',
  category: 'Электротехника',
  description: 'X_C = 1 / (2π f C)',
  expression: 'X_C = 1 / (2π · f · C)',
  inputs: [
    { name: 'f', label: 'Частота', unit: 'Гц', default: 50 },
    { name: 'C', label: 'Ёмкость', unit: 'Ф', default: 1e-6 },
  ],
  compute: ({ f, C }) => {
    if (f * C === 0) throw new Error('Invalid f or C');
    return {
      result: 1 / (2 * Math.PI * f * C),
      unit: 'Ом',
      latex: `X_C = \\frac{1}{2\\pi f C}`,
    };
  },
});

register({
  id: 'elec.inductive-reactance',
  name: 'Реактивное сопротивление катушки',
  category: 'Электротехника',
  description: 'X_L = 2π f L',
  expression: 'X_L = 2π · f · L',
  inputs: [
    { name: 'f', label: 'Частота', unit: 'Гц', default: 50 },
    { name: 'L', label: 'Индуктивность', unit: 'Гн', default: 1e-3 },
  ],
  compute: ({ f, L }) => ({
    result: 2 * Math.PI * f * L,
    unit: 'Ом',
    latex: `X_L = 2\\pi f L`,
  }),
});

register({
  id: 'elec.rms',
  name: 'Действующее значение AC (RMS)',
  category: 'Электротехника',
  description: 'V_rms = V_peak / √2',
  expression: 'V_rms = V_peak / √2',
  inputs: [{ name: 'Vpeak', label: 'Амплитудное значение', unit: 'В', default: 311 }],
  compute: ({ Vpeak }) => ({
    result: Vpeak / Math.sqrt(2),
    unit: 'В',
    latex: `V_{rms} = \\frac{V_{peak}}{\\sqrt{2}}`,
  }),
});
