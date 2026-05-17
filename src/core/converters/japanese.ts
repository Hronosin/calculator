/**
 * Японские традиционные меры (尺貫法 / sakkanhō).
 * Базовые: метр, килограмм, литр, м² — отдельные конвертеры.
 */

import { register } from './registry';

register({
  id: 'japanese-length',
  name: 'Японские меры (длина)',
  category: 'historical',
  units: [
    { code: 'm', label: 'метр', toBase: 1 },
    { code: '毛', label: '毛 mō', toBase: 3.030303e-6 },
    { code: '厘', label: '厘 rin', toBase: 3.030303e-4 },
    { code: '分', label: '分 bu', toBase: 3.030303e-3 },
    { code: '寸', label: '寸 sun', toBase: 0.03030303 },
    { code: '尺', label: '尺 shaku', toBase: 0.3030303 },
    { code: '間', label: '間 ken (6 shaku)', toBase: 1.818182 },
    { code: '丈', label: '丈 jō (10 shaku)', toBase: 3.030303 },
    { code: '町', label: '町 chō', toBase: 109.0909 },
    { code: '里', label: '里 ri', toBase: 3927.273 },
  ],
});

register({
  id: 'japanese-mass',
  name: 'Японские меры (масса)',
  category: 'historical',
  units: [
    { code: 'kg', label: 'килограмм', toBase: 1 },
    { code: '毛_質', label: '毛 mō (масса)', toBase: 3.75e-7 },
    { code: '厘_質', label: '厘 rin (масса)', toBase: 3.75e-5 },
    { code: '分_質', label: '分 bu (масса)', toBase: 3.75e-4 },
    { code: '匁', label: '匁 monme', toBase: 3.75e-3 },
    { code: '両', label: '両 ryō', toBase: 0.0375 },
    { code: '斤', label: '斤 kin (160 monme)', toBase: 0.6 },
    { code: '貫', label: '貫 kan (1000 monme)', toBase: 3.75 },
  ],
});

register({
  id: 'japanese-volume',
  name: 'Японские меры (объём)',
  category: 'historical',
  units: [
    { code: 'L', label: 'литр', toBase: 1 },
    { code: '勺', label: '勺 shaku (объём)', toBase: 0.018039 },
    { code: '合', label: '合 gō (рисовая чашка)', toBase: 0.18039 },
    { code: '升', label: '升 shō', toBase: 1.8039 },
    { code: '斗', label: '斗 to (10 shō)', toBase: 18.039 },
    { code: '石', label: '石 koku (10 to)', toBase: 180.39 },
  ],
});

register({
  id: 'japanese-area',
  name: 'Японские меры (площадь)',
  category: 'historical',
  units: [
    { code: 'm²', label: 'квадратный метр', toBase: 1 },
    { code: '勺_面', label: '勺 shaku (площадь)', toBase: 0.033058 },
    { code: '合_面', label: '合 gō (площадь)', toBase: 0.33058 },
    { code: '坪', label: '坪 tsubo (2 татами)', toBase: 3.30579 },
    { code: '畳', label: '畳 jō (татами)', toBase: 1.65289 },
    { code: '畝', label: '畝 se (30 tsubo)', toBase: 99.1736 },
    { code: '反', label: '反 tan', toBase: 991.736 },
    { code: '町_面', label: '町 chō (площадь)', toBase: 9917.36 },
  ],
});
