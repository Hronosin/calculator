/**
 * Алкогольные единицы. Базовая — грамм чистого этанола.
 * Учитывает международные стандарты «стандартного напитка».
 */

import { register } from './registry';

register({
  id: 'alcohol',
  name: 'Алкоголь',
  category: 'alcohol',
  units: [
    { code: 'g_ethanol', label: 'грамм чистого этанола', toBase: 1 },
    { code: 'ml_ethanol', label: 'миллилитр чистого этанола', toBase: 0.789 },
    { code: 'UK_unit', label: 'единица (Великобритания, 8 г)', toBase: 8 },
    { code: 'standard_US', label: 'стандартный напиток (США, 14 г)', toBase: 14 },
    { code: 'standard_AU', label: 'стандартный напиток (Австралия, 10 г)', toBase: 10 },
    { code: 'standard_JP', label: 'стандартный напиток (Япония, 20 г)', toBase: 20 },
    // Реальные напитки
    { code: 'beer_pint_5pct', label: 'пинта пива 5% (≈ 19 г)', toBase: 19 },
    { code: 'wine_glass', label: 'бокал вина 175 мл, 13% (≈ 18 г)', toBase: 18 },
    { code: 'shot_vodka', label: 'рюмка водки 50 мл, 40% (≈ 16 г)', toBase: 16 },
    { code: 'bottle_wine', label: 'бутылка вина 750 мл, 13% (≈ 77 г)', toBase: 77 },
    { code: 'bottle_beer', label: 'бутылка пива 0.5 л, 5% (≈ 20 г)', toBase: 20 },
    { code: 'bottle_vodka', label: 'бутылка водки 0.5 л, 40% (≈ 158 г)', toBase: 158 },
  ],
});
