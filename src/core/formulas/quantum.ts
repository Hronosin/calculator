/**
 * Квантовая физика.
 */

import { register } from './registry';

const H = 6.62607015e-34; // Planck
const HBAR = 1.054571817e-34;
const C = 299792458;
const M_E = 9.1093837015e-31; // electron mass
const E_CHARGE = 1.602176634e-19;

register({
  id: 'qm.heisenberg',
  name: 'Принцип неопределённости Гейзенберга',
  category: 'Квантовая физика',
  description: 'Δx · Δp ≥ ℏ / 2  →  минимум Δp',
  expression: 'Δp ≥ ℏ / (2 · Δx)',
  inputs: [{ name: 'dx', label: 'Неопределённость координаты', unit: 'м', default: 1e-10 }],
  compute: ({ dx }) => {
    if (dx <= 0) throw new Error('Δx must be positive');
    return {
      result: HBAR / (2 * dx),
      unit: 'кг·м/с',
      latex: `\\Delta p \\geq \\frac{\\hbar}{2 \\Delta x}`,
    };
  },
});

register({
  id: 'qm.photon-momentum',
  name: 'Импульс фотона',
  category: 'Квантовая физика',
  description: 'p = h / λ',
  expression: 'p = h / λ',
  inputs: [{ name: 'lambda', label: 'Длина волны', unit: 'м', default: 500e-9 }],
  compute: ({ lambda }) => {
    if (lambda <= 0) throw new Error('λ must be positive');
    return {
      result: H / lambda,
      unit: 'кг·м/с',
      latex: `p = \\frac{h}{${lambda}}`,
    };
  },
});

register({
  id: 'qm.bohr-energy',
  name: 'Энергия уровня водорода (модель Бора)',
  category: 'Квантовая физика',
  description: 'E_n = −13.6 эВ / n²',
  expression: 'E_n = −13.6 / n²',
  inputs: [{ name: 'n', label: 'Главное квантовое число', default: 1 }],
  compute: ({ n }) => {
    if (!Number.isInteger(n) || n <= 0) throw new Error('n должно быть натуральным числом');
    return {
      result: -13.6 / (n * n),
      unit: 'эВ',
      latex: `E_n = -\\frac{13.6}{${n}^2}`,
    };
  },
});

register({
  id: 'qm.compton',
  name: 'Эффект Комптона',
  category: 'Квантовая физика',
  description: 'Δλ = (h / m_e c) · (1 − cos θ)',
  expression: 'Δλ = λ_C · (1 − cos θ)',
  inputs: [{ name: 'theta', label: 'Угол рассеяния', unit: '°', default: 90 }],
  compute: ({ theta }) => {
    const lambdaC = H / (M_E * C);
    return {
      result: lambdaC * (1 - Math.cos((theta * Math.PI) / 180)),
      unit: 'м',
      latex: `\\Delta\\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)`,
    };
  },
});

register({
  id: 'qm.photon-energy-wavelength',
  name: 'Энергия фотона по длине волны',
  category: 'Квантовая физика',
  description: 'E = h c / λ',
  expression: 'E = h · c / λ',
  inputs: [{ name: 'lambda', label: 'Длина волны', unit: 'м', default: 500e-9 }],
  compute: ({ lambda }) => {
    if (lambda <= 0) throw new Error('λ must be positive');
    return {
      result: (H * C) / lambda,
      unit: 'Дж',
      latex: `E = \\frac{hc}{${lambda}}`,
    };
  },
});

register({
  id: 'qm.photoelectric',
  name: 'Уравнение Эйнштейна для фотоэффекта',
  category: 'Квантовая физика',
  description: 'E_k = h f − A_вых',
  expression: 'E_k = h · f − A',
  inputs: [
    { name: 'f', label: 'Частота света', unit: 'Гц', default: 1e15 },
    { name: 'A', label: 'Работа выхода', unit: 'Дж', default: 2 * E_CHARGE },
  ],
  compute: ({ f, A }) => ({
    result: H * f - A,
    unit: 'Дж',
    latex: `E_k = hf - A`,
  }),
});

register({
  id: 'qm.particle-in-box',
  name: 'Энергия частицы в потенциальной яме',
  category: 'Квантовая физика',
  description: 'E_n = n² h² / (8 m L²)',
  expression: 'E_n = n² · h² / (8 · m · L²)',
  inputs: [
    { name: 'n', label: 'Номер уровня', default: 1 },
    { name: 'm', label: 'Масса частицы', unit: 'кг', default: M_E },
    { name: 'L', label: 'Ширина ямы', unit: 'м', default: 1e-9 },
  ],
  compute: ({ n, m, L }) => {
    if (m === 0 || L === 0) throw new Error('Invalid mass or width');
    return {
      result: (n * n * H * H) / (8 * m * L * L),
      unit: 'Дж',
      latex: `E_n = \\frac{n^2 h^2}{8 m L^2}`,
    };
  },
});
