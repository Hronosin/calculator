/**
 * Размеры винных бутылок. Базовая — литр.
 * Названы в честь библейских царей и патриархов — давняя традиция в виноделии Шампани.
 */

import { register } from './registry';

register({
  id: 'wine-bottles',
  name: 'Винные бутылки',
  category: 'cooking',
  units: [
    { code: 'L', label: 'литр', toBase: 1 },
    { code: 'split', label: 'Split / Piccolo (187.5 мл)', toBase: 0.1875 },
    { code: 'demi', label: 'Demi / Half bottle (375 мл)', toBase: 0.375 },
    { code: 'standard', label: 'Стандартная бутылка (750 мл)', toBase: 0.75 },
    { code: 'magnum', label: 'Magnum (2 бутылки)', toBase: 1.5 },
    { code: 'jeroboam', label: 'Jeroboam / Иеровоам (4 бут.)', toBase: 3 },
    { code: 'rehoboam', label: 'Rehoboam / Ровоам (6 бут.)', toBase: 4.5 },
    { code: 'methuselah', label: 'Methuselah / Мафусаил (8 бут.)', toBase: 6 },
    { code: 'salmanazar', label: 'Salmanazar / Салманасар (12 бут.)', toBase: 9 },
    { code: 'balthazar', label: 'Balthazar / Валтасар (16 бут.)', toBase: 12 },
    { code: 'nebuchadnezzar', label: 'Nebuchadnezzar / Навуходоносор (20 бут.)', toBase: 15 },
    { code: 'melchior', label: 'Melchior (24 бут.)', toBase: 18 },
    { code: 'solomon', label: 'Solomon / Соломон (28 бут.)', toBase: 21 },
    { code: 'sovereign', label: 'Sovereign (36 бут.)', toBase: 27 },
    { code: 'goliath', label: 'Goliath / Голиаф (36 бут.)', toBase: 27 },
    { code: 'melchizedek', label: 'Melchizedek / Мелхиседек (40 бут.)', toBase: 30 },
  ],
});
