/**
 * Музыкальные интервалы. Базовая — цент (1/100 полутона).
 *
 * Это логарифмическая шкала, но для удобства интервалы в полутонах
 * представлены как линейные множители: 1 полутон = 100 центов.
 */

import { register } from './registry';

register({
  id: 'music-intervals',
  name: 'Музыкальные интервалы',
  category: 'music',
  units: [
    { code: 'cent', label: 'цент', toBase: 1 },
    { code: 'comma', label: 'дидимова комма (≈ 21.5 cents)', toBase: 21.506 },
    { code: 'quartertone', label: 'четвертьтон', toBase: 50 },
    { code: 'semitone', label: 'полутон (равномерно-темперированный)', toBase: 100 },
    { code: 'wholetone', label: 'целый тон', toBase: 200 },
    { code: 'minor3', label: 'малая терция', toBase: 300 },
    { code: 'major3', label: 'большая терция', toBase: 400 },
    { code: 'perfect4', label: 'чистая кварта', toBase: 500 },
    { code: 'tritone', label: 'тритон (увеличенная кварта)', toBase: 600 },
    { code: 'perfect5', label: 'чистая квинта', toBase: 700 },
    { code: 'minor6', label: 'малая секста', toBase: 800 },
    { code: 'major6', label: 'большая секста', toBase: 900 },
    { code: 'minor7', label: 'малая септима', toBase: 1000 },
    { code: 'major7', label: 'большая септима', toBase: 1100 },
    { code: 'octave', label: 'октава', toBase: 1200 },
  ],
});
