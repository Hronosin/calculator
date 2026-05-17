/**
 * Астрофизика.
 */

import { register } from './registry';

const G_GRAV = 6.6743e-11; // gravitational constant
const C = 299792458;
const H0 = 2.27e-18; // Hubble constant ≈ 70 km/s/Mpc in 1/s
const M_SUN = 1.989e30;

register({
  id: 'astro.newton-gravity',
  name: 'Закон всемирного тяготения',
  category: 'Астрофизика',
  description: 'F = G m₁ m₂ / r²',
  expression: 'F = G · m₁ · m₂ / r²',
  inputs: [
    { name: 'm1', label: 'Масса 1', unit: 'кг', default: M_SUN },
    { name: 'm2', label: 'Масса 2', unit: 'кг', default: 5.972e24 },
    { name: 'r', label: 'Расстояние', unit: 'м', default: 1.496e11 },
  ],
  compute: ({ m1, m2, r }) => {
    if (r === 0) throw new Error('Distance cannot be zero');
    return {
      result: (G_GRAV * m1 * m2) / (r * r),
      unit: 'Н',
      latex: `F = G \\frac{m_1 m_2}{r^2}`,
    };
  },
});

register({
  id: 'astro.escape-velocity',
  name: 'Вторая космическая скорость',
  category: 'Астрофизика',
  description: 'v = √(2 G M / r)',
  expression: 'v = √(2 · G · M / r)',
  inputs: [
    { name: 'M', label: 'Масса тела', unit: 'кг', default: 5.972e24 },
    { name: 'r', label: 'Радиус', unit: 'м', default: 6.371e6 },
  ],
  compute: ({ M, r }) => {
    if (r <= 0) throw new Error('Radius must be positive');
    return {
      result: Math.sqrt((2 * G_GRAV * M) / r),
      unit: 'м/с',
      latex: `v_{esc} = \\sqrt{\\frac{2GM}{r}}`,
    };
  },
});

register({
  id: 'astro.orbital-velocity',
  name: 'Первая космическая скорость',
  category: 'Астрофизика',
  description: 'v = √(G M / r)',
  expression: 'v = √(G · M / r)',
  inputs: [
    { name: 'M', label: 'Масса тела', unit: 'кг', default: 5.972e24 },
    { name: 'r', label: 'Радиус орбиты', unit: 'м', default: 6.371e6 },
  ],
  compute: ({ M, r }) => {
    if (r <= 0) throw new Error('Radius must be positive');
    return {
      result: Math.sqrt((G_GRAV * M) / r),
      unit: 'м/с',
      latex: `v = \\sqrt{\\frac{GM}{r}}`,
    };
  },
});

register({
  id: 'astro.kepler-third',
  name: 'Третий закон Кеплера',
  category: 'Астрофизика',
  description: 'T = 2π √(a³ / (G M))',
  expression: 'T² = 4π² · a³ / (G · M)',
  inputs: [
    { name: 'a', label: 'Большая полуось', unit: 'м', default: 1.496e11 },
    { name: 'M', label: 'Масса центрального тела', unit: 'кг', default: M_SUN },
  ],
  compute: ({ a, M }) => {
    if (a <= 0 || M <= 0) throw new Error('Invalid parameters');
    return {
      result: 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / (G_GRAV * M)),
      unit: 'с',
      latex: `T = 2\\pi \\sqrt{\\frac{a^3}{GM}}`,
    };
  },
});

register({
  id: 'astro.schwarzschild',
  name: 'Радиус Шварцшильда',
  category: 'Астрофизика',
  description: 'r_s = 2 G M / c²',
  expression: 'r_s = 2 · G · M / c²',
  inputs: [{ name: 'M', label: 'Масса', unit: 'кг', default: M_SUN }],
  compute: ({ M }) => ({
    result: (2 * G_GRAV * M) / (C * C),
    unit: 'м',
    latex: `r_s = \\frac{2GM}{c^2}`,
  }),
});

register({
  id: 'astro.hubble',
  name: 'Закон Хаббла',
  category: 'Астрофизика',
  description: 'v = H₀ d',
  expression: 'v = H₀ · d',
  inputs: [{ name: 'd', label: 'Расстояние до галактики', unit: 'м', default: 3.086e22 }],
  compute: ({ d }) => ({
    result: H0 * d,
    unit: 'м/с',
    latex: `v = H_0 d`,
  }),
});

register({
  id: 'astro.gravitational-acceleration',
  name: 'Гравитационное ускорение на поверхности',
  category: 'Астрофизика',
  description: 'g = G M / r²',
  expression: 'g = G · M / r²',
  inputs: [
    { name: 'M', label: 'Масса тела', unit: 'кг', default: 5.972e24 },
    { name: 'r', label: 'Радиус', unit: 'м', default: 6.371e6 },
  ],
  compute: ({ M, r }) => {
    if (r === 0) throw new Error('Radius cannot be zero');
    return {
      result: (G_GRAV * M) / (r * r),
      unit: 'м/с²',
      latex: `g = \\frac{GM}{r^2}`,
    };
  },
});
