/**
 * Статистика и теория вероятностей.
 */

import { register } from './registry';

// Helper: erf approximation (Abramowitz–Stegun)
function erf(x: number): number {
  const sign = Math.sign(x);
  const ax = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * ax);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error('n должно быть целым неотрицательным');
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  // Compute via ratio to avoid overflow for moderate n
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return r;
}

register({
  id: 'stat.combinations',
  name: 'Число сочетаний C(n, k)',
  category: 'Статистика',
  description: 'C(n, k) = n! / (k! · (n−k)!)',
  expression: 'C(n, k)',
  inputs: [
    { name: 'n', label: 'Всего элементов n', default: 10 },
    { name: 'k', label: 'Выбираем k', default: 3 },
  ],
  compute: ({ n, k }) => ({
    result: combinations(n, k),
    latex: `C_n^k = \\frac{n!}{k!(n-k)!}`,
  }),
});

register({
  id: 'stat.permutations',
  name: 'Число размещений A(n, k)',
  category: 'Статистика',
  description: 'A(n, k) = n! / (n−k)!',
  expression: 'A(n, k) = n! / (n−k)!',
  inputs: [
    { name: 'n', label: 'Всего элементов n', default: 10 },
    { name: 'k', label: 'Выбираем k', default: 3 },
  ],
  compute: ({ n, k }) => {
    if (k < 0 || k > n) throw new Error('Нужно 0 ≤ k ≤ n');
    let r = 1;
    for (let i = 0; i < k; i++) r *= n - i;
    return {
      result: r,
      latex: `A_n^k = \\frac{n!}{(n-k)!}`,
    };
  },
});

register({
  id: 'stat.factorial',
  name: 'Факториал',
  category: 'Статистика',
  description: 'n!',
  expression: 'n!',
  inputs: [{ name: 'n', label: 'n', default: 5 }],
  compute: ({ n }) => ({
    result: factorial(n),
    latex: `${n}!`,
  }),
});

register({
  id: 'stat.binomial',
  name: 'Биномиальная вероятность',
  category: 'Статистика',
  description: 'P(X = k) = C(n, k) · p^k · (1−p)^(n−k)',
  expression: 'P = C(n,k) · p^k · (1−p)^(n−k)',
  inputs: [
    { name: 'n', label: 'Число испытаний n', default: 10 },
    { name: 'k', label: 'Число успехов k', default: 3 },
    { name: 'p', label: 'Вероятность успеха в одном испытании', default: 0.5 },
  ],
  compute: ({ n, k, p }) => {
    if (p < 0 || p > 1) throw new Error('p должно быть в [0, 1]');
    return {
      result: combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k),
      latex: `P(X=k) = C_n^k p^k (1-p)^{n-k}`,
    };
  },
});

register({
  id: 'stat.poisson',
  name: 'Распределение Пуассона',
  category: 'Статистика',
  description: 'P(X = k) = λ^k · e^(−λ) / k!',
  expression: 'P(X=k) = λ^k · e^(−λ) / k!',
  inputs: [
    { name: 'lambda', label: 'Среднее λ', default: 4 },
    { name: 'k', label: 'Число событий k', default: 2 },
  ],
  compute: ({ lambda, k }) => {
    if (lambda < 0) throw new Error('λ должно быть неотрицательным');
    return {
      result: (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k),
      latex: `P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}`,
    };
  },
});

register({
  id: 'stat.normal-cdf',
  name: 'Функция нормального распределения Φ(x)',
  category: 'Статистика',
  description: 'P(Z ≤ z) — стандартное нормальное распределение',
  expression: 'Φ(z) = (1 + erf(z / √2)) / 2',
  inputs: [{ name: 'z', label: 'z-значение', default: 1 }],
  compute: ({ z }) => ({
    result: 0.5 * (1 + erf(z / Math.sqrt(2))),
    latex: `\\Phi(z) = \\frac{1 + \\operatorname{erf}(z/\\sqrt{2})}{2}`,
  }),
});

register({
  id: 'stat.confidence-interval',
  name: 'Доверительный интервал для среднего',
  category: 'Статистика',
  description: 'CI = x̄ ± z · σ / √n  →  половина ширины',
  expression: 'Полуширина = z · σ / √n',
  inputs: [
    { name: 'sigma', label: 'Станд. отклонение σ', default: 10 },
    { name: 'n', label: 'Размер выборки n', default: 30 },
    { name: 'z', label: 'z-значение (95%=1.96, 99%=2.576)', default: 1.96 },
  ],
  compute: ({ sigma, n, z }) => {
    if (n <= 0) throw new Error('n должно быть положительным');
    return {
      result: (z * sigma) / Math.sqrt(n),
      latex: `\\text{margin} = z \\cdot \\frac{\\sigma}{\\sqrt{n}}`,
    };
  },
});

register({
  id: 'stat.standard-error',
  name: 'Стандартная ошибка среднего',
  category: 'Статистика',
  description: 'SE = σ / √n',
  expression: 'SE = σ / √n',
  inputs: [
    { name: 'sigma', label: 'Станд. отклонение σ', default: 10 },
    { name: 'n', label: 'Размер выборки n', default: 30 },
  ],
  compute: ({ sigma, n }) => {
    if (n <= 0) throw new Error('n должно быть положительным');
    return {
      result: sigma / Math.sqrt(n),
      latex: `SE = \\frac{\\sigma}{\\sqrt{n}}`,
    };
  },
});
