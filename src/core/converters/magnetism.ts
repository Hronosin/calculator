/**
 * Магнитная индукция и магнитный поток.
 */

import { register } from './registry';

register({
  id: 'magnetic-flux-density',
  name: 'Магнитная индукция',
  category: 'magnetism',
  units: [
    { code: 'γ', label: 'гамма', toBase: 1e-9 },
    { code: 'nT', label: 'нанотесла', toBase: 1e-9 },
    { code: 'μT', label: 'микротесла', toBase: 1e-6 },
    { code: 'mG', label: 'миллигаусс', toBase: 1e-7 },
    { code: 'G', label: 'гаусс', toBase: 1e-4 },
    { code: 'mT', label: 'миллитесла', toBase: 1e-3 },
    { code: 'T', label: 'тесла', toBase: 1 },
    { code: 'kG', label: 'килогаусс', toBase: 0.1 },
    // Bench-marks
    { code: 'B_earth', label: 'магнитное поле Земли (≈ 50 μT)', toBase: 50e-6 },
    { code: 'B_fridge', label: 'магнит на холодильнике (≈ 5 mT)', toBase: 5e-3 },
    { code: 'B_mri', label: 'аппарат МРТ (≈ 1.5 T)', toBase: 1.5 },
    { code: 'B_neutron-star', label: 'нейтронная звезда (≈ 10⁸ T)', toBase: 1e8 },
  ],
});

register({
  id: 'magnetic-flux',
  name: 'Магнитный поток',
  category: 'magnetism',
  units: [
    { code: 'Mx', label: 'максвелл', toBase: 1e-8 },
    { code: 'mWb', label: 'милливебер', toBase: 1e-3 },
    { code: 'Wb', label: 'вебер', toBase: 1 },
    { code: 'V·s', label: 'вольт-секунда', toBase: 1 },
    { code: 'T·m²', label: 'тесла-квадратный метр', toBase: 1 },
  ],
});
