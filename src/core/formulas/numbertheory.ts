/**
 * Теория чисел и дискретная математика.
 */

import { register } from './registry';

function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function isPrime(n: number): boolean {
  n = Math.trunc(n);
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) if (n % i === 0) return false;
  return true;
}

function eulerPhi(n: number): number {
  n = Math.trunc(n);
  if (n <= 0) return 0;
  let result = n;
  let p = 2;
  while (p * p <= n) {
    if (n % p === 0) {
      while (n % p === 0) n = n / p;
      result -= result / p;
    }
    p++;
  }
  if (n > 1) result -= result / n;
  return result;
}

register({
  id: 'num.gcd',
  name: 'НОД двух чисел',
  category: 'Теория чисел',
  description: 'Наибольший общий делитель (алгоритм Евклида)',
  expression: 'НОД(a, b)',
  inputs: [
    { name: 'a', label: 'Число a', default: 48 },
    { name: 'b', label: 'Число b', default: 36 },
  ],
  compute: ({ a, b }) => ({
    result: gcd(a, b),
    latex: `\\gcd(${a}, ${b})`,
  }),
});

register({
  id: 'num.lcm',
  name: 'НОК двух чисел',
  category: 'Теория чисел',
  description: 'Наименьшее общее кратное',
  expression: 'НОК(a, b) = |a · b| / НОД(a, b)',
  inputs: [
    { name: 'a', label: 'Число a', default: 12 },
    { name: 'b', label: 'Число b', default: 18 },
  ],
  compute: ({ a, b }) => {
    const g = gcd(a, b);
    if (g === 0) return { result: 0, latex: `\\text{lcm}(0, 0) = 0` };
    return {
      result: Math.abs(a * b) / g,
      latex: `\\text{lcm}(${a}, ${b}) = \\frac{|a \\cdot b|}{\\gcd(a, b)}`,
    };
  },
});

register({
  id: 'num.is-prime',
  name: 'Проверка простоты',
  category: 'Теория чисел',
  description: '1 если простое, 0 если составное',
  expression: 'is_prime(n)',
  inputs: [{ name: 'n', label: 'Число', default: 97 }],
  compute: ({ n }) => ({
    result: isPrime(n) ? 1 : 0,
    latex: `\\text{is\\_prime}(${n})`,
  }),
});

register({
  id: 'num.euler-phi',
  name: 'Функция Эйлера φ(n)',
  category: 'Теория чисел',
  description: 'Число взаимно простых с n чисел из {1, …, n}',
  expression: 'φ(n)',
  inputs: [{ name: 'n', label: 'Число n', default: 36 }],
  compute: ({ n }) => ({
    result: eulerPhi(n),
    latex: `\\varphi(${n})`,
  }),
});

register({
  id: 'num.modular-exponent',
  name: 'Возведение по модулю (a^b mod m)',
  category: 'Теория чисел',
  description: 'Быстрое возведение в степень по модулю',
  expression: 'a^b mod m',
  inputs: [
    { name: 'a', label: 'Основание', default: 7 },
    { name: 'b', label: 'Показатель', default: 13 },
    { name: 'm', label: 'Модуль', default: 100 },
  ],
  compute: ({ a, b, m }) => {
    if (m <= 0) throw new Error('Модуль должен быть положительным');
    let result = 1;
    let base = ((a % m) + m) % m;
    let exp = Math.trunc(b);
    while (exp > 0) {
      if (exp & 1) result = (result * base) % m;
      base = (base * base) % m;
      exp >>= 1;
    }
    return {
      result,
      latex: `${a}^{${b}} \\bmod ${m}`,
    };
  },
});

register({
  id: 'num.fibonacci',
  name: 'n-е число Фибоначчи',
  category: 'Теория чисел',
  description: 'F(n) — последовательность 1, 1, 2, 3, 5, 8, …',
  expression: 'F(n)',
  inputs: [{ name: 'n', label: 'n', default: 20 }],
  compute: ({ n }) => {
    n = Math.trunc(n);
    if (n < 0) throw new Error('n должно быть неотрицательным');
    if (n > 1476) throw new Error('n > 1476: переполнение Number');
    let a = 0;
    let b = 1;
    for (let i = 0; i < n; i++) [a, b] = [b, a + b];
    return {
      result: a,
      latex: `F(${n})`,
    };
  },
});

register({
  id: 'num.golden-ratio-power',
  name: 'Аппроксимация Бине для Фибоначчи',
  category: 'Теория чисел',
  description: 'F(n) ≈ φⁿ / √5',
  expression: 'F(n) ≈ ((1+√5)/2)ⁿ / √5',
  inputs: [{ name: 'n', label: 'n', default: 30 }],
  compute: ({ n }) => {
    const phi = (1 + Math.sqrt(5)) / 2;
    return {
      result: Math.round(Math.pow(phi, n) / Math.sqrt(5)),
      latex: `F(n) \\approx \\frac{\\varphi^n}{\\sqrt{5}}`,
    };
  },
});
