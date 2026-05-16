/**
 * Electrical engineering formulas.
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
  name: 'Мощность электрическая',
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
    if (R1 + R2 === 0) throw new Error('Sum of resistances is zero');
    return {
      result: (R1 * R2) / (R1 + R2),
      unit: 'Ом',
      latex: `R = \\frac{R_1 R_2}{R_1 + R_2}`,
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
    const eps0 = 8.8541878128e-12;
    return {
      result: (eps0 * epsilon * A) / d,
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
