/**
 * "Альтернативные валюты" — индексы покупательной способности
 * и метафорические единицы для сравнения цен.
 *
 * Базовая — доллар США. Курсы — типичные значения для оценки.
 * Это не реальный курс валют, а индексы покупательной способности.
 */

import { register } from './registry';

register({
  id: 'purchasing-power',
  name: 'Покупательная способность',
  category: 'meta',
  units: [
    { code: 'USD', label: 'доллар США', toBase: 1 },
    // Big Mac Index (≈ 2024)
    { code: 'BigMac_US', label: 'Big Mac в США (≈ $5.7)', toBase: 5.7 },
    { code: 'BigMac_RU', label: 'Big Mac в России (≈ $1.7)', toBase: 1.7 },
    { code: 'BigMac_CN', label: 'Big Mac в Китае (≈ $3.5)', toBase: 3.5 },
    { code: 'BigMac_EU', label: 'Big Mac в ЕС (≈ $6.0)', toBase: 6.0 },
    { code: 'BigMac_CH', label: 'Big Mac в Швейцарии (≈ $7.7)', toBase: 7.7 },
    // Прочие референсы
    { code: 'coffee', label: 'чашка кофе (Starbucks, ≈ $4)', toBase: 4 },
    { code: 'iphone', label: 'iPhone Pro (≈ $1100)', toBase: 1100 },
    { code: 'tesla_y', label: 'Tesla Model Y (≈ $50 000)', toBase: 50000 },
    { code: 'house_US', label: 'средний дом в США (≈ $400 000)', toBase: 400000 },
    // Метафорические
    { code: 'minute_minwage_US', label: 'минута на минимальной зарплате США ($0.13)', toBase: 0.121 },
    { code: 'hour_dev', label: 'час программиста (≈ $100)', toBase: 100 },
  ],
});
