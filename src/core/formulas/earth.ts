/**
 * Науки о Земле — метеорология, геология, навигация.
 */

import { register } from './registry';

const R_EARTH = 6371000; // m
const G_EARTH = 9.81;

register({
  id: 'earth.haversine',
  name: 'Расстояние по большому кругу (Гаверсинус)',
  category: 'Науки о Земле',
  description: 'Расстояние между двумя точками на Земле по координатам',
  expression: 'd = 2R · arcsin(√(sin²(Δφ/2) + cos φ₁ · cos φ₂ · sin²(Δλ/2)))',
  inputs: [
    { name: 'lat1', label: 'Широта точки 1', unit: '°', default: 55.7558 },
    { name: 'lon1', label: 'Долгота точки 1', unit: '°', default: 37.6173 },
    { name: 'lat2', label: 'Широта точки 2', unit: '°', default: 59.9311 },
    { name: 'lon2', label: 'Долгота точки 2', unit: '°', default: 30.3609 },
  ],
  compute: ({ lat1, lon1, lat2, lon2 }) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return {
      result: (R_EARTH * c) / 1000,
      unit: 'км',
      latex: `d = 2R\\arcsin\\sqrt{\\sin^2\\frac{\\Delta\\varphi}{2} + \\cos\\varphi_1 \\cos\\varphi_2 \\sin^2\\frac{\\Delta\\lambda}{2}}`,
    };
  },
});

register({
  id: 'earth.barometric',
  name: 'Барометрическая формула (давление по высоте)',
  category: 'Науки о Земле',
  description: 'P = P₀ · exp(−M·g·h / (R·T))',
  expression: 'P = P₀ · exp(−M·g·h / (R·T))',
  inputs: [
    { name: 'P0', label: 'Давление на уровне моря', unit: 'Па', default: 101325 },
    { name: 'h', label: 'Высота', unit: 'м', default: 1000 },
    { name: 'T', label: 'Температура', unit: 'К', default: 288.15 },
  ],
  compute: ({ P0, h, T }) => {
    const M = 0.0289644; // молярная масса воздуха, кг/моль
    const R = 8.314462618;
    return {
      result: P0 * Math.exp(-(M * G_EARTH * h) / (R * T)),
      unit: 'Па',
      latex: `P = P_0 \\exp\\left(-\\frac{M g h}{R T}\\right)`,
    };
  },
});

register({
  id: 'earth.dew-point',
  name: 'Точка росы (приближение Magnus)',
  category: 'Науки о Земле',
  description: 'Td ≈ (b·α) / (a − α),  α = a·T/(b+T) + ln(RH/100)',
  expression: 'T_d = b·α / (a − α)',
  inputs: [
    { name: 'T', label: 'Температура воздуха', unit: '°C', default: 25 },
    { name: 'RH', label: 'Относительная влажность', unit: '%', default: 60 },
  ],
  compute: ({ T, RH }) => {
    if (RH <= 0 || RH > 100) throw new Error('RH должна быть в (0, 100]');
    const a = 17.625;
    const b = 243.04;
    const alpha = (a * T) / (b + T) + Math.log(RH / 100);
    return {
      result: (b * alpha) / (a - alpha),
      unit: '°C',
      latex: `T_d = \\frac{b \\alpha}{a - \\alpha}`,
    };
  },
});

register({
  id: 'earth.wind-chill',
  name: 'Ощущаемая температура с учётом ветра',
  category: 'Науки о Земле',
  description: '13.12 + 0.6215T − 11.37·v^0.16 + 0.3965·T·v^0.16',
  expression: 'T_app = 13.12 + 0.6215T − 11.37·v^0.16 + 0.3965·T·v^0.16',
  inputs: [
    { name: 'T', label: 'Температура воздуха', unit: '°C', default: -5 },
    { name: 'v', label: 'Скорость ветра', unit: 'км/ч', default: 20 },
  ],
  compute: ({ T, v }) => {
    if (T > 10 || v < 4.8) {
      return {
        result: T,
        unit: '°C',
        latex: `T_{app} \\approx T \\text{ (формула применима при T} \\leq 10°C, v \\geq 4.8 \\text{ км/ч)}`,
      };
    }
    const v016 = Math.pow(v, 0.16);
    return {
      result: 13.12 + 0.6215 * T - 11.37 * v016 + 0.3965 * T * v016,
      unit: '°C',
      latex: `T_{app} = 13.12 + 0.6215 T - 11.37 v^{0.16} + 0.3965 T v^{0.16}`,
    };
  },
});

register({
  id: 'earth.richter-energy',
  name: 'Энергия землетрясения по шкале Рихтера',
  category: 'Науки о Земле',
  description: 'log₁₀ E = 1.5·M + 4.8 (E в Дж)',
  expression: 'E = 10^(1.5·M + 4.8)',
  inputs: [{ name: 'M', label: 'Магнитуда', default: 7.0 }],
  compute: ({ M }) => ({
    result: Math.pow(10, 1.5 * M + 4.8),
    unit: 'Дж',
    latex: `\\log_{10} E = 1.5 M + 4.8`,
  }),
});

register({
  id: 'earth.tsunami-speed',
  name: 'Скорость цунами (длинной волны)',
  category: 'Науки о Земле',
  description: 'v = √(g · h)',
  expression: 'v = √(g · h)',
  inputs: [{ name: 'h', label: 'Глубина океана', unit: 'м', default: 4000 }],
  compute: ({ h }) => {
    if (h < 0) throw new Error('Глубина должна быть неотрицательной');
    return {
      result: Math.sqrt(G_EARTH * h),
      unit: 'м/с',
      latex: `v = \\sqrt{gh}`,
    };
  },
});
