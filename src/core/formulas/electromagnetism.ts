/**
 * Электромагнетизм (физика).
 * Отдельно от «Электротехники» — здесь именно фундаментальная физика полей.
 */

import { register } from './registry';

const K_E = 8.9875517923e9; // Coulomb constant
const MU_0 = 1.25663706212e-6; // vacuum permeability
const EPSILON_0 = 8.8541878128e-12; // vacuum permittivity

register({
  id: 'em.coulomb',
  name: 'Закон Кулона',
  category: 'Электромагнетизм',
  description: 'F = k q₁ q₂ / r²',
  expression: 'F = k · q₁ · q₂ / r²',
  inputs: [
    { name: 'q1', label: 'Заряд 1', unit: 'Кл', default: 1e-6 },
    { name: 'q2', label: 'Заряд 2', unit: 'Кл', default: 1e-6 },
    { name: 'r', label: 'Расстояние', unit: 'м', default: 0.1 },
  ],
  compute: ({ q1, q2, r }) => {
    if (r === 0) throw new Error('Distance cannot be zero');
    return {
      result: (K_E * q1 * q2) / (r * r),
      unit: 'Н',
      latex: `F = k \\frac{q_1 q_2}{r^2}`,
    };
  },
});

register({
  id: 'em.electric-field',
  name: 'Поле точечного заряда',
  category: 'Электромагнетизм',
  description: 'E = k q / r²',
  expression: 'E = k · q / r²',
  inputs: [
    { name: 'q', label: 'Заряд', unit: 'Кл', default: 1e-6 },
    { name: 'r', label: 'Расстояние', unit: 'м', default: 0.1 },
  ],
  compute: ({ q, r }) => {
    if (r === 0) throw new Error('Distance cannot be zero');
    return {
      result: (K_E * q) / (r * r),
      unit: 'В/м',
      latex: `E = k \\frac{q}{r^2}`,
    };
  },
});

register({
  id: 'em.potential-energy',
  name: 'Потенциальная энергия двух зарядов',
  category: 'Электромагнетизм',
  description: 'U = k q₁ q₂ / r',
  expression: 'U = k · q₁ · q₂ / r',
  inputs: [
    { name: 'q1', label: 'Заряд 1', unit: 'Кл', default: 1e-6 },
    { name: 'q2', label: 'Заряд 2', unit: 'Кл', default: 1e-6 },
    { name: 'r', label: 'Расстояние', unit: 'м', default: 0.1 },
  ],
  compute: ({ q1, q2, r }) => {
    if (r === 0) throw new Error('Distance cannot be zero');
    return {
      result: (K_E * q1 * q2) / r,
      unit: 'Дж',
      latex: `U = k \\frac{q_1 q_2}{r}`,
    };
  },
});

register({
  id: 'em.lorentz-force',
  name: 'Сила Лоренца',
  category: 'Электромагнетизм',
  description: 'F = q v B sin θ',
  expression: 'F = q · v · B · sin θ',
  inputs: [
    { name: 'q', label: 'Заряд', unit: 'Кл', default: 1.6e-19 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e6 },
    { name: 'B', label: 'Магнитная индукция', unit: 'Тл', default: 0.1 },
    { name: 'theta', label: 'Угол между v и B', unit: '°', default: 90 },
  ],
  compute: ({ q, v, B, theta }) => ({
    result: q * v * B * Math.sin((theta * Math.PI) / 180),
    unit: 'Н',
    latex: `F = qvB \\sin\\theta`,
  }),
});

register({
  id: 'em.magnetic-field-wire',
  name: 'Поле прямого тока',
  category: 'Электромагнетизм',
  description: 'B = μ₀ I / (2π r)',
  expression: 'B = μ₀ · I / (2π · r)',
  inputs: [
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
    { name: 'r', label: 'Расстояние до провода', unit: 'м', default: 0.05 },
  ],
  compute: ({ I, r }) => {
    if (r === 0) throw new Error('Distance cannot be zero');
    return {
      result: (MU_0 * I) / (2 * Math.PI * r),
      unit: 'Тл',
      latex: `B = \\frac{\\mu_0 I}{2\\pi r}`,
    };
  },
});

register({
  id: 'em.solenoid-field',
  name: 'Поле внутри соленоида',
  category: 'Электромагнетизм',
  description: 'B = μ₀ n I',
  expression: 'B = μ₀ · n · I',
  inputs: [
    { name: 'n', label: 'Число витков на метр', unit: '1/м', default: 1000 },
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
  ],
  compute: ({ n, I }) => ({
    result: MU_0 * n * I,
    unit: 'Тл',
    latex: `B = \\mu_0 n I`,
  }),
});

register({
  id: 'em.capacitor-energy',
  name: 'Энергия конденсатора',
  category: 'Электромагнетизм',
  description: 'W = C U² / 2',
  expression: 'W = C · U² / 2',
  inputs: [
    { name: 'C', label: 'Ёмкость', unit: 'Ф', default: 1e-6 },
    { name: 'U', label: 'Напряжение', unit: 'В', default: 100 },
  ],
  compute: ({ C, U }) => ({
    result: 0.5 * C * U * U,
    unit: 'Дж',
    latex: `W = \\frac{CU^2}{2}`,
  }),
});

register({
  id: 'em.inductor-energy',
  name: 'Энергия катушки',
  category: 'Электромагнетизм',
  description: 'W = L I² / 2',
  expression: 'W = L · I² / 2',
  inputs: [
    { name: 'L', label: 'Индуктивность', unit: 'Гн', default: 1e-3 },
    { name: 'I', label: 'Ток', unit: 'А', default: 1 },
  ],
  compute: ({ L, I }) => ({
    result: 0.5 * L * I * I,
    unit: 'Дж',
    latex: `W = \\frac{LI^2}{2}`,
  }),
});

register({
  id: 'em.lc-resonance',
  name: 'Резонансная частота LC-контура',
  category: 'Электромагнетизм',
  description: 'f = 1 / (2π √(LC))',
  expression: 'f = 1 / (2π · √(L · C))',
  inputs: [
    { name: 'L', label: 'Индуктивность', unit: 'Гн', default: 1e-3 },
    { name: 'C', label: 'Ёмкость', unit: 'Ф', default: 1e-6 },
  ],
  compute: ({ L, C }) => {
    if (L * C <= 0) throw new Error('Invalid L or C');
    return {
      result: 1 / (2 * Math.PI * Math.sqrt(L * C)),
      unit: 'Гц',
      latex: `f = \\frac{1}{2\\pi \\sqrt{LC}}`,
    };
  },
});
