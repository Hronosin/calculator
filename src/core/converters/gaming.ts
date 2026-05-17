/**
 * Игровые величины — латентность, FPS, разрешения экранов.
 */

import { register } from './registry';

register({
  id: 'latency',
  name: 'Латентность',
  category: 'gaming',
  units: [
    { code: 'μs', label: 'микросекунда', toBase: 0.001 },
    { code: 'ms', label: 'миллисекунда', toBase: 1 },
    { code: 's', label: 'секунда', toBase: 1000 },
    { code: 'frame_60fps', label: 'кадр при 60 FPS (16.67 мс)', toBase: 16.667 },
    { code: 'frame_120fps', label: 'кадр при 120 FPS', toBase: 8.333 },
    { code: 'frame_144fps', label: 'кадр при 144 FPS', toBase: 6.944 },
    { code: 'frame_240fps', label: 'кадр при 240 FPS', toBase: 4.167 },
    { code: 'tick_64', label: 'тик 64 Гц (CS:GO MM)', toBase: 15.625 },
    { code: 'tick_128', label: 'тик 128 Гц (FaceIt)', toBase: 7.8125 },
    // Бенчмарки
    { code: 'fiber-ping', label: 'оптоволокно в пределах города (≈ 5 мс)', toBase: 5 },
    { code: 'transatlantic', label: 'трансатлантический ping (≈ 80 мс)', toBase: 80 },
    { code: 'satellite', label: 'геостационарный спутник (≈ 600 мс)', toBase: 600 },
  ],
});

register({
  id: 'pixel-density',
  name: 'Плотность пикселей',
  category: 'gaming',
  units: [
    { code: 'PPI', label: 'пикселей на дюйм', toBase: 1 },
    { code: 'PPCM', label: 'пикселей на сантиметр', toBase: 2.54 },
    { code: 'DPI', label: 'точек на дюйм', toBase: 1 },
    // Бенчмарки
    { code: 'desktop_LCD', label: 'обычный монитор (≈ 96 PPI)', toBase: 96 },
    { code: 'retina', label: 'дисплей Retina (≈ 220 PPI)', toBase: 220 },
    { code: 'phone_HD', label: 'смартфон Full HD (≈ 400 PPI)', toBase: 400 },
    { code: 'phone_4K', label: 'смартфон 4K (≈ 800 PPI)', toBase: 800 },
  ],
});
