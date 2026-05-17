/**
 * Скорости в природе — шутливая таблица для сравнения.
 * Базовая — м/с.
 */

import { register } from './registry';

register({
  id: 'nature-speeds',
  name: 'Скорости в природе',
  category: 'fun',
  units: [
    { code: 'm/s', label: 'метр в секунду', toBase: 1 },
    { code: 'km/h', label: 'км/ч', toBase: 1 / 3.6 },
    { code: 'mph', label: 'миля/ч', toBase: 0.44704 },
    // Природа
    { code: 'snail', label: '🐌 улитка (0.013 м/с)', toBase: 0.013 },
    { code: 'sloth', label: '🦥 ленивец (0.07 м/с)', toBase: 0.07 },
    { code: 'tortoise', label: '🐢 черепаха (0.27 м/с)', toBase: 0.27 },
    { code: 'walking', label: '🚶 пешеход (1.4 м/с)', toBase: 1.4 },
    { code: 'running_amateur', label: '🏃 любительский бег (3 м/с)', toBase: 3 },
    { code: 'usain_bolt', label: '🏃‍♂️💨 Усэйн Болт (10.44 м/с)', toBase: 10.44 },
    { code: 'cheetah', label: '🐆 гепард (33 м/с)', toBase: 33 },
    { code: 'falcon_dive', label: '🦅 сокол в пикировании (90 м/с)', toBase: 90 },
    { code: 'car_highway', label: '🚗 авто на шоссе (30 м/с)', toBase: 30 },
    { code: 'fast_train', label: '🚄 скоростной поезд (83 м/с)', toBase: 83 },
    { code: 'airliner', label: '✈ авиалайнер (250 м/с)', toBase: 250 },
    { code: 'sound', label: '🔊 звук в воздухе (343 м/с)', toBase: 343 },
    { code: 'concorde', label: '✈🚀 Конкорд (605 м/с)', toBase: 605 },
    { code: 'bullet', label: '🔫 пуля (≈ 760 м/с)', toBase: 760 },
    { code: 'iss', label: '🛰 МКС (7670 м/с)', toBase: 7670 },
    { code: 'escape_earth', label: '🌍🚀 II косм. скорость (11 186 м/с)', toBase: 11186 },
    { code: 'voyager', label: '🛸 Voyager 1 (17 000 м/с)', toBase: 17000 },
    { code: 'earth_orbit', label: '🌎 орбит. скорость Земли (29 780 м/с)', toBase: 29780 },
    { code: 'sun_galaxy', label: '☀ Солнце вокруг Млечного Пути (230 000 м/с)', toBase: 230000 },
    { code: 'light', label: '💡 скорость света (299 792 458 м/с)', toBase: 299792458 },
  ],
});
