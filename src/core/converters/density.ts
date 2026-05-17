/**
 * Плотность. Базовая — кг/м³.
 */

import { register } from './registry';

register({
  id: 'density',
  name: 'Плотность',
  category: 'density',
  units: [
    { code: 'kg/m³', label: 'килограмм на кубический метр', toBase: 1 },
    { code: 'g/cm³', label: 'грамм на кубический сантиметр', toBase: 1000 },
    { code: 'g/L', label: 'грамм на литр', toBase: 1 },
    { code: 'kg/L', label: 'килограмм на литр', toBase: 1000 },
    { code: 'mg/L', label: 'миллиграмм на литр', toBase: 0.001 },
    { code: 'lb/ft³', label: 'фунт на кубический фут', toBase: 16.0184633739601 },
    { code: 'lb/in³', label: 'фунт на кубический дюйм', toBase: 27679.904710203 },
    { code: 'oz/in³', label: 'унция на кубический дюйм', toBase: 1729.99404 },
    { code: 'slug/ft³', label: 'слаг на кубический фут', toBase: 515.378818 },
    { code: 'ρ_water', label: 'плотность воды (4 °C)', toBase: 1000 },
    { code: 'ρ_air', label: 'плотность воздуха (0 °C)', toBase: 1.2922 },
    { code: 'ρ_earth', label: 'средняя плотность Земли', toBase: 5513.4 },
    { code: 'ρ_sun', label: 'средняя плотность Солнца', toBase: 1408 },
    { code: 'ρ_neutron', label: 'плотность нейтронной звезды', toBase: 4e17 },
  ],
});
