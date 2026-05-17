/**
 * Скорость печати. Базовая — слова в минуту (WPM).
 * Стандартное слово = 5 символов (industry convention).
 */

import { register } from './registry';

register({
  id: 'typing-speed',
  name: 'Скорость печати',
  category: 'productivity',
  units: [
    { code: 'WPM', label: 'слов в минуту', toBase: 1 },
    { code: 'CPM', label: 'символов в минуту', toBase: 0.2 },
    { code: 'CPS', label: 'символов в секунду', toBase: 12 },
    { code: 'KPS', label: 'нажатий в секунду (keys/sec)', toBase: 12 },
    { code: 'KPH', label: 'нажатий в час', toBase: 3.3333333e-3 },
    // Бенчмарки
    { code: 'beginner', label: 'начинающий (≈ 20 WPM)', toBase: 20 },
    { code: 'average', label: 'средний (≈ 40 WPM)', toBase: 40 },
    { code: 'pro', label: 'профессиональная (≈ 80 WPM)', toBase: 80 },
    { code: 'expert', label: 'эксперт (≈ 120 WPM)', toBase: 120 },
    { code: 'record', label: 'мировой рекорд (≈ 216 WPM)', toBase: 216 },
  ],
});
