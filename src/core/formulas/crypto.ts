/**
 * Криптография и теория информации.
 */

import { register } from './registry';

register({
  id: 'crypto.shannon-entropy',
  name: 'Энтропия Шеннона (макс для равновероятных)',
  category: 'Криптография и информация',
  description: 'H_max = log₂(n) — макс. энтропия n равновероятных событий',
  expression: 'H = log₂(n)',
  inputs: [{ name: 'n', label: 'Число возможных исходов', default: 256 }],
  compute: ({ n }) => {
    if (n <= 0) throw new Error('n должно быть положительным');
    return {
      result: Math.log2(n),
      unit: 'бит',
      latex: `H = \\log_2(${n})`,
    };
  },
});

register({
  id: 'crypto.password-entropy',
  name: 'Энтропия пароля',
  category: 'Криптография и информация',
  description: 'H = L · log₂(R) — пароль длины L из алфавита R символов',
  expression: 'H = L · log₂(R)',
  inputs: [
    { name: 'L', label: 'Длина пароля', default: 12 },
    { name: 'R', label: 'Размер алфавита (a-z=26, +A-Z=52, +0-9=62, +симв=94)', default: 94 },
  ],
  compute: ({ L, R }) => {
    if (R <= 1) throw new Error('Алфавит должен содержать > 1 символа');
    return {
      result: L * Math.log2(R),
      unit: 'бит',
      latex: `H = L \\log_2(R)`,
    };
  },
});

register({
  id: 'crypto.brute-force-time',
  name: 'Время полного перебора',
  category: 'Криптография и информация',
  description: 't = 2^bits / (2 · rate) — среднее время взлома',
  expression: 't = 2^bits / (2 · rate)',
  inputs: [
    { name: 'bits', label: 'Энтропия ключа в битах', default: 64 },
    { name: 'rate', label: 'Перебор в секунду', unit: '1/с', default: 1e12 },
  ],
  compute: ({ bits, rate }) => {
    if (rate <= 0) throw new Error('Скорость должна быть положительной');
    return {
      result: Math.pow(2, bits) / (2 * rate),
      unit: 'с',
      latex: `t = \\frac{2^{bits}}{2 \\cdot rate}`,
    };
  },
});

register({
  id: 'crypto.birthday-collision',
  name: 'Парадокс дня рождения (вероятность коллизии)',
  category: 'Криптография и информация',
  description: 'P ≈ 1 − e^(−k² / 2N) — вероятность коллизии для k значений из N',
  expression: 'P ≈ 1 − exp(−k² / (2N))',
  inputs: [
    { name: 'k', label: 'Число значений', default: 23 },
    { name: 'N', label: 'Размер пространства', default: 365 },
  ],
  compute: ({ k, N }) => {
    if (N <= 0) throw new Error('N должно быть положительным');
    return {
      result: (1 - Math.exp(-(k * k) / (2 * N))) * 100,
      unit: '%',
      latex: `P \\approx 1 - e^{-k^2/(2N)}`,
    };
  },
});

register({
  id: 'crypto.hamming-distance-bits',
  name: 'Канал Шеннона (ёмкость)',
  category: 'Криптография и информация',
  description: 'C = B · log₂(1 + S/N)',
  expression: 'C = B · log₂(1 + S/N)',
  inputs: [
    { name: 'B', label: 'Полоса пропускания', unit: 'Гц', default: 1e6 },
    { name: 'SNR', label: 'Отношение сигнал/шум (в разах, не дБ)', default: 100 },
  ],
  compute: ({ B, SNR }) => ({
    result: B * Math.log2(1 + SNR),
    unit: 'бит/с',
    latex: `C = B \\log_2(1 + S/N)`,
  }),
});

register({
  id: 'crypto.entropy-bernoulli',
  name: 'Энтропия Бернулли (двоичной случайной величины)',
  category: 'Криптография и информация',
  description: 'H = −p·log₂(p) − (1−p)·log₂(1−p)',
  expression: 'H(p) = −p·log₂(p) − (1−p)·log₂(1−p)',
  inputs: [{ name: 'p', label: 'Вероятность p (0…1)', default: 0.5 }],
  compute: ({ p }) => {
    if (p <= 0 || p >= 1) {
      if (p === 0 || p === 1) return { result: 0, unit: 'бит', latex: `H = 0` };
      throw new Error('p должно быть в [0, 1]');
    }
    return {
      result: -p * Math.log2(p) - (1 - p) * Math.log2(1 - p),
      unit: 'бит',
      latex: `H(p) = -p \\log_2 p - (1-p) \\log_2(1-p)`,
    };
  },
});
