/**
 * Механика — расширенные формулы.
 */

import { register } from './registry';

const G_EARTH = 9.81;

register({
  id: 'mech.free-fall-distance',
  name: 'Путь при свободном падении',
  category: 'Механика',
  description: 'h = ½ g t²',
  expression: 'h = (1/2) · g · t²',
  inputs: [
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: G_EARTH },
    { name: 't', label: 'Время', unit: 'с', default: 1 },
  ],
  compute: ({ g, t }) => ({
    result: 0.5 * g * t * t,
    unit: 'м',
    latex: `h = \\frac{1}{2} \\cdot ${g} \\cdot ${t}^2`,
  }),
});

register({
  id: 'mech.free-fall-velocity',
  name: 'Скорость при свободном падении',
  category: 'Механика',
  description: 'v = g t',
  expression: 'v = g · t',
  inputs: [
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: G_EARTH },
    { name: 't', label: 'Время', unit: 'с', default: 1 },
  ],
  compute: ({ g, t }) => ({
    result: g * t,
    unit: 'м/с',
    latex: `v = ${g} \\cdot ${t}`,
  }),
});

register({
  id: 'mech.projectile-range',
  name: 'Дальность полёта снаряда',
  category: 'Механика',
  description: 'R = v² sin(2α) / g',
  expression: 'R = v² · sin(2α) / g',
  inputs: [
    { name: 'v', label: 'Начальная скорость', unit: 'м/с', default: 20 },
    { name: 'alpha', label: 'Угол к горизонту', unit: '°', default: 45 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: G_EARTH },
  ],
  compute: ({ v, alpha, g }) => ({
    result: (v * v * Math.sin((2 * alpha * Math.PI) / 180)) / g,
    unit: 'м',
    latex: `R = \\frac{${v}^2 \\sin(2 \\cdot ${alpha}°)}{${g}}`,
  }),
});

register({
  id: 'mech.projectile-height',
  name: 'Максимальная высота снаряда',
  category: 'Механика',
  description: 'H = (v sin α)² / (2g)',
  expression: 'H = (v · sin α)² / (2g)',
  inputs: [
    { name: 'v', label: 'Начальная скорость', unit: 'м/с', default: 20 },
    { name: 'alpha', label: 'Угол к горизонту', unit: '°', default: 45 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: G_EARTH },
  ],
  compute: ({ v, alpha, g }) => ({
    result: Math.pow(v * Math.sin((alpha * Math.PI) / 180), 2) / (2 * g),
    unit: 'м',
    latex: `H = \\frac{(${v} \\sin ${alpha}°)^2}{2 \\cdot ${g}}`,
  }),
});

register({
  id: 'mech.pendulum-period',
  name: 'Период математического маятника',
  category: 'Механика',
  description: 'T = 2π √(L/g)',
  expression: 'T = 2π · √(L / g)',
  inputs: [
    { name: 'L', label: 'Длина маятника', unit: 'м', default: 1 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: G_EARTH },
  ],
  compute: ({ L, g }) => ({
    result: 2 * Math.PI * Math.sqrt(L / g),
    unit: 'с',
    latex: `T = 2\\pi \\sqrt{\\frac{${L}}{${g}}}`,
  }),
});

register({
  id: 'mech.spring-period',
  name: 'Период пружинного маятника',
  category: 'Механика',
  description: 'T = 2π √(m/k)',
  expression: 'T = 2π · √(m / k)',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'k', label: 'Жёсткость пружины', unit: 'Н/м', default: 100 },
  ],
  compute: ({ m, k }) => ({
    result: 2 * Math.PI * Math.sqrt(m / k),
    unit: 'с',
    latex: `T = 2\\pi \\sqrt{\\frac{${m}}{${k}}}`,
  }),
});

register({
  id: 'mech.momentum',
  name: 'Импульс тела',
  category: 'Механика',
  description: 'p = m v',
  expression: 'p = m · v',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 1 },
    { name: 'v', label: 'Скорость', unit: 'м/с', default: 1 },
  ],
  compute: ({ m, v }) => ({
    result: m * v,
    unit: 'кг·м/с',
    latex: `p = ${m} \\cdot ${v}`,
  }),
});

register({
  id: 'mech.impulse',
  name: 'Импульс силы',
  category: 'Механика',
  description: 'J = F Δt',
  expression: 'J = F · Δt',
  inputs: [
    { name: 'F', label: 'Сила', unit: 'Н', default: 10 },
    { name: 'dt', label: 'Время действия', unit: 'с', default: 1 },
  ],
  compute: ({ F, dt }) => ({
    result: F * dt,
    unit: 'Н·с',
    latex: `J = ${F} \\cdot ${dt}`,
  }),
});

register({
  id: 'mech.work',
  name: 'Механическая работа',
  category: 'Механика',
  description: 'A = F s cos α',
  expression: 'A = F · s · cos α',
  inputs: [
    { name: 'F', label: 'Сила', unit: 'Н', default: 10 },
    { name: 's', label: 'Перемещение', unit: 'м', default: 1 },
    { name: 'alpha', label: 'Угол между F и s', unit: '°', default: 0 },
  ],
  compute: ({ F, s, alpha }) => ({
    result: F * s * Math.cos((alpha * Math.PI) / 180),
    unit: 'Дж',
    latex: `A = ${F} \\cdot ${s} \\cdot \\cos ${alpha}°`,
  }),
});

register({
  id: 'mech.power',
  name: 'Мощность механическая',
  category: 'Механика',
  description: 'P = A / t',
  expression: 'P = A / t',
  inputs: [
    { name: 'A', label: 'Работа', unit: 'Дж', default: 100 },
    { name: 't', label: 'Время', unit: 'с', default: 1 },
  ],
  compute: ({ A, t }) => {
    if (t === 0) throw new Error('Time cannot be zero');
    return {
      result: A / t,
      unit: 'Вт',
      latex: `P = \\frac{${A}}{${t}}`,
    };
  },
});

register({
  id: 'mech.pressure',
  name: 'Давление',
  category: 'Механика',
  description: 'P = F / S',
  expression: 'P = F / S',
  inputs: [
    { name: 'F', label: 'Сила', unit: 'Н', default: 10 },
    { name: 'S', label: 'Площадь', unit: 'м²', default: 1 },
  ],
  compute: ({ F, S }) => {
    if (S === 0) throw new Error('Area cannot be zero');
    return {
      result: F / S,
      unit: 'Па',
      latex: `P = \\frac{${F}}{${S}}`,
    };
  },
});

register({
  id: 'mech.buoyancy',
  name: 'Сила Архимеда',
  category: 'Механика',
  description: 'F = ρ g V',
  expression: 'F = ρ · g · V',
  inputs: [
    { name: 'rho', label: 'Плотность жидкости', unit: 'кг/м³', default: 1000 },
    { name: 'g', label: 'Ускорение свободного падения', unit: 'м/с²', default: G_EARTH },
    { name: 'V', label: 'Объём погружённой части', unit: 'м³', default: 0.001 },
  ],
  compute: ({ rho, g, V }) => ({
    result: rho * g * V,
    unit: 'Н',
    latex: `F = ${rho} \\cdot ${g} \\cdot ${V}`,
  }),
});

register({
  id: 'mech.angular-velocity',
  name: 'Угловая скорость',
  category: 'Механика',
  description: 'ω = 2π / T',
  expression: 'ω = 2π / T',
  inputs: [{ name: 'T', label: 'Период', unit: 'с', default: 1 }],
  compute: ({ T }) => {
    if (T === 0) throw new Error('Period cannot be zero');
    return {
      result: (2 * Math.PI) / T,
      unit: 'рад/с',
      latex: `\\omega = \\frac{2\\pi}{${T}}`,
    };
  },
});

register({
  id: 'mech.wave-speed',
  name: 'Скорость волны',
  category: 'Механика',
  description: 'v = λ f',
  expression: 'v = λ · f',
  inputs: [
    { name: 'lambda', label: 'Длина волны', unit: 'м', default: 1 },
    { name: 'f', label: 'Частота', unit: 'Гц', default: 1 },
  ],
  compute: ({ lambda, f }) => ({
    result: lambda * f,
    unit: 'м/с',
    latex: `v = ${lambda} \\cdot ${f}`,
  }),
});
