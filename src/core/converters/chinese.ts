/**
 * Китайские традиционные меры (市制 shìzhì).
 */

import { register } from './registry';

register({
  id: 'chinese-length',
  name: 'Китайские меры (длина)',
  category: 'historical',
  units: [
    { code: 'm', label: 'метр', toBase: 1 },
    { code: '毫', label: '毫 háo', toBase: 3.333e-5 },
    { code: '釐', label: '釐 lí', toBase: 3.333e-4 },
    { code: '分', label: '分 fēn', toBase: 3.333e-3 },
    { code: '寸', label: '寸 cùn', toBase: 0.03333 },
    { code: '尺', label: '尺 chǐ', toBase: 0.3333 },
    { code: '丈', label: '丈 zhàng', toBase: 3.333 },
    { code: '引', label: '引 yǐn', toBase: 33.33 },
    { code: '里', label: '里 lǐ', toBase: 500 },
  ],
});

register({
  id: 'chinese-mass',
  name: 'Китайские меры (масса)',
  category: 'historical',
  units: [
    { code: 'kg', label: 'килограмм', toBase: 1 },
    { code: '錢', label: '錢 qián', toBase: 0.005 },
    { code: '兩', label: '兩 liǎng', toBase: 0.05 },
    { code: '斤', label: '斤 jīn', toBase: 0.5 },
    { code: '担', label: '担 dàn (100 jīn)', toBase: 50 },
  ],
});

register({
  id: 'chinese-area',
  name: 'Китайские меры (площадь)',
  category: 'historical',
  units: [
    { code: 'm²', label: 'квадратный метр', toBase: 1 },
    { code: '平方尺', label: '平方尺 píngfāng chǐ', toBase: 0.1111 },
    { code: '畝', label: '畝 mǔ (60 квадр. zhàng)', toBase: 666.67 },
    { code: '頃', label: '頃 qǐng (100 mǔ)', toBase: 66666.67 },
  ],
});
