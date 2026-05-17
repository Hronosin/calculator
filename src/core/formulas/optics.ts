/**
 * Оптика.
 */

import { register } from './registry';

register({
  id: 'opt.lens-equation',
  name: 'Формула тонкой линзы',
  category: 'Оптика',
  description: '1/F = 1/d + 1/f → найти F',
  expression: '1/F = 1/d + 1/f',
  inputs: [
    { name: 'd', label: 'Расстояние до предмета', unit: 'м', default: 0.3 },
    { name: 'f', label: 'Расстояние до изображения', unit: 'м', default: 0.15 },
  ],
  compute: ({ d, f }) => {
    if (d + f === 0) throw new Error('Invalid distances');
    return {
      result: (d * f) / (d + f),
      unit: 'м',
      latex: `F = \\frac{d \\cdot f}{d + f}`,
    };
  },
});

register({
  id: 'opt.magnification',
  name: 'Увеличение линзы',
  category: 'Оптика',
  description: 'Γ = f / d',
  expression: 'Γ = f / d',
  inputs: [
    { name: 'd', label: 'Расстояние до предмета', unit: 'м', default: 0.3 },
    { name: 'f', label: 'Расстояние до изображения', unit: 'м', default: 0.15 },
  ],
  compute: ({ d, f }) => {
    if (d === 0) throw new Error('Object distance cannot be zero');
    return {
      result: Math.abs(f / d),
      latex: `\\Gamma = \\left|\\frac{${f}}{${d}}\\right|`,
    };
  },
});

register({
  id: 'opt.snell',
  name: 'Закон Снеллиуса',
  category: 'Оптика',
  description: 'n₁ sin θ₁ = n₂ sin θ₂ → найти θ₂',
  expression: 'sin θ₂ = (n₁/n₂) · sin θ₁',
  inputs: [
    { name: 'n1', label: 'Показатель преломления среды 1', default: 1 },
    { name: 'n2', label: 'Показатель преломления среды 2', default: 1.5 },
    { name: 'theta1', label: 'Угол падения', unit: '°', default: 30 },
  ],
  compute: ({ n1, n2, theta1 }) => {
    if (n2 === 0) throw new Error('n2 cannot be zero');
    const arg = (n1 / n2) * Math.sin((theta1 * Math.PI) / 180);
    if (Math.abs(arg) > 1) throw new Error('Total internal reflection — нет преломлённого луча');
    return {
      result: (Math.asin(arg) * 180) / Math.PI,
      unit: '°',
      latex: `\\theta_2 = \\arcsin\\left(\\frac{${n1}}{${n2}} \\sin ${theta1}°\\right)`,
    };
  },
});

register({
  id: 'opt.critical-angle',
  name: 'Предельный угол полного отражения',
  category: 'Оптика',
  description: 'sin θ_c = n₂ / n₁',
  expression: 'θ_c = arcsin(n₂ / n₁)',
  inputs: [
    { name: 'n1', label: 'Показатель преломления плотной среды', default: 1.5 },
    { name: 'n2', label: 'Показатель преломления менее плотной среды', default: 1 },
  ],
  compute: ({ n1, n2 }) => {
    if (n2 >= n1) throw new Error('n₂ должно быть меньше n₁');
    return {
      result: (Math.asin(n2 / n1) * 180) / Math.PI,
      unit: '°',
      latex: `\\theta_c = \\arcsin\\left(\\frac{${n2}}{${n1}}\\right)`,
    };
  },
});

register({
  id: 'opt.diffraction-grating',
  name: 'Дифракционная решётка',
  category: 'Оптика',
  description: 'd sin θ = m λ → найти θ',
  expression: 'sin θ = m · λ / d',
  inputs: [
    { name: 'd', label: 'Период решётки', unit: 'м', default: 1e-6 },
    { name: 'lambda', label: 'Длина волны', unit: 'м', default: 500e-9 },
    { name: 'm', label: 'Порядок максимума', default: 1 },
  ],
  compute: ({ d, lambda, m }) => {
    const arg = (m * lambda) / d;
    if (Math.abs(arg) > 1) throw new Error('Максимум данного порядка не существует');
    return {
      result: (Math.asin(arg) * 180) / Math.PI,
      unit: '°',
      latex: `\\theta = \\arcsin\\left(\\frac{${m} \\lambda}{${d}}\\right)`,
    };
  },
});

register({
  id: 'opt.bragg',
  name: 'Условие Брэгга',
  category: 'Оптика',
  description: '2d sin θ = nλ → найти θ',
  expression: 'sin θ = n · λ / (2d)',
  inputs: [
    { name: 'd', label: 'Межплоскостное расстояние', unit: 'м', default: 2e-10 },
    { name: 'lambda', label: 'Длина волны', unit: 'м', default: 1.54e-10 },
    { name: 'n', label: 'Порядок отражения', default: 1 },
  ],
  compute: ({ d, lambda, n }) => {
    const arg = (n * lambda) / (2 * d);
    if (Math.abs(arg) > 1) throw new Error('Условие не выполняется');
    return {
      result: (Math.asin(arg) * 180) / Math.PI,
      unit: '°',
      latex: `\\theta = \\arcsin\\left(\\frac{n \\lambda}{2d}\\right)`,
    };
  },
});
