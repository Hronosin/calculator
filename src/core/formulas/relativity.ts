/**
 * Теория относительности (специальная).
 */

import { register } from './registry';

const C = 299792458; // speed of light, m/s

function gamma(v: number): number {
  const beta2 = (v * v) / (C * C);
  if (beta2 >= 1) throw new Error('Скорость должна быть меньше скорости света');
  return 1 / Math.sqrt(1 - beta2);
}

register({
  id: 'rel.lorentz-factor',
  name: 'Фактор Лоренца γ',
  category: 'Теория относительности',
  description: 'γ = 1 / √(1 − v²/c²)',
  expression: 'γ = 1 / √(1 − β²)',
  inputs: [{ name: 'v', label: 'Скорость', unit: 'м/с', default: 1e8 }],
  compute: ({ v }) => ({
    result: gamma(v),
    latex: `\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}`,
  }),
});

register({
  id: 'rel.time-dilation',
  name: 'Замедление времени',
  category: 'Теория относительности',
  description: "t' = γ · t",
  expression: "t' = t / √(1 − v²/c²)",
  inputs: [
    { name: 't', label: 'Собственное время', unit: 'с', default: 1 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e8 },
  ],
  compute: ({ t, v }) => ({
    result: gamma(v) * t,
    unit: 'с',
    latex: `t' = \\gamma t`,
  }),
});

register({
  id: 'rel.length-contraction',
  name: 'Сокращение длины',
  category: 'Теория относительности',
  description: "L' = L / γ",
  expression: "L' = L · √(1 − v²/c²)",
  inputs: [
    { name: 'L', label: 'Собственная длина', unit: 'м', default: 1 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e8 },
  ],
  compute: ({ L, v }) => ({
    result: L / gamma(v),
    unit: 'м',
    latex: `L' = L \\sqrt{1 - v^2/c^2}`,
  }),
});

register({
  id: 'rel.mass-energy',
  name: 'Эквивалентность массы и энергии',
  category: 'Теория относительности',
  description: 'E = m c²',
  expression: 'E = m · c²',
  inputs: [{ name: 'm', label: 'Масса', unit: 'кг', default: 1e-3 }],
  compute: ({ m }) => ({
    result: m * C * C,
    unit: 'Дж',
    latex: `E = ${m} \\cdot c^2`,
  }),
});

register({
  id: 'rel.relativistic-momentum',
  name: 'Релятивистский импульс',
  category: 'Теория относительности',
  description: 'p = γ m v',
  expression: 'p = γ · m · v',
  inputs: [
    { name: 'm', label: 'Масса покоя', unit: 'кг', default: 9.10938356e-31 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e8 },
  ],
  compute: ({ m, v }) => ({
    result: gamma(v) * m * v,
    unit: 'кг·м/с',
    latex: `p = \\gamma m v`,
  }),
});

register({
  id: 'rel.total-energy',
  name: 'Полная релятивистская энергия',
  category: 'Теория относительности',
  description: 'E = γ m c²',
  expression: 'E = γ · m · c²',
  inputs: [
    { name: 'm', label: 'Масса покоя', unit: 'кг', default: 9.10938356e-31 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e8 },
  ],
  compute: ({ m, v }) => ({
    result: gamma(v) * m * C * C,
    unit: 'Дж',
    latex: `E = \\gamma m c^2`,
  }),
});

register({
  id: 'rel.velocity-addition',
  name: 'Сложение скоростей (релятивистское)',
  category: 'Теория относительности',
  description: 'u = (u′ + v) / (1 + u′v/c²)',
  expression: "u = (u' + v) / (1 + u'v/c²)",
  inputs: [
    { name: 'u_prime', label: "Скорость в системе K'", unit: 'м/с', default: 1e8 },
    { name: 'v', label: 'Скорость системы K′ относительно K', unit: 'м/с', default: 2e8 },
  ],
  compute: ({ u_prime, v }) => ({
    result: (u_prime + v) / (1 + (u_prime * v) / (C * C)),
    unit: 'м/с',
    latex: `u = \\frac{u' + v}{1 + u'v/c^2}`,
  }),
});
