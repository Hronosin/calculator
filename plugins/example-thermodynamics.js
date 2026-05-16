/**
 * Example plugin: Thermodynamics.
 *
 * Drop a file like this into /plugins/ and it will auto-load.
 * Plugins can register formulas and/or full tabs.
 *
 * No build step required — Vite will pick this up.
 */

export default {
  id: 'thermo',
  name: 'Термодинамика',
  version: '1.0.0',

  formulas: [
    {
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
        latex: `\\Delta U = ${Q} - ${W} = ${Q - W}\\,\\text{Дж}`,
      }),
    },
    {
      id: 'thermo.carnot-efficiency',
      name: 'КПД цикла Карно',
      category: 'Термодинамика',
      description: 'η = 1 − T_cold / T_hot',
      expression: 'η = 1 − T_c / T_h',
      inputs: [
        { name: 'Th', label: 'Температура нагревателя', unit: 'К', default: 600 },
        { name: 'Tc', label: 'Температура холодильника', unit: 'К', default: 300 },
      ],
      compute: ({ Th, Tc }) => {
        if (Th === 0) throw new Error('Hot temperature cannot be zero');
        const eta = 1 - Tc / Th;
        return {
          result: eta * 100,
          unit: '%',
          latex: `\\eta = 1 - \\frac{${Tc}}{${Th}} = ${eta.toFixed(4)}`,
        };
      },
    },
  ],
};
