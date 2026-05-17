/**
 * Аэродинамика и гидродинамика.
 */

import { register } from './registry';

register({
  id: 'aero.reynolds',
  name: 'Число Рейнольдса',
  category: 'Аэро- и гидродинамика',
  description: 'Re = ρ v L / μ — характер течения',
  expression: 'Re = ρ · v · L / μ',
  inputs: [
    { name: 'rho', label: 'Плотность среды', unit: 'кг/м³', default: 1.225 },
    { name: 'v', label: 'Скорость потока', unit: 'м/с', default: 10 },
    { name: 'L', label: 'Характерная длина', unit: 'м', default: 1 },
    { name: 'mu', label: 'Динамическая вязкость', unit: 'Па·с', default: 1.81e-5 },
  ],
  compute: ({ rho, v, L, mu }) => {
    if (mu === 0) throw new Error('Вязкость не может быть нулём');
    return {
      result: (rho * v * L) / mu,
      latex: `Re = \\frac{\\rho v L}{\\mu}`,
    };
  },
});

register({
  id: 'aero.mach',
  name: 'Число Маха',
  category: 'Аэро- и гидродинамика',
  description: 'M = v / a — скорость относительно скорости звука',
  expression: 'M = v / a_звука',
  inputs: [
    { name: 'v', label: 'Скорость объекта', unit: 'м/с', default: 340 },
    { name: 'a', label: 'Скорость звука в среде', unit: 'м/с', default: 343 },
  ],
  compute: ({ v, a }) => {
    if (a === 0) throw new Error('Скорость звука не может быть нулём');
    return {
      result: v / a,
      latex: `M = \\frac{v}{a}`,
    };
  },
});

register({
  id: 'aero.lift',
  name: 'Подъёмная сила крыла',
  category: 'Аэро- и гидродинамика',
  description: 'L = ½ ρ v² S C_L',
  expression: 'L = (1/2) · ρ · v² · S · C_L',
  inputs: [
    { name: 'rho', label: 'Плотность воздуха', unit: 'кг/м³', default: 1.225 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 50 },
    { name: 'S', label: 'Площадь крыла', unit: 'м²', default: 16 },
    { name: 'CL', label: 'Коэффициент подъёмной силы', default: 0.5 },
  ],
  compute: ({ rho, v, S, CL }) => ({
    result: 0.5 * rho * v * v * S * CL,
    unit: 'Н',
    latex: `L = \\frac{1}{2}\\rho v^2 S C_L`,
  }),
});

register({
  id: 'aero.drag',
  name: 'Сила сопротивления',
  category: 'Аэро- и гидродинамика',
  description: 'F_d = ½ ρ v² C_d A',
  expression: 'F_d = (1/2) · ρ · v² · C_d · A',
  inputs: [
    { name: 'rho', label: 'Плотность среды', unit: 'кг/м³', default: 1.225 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 30 },
    { name: 'Cd', label: 'Коэффициент сопротивления', default: 0.3 },
    { name: 'A', label: 'Поперечное сечение', unit: 'м²', default: 2 },
  ],
  compute: ({ rho, v, Cd, A }) => ({
    result: 0.5 * rho * v * v * Cd * A,
    unit: 'Н',
    latex: `F_d = \\frac{1}{2}\\rho v^2 C_d A`,
  }),
});

register({
  id: 'aero.bernoulli',
  name: 'Уравнение Бернулли (давление по скорости)',
  category: 'Аэро- и гидродинамика',
  description: 'P + ½ ρ v² = const',
  expression: 'P₂ = P₁ + (1/2)·ρ·(v₁² − v₂²)',
  inputs: [
    { name: 'P1', label: 'Давление в точке 1', unit: 'Па', default: 101325 },
    { name: 'rho', label: 'Плотность жидкости', unit: 'кг/м³', default: 1000 },
    { name: 'v1', label: 'Скорость в точке 1', unit: 'м/с', default: 1 },
    { name: 'v2', label: 'Скорость в точке 2', unit: 'м/с', default: 5 },
  ],
  compute: ({ P1, rho, v1, v2 }) => ({
    result: P1 + 0.5 * rho * (v1 * v1 - v2 * v2),
    unit: 'Па',
    latex: `P_2 = P_1 + \\frac{1}{2}\\rho(v_1^2 - v_2^2)`,
  }),
});

register({
  id: 'aero.terminal-velocity',
  name: 'Установившаяся скорость падения',
  category: 'Аэро- и гидродинамика',
  description: 'v_term = √(2 m g / (ρ C_d A))',
  expression: 'v = √(2·m·g / (ρ·C_d·A))',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 80 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: 9.81 },
    { name: 'rho', label: 'Плотность среды', unit: 'кг/м³', default: 1.225 },
    { name: 'Cd', label: 'Коэффициент сопротивления', default: 1.0 },
    { name: 'A', label: 'Поперечное сечение', unit: 'м²', default: 0.7 },
  ],
  compute: ({ m, g, rho, Cd, A }) => {
    if (rho * Cd * A === 0) throw new Error('Знаменатель равен нулю');
    return {
      result: Math.sqrt((2 * m * g) / (rho * Cd * A)),
      unit: 'м/с',
      latex: `v_{term} = \\sqrt{\\frac{2 m g}{\\rho C_d A}}`,
    };
  },
});

register({
  id: 'aero.hagen-poiseuille',
  name: 'Расход через трубу (Хаген–Пуазейль)',
  category: 'Аэро- и гидродинамика',
  description: 'Q = π · ΔP · r⁴ / (8 · μ · L)',
  expression: 'Q = π · ΔP · r⁴ / (8 · μ · L)',
  inputs: [
    { name: 'dP', label: 'Перепад давления', unit: 'Па', default: 1000 },
    { name: 'r', label: 'Радиус трубы', unit: 'м', default: 0.01 },
    { name: 'mu', label: 'Динамическая вязкость', unit: 'Па·с', default: 1e-3 },
    { name: 'L', label: 'Длина трубы', unit: 'м', default: 1 },
  ],
  compute: ({ dP, r, mu, L }) => {
    if (mu * L === 0) throw new Error('Знаменатель равен нулю');
    return {
      result: (Math.PI * dP * Math.pow(r, 4)) / (8 * mu * L),
      unit: 'м³/с',
      latex: `Q = \\frac{\\pi \\Delta P r^4}{8 \\mu L}`,
    };
  },
});
