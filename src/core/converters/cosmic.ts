/**
 * Космические массы и радиусы — астрономические референсы.
 */

import { register } from './registry';

register({
  id: 'cosmic-mass',
  name: 'Космические массы',
  category: 'astronomy',
  units: [
    { code: 'kg', label: 'килограмм', toBase: 1 },
    { code: 't', label: 'тонна', toBase: 1000 },
    // Объекты Солнечной системы
    { code: 'M_moon', label: 'масса Луны', toBase: 7.342e22 },
    { code: 'M_mercury', label: 'масса Меркурия', toBase: 3.3011e23 },
    { code: 'M_mars', label: 'масса Марса', toBase: 6.4171e23 },
    { code: 'M_venus', label: 'масса Венеры', toBase: 4.8675e24 },
    { code: 'M_earth', label: 'масса Земли (M⊕)', toBase: 5.972e24 },
    { code: 'M_neptune', label: 'масса Нептуна', toBase: 1.024e26 },
    { code: 'M_uranus', label: 'масса Урана', toBase: 8.681e25 },
    { code: 'M_saturn', label: 'масса Сатурна', toBase: 5.683e26 },
    { code: 'M_jupiter', label: 'масса Юпитера (M♃)', toBase: 1.898e27 },
    { code: 'M_sun', label: 'масса Солнца (M☉)', toBase: 1.98892e30 },
    // Звёзды и галактики
    { code: 'M_betelgeuse', label: 'масса Бетельгейзе', toBase: 3.4e31 },
    { code: 'M_sagA', label: 'масса Sgr A* (центральная ЧД)', toBase: 8.26e36 },
    { code: 'M_M87', label: 'масса ЧД M87*', toBase: 1.29e40 },
    { code: 'M_MW', label: 'масса Млечного Пути', toBase: 2.39e42 },
    { code: 'M_universe', label: 'масса наблюдаемой Вселенной', toBase: 1.5e53 },
  ],
});

register({
  id: 'cosmic-radius',
  name: 'Космические радиусы',
  category: 'astronomy',
  units: [
    { code: 'm', label: 'метр', toBase: 1 },
    { code: 'km', label: 'километр', toBase: 1000 },
    // Объекты
    { code: 'R_moon', label: 'радиус Луны', toBase: 1.7374e6 },
    { code: 'R_mercury', label: 'радиус Меркурия', toBase: 2.4397e6 },
    { code: 'R_mars', label: 'радиус Марса', toBase: 3.3895e6 },
    { code: 'R_venus', label: 'радиус Венеры', toBase: 6.0518e6 },
    { code: 'R_earth', label: 'радиус Земли (R⊕)', toBase: 6.371e6 },
    { code: 'R_neptune', label: 'радиус Нептуна', toBase: 2.4622e7 },
    { code: 'R_uranus', label: 'радиус Урана', toBase: 2.5362e7 },
    { code: 'R_saturn', label: 'радиус Сатурна', toBase: 5.8232e7 },
    { code: 'R_jupiter', label: 'радиус Юпитера (R♃)', toBase: 6.9911e7 },
    { code: 'R_sun', label: 'радиус Солнца (R☉)', toBase: 6.957e8 },
    { code: 'R_betelgeuse', label: 'радиус Бетельгейзе', toBase: 6e11 },
    // Расстояния
    { code: 'AU', label: 'астрономическая единица (земная орбита)', toBase: 1.496e11 },
    { code: 'ly', label: 'световой год', toBase: 9.461e15 },
    { code: 'pc', label: 'парсек', toBase: 3.086e16 },
    { code: 'kpc', label: 'килопарсек', toBase: 3.086e19 },
    { code: 'Mpc', label: 'мегапарсек', toBase: 3.086e22 },
    { code: 'R_universe', label: 'радиус наблюдаемой Вселенной', toBase: 4.4e26 },
  ],
});
