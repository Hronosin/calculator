/**
 * Радиоактивность. Базовая единица — беккерель (Бк = распад/с).
 *
 * Примечание: Гр (поглощённая доза) и Зв (эквивалентная) формально измеряют
 * разные физические величины, но в инженерной практике их часто держат
 * в одной таблице конверсий. Здесь шкалы расположены по фактическому
 * множителю к Бк / Гр / Зв соответственно.
 */

import { register } from './registry';

register({
  id: 'radioactivity',
  name: 'Радиоактивность',
  category: 'radioactivity',
  units: [
    { code: 'Bq', label: 'беккерель (распад/с)', toBase: 1 },
    { code: 'kBq', label: 'килобеккерель', toBase: 1000 },
    { code: 'MBq', label: 'мегабеккерель', toBase: 1e6 },
    { code: 'GBq', label: 'гигабеккерель', toBase: 1e9 },
    { code: 'Ci', label: 'кюри', toBase: 3.7e10 },
    { code: 'mCi', label: 'милликюри', toBase: 3.7e7 },
    { code: 'μCi', label: 'микрокюри', toBase: 3.7e4 },
  ],
});

// Отдельная категория: поглощённая доза
register({
  id: 'absorbed-dose',
  name: 'Поглощённая доза',
  category: 'radioactivity',
  units: [
    { code: 'Gy', label: 'грэй (Дж/кг)', toBase: 1 },
    { code: 'mGy', label: 'миллигрэй', toBase: 1e-3 },
    { code: 'μGy', label: 'микрогрэй', toBase: 1e-6 },
    { code: 'rad', label: 'рад', toBase: 0.01 },
    { code: 'mrad', label: 'миллирад', toBase: 1e-5 },
  ],
});

// Отдельная категория: эквивалентная доза
register({
  id: 'equivalent-dose',
  name: 'Эквивалентная доза',
  category: 'radioactivity',
  units: [
    { code: 'Sv', label: 'зиверт', toBase: 1 },
    { code: 'mSv', label: 'миллизиверт', toBase: 1e-3 },
    { code: 'μSv', label: 'микрозиверт', toBase: 1e-6 },
    { code: 'rem', label: 'бэр', toBase: 0.01 },
    { code: 'mrem', label: 'миллибэр', toBase: 1e-5 },
  ],
});
