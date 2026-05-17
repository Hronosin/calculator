/**
 * Древнерусские меры объёма. Базовая — литр.
 */

import { register } from './registry';

register({
  id: 'old-russian-volume',
  name: 'Древнерусские меры (объём)',
  category: 'historical',
  units: [
    { code: 'л', label: 'литр', toBase: 1 },
    // Жидкости
    { code: 'шкалик', label: 'шкалик / косушка', toBase: 0.061499 },
    { code: 'чарка', label: 'чарка', toBase: 0.12299 },
    { code: 'стакан', label: 'стакан', toBase: 0.2459 },
    { code: 'бутылка_винная', label: 'бутылка винная', toBase: 0.7687 },
    { code: 'бутылка_водочная', label: 'бутылка водочная (1/20 ведра)', toBase: 0.615 },
    { code: 'штоф', label: 'штоф', toBase: 1.2299 },
    { code: 'четверть_ведра', label: 'четверть ведра', toBase: 3.0748 },
    { code: 'ведро', label: 'ведро', toBase: 12.299 },
    { code: 'бочка', label: 'бочка (40 вёдер)', toBase: 491.976 },
    // Сыпучих
    { code: 'гарнец', label: 'гарнец', toBase: 3.2798 },
    { code: 'четверик', label: 'четверик (8 гарнцев)', toBase: 26.239 },
    { code: 'четверть_сыпуч', label: 'четверть (сыпучих)', toBase: 209.91 },
  ],
});
