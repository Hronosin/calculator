/**
 * Сопромат и материаловедение.
 */

import { register } from './registry';

register({
  id: 'mat.stress',
  name: 'Механическое напряжение',
  category: 'Сопромат',
  description: 'σ = F / A',
  expression: 'σ = F / A',
  inputs: [
    { name: 'F', label: 'Приложенная сила', unit: 'Н', default: 1000 },
    { name: 'A', label: 'Площадь сечения', unit: 'м²', default: 1e-4 },
  ],
  compute: ({ F, A }) => {
    if (A === 0) throw new Error('Площадь не может быть нулём');
    return {
      result: F / A,
      unit: 'Па',
      latex: `\\sigma = \\frac{F}{A}`,
    };
  },
});

register({
  id: 'mat.strain',
  name: 'Относительная деформация',
  category: 'Сопромат',
  description: 'ε = ΔL / L₀',
  expression: 'ε = ΔL / L₀',
  inputs: [
    { name: 'dL', label: 'Удлинение', unit: 'м', default: 0.001 },
    { name: 'L0', label: 'Исходная длина', unit: 'м', default: 1 },
  ],
  compute: ({ dL, L0 }) => {
    if (L0 === 0) throw new Error('L₀ не может быть нулём');
    return {
      result: dL / L0,
      latex: `\\varepsilon = \\frac{\\Delta L}{L_0}`,
    };
  },
});

register({
  id: 'mat.hookes-law',
  name: 'Закон Гука (одноосное нагружение)',
  category: 'Сопромат',
  description: 'σ = E · ε',
  expression: 'σ = E · ε',
  inputs: [
    { name: 'E', label: 'Модуль Юнга', unit: 'Па', default: 2e11 },
    { name: 'epsilon', label: 'Деформация', default: 0.001 },
  ],
  compute: ({ E, epsilon }) => ({
    result: E * epsilon,
    unit: 'Па',
    latex: `\\sigma = E \\varepsilon`,
  }),
});

register({
  id: 'mat.elongation',
  name: 'Удлинение стержня под нагрузкой',
  category: 'Сопромат',
  description: 'ΔL = F · L₀ / (A · E)',
  expression: 'ΔL = F · L₀ / (A · E)',
  inputs: [
    { name: 'F', label: 'Сила', unit: 'Н', default: 10000 },
    { name: 'L0', label: 'Исходная длина', unit: 'м', default: 1 },
    { name: 'A', label: 'Площадь сечения', unit: 'м²', default: 1e-4 },
    { name: 'E', label: 'Модуль Юнга', unit: 'Па', default: 2e11 },
  ],
  compute: ({ F, L0, A, E }) => {
    if (A * E === 0) throw new Error('A · E равно нулю');
    return {
      result: (F * L0) / (A * E),
      unit: 'м',
      latex: `\\Delta L = \\frac{F L_0}{A E}`,
    };
  },
});

register({
  id: 'mat.poisson',
  name: 'Коэффициент Пуассона',
  category: 'Сопромат',
  description: 'ν = − ε_попер / ε_прод',
  expression: 'ν = − ε_попер / ε_прод',
  inputs: [
    { name: 'eps_trans', label: 'Поперечная деформация', default: -0.0003 },
    { name: 'eps_long', label: 'Продольная деформация', default: 0.001 },
  ],
  compute: ({ eps_trans, eps_long }) => {
    if (eps_long === 0) throw new Error('Продольная деформация равна нулю');
    return {
      result: -eps_trans / eps_long,
      latex: `\\nu = -\\frac{\\varepsilon_{trans}}{\\varepsilon_{long}}`,
    };
  },
});

register({
  id: 'mat.shear-modulus',
  name: 'Модуль сдвига через E и ν',
  category: 'Сопромат',
  description: 'G = E / (2 · (1 + ν))',
  expression: 'G = E / (2 · (1 + ν))',
  inputs: [
    { name: 'E', label: 'Модуль Юнга', unit: 'Па', default: 2e11 },
    { name: 'nu', label: 'Коэффициент Пуассона', default: 0.3 },
  ],
  compute: ({ E, nu }) => {
    if (1 + nu === 0) throw new Error('1 + ν = 0');
    return {
      result: E / (2 * (1 + nu)),
      unit: 'Па',
      latex: `G = \\frac{E}{2(1 + \\nu)}`,
    };
  },
});

register({
  id: 'mat.euler-buckling',
  name: 'Критическая сила Эйлера (потеря устойчивости)',
  category: 'Сопромат',
  description: 'F_кр = π² · E · I / (μ · L)²',
  expression: 'F_cr = π² · E · I / (μ · L)²',
  inputs: [
    { name: 'E', label: 'Модуль Юнга', unit: 'Па', default: 2e11 },
    { name: 'I', label: 'Момент инерции сечения', unit: 'м⁴', default: 1e-8 },
    { name: 'L', label: 'Длина стержня', unit: 'м', default: 1 },
    { name: 'mu', label: 'Коэффициент закрепления μ (шарниры=1, защемления=0.5)', default: 1 },
  ],
  compute: ({ E, I, L, mu }) => {
    const eff = mu * L;
    if (eff === 0) throw new Error('Эффективная длина равна нулю');
    return {
      result: (Math.PI * Math.PI * E * I) / (eff * eff),
      unit: 'Н',
      latex: `F_{cr} = \\frac{\\pi^2 E I}{(\\mu L)^2}`,
    };
  },
});
