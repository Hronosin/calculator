/**
 * Углеродный след. Базовая — килограмм CO₂-эквивалента.
 * Коэффициенты — типичные значения для оценки footprint.
 */

import { register } from './registry';

register({
  id: 'carbon',
  name: 'Углеродный след',
  category: 'environment',
  units: [
    { code: 'g_CO2', label: 'грамм CO₂', toBase: 0.001 },
    { code: 'kg_CO2', label: 'килограмм CO₂', toBase: 1 },
    { code: 't_CO2', label: 'тонна CO₂', toBase: 1000 },
    // Сжигание топлива
    { code: 'L_petrol', label: 'литр бензина (сжигание)', toBase: 2.31 },
    { code: 'L_diesel', label: 'литр дизеля', toBase: 2.68 },
    { code: 'kg_coal', label: 'килограмм угля', toBase: 2.42 },
    { code: 'm³_gas', label: 'кубометр природного газа', toBase: 2.02 },
    // Транспорт
    { code: 'km_car', label: 'километр на легковом авто (среднее)', toBase: 0.12 },
    { code: 'km_train', label: 'километр на поезде', toBase: 0.04 },
    { code: 'km_flight', label: 'километр на самолёте (эконом)', toBase: 0.11 },
    // Энергия
    { code: 'kWh_grid', label: 'кВт·ч электросети (среднее в мире)', toBase: 0.475 },
    // Еда
    { code: 'kg_beef', label: 'килограмм говядины', toBase: 60 },
    { code: 'kg_chicken', label: 'килограмм курицы', toBase: 6 },
    { code: 'kg_rice', label: 'килограмм риса', toBase: 2.7 },
    { code: 'kg_vegetables', label: 'килограмм овощей', toBase: 0.4 },
    // Бенчмарки
    { code: 'tree-year', label: 'годовое поглощение одного дерева', toBase: 22 },
    { code: 'person-yr', label: 'годовая эмиссия среднего человека', toBase: 4800 },
  ],
});
