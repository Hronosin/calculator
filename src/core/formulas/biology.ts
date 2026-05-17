/**
 * Биология.
 * Покрывает экологию, генетику, биохимию, физиологию, фармакологию.
 */

import { register } from './registry';

// ─── Популяционная биология / экология ──────────────────────────

register({
  id: 'bio.exponential-growth',
  name: 'Экспоненциальный рост популяции',
  category: 'Биология',
  description: 'N(t) = N₀ · e^(rt)',
  expression: 'N(t) = N₀ · e^(r · t)',
  inputs: [
    { name: 'N0', label: 'Начальная численность', default: 100 },
    { name: 'r', label: 'Удельная скорость роста', unit: '1/время', default: 0.1 },
    { name: 't', label: 'Время', default: 10 },
  ],
  compute: ({ N0, r, t }) => ({
    result: N0 * Math.exp(r * t),
    latex: `N(t) = N_0 e^{rt}`,
  }),
});

register({
  id: 'bio.logistic-growth',
  name: 'Логистический рост популяции',
  category: 'Биология',
  description: 'N(t) = K / (1 + ((K−N₀)/N₀) · e^(−rt))',
  expression: 'N(t) = K / (1 + A · e^(−r·t)),  A = (K−N₀)/N₀',
  inputs: [
    { name: 'N0', label: 'Начальная численность', default: 10 },
    { name: 'K', label: 'Ёмкость среды', default: 1000 },
    { name: 'r', label: 'Удельная скорость роста', unit: '1/время', default: 0.2 },
    { name: 't', label: 'Время', default: 20 },
  ],
  compute: ({ N0, K, r, t }) => {
    if (N0 <= 0) throw new Error('N₀ должно быть положительным');
    const A = (K - N0) / N0;
    return {
      result: K / (1 + A * Math.exp(-r * t)),
      latex: `N(t) = \\frac{K}{1 + \\frac{K - N_0}{N_0} e^{-rt}}`,
    };
  },
});

register({
  id: 'bio.doubling-time',
  name: 'Время удвоения популяции',
  category: 'Биология',
  description: 't₂ = ln(2) / r',
  expression: 't₂ = ln(2) / r',
  inputs: [{ name: 'r', label: 'Удельная скорость роста', unit: '1/время', default: 0.1 }],
  compute: ({ r }) => {
    if (r <= 0) throw new Error('r должно быть положительным');
    return {
      result: Math.LN2 / r,
      latex: `t_2 = \\frac{\\ln 2}{r}`,
    };
  },
});

// ─── Генетика ────────────────────────────────────────────────────

register({
  id: 'bio.hardy-weinberg',
  name: 'Закон Харди–Вайнберга',
  category: 'Биология',
  description: 'Частота гетерозигот 2pq при равновесии (p + q = 1)',
  expression: 'p² + 2pq + q² = 1',
  inputs: [
    { name: 'p', label: 'Частота доминантного аллеля (0…1)', default: 0.6 },
  ],
  compute: ({ p }) => {
    if (p < 0 || p > 1) throw new Error('p должно быть в [0, 1]');
    const q = 1 - p;
    return {
      result: 2 * p * q,
      latex: `\\text{2pq} = 2 \\cdot ${p} \\cdot ${q.toFixed(3)} \\quad (p^2 = ${(p * p).toFixed(3)},\\, q^2 = ${(q * q).toFixed(3)})`,
    };
  },
});

register({
  id: 'bio.allele-frequency-from-q2',
  name: 'Частота аллеля из частоты гомозигот',
  category: 'Биология',
  description: 'q = √(q²) — частота рецессивного аллеля при равновесии',
  expression: 'q = √(частота гомозигот по рецессивному аллелю)',
  inputs: [
    { name: 'q2', label: 'Доля рецессивных гомозигот (0…1)', default: 0.16 },
  ],
  compute: ({ q2 }) => {
    if (q2 < 0 || q2 > 1) throw new Error('q² должно быть в [0, 1]');
    return {
      result: Math.sqrt(q2),
      latex: `q = \\sqrt{${q2}}`,
    };
  },
});

// ─── Биохимия / ферменты ────────────────────────────────────────

register({
  id: 'bio.michaelis-menten',
  name: 'Уравнение Михаэлиса–Ментен',
  category: 'Биология',
  description: 'v = V_max · [S] / (K_m + [S])',
  expression: 'v = V_max · S / (K_m + S)',
  inputs: [
    { name: 'Vmax', label: 'Максимальная скорость V_max', default: 100 },
    { name: 'Km', label: 'Константа Михаэлиса K_m', unit: 'моль/л', default: 0.5 },
    { name: 'S', label: 'Концентрация субстрата [S]', unit: 'моль/л', default: 1 },
  ],
  compute: ({ Vmax, Km, S }) => {
    if (Km + S === 0) throw new Error('Сумма K_m + [S] равна нулю');
    return {
      result: (Vmax * S) / (Km + S),
      latex: `v = \\frac{V_{max} [S]}{K_m + [S]}`,
    };
  },
});

register({
  id: 'bio.beer-lambert',
  name: 'Закон Бугера–Ламберта–Бера',
  category: 'Биология',
  description: 'A = ε · c · l',
  expression: 'A = ε · c · l',
  inputs: [
    { name: 'epsilon', label: 'Молярный коэф. экстинкции ε', unit: 'л/(моль·см)', default: 6220 },
    { name: 'c', label: 'Концентрация', unit: 'моль/л', default: 1e-4 },
    { name: 'l', label: 'Длина пути света', unit: 'см', default: 1 },
  ],
  compute: ({ epsilon, c, l }) => ({
    result: epsilon * c * l,
    latex: `A = \\varepsilon \\cdot c \\cdot l`,
  }),
});

register({
  id: 'bio.q10',
  name: 'Температурный коэффициент Q₁₀',
  category: 'Биология',
  description: 'Q₁₀ = (R₂ / R₁)^(10 / (T₂ − T₁))',
  expression: 'Q₁₀ = (R₂ / R₁)^(10 / ΔT)',
  inputs: [
    { name: 'R1', label: 'Скорость реакции при T₁', default: 1 },
    { name: 'R2', label: 'Скорость реакции при T₂', default: 2 },
    { name: 'T1', label: 'Температура T₁', unit: '°C', default: 20 },
    { name: 'T2', label: 'Температура T₂', unit: '°C', default: 30 },
  ],
  compute: ({ R1, R2, T1, T2 }) => {
    if (R1 <= 0) throw new Error('R₁ должно быть положительным');
    if (T2 === T1) throw new Error('Температуры не должны совпадать');
    return {
      result: Math.pow(R2 / R1, 10 / (T2 - T1)),
      latex: `Q_{10} = \\left(\\frac{R_2}{R_1}\\right)^{\\frac{10}{T_2 - T_1}}`,
    };
  },
});

// ─── Физиология / антропометрия ─────────────────────────────────

register({
  id: 'bio.bmi',
  name: 'Индекс массы тела (ИМТ)',
  category: 'Биология',
  description: 'BMI = m / h²',
  expression: 'BMI = m / h²',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 70 },
    { name: 'h', label: 'Рост', unit: 'м', default: 1.75 },
  ],
  compute: ({ m, h }) => {
    if (h <= 0) throw new Error('Рост должен быть положительным');
    return {
      result: m / (h * h),
      unit: 'кг/м²',
      latex: `BMI = \\frac{m}{h^2}`,
    };
  },
});

register({
  id: 'bio.bmr-male',
  name: 'Базальный метаболизм (мужчины, Mifflin-St Jeor)',
  category: 'Биология',
  description: 'BMR = 10w + 6.25h − 5·age + 5',
  expression: 'BMR = 10·m + 6.25·h − 5·возраст + 5',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 75 },
    { name: 'h', label: 'Рост', unit: 'см', default: 180 },
    { name: 'age', label: 'Возраст', unit: 'лет', default: 30 },
  ],
  compute: ({ m, h, age }) => ({
    result: 10 * m + 6.25 * h - 5 * age + 5,
    unit: 'ккал/сут',
    latex: `BMR = 10m + 6.25h - 5\\cdot\\text{age} + 5`,
  }),
});

register({
  id: 'bio.bmr-female',
  name: 'Базальный метаболизм (женщины, Mifflin-St Jeor)',
  category: 'Биология',
  description: 'BMR = 10w + 6.25h − 5·age − 161',
  expression: 'BMR = 10·m + 6.25·h − 5·возраст − 161',
  inputs: [
    { name: 'm', label: 'Масса', unit: 'кг', default: 60 },
    { name: 'h', label: 'Рост', unit: 'см', default: 165 },
    { name: 'age', label: 'Возраст', unit: 'лет', default: 30 },
  ],
  compute: ({ m, h, age }) => ({
    result: 10 * m + 6.25 * h - 5 * age - 161,
    unit: 'ккал/сут',
    latex: `BMR = 10m + 6.25h - 5\\cdot\\text{age} - 161`,
  }),
});

register({
  id: 'bio.max-heart-rate',
  name: 'Максимальная ЧСС',
  category: 'Биология',
  description: 'HR_max = 220 − age',
  expression: 'HR_max = 220 − возраст',
  inputs: [{ name: 'age', label: 'Возраст', unit: 'лет', default: 30 }],
  compute: ({ age }) => ({
    result: 220 - age,
    unit: 'уд/мин',
    latex: `HR_{max} = 220 - \\text{age}`,
  }),
});

register({
  id: 'bio.body-surface-mosteller',
  name: 'Площадь поверхности тела (Mosteller)',
  category: 'Биология',
  description: 'BSA = √(h · m / 3600)',
  expression: 'BSA = √(рост(см) · масса(кг) / 3600)',
  inputs: [
    { name: 'h', label: 'Рост', unit: 'см', default: 175 },
    { name: 'm', label: 'Масса', unit: 'кг', default: 70 },
  ],
  compute: ({ h, m }) => {
    if (h * m < 0) throw new Error('Отрицательные значения');
    return {
      result: Math.sqrt((h * m) / 3600),
      unit: 'м²',
      latex: `BSA = \\sqrt{\\frac{h \\cdot m}{3600}}`,
    };
  },
});

// ─── Молекулярная биология ──────────────────────────────────────

register({
  id: 'bio.dna-tm-wallace',
  name: 'Tm короткого олигонуклеотида (правило Уоллеса)',
  category: 'Биология',
  description: 'Tm = 2(A+T) + 4(G+C),  для праймеров < 14 нт',
  expression: 'Tm = 2(A + T) + 4(G + C)',
  inputs: [
    { name: 'AT', label: 'Число A + T в праймере', default: 6 },
    { name: 'GC', label: 'Число G + C в праймере', default: 6 },
  ],
  compute: ({ AT, GC }) => ({
    result: 2 * AT + 4 * GC,
    unit: '°C',
    latex: `T_m = 2(A+T) + 4(G+C)`,
  }),
});

register({
  id: 'bio.microscope-magnification',
  name: 'Увеличение микроскопа',
  category: 'Биология',
  description: 'M = M_объектива · M_окуляра',
  expression: 'M = M_obj · M_eye',
  inputs: [
    { name: 'obj', label: 'Увеличение объектива', default: 40 },
    { name: 'eye', label: 'Увеличение окуляра', default: 10 },
  ],
  compute: ({ obj, eye }) => ({
    result: obj * eye,
    unit: '×',
    latex: `M = M_{obj} \\cdot M_{eye}`,
  }),
});

// ─── Фармакология ───────────────────────────────────────────────

register({
  id: 'bio.drug-half-life',
  name: 'Период полувыведения препарата',
  category: 'Биология',
  description: 't₁/₂ = ln(2) / k',
  expression: 't₁/₂ = ln(2) / k',
  inputs: [{ name: 'k', label: 'Константа элиминации', unit: '1/ч', default: 0.1 }],
  compute: ({ k }) => {
    if (k <= 0) throw new Error('k должно быть положительным');
    return {
      result: Math.LN2 / k,
      unit: 'ч',
      latex: `t_{1/2} = \\frac{\\ln 2}{k}`,
    };
  },
});

register({
  id: 'bio.volume-distribution',
  name: 'Объём распределения препарата',
  category: 'Биология',
  description: 'V_d = D / C_p',
  expression: 'V_d = доза / плазменная концентрация',
  inputs: [
    { name: 'D', label: 'Введённая доза', unit: 'мг', default: 100 },
    { name: 'Cp', label: 'Плазменная концентрация', unit: 'мг/л', default: 5 },
  ],
  compute: ({ D, Cp }) => {
    if (Cp <= 0) throw new Error('Концентрация должна быть положительной');
    return {
      result: D / Cp,
      unit: 'л',
      latex: `V_d = \\frac{D}{C_p}`,
    };
  },
});

register({
  id: 'bio.clearance',
  name: 'Клиренс препарата',
  category: 'Биология',
  description: 'Cl = k · V_d',
  expression: 'Cl = k · V_d',
  inputs: [
    { name: 'k', label: 'Константа элиминации', unit: '1/ч', default: 0.1 },
    { name: 'Vd', label: 'Объём распределения', unit: 'л', default: 40 },
  ],
  compute: ({ k, Vd }) => ({
    result: k * Vd,
    unit: 'л/ч',
    latex: `Cl = k \\cdot V_d`,
  }),
});
