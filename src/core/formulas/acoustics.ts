/**
 * Акустика.
 */

import { register } from './registry';

register({
  id: 'acoustic.sound-pressure-level',
  name: 'Уровень звукового давления',
  category: 'Акустика',
  description: 'L = 20 log₁₀(p / p₀),  p₀ = 20 мкПа',
  expression: 'L = 20 · log₁₀(p / 2e-5)',
  inputs: [{ name: 'p', label: 'Звуковое давление', unit: 'Па', default: 0.1 }],
  compute: ({ p }) => {
    if (p <= 0) throw new Error('Давление должно быть положительным');
    return {
      result: 20 * Math.log10(p / 2e-5),
      unit: 'дБ',
      latex: `L = 20 \\log_{10}\\frac{p}{p_0}`,
    };
  },
});

register({
  id: 'acoustic.sum-decibels',
  name: 'Сумма двух некогерентных источников (дБ)',
  category: 'Акустика',
  description: 'L = 10 log₁₀(10^(L₁/10) + 10^(L₂/10))',
  expression: 'L = 10 · log₁₀(10^(L₁/10) + 10^(L₂/10))',
  inputs: [
    { name: 'L1', label: 'Уровень источника 1', unit: 'дБ', default: 80 },
    { name: 'L2', label: 'Уровень источника 2', unit: 'дБ', default: 80 },
  ],
  compute: ({ L1, L2 }) => ({
    result: 10 * Math.log10(Math.pow(10, L1 / 10) + Math.pow(10, L2 / 10)),
    unit: 'дБ',
    latex: `L = 10 \\log_{10}(10^{L_1/10} + 10^{L_2/10})`,
  }),
});

register({
  id: 'acoustic.doppler',
  name: 'Эффект Доплера (звук)',
  category: 'Акустика',
  description: 'f′ = f · (c + v_приёмника) / (c − v_источника)',
  expression: "f' = f · (c + v_r) / (c − v_s)",
  inputs: [
    { name: 'f', label: 'Исходная частота', unit: 'Гц', default: 440 },
    { name: 'c', label: 'Скорость звука', unit: 'м/с', default: 343 },
    { name: 'vr', label: 'Скорость приёмника к источнику', unit: 'м/с', default: 0 },
    { name: 'vs', label: 'Скорость источника к приёмнику', unit: 'м/с', default: 30 },
  ],
  compute: ({ f, c, vr, vs }) => {
    if (c - vs === 0) throw new Error('Знаменатель равен нулю');
    return {
      result: (f * (c + vr)) / (c - vs),
      unit: 'Гц',
      latex: `f' = f \\frac{c + v_r}{c - v_s}`,
    };
  },
});

register({
  id: 'acoustic.speed-air',
  name: 'Скорость звука в воздухе',
  category: 'Акустика',
  description: 'c ≈ 331.3 · √(1 + T/273.15)',
  expression: 'c = 331.3 · √(1 + T/273.15)',
  inputs: [{ name: 'T', label: 'Температура', unit: '°C', default: 20 }],
  compute: ({ T }) => {
    const inside = 1 + T / 273.15;
    if (inside < 0) throw new Error('Подкоренное выражение отрицательное');
    return {
      result: 331.3 * Math.sqrt(inside),
      unit: 'м/с',
      latex: `c = 331.3\\sqrt{1 + \\frac{T}{273.15}}`,
    };
  },
});

register({
  id: 'acoustic.wavelength',
  name: 'Длина звуковой волны',
  category: 'Акустика',
  description: 'λ = c / f',
  expression: 'λ = c / f',
  inputs: [
    { name: 'c', label: 'Скорость звука', unit: 'м/с', default: 343 },
    { name: 'f', label: 'Частота', unit: 'Гц', default: 440 },
  ],
  compute: ({ c, f }) => {
    if (f === 0) throw new Error('Частота не может быть нулём');
    return {
      result: c / f,
      unit: 'м',
      latex: `\\lambda = \\frac{c}{f}`,
    };
  },
});

register({
  id: 'acoustic.note-frequency',
  name: 'Частота ноты от A4 (равномерно-темперированный строй)',
  category: 'Акустика',
  description: 'f = 440 · 2^(n / 12)',
  expression: 'f = 440 · 2^(n / 12)',
  inputs: [{ name: 'n', label: 'Полутонов от A4 (вверх — положительные)', default: 3 }],
  compute: ({ n }) => ({
    result: 440 * Math.pow(2, n / 12),
    unit: 'Гц',
    latex: `f = 440 \\cdot 2^{n/12}`,
  }),
});
