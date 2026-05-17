/**
 * Теплопередача.
 */

import { register } from './registry';

const SIGMA = 5.670374419e-8;

register({
  id: 'heat.conduction',
  name: 'Теплопередача через стенку (Фурье)',
  category: 'Теплопередача',
  description: 'Q = k · A · ΔT / L',
  expression: 'Q = k · A · ΔT / L',
  inputs: [
    { name: 'k', label: 'Теплопроводность', unit: 'Вт/(м·К)', default: 0.04 },
    { name: 'A', label: 'Площадь стенки', unit: 'м²', default: 10 },
    { name: 'dT', label: 'Перепад температур', unit: 'К', default: 30 },
    { name: 'L', label: 'Толщина', unit: 'м', default: 0.1 },
  ],
  compute: ({ k, A, dT, L }) => {
    if (L === 0) throw new Error('Толщина не может быть нулём');
    return {
      result: (k * A * dT) / L,
      unit: 'Вт',
      latex: `Q = \\frac{k A \\Delta T}{L}`,
    };
  },
});

register({
  id: 'heat.convection',
  name: 'Конвективный теплообмен (Ньютон)',
  category: 'Теплопередача',
  description: 'Q = h · A · ΔT',
  expression: 'Q = h · A · ΔT',
  inputs: [
    { name: 'h', label: 'Коэффициент теплоотдачи', unit: 'Вт/(м²·К)', default: 25 },
    { name: 'A', label: 'Площадь', unit: 'м²', default: 1 },
    { name: 'dT', label: 'Разность температур', unit: 'К', default: 20 },
  ],
  compute: ({ h, A, dT }) => ({
    result: h * A * dT,
    unit: 'Вт',
    latex: `Q = h A \\Delta T`,
  }),
});

register({
  id: 'heat.radiation-net',
  name: 'Теплоотдача излучением',
  category: 'Теплопередача',
  description: 'Q = ε · σ · A · (T₁⁴ − T₂⁴)',
  expression: 'Q = ε · σ · A · (T₁⁴ − T₂⁴)',
  inputs: [
    { name: 'epsilon', label: 'Излучательная способность ε (0…1)', default: 0.9 },
    { name: 'A', label: 'Площадь', unit: 'м²', default: 1 },
    { name: 'T1', label: 'Температура тела', unit: 'К', default: 400 },
    { name: 'T2', label: 'Температура среды', unit: 'К', default: 300 },
  ],
  compute: ({ epsilon, A, T1, T2 }) => ({
    result: epsilon * SIGMA * A * (Math.pow(T1, 4) - Math.pow(T2, 4)),
    unit: 'Вт',
    latex: `Q = \\varepsilon \\sigma A (T_1^4 - T_2^4)`,
  }),
});

register({
  id: 'heat.thermal-resistance',
  name: 'Термическое сопротивление стенки',
  category: 'Теплопередача',
  description: 'R = L / (k · A)',
  expression: 'R = L / (k · A)',
  inputs: [
    { name: 'L', label: 'Толщина', unit: 'м', default: 0.1 },
    { name: 'k', label: 'Теплопроводность', unit: 'Вт/(м·К)', default: 0.04 },
    { name: 'A', label: 'Площадь', unit: 'м²', default: 1 },
  ],
  compute: ({ L, k, A }) => {
    if (k * A === 0) throw new Error('k·A равно нулю');
    return {
      result: L / (k * A),
      unit: 'К/Вт',
      latex: `R = \\frac{L}{kA}`,
    };
  },
});

register({
  id: 'heat.biot',
  name: 'Число Био',
  category: 'Теплопередача',
  description: 'Bi = h · L / k — критерий применимости сосредоточенной модели',
  expression: 'Bi = h · L / k',
  inputs: [
    { name: 'h', label: 'Коэффициент теплоотдачи', unit: 'Вт/(м²·К)', default: 25 },
    { name: 'L', label: 'Характерный размер', unit: 'м', default: 0.05 },
    { name: 'k', label: 'Теплопроводность', unit: 'Вт/(м·К)', default: 200 },
  ],
  compute: ({ h, L, k }) => {
    if (k === 0) throw new Error('k не может быть нулём');
    return {
      result: (h * L) / k,
      latex: `Bi = \\frac{h L}{k}`,
    };
  },
});
