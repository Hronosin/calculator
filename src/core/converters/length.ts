import { register } from './registry';

register({
  id: 'length',
  name: 'Длина',
  category: 'distance',
  units: [
    { code: 'm', label: 'метр', toBase: 1 },
    { code: 'km', label: 'километр', toBase: 1000 },
    { code: 'cm', label: 'сантиметр', toBase: 0.01 },
    { code: 'mm', label: 'миллиметр', toBase: 0.001 },
    { code: 'μm', label: 'микрометр', toBase: 1e-6 },
    { code: 'nm', label: 'нанометр', toBase: 1e-9 },
    { code: 'in', label: 'дюйм', toBase: 0.0254 },
    { code: 'ft', label: 'фут', toBase: 0.3048 },
    { code: 'yd', label: 'ярд', toBase: 0.9144 },
    { code: 'mi', label: 'миля', toBase: 1609.344 },
    { code: 'nmi', label: 'морская миля', toBase: 1852 },
  ],
});
