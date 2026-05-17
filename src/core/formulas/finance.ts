/**
 * Финансы.
 */

import { register } from './registry';

register({
  id: 'fin.compound-interest',
  name: 'Сложный процент',
  category: 'Финансы',
  description: 'A = P (1 + r/n)^(n·t)',
  expression: 'A = P · (1 + r/n)^(n · t)',
  inputs: [
    { name: 'P', label: 'Начальная сумма', unit: '₽', default: 10000 },
    { name: 'r', label: 'Годовая ставка (0.07 = 7%)', default: 0.07 },
    { name: 'n', label: 'Капитализаций в году', default: 12 },
    { name: 't', label: 'Срок', unit: 'лет', default: 5 },
  ],
  compute: ({ P, r, n, t }) => {
    if (n === 0) throw new Error('n cannot be zero');
    return {
      result: P * Math.pow(1 + r / n, n * t),
      unit: '₽',
      latex: `A = P \\left(1 + \\frac{r}{n}\\right)^{nt}`,
    };
  },
});

register({
  id: 'fin.simple-interest',
  name: 'Простой процент',
  category: 'Финансы',
  description: 'I = P r t',
  expression: 'I = P · r · t',
  inputs: [
    { name: 'P', label: 'Начальная сумма', unit: '₽', default: 10000 },
    { name: 'r', label: 'Годовая ставка', default: 0.07 },
    { name: 't', label: 'Срок', unit: 'лет', default: 5 },
  ],
  compute: ({ P, r, t }) => ({
    result: P * r * t,
    unit: '₽',
    latex: `I = P r t`,
  }),
});

register({
  id: 'fin.loan-payment',
  name: 'Ежемесячный платёж по кредиту',
  category: 'Финансы',
  description: 'M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1)',
  expression: 'M = P · m·(1+m)ⁿ / ((1+m)ⁿ − 1)',
  inputs: [
    { name: 'P', label: 'Сумма кредита', unit: '₽', default: 1000000 },
    { name: 'rate', label: 'Годовая ставка', default: 0.15 },
    { name: 'years', label: 'Срок', unit: 'лет', default: 5 },
  ],
  compute: ({ P, rate, years }) => {
    const m = rate / 12;
    const n = years * 12;
    if (m === 0) return { result: P / n, unit: '₽/мес', latex: `M = \\frac{P}{n}` };
    const pow = Math.pow(1 + m, n);
    return {
      result: (P * m * pow) / (pow - 1),
      unit: '₽/мес',
      latex: `M = P \\cdot \\frac{m(1+m)^n}{(1+m)^n - 1}`,
    };
  },
});

register({
  id: 'fin.future-value',
  name: 'Будущая стоимость аннуитета',
  category: 'Финансы',
  description: 'FV = PMT · ((1+r)ⁿ − 1) / r',
  expression: 'FV = PMT · ((1+r)ⁿ − 1) / r',
  inputs: [
    { name: 'PMT', label: 'Платёж за период', unit: '₽', default: 1000 },
    { name: 'r', label: 'Ставка за период', default: 0.005 },
    { name: 'n', label: 'Число периодов', default: 60 },
  ],
  compute: ({ PMT, r, n }) => {
    if (r === 0) return { result: PMT * n, unit: '₽', latex: `FV = PMT \\cdot n` };
    return {
      result: (PMT * (Math.pow(1 + r, n) - 1)) / r,
      unit: '₽',
      latex: `FV = PMT \\cdot \\frac{(1+r)^n - 1}{r}`,
    };
  },
});

register({
  id: 'fin.present-value',
  name: 'Приведённая стоимость',
  category: 'Финансы',
  description: 'PV = FV / (1+r)ⁿ',
  expression: 'PV = FV / (1+r)ⁿ',
  inputs: [
    { name: 'FV', label: 'Будущая стоимость', unit: '₽', default: 100000 },
    { name: 'r', label: 'Ставка дисконтирования за период', default: 0.07 },
    { name: 'n', label: 'Число периодов', default: 10 },
  ],
  compute: ({ FV, r, n }) => ({
    result: FV / Math.pow(1 + r, n),
    unit: '₽',
    latex: `PV = \\frac{FV}{(1+r)^n}`,
  }),
});

register({
  id: 'fin.inflation-real-rate',
  name: 'Реальная ставка (с учётом инфляции)',
  category: 'Финансы',
  description: 'r_real = (1+r_nom)/(1+i) − 1',
  expression: 'r_real = (1+r) / (1+i) − 1',
  inputs: [
    { name: 'nominal', label: 'Номинальная ставка', default: 0.1 },
    { name: 'inflation', label: 'Инфляция', default: 0.05 },
  ],
  compute: ({ nominal, inflation }) => ({
    result: (1 + nominal) / (1 + inflation) - 1,
    latex: `r_{real} = \\frac{1 + r_{nom}}{1 + i} - 1`,
  }),
});
