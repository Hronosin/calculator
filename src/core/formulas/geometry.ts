/**
 * Геометрия.
 */

import { register } from './registry';

register({
  id: 'geom.circle-area',
  name: 'Площадь круга',
  category: 'Геометрия',
  description: 'S = π r²',
  expression: 'S = π · r²',
  inputs: [{ name: 'r', label: 'Радиус', unit: 'м', default: 1 }],
  compute: ({ r }) => ({
    result: Math.PI * r * r,
    unit: 'м²',
    latex: `S = \\pi \\cdot ${r}^2`,
  }),
});

register({
  id: 'geom.circle-circumference',
  name: 'Длина окружности',
  category: 'Геометрия',
  description: 'C = 2π r',
  expression: 'C = 2π · r',
  inputs: [{ name: 'r', label: 'Радиус', unit: 'м', default: 1 }],
  compute: ({ r }) => ({
    result: 2 * Math.PI * r,
    unit: 'м',
    latex: `C = 2\\pi \\cdot ${r}`,
  }),
});

register({
  id: 'geom.sphere-volume',
  name: 'Объём шара',
  category: 'Геометрия',
  description: 'V = (4/3) π r³',
  expression: 'V = (4/3) · π · r³',
  inputs: [{ name: 'r', label: 'Радиус', unit: 'м', default: 1 }],
  compute: ({ r }) => ({
    result: (4 / 3) * Math.PI * Math.pow(r, 3),
    unit: 'м³',
    latex: `V = \\frac{4}{3}\\pi r^3`,
  }),
});

register({
  id: 'geom.sphere-surface',
  name: 'Площадь поверхности шара',
  category: 'Геометрия',
  description: 'S = 4 π r²',
  expression: 'S = 4π · r²',
  inputs: [{ name: 'r', label: 'Радиус', unit: 'м', default: 1 }],
  compute: ({ r }) => ({
    result: 4 * Math.PI * r * r,
    unit: 'м²',
    latex: `S = 4\\pi r^2`,
  }),
});

register({
  id: 'geom.cylinder-volume',
  name: 'Объём цилиндра',
  category: 'Геометрия',
  description: 'V = π r² h',
  expression: 'V = π · r² · h',
  inputs: [
    { name: 'r', label: 'Радиус основания', unit: 'м', default: 1 },
    { name: 'h', label: 'Высота', unit: 'м', default: 1 },
  ],
  compute: ({ r, h }) => ({
    result: Math.PI * r * r * h,
    unit: 'м³',
    latex: `V = \\pi r^2 h`,
  }),
});

register({
  id: 'geom.cone-volume',
  name: 'Объём конуса',
  category: 'Геометрия',
  description: 'V = (1/3) π r² h',
  expression: 'V = (1/3) · π · r² · h',
  inputs: [
    { name: 'r', label: 'Радиус основания', unit: 'м', default: 1 },
    { name: 'h', label: 'Высота', unit: 'м', default: 1 },
  ],
  compute: ({ r, h }) => ({
    result: (1 / 3) * Math.PI * r * r * h,
    unit: 'м³',
    latex: `V = \\frac{1}{3}\\pi r^2 h`,
  }),
});

register({
  id: 'geom.pythagoras',
  name: 'Теорема Пифагора',
  category: 'Геометрия',
  description: 'c = √(a² + b²)',
  expression: 'c² = a² + b²',
  inputs: [
    { name: 'a', label: 'Катет a', unit: 'м', default: 3 },
    { name: 'b', label: 'Катет b', unit: 'м', default: 4 },
  ],
  compute: ({ a, b }) => ({
    result: Math.sqrt(a * a + b * b),
    unit: 'м',
    latex: `c = \\sqrt{${a}^2 + ${b}^2}`,
  }),
});

register({
  id: 'geom.heron',
  name: 'Площадь треугольника (формула Герона)',
  category: 'Геометрия',
  description: 'S = √(p(p−a)(p−b)(p−c))',
  expression: 'S = √(p · (p−a) · (p−b) · (p−c)), p = (a+b+c)/2',
  inputs: [
    { name: 'a', label: 'Сторона a', unit: 'м', default: 3 },
    { name: 'b', label: 'Сторона b', unit: 'м', default: 4 },
    { name: 'c', label: 'Сторона c', unit: 'м', default: 5 },
  ],
  compute: ({ a, b, c }) => {
    const p = (a + b + c) / 2;
    const inside = p * (p - a) * (p - b) * (p - c);
    if (inside < 0) throw new Error('Невозможный треугольник');
    return {
      result: Math.sqrt(inside),
      unit: 'м²',
      latex: `S = \\sqrt{p(p-a)(p-b)(p-c)}`,
    };
  },
});

register({
  id: 'geom.law-of-cosines',
  name: 'Теорема косинусов',
  category: 'Геометрия',
  description: 'c² = a² + b² − 2ab cos γ',
  expression: 'c = √(a² + b² − 2ab · cos γ)',
  inputs: [
    { name: 'a', label: 'Сторона a', unit: 'м', default: 3 },
    { name: 'b', label: 'Сторона b', unit: 'м', default: 4 },
    { name: 'gamma', label: 'Угол γ между ними', unit: '°', default: 60 },
  ],
  compute: ({ a, b, gamma }) => {
    const rad = (gamma * Math.PI) / 180;
    return {
      result: Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad)),
      unit: 'м',
      latex: `c = \\sqrt{a^2 + b^2 - 2ab \\cos \\gamma}`,
    };
  },
});
