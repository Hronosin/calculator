import { register } from './registry';

register({
  id: 'mass',
  name: 'Масса',
  category: 'weight',
  units: [
    { code: 'kg', label: 'килограмм', toBase: 1 },
    { code: 'g', label: 'грамм', toBase: 0.001 },
    { code: 'mg', label: 'миллиграмм', toBase: 1e-6 },
    { code: 'μg', label: 'микрограмм', toBase: 1e-9 },
    { code: 't', label: 'тонна', toBase: 1000 },
    { code: 'lb', label: 'фунт', toBase: 0.45359237 },
    { code: 'oz', label: 'унция', toBase: 0.028349523125 },
    { code: 'st', label: 'стоун', toBase: 6.35029318 },
  ],
});
