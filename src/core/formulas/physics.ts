/**
 * Physics formulas. Ported from extended_mode.py.
 */

import { register } from './registry';

register({
  id: 'phys.kinetic-energy',
  name: 'Кинетическая энергия',
  category: 'Физика',
  description: 'E = ½ m v²',
  expression: 'E = (1/2) · m · v²',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1 },
  ],
  compute: ({ m, v }) => ({
    result: 0.5 * m * v * v,
    unit: 'Дж',
    latex: `E = \\frac{1}{2} \\cdot ${m} \\cdot ${v}^2 = ${0.5 * m * v * v}\\,\\text{Дж}`,
  }),
});

register({
  id: 'phys.potential-energy',
  name: 'Потенциальная энергия',
  category: 'Физика',
  description: 'E = m g h',
  expression: 'E = m · g · h',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: 9.81 },
    { name: 'h', label: 'Высота', unit: 'м', default: 1 },
  ],
  compute: ({ m, g, h }) => ({
    result: m * g * h,
    unit: 'Дж',
    latex: `E = ${m} \\cdot ${g} \\cdot ${h} = ${m * g * h}\\,\\text{Дж}`,
  }),
});

register({
  id: 'phys.force',
  name: 'Второй закон Ньютона',
  category: 'Физика',
  description: 'F = m a',
  expression: 'F = m · a',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'a', label: 'Ускорение', unit: 'м/с²', default: 9.81 },
  ],
  compute: ({ m, a }) => ({
    result: m * a,
    unit: 'Н',
    latex: `F = ${m} \\cdot ${a} = ${m * a}\\,\\text{Н}`,
  }),
});

register({
  id: 'phys.centripetal',
  name: 'Центростремительная сила',
  category: 'Физика',
  description: 'F = m v² / r',
  expression: 'F = m · v² / r',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1 },
    { name: 'r', label: 'Радиус', unit: 'м', default: 1 },
  ],
  compute: ({ m, v, r }) => {
    if (r === 0) throw new Error('Radius cannot be zero');
    return {
      result: (m * v * v) / r,
      unit: 'Н',
      latex: `F = \\frac{${m} \\cdot ${v}^2}{${r}}`,
    };
  },
});

register({
  id: 'phys.photon-energy',
  name: 'Энергия фотона',
  category: 'Физика',
  description: 'E = h f',
  expression: 'E = h · f',
  inputs: [{ name: 'f', label: 'Частота', unit: 'Гц', default: 5e14 }],
  compute: ({ f }) => {
    const h = 6.62607015e-34;
    return {
      result: h * f,
      unit: 'Дж',
      latex: `E = ${h} \\cdot ${f}`,
    };
  },
});

register({
  id: 'phys.de-broglie',
  name: 'Длина волны де Бройля',
  category: 'Физика',
  description: 'λ = h / (m v)',
  expression: 'λ = h / (m · v)',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 9.10938356e-31 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1e6 },
  ],
  compute: ({ m, v }) => {
    const h = 6.62607015e-34;
    return {
      result: h / (m * v),
      unit: 'м',
      latex: `\\lambda = \\frac{h}{m v}`,
    };
  },
});

register({
  id: 'phys.hydrostatic',
  name: 'Гидростатическое давление',
  category: 'Физика',
  description: 'P = ρ g h',
  expression: 'P = ρ · g · h',
  inputs: [
    { name: 'rho', label: 'Плотность жидкости', unit: 'кг/м³', default: 1000 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: 9.81 },
    { name: 'h', label: 'Глубина', unit: 'м', default: 1 },
  ],
  compute: ({ rho, g, h }) => ({
    result: rho * g * h,
    unit: 'Па',
    latex: `P = ${rho} \\cdot ${g} \\cdot ${h}`,
  }),
});
