/**
 * Термодинамика.
 */

import { register } from './registry';

const K_B = 1.380649e-23; // Boltzmann constant
const SIGMA = 5.670374419e-8; // Stefan–Boltzmann constant
const R_GAS = 8.314462618; // universal gas constant

register({
  id: 'thermo.first-law',
  name: 'Первый закон термодинамики',
  category: 'Термодинамика',
  description: 'ΔU = Q − W',
  expression: 'ΔU = Q − W',
  inputs: [
    { name: 'Q', label: 'Полученная теплота', unit: 'Дж', default: 100 },
    { name: 'W', label: 'Совершённая работа', unit: 'Дж', default: 30 },
  ],
  compute: ({ Q, W }) => ({
    result: Q - W,
    unit: 'Дж',
    latex: `\\Delta U = ${Q} - ${W}`,
  }),
});

register({
  id: 'thermo.carnot',
  name: 'КПД цикла Карно',
  category: 'Термодинамика',
  description: 'η = 1 − T_холодильника / T_нагревателя',
  expression: 'η = 1 − T_c / T_h',
  inputs: [
    { name: 'Th', label: 'Температура нагревателя', unit: 'К', default: 600 },
    { name: 'Tc', label: 'Температура холодильника', unit: 'К', default: 300 },
  ],
  compute: ({ Th, Tc }) => {
    if (Th === 0) throw new Error('Hot temperature cannot be zero');
    return {
      result: (1 - Tc / Th) * 100,
      unit: '%',
      latex: `\\eta = 1 - \\frac{${Tc}}{${Th}}`,
    };
  },
});

register({
  id: 'thermo.stefan-boltzmann',
  name: 'Закон Стефана–Больцмана',
  category: 'Термодинамика',
  description: 'P = σ A T⁴',
  expression: 'P = σ · A · T⁴',
  inputs: [
    { name: 'A', label: 'Площадь поверхности', unit: 'м²', default: 1 },
    { name: 'T', label: 'Температура', unit: 'К', default: 300 },
  ],
  compute: ({ A, T }) => ({
    result: SIGMA * A * Math.pow(T, 4),
    unit: 'Вт',
    latex: `P = \\sigma \\cdot ${A} \\cdot ${T}^4`,
  }),
});

register({
  id: 'thermo.rms-velocity',
  name: 'Средняя квадратичная скорость молекул',
  category: 'Термодинамика',
  description: 'v_rms = √(3RT / M)',
  expression: 'v = √(3 R T / M)',
  inputs: [
    { name: 'T', label: 'Температура', unit: 'К', default: 300 },
    { name: 'M', label: 'Молярная масса', unit: 'кг/моль', default: 0.029 },
  ],
  compute: ({ T, M }) => {
    if (M <= 0) throw new Error('Molar mass must be positive');
    return {
      result: Math.sqrt((3 * R_GAS * T) / M),
      unit: 'м/с',
      latex: `v_{rms} = \\sqrt{\\frac{3 R T}{M}}`,
    };
  },
});

register({
  id: 'thermo.boltzmann-entropy',
  name: 'Энтропия Больцмана',
  category: 'Термодинамика',
  description: 'S = k ln(W)',
  expression: 'S = k · ln(W)',
  inputs: [{ name: 'W', label: 'Число микросостояний', default: 1e10 }],
  compute: ({ W }) => {
    if (W <= 0) throw new Error('W must be positive');
    return {
      result: K_B * Math.log(W),
      unit: 'Дж/К',
      latex: `S = k_B \\ln(${W})`,
    };
  },
});

register({
  id: 'thermo.heat-engine-work',
  name: 'Работа тепловой машины',
  category: 'Термодинамика',
  description: 'W = Q_h − Q_c',
  expression: 'W = Q_h − Q_c',
  inputs: [
    { name: 'Qh', label: 'Теплота от нагревателя', unit: 'Дж', default: 1000 },
    { name: 'Qc', label: 'Теплота холодильнику', unit: 'Дж', default: 400 },
  ],
  compute: ({ Qh, Qc }) => ({
    result: Qh - Qc,
    unit: 'Дж',
    latex: `W = ${Qh} - ${Qc}`,
  }),
});
