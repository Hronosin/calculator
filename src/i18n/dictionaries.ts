/**
 * Translation dictionaries for themes, formula categories, formula names,
 * and converter names.
 *
 * Separate from main locale JSON files because there are hundreds of entries.
 * Fallback chain: current locale → English → fallback string.
 */

import { i18n, type Locale } from './index';
import type { ThemeId } from '../ui/theme';

// ════════════════════════════════════════════════════════════════════
// THEMES
// ════════════════════════════════════════════════════════════════════

const themeLabels: Partial<Record<Locale, Record<ThemeId, string>>> = {
  en: {
    dark: 'Dark', light: 'Light', pink: 'Stern Seriousness',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nord',
    matrix: 'Matrix', sepia: 'Sepia',
  },
  ru: {
    dark: 'Тёмная', light: 'Светлая', pink: 'Строгая Серьозность',
    synthwave: 'Синтвейв', solarized: 'Solarized', nord: 'Нордик',
    matrix: 'Матрица', sepia: 'Сепия',
  },
  uk: {
    dark: 'Темна', light: 'Світла', pink: 'Сувора Серйозність',
    synthwave: 'Синтвейв', solarized: 'Solarized', nord: 'Норд',
    matrix: 'Матриця', sepia: 'Сепія',
  },
  es: {
    dark: 'Oscura', light: 'Clara', pink: 'Seriedad Severa',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nórdico',
    matrix: 'Matrix', sepia: 'Sepia',
  },
  de: {
    dark: 'Dunkel', light: 'Hell', pink: 'Strenge Seriosität',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nord',
    matrix: 'Matrix', sepia: 'Sepia',
  },
  fr: {
    dark: 'Sombre', light: 'Clair', pink: 'Sérieux Austère',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nord',
    matrix: 'Matrix', sepia: 'Sépia',
  },
  zh: {
    dark: '深色', light: '浅色', pink: '严肃端庄',
    synthwave: '合成波', solarized: 'Solarized', nord: '北极',
    matrix: '矩阵', sepia: '怀旧',
  },
  ja: {
    dark: 'ダーク', light: 'ライト', pink: '厳格な真面目さ',
    synthwave: 'シンセウェイブ', solarized: 'Solarized', nord: 'ノルド',
    matrix: 'マトリックス', sepia: 'セピア',
  },
  pt: {
    dark: 'Escuro', light: 'Claro', pink: 'Seriedade Severa',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nord',
    matrix: 'Matrix', sepia: 'Sépia',
  },
  it: {
    dark: 'Scuro', light: 'Chiaro', pink: 'Serietà Severa',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nord',
    matrix: 'Matrix', sepia: 'Seppia',
  },
  pl: {
    dark: 'Ciemny', light: 'Jasny', pink: 'Surowa Powaga',
    synthwave: 'Synthwave', solarized: 'Solarized', nord: 'Nord',
    matrix: 'Matrix', sepia: 'Sepia',
  },
};

export function tTheme(id: ThemeId): string {
  const locale = i18n.get();
  return themeLabels[locale]?.[id] ?? themeLabels.en?.[id] ?? id;
}

// ════════════════════════════════════════════════════════════════════
// FORMULA CATEGORIES — keyed by Russian source string
// ════════════════════════════════════════════════════════════════════

const C = (translations: Partial<Record<Locale, string>>) => translations;

const categoryLabels: Record<string, Partial<Record<Locale, string>>> = {
  'Физика': C({ en: 'Physics', ru: 'Физика', uk: 'Фізика', es: 'Física', de: 'Physik', fr: 'Physique', zh: '物理学', ja: '物理学', pt: 'Física', it: 'Fisica', pl: 'Fizyka' }),
  'Механика': C({ en: 'Mechanics', ru: 'Механика', uk: 'Механіка', es: 'Mecánica', de: 'Mechanik', fr: 'Mécanique', zh: '力学', ja: '力学', pt: 'Mecânica', it: 'Meccanica', pl: 'Mechanika' }),
  'Термодинамика': C({ en: 'Thermodynamics', ru: 'Термодинамика', uk: 'Термодинаміка', es: 'Termodinámica', de: 'Thermodynamik', fr: 'Thermodynamique', zh: '热力学', ja: '熱力学', pt: 'Termodinâmica', it: 'Termodinamica', pl: 'Termodynamika' }),
  'Оптика': C({ en: 'Optics', ru: 'Оптика', uk: 'Оптика', es: 'Óptica', de: 'Optik', fr: 'Optique', zh: '光学', ja: '光学', pt: 'Óptica', it: 'Ottica', pl: 'Optyka' }),
  'Электромагнетизм': C({ en: 'Electromagnetism', ru: 'Электромагнетизм', uk: 'Електромагнетизм', es: 'Electromagnetismo', de: 'Elektromagnetismus', fr: 'Électromagnétisme', zh: '电磁学', ja: '電磁気学', pt: 'Eletromagnetismo', it: 'Elettromagnetismo', pl: 'Elektromagnetyzm' }),
  'Теория относительности': C({ en: 'Relativity', ru: 'Теория относительности', uk: 'Теорія відносності', es: 'Relatividad', de: 'Relativitätstheorie', fr: 'Relativité', zh: '相对论', ja: '相対性理論', pt: 'Relatividade', it: 'Relatività', pl: 'Teoria względności' }),
  'Квантовая физика': C({ en: 'Quantum physics', ru: 'Квантовая физика', uk: 'Квантова фізика', es: 'Física cuántica', de: 'Quantenphysik', fr: 'Physique quantique', zh: '量子物理', ja: '量子物理学', pt: 'Física quântica', it: 'Fisica quantistica', pl: 'Fizyka kwantowa' }),
  'Астрофизика': C({ en: 'Astrophysics', ru: 'Астрофизика', uk: 'Астрофізика', es: 'Astrofísica', de: 'Astrophysik', fr: 'Astrophysique', zh: '天体物理', ja: '天体物理学', pt: 'Astrofísica', it: 'Astrofisica', pl: 'Astrofizyka' }),
  'Геометрия': C({ en: 'Geometry', ru: 'Геометрия', uk: 'Геометрія', es: 'Geometría', de: 'Geometrie', fr: 'Géométrie', zh: '几何', ja: '幾何学', pt: 'Geometria', it: 'Geometria', pl: 'Geometria' }),
  'Электротехника': C({ en: 'Electrical engineering', ru: 'Электротехника', uk: 'Електротехніка', es: 'Electrotecnia', de: 'Elektrotechnik', fr: 'Électrotechnique', zh: '电气工程', ja: '電気工学', pt: 'Eletrotécnica', it: 'Elettrotecnica', pl: 'Elektrotechnika' }),
  'Химия': C({ en: 'Chemistry', ru: 'Химия', uk: 'Хімія', es: 'Química', de: 'Chemie', fr: 'Chimie', zh: '化学', ja: '化学', pt: 'Química', it: 'Chimica', pl: 'Chemia' }),
  'Биология': C({ en: 'Biology', ru: 'Биология', uk: 'Біологія', es: 'Biología', de: 'Biologie', fr: 'Biologie', zh: '生物学', ja: '生物学', pt: 'Biologia', it: 'Biologia', pl: 'Biologia' }),
  'Финансы': C({ en: 'Finance', ru: 'Финансы', uk: 'Фінанси', es: 'Finanzas', de: 'Finanzen', fr: 'Finance', zh: '金融', ja: '金融', pt: 'Finanças', it: 'Finanza', pl: 'Finanse' }),
  'Аэро- и гидродинамика': C({ en: 'Fluid dynamics', ru: 'Аэро- и гидродинамика', uk: 'Аеро- та гідродинаміка', es: 'Aero- e hidrodinámica', de: 'Aero- und Hydrodynamik', fr: 'Aéro- et hydrodynamique', zh: '空气动力学与流体力学', ja: '空気力学・流体力学', pt: 'Aero- e hidrodinâmica', it: 'Aero- e idrodinamica', pl: 'Aero- i hydrodynamika' }),
  'Ядерная физика': C({ en: 'Nuclear physics', ru: 'Ядерная физика', uk: 'Ядерна фізика', es: 'Física nuclear', de: 'Kernphysik', fr: 'Physique nucléaire', zh: '核物理', ja: '原子核物理学', pt: 'Física nuclear', it: 'Fisica nucleare', pl: 'Fizyka jądrowa' }),
  'Акустика': C({ en: 'Acoustics', ru: 'Акустика', uk: 'Акустика', es: 'Acústica', de: 'Akustik', fr: 'Acoustique', zh: '声学', ja: '音響学', pt: 'Acústica', it: 'Acustica', pl: 'Akustyka' }),
  'Криптография и информация': C({ en: 'Cryptography & information', ru: 'Криптография и информация', uk: 'Криптографія та інформація', es: 'Criptografía e información', de: 'Kryptografie & Information', fr: 'Cryptographie et information', zh: '密码学与信息', ja: '暗号と情報', pt: 'Criptografia e informação', it: 'Crittografia e informazione', pl: 'Kryptografia i informacja' }),
  'Сопромат': C({ en: 'Strength of materials', ru: 'Сопромат', uk: 'Опір матеріалів', es: 'Resistencia de materiales', de: 'Festigkeitslehre', fr: 'Résistance des matériaux', zh: '材料力学', ja: '材料力学', pt: 'Resistência dos materiais', it: 'Scienza delle costruzioni', pl: 'Wytrzymałość materiałów' }),
  'Статистика': C({ en: 'Statistics', ru: 'Статистика', uk: 'Статистика', es: 'Estadística', de: 'Statistik', fr: 'Statistiques', zh: '统计学', ja: '統計学', pt: 'Estatística', it: 'Statistica', pl: 'Statystyka' }),
  'Науки о Земле': C({ en: 'Earth sciences', ru: 'Науки о Земле', uk: 'Науки про Землю', es: 'Ciencias de la Tierra', de: 'Geowissenschaften', fr: 'Sciences de la Terre', zh: '地球科学', ja: '地球科学', pt: 'Ciências da Terra', it: 'Scienze della Terra', pl: 'Nauki o Ziemi' }),
  'Теория чисел': C({ en: 'Number theory', ru: 'Теория чисел', uk: 'Теорія чисел', es: 'Teoría de números', de: 'Zahlentheorie', fr: 'Théorie des nombres', zh: '数论', ja: '数論', pt: 'Teoria dos números', it: 'Teoria dei numeri', pl: 'Teoria liczb' }),
  'Теплопередача': C({ en: 'Heat transfer', ru: 'Теплопередача', uk: 'Теплопередача', es: 'Transferencia de calor', de: 'Wärmeübertragung', fr: 'Transfert thermique', zh: '传热', ja: '熱伝達', pt: 'Transferência de calor', it: 'Trasferimento di calore', pl: 'Wymiana ciepła' }),
  'Все': C({ en: 'All', ru: 'Все', uk: 'Усі', es: 'Todas', de: 'Alle', fr: 'Tous', zh: '全部', ja: 'すべて', pt: 'Todas', it: 'Tutte', pl: 'Wszystkie' }),
};

export function tCategory(category: string): string {
  const locale = i18n.get();
  return categoryLabels[category]?.[locale] ?? categoryLabels[category]?.en ?? category;
}

// ════════════════════════════════════════════════════════════════════
// CONVERTER NAMES — keyed by converter `id` (length, mass, etc.)
// ════════════════════════════════════════════════════════════════════

const converterNames: Record<string, Partial<Record<Locale, string>>> = {
  length: C({ en: 'Length', ru: 'Длина', uk: 'Довжина', es: 'Longitud', de: 'Länge', fr: 'Longueur', zh: '长度', ja: '長さ', pt: 'Comprimento', it: 'Lunghezza', pl: 'Długość' }),
  mass: C({ en: 'Mass', ru: 'Масса', uk: 'Маса', es: 'Masa', de: 'Masse', fr: 'Masse', zh: '质量', ja: '質量', pt: 'Massa', it: 'Massa', pl: 'Masa' }),
  temperature: C({ en: 'Temperature', ru: 'Температура', uk: 'Температура', es: 'Temperatura', de: 'Temperatur', fr: 'Température', zh: '温度', ja: '温度', pt: 'Temperatura', it: 'Temperatura', pl: 'Temperatura' }),
  area: C({ en: 'Area', ru: 'Площадь', uk: 'Площа', es: 'Área', de: 'Fläche', fr: 'Aire', zh: '面积', ja: '面積', pt: 'Área', it: 'Area', pl: 'Powierzchnia' }),
  volume: C({ en: 'Volume', ru: 'Объём', uk: 'Об’єм', es: 'Volumen', de: 'Volumen', fr: 'Volume', zh: '体积', ja: '体積', pt: 'Volume', it: 'Volume', pl: 'Objętość' }),
  time: C({ en: 'Time', ru: 'Время', uk: 'Час', es: 'Tiempo', de: 'Zeit', fr: 'Temps', zh: '时间', ja: '時間', pt: 'Tempo', it: 'Tempo', pl: 'Czas' }),
  speed: C({ en: 'Speed', ru: 'Скорость', uk: 'Швидкість', es: 'Velocidad', de: 'Geschwindigkeit', fr: 'Vitesse', zh: '速度', ja: '速度', pt: 'Velocidade', it: 'Velocità', pl: 'Prędkość' }),
  pressure: C({ en: 'Pressure', ru: 'Давление', uk: 'Тиск', es: 'Presión', de: 'Druck', fr: 'Pression', zh: '压力', ja: '圧力', pt: 'Pressão', it: 'Pressione', pl: 'Ciśnienie' }),
  energy: C({ en: 'Energy', ru: 'Энергия', uk: 'Енергія', es: 'Energía', de: 'Energie', fr: 'Énergie', zh: '能量', ja: 'エネルギー', pt: 'Energia', it: 'Energia', pl: 'Energia' }),
  power: C({ en: 'Power', ru: 'Мощность', uk: 'Потужність', es: 'Potencia', de: 'Leistung', fr: 'Puissance', zh: '功率', ja: '電力', pt: 'Potência', it: 'Potenza', pl: 'Moc' }),
  angle: C({ en: 'Angle', ru: 'Угол', uk: 'Кут', es: 'Ángulo', de: 'Winkel', fr: 'Angle', zh: '角度', ja: '角度', pt: 'Ângulo', it: 'Angolo', pl: 'Kąt' }),
  data: C({ en: 'Data', ru: 'Данные', uk: 'Дані', es: 'Datos', de: 'Daten', fr: 'Données', zh: '数据', ja: 'データ', pt: 'Dados', it: 'Dati', pl: 'Dane' }),
  frequency: C({ en: 'Frequency', ru: 'Частота', uk: 'Частота', es: 'Frecuencia', de: 'Frequenz', fr: 'Fréquence', zh: '频率', ja: '周波数', pt: 'Frequência', it: 'Frequenza', pl: 'Częstotliwość' }),
  radioactivity: C({ en: 'Radioactivity', ru: 'Радиоактивность', uk: 'Радіоактивність', es: 'Radiactividad', de: 'Radioaktivität', fr: 'Radioactivité', zh: '放射性', ja: '放射能', pt: 'Radioatividade', it: 'Radioattività', pl: 'Promieniotwórczość' }),
  'absorbed-dose': C({ en: 'Absorbed dose', ru: 'Поглощённая доза', uk: 'Поглинена доза', es: 'Dosis absorbida', de: 'Energiedosis', fr: 'Dose absorbée', zh: '吸收剂量', ja: '吸収線量', pt: 'Dose absorvida', it: 'Dose assorbita', pl: 'Dawka pochłonięta' }),
  'equivalent-dose': C({ en: 'Equivalent dose', ru: 'Эквивалентная доза', uk: 'Еквівалентна доза', es: 'Dosis equivalente', de: 'Äquivalentdosis', fr: 'Dose équivalente', zh: '等效剂量', ja: '等価線量', pt: 'Dose equivalente', it: 'Dose equivalente', pl: 'Dawka równoważna' }),
};

export function tConverterName(id: string, fallback: string): string {
  const locale = i18n.get();
  return converterNames[id]?.[locale] ?? converterNames[id]?.en ?? fallback;
}

/**
 * Register additional converter name translations at runtime.
 * Used by `dictionaries-extra.ts` so we can extend the dictionary
 * without rewriting the whole file.
 */
export function registerConverterNames(
  entries: Record<string, Partial<Record<Locale, string>>>
): void {
  for (const [id, translations] of Object.entries(entries)) {
    converterNames[id] = { ...converterNames[id], ...translations };
  }
}

// ════════════════════════════════════════════════════════════════════
// FORMULA NAMES — keyed by formula `id`
// Full: en, ru, uk. Others fall back to English.
// ════════════════════════════════════════════════════════════════════

type FormulaNameMap = Record<string, Partial<Record<Locale, string>>>;
const N = (translations: Partial<Record<Locale, string>>) => translations;

const formulaNames: FormulaNameMap = {
  'phys.kinetic-energy': N({ en: 'Kinetic energy', ru: 'Кинетическая энергия', uk: 'Кінетична енергія' }),
  'phys.potential-energy': N({ en: 'Potential energy', ru: 'Потенциальная энергия', uk: 'Потенціальна енергія' }),
  'phys.force': N({ en: "Newton's second law", ru: 'Второй закон Ньютона', uk: 'Другий закон Ньютона' }),
  'phys.centripetal': N({ en: 'Centripetal force', ru: 'Центростремительная сила', uk: 'Доцентрова сила' }),
  'phys.photon-energy': N({ en: 'Photon energy', ru: 'Энергия фотона', uk: 'Енергія фотона' }),
  'phys.de-broglie': N({ en: 'de Broglie wavelength', ru: 'Длина волны де Бройля', uk: 'Довжина хвилі де Бройля' }),
  'phys.hydrostatic': N({ en: 'Hydrostatic pressure', ru: 'Гидростатическое давление', uk: 'Гідростатичний тиск' }),
  'mech.free-fall-distance': N({ en: 'Free-fall distance', ru: 'Путь при свободном падении', uk: 'Шлях при вільному падінні' }),
  'mech.free-fall-velocity': N({ en: 'Free-fall velocity', ru: 'Скорость при свободном падении', uk: 'Швидкість при вільному падінні' }),
  'mech.projectile-range': N({ en: 'Projectile range', ru: 'Дальность полёта снаряда', uk: 'Дальність польоту снаряда' }),
  'mech.projectile-height': N({ en: 'Projectile max height', ru: 'Максимальная высота снаряда', uk: 'Максимальна висота снаряда' }),
  'mech.pendulum-period': N({ en: 'Pendulum period', ru: 'Период математического маятника', uk: 'Період математичного маятника' }),
  'mech.spring-period': N({ en: 'Spring-mass period', ru: 'Период пружинного маятника', uk: 'Період пружинного маятника' }),
  'mech.momentum': N({ en: 'Momentum', ru: 'Импульс тела', uk: 'Імпульс тіла' }),
  'mech.impulse': N({ en: 'Impulse of force', ru: 'Импульс силы', uk: 'Імпульс сили' }),
  'mech.work': N({ en: 'Mechanical work', ru: 'Механическая работа', uk: 'Механічна робота' }),
  'mech.power': N({ en: 'Mechanical power', ru: 'Мощность механическая', uk: 'Механічна потужність' }),
  'mech.pressure': N({ en: 'Pressure', ru: 'Давление', uk: 'Тиск' }),
  'mech.buoyancy': N({ en: "Archimedes' force", ru: 'Сила Архимеда', uk: 'Сила Архімеда' }),
  'mech.angular-velocity': N({ en: 'Angular velocity', ru: 'Угловая скорость', uk: 'Кутова швидкість' }),
  'mech.wave-speed': N({ en: 'Wave speed', ru: 'Скорость волны', uk: 'Швидкість хвилі' }),
  'thermo.first-law': N({ en: 'First law of thermodynamics', ru: 'Первый закон термодинамики', uk: 'Перший закон термодинаміки' }),
  'thermo.carnot': N({ en: 'Carnot cycle efficiency', ru: 'КПД цикла Карно', uk: 'ККД циклу Карно' }),
  'thermo.stefan-boltzmann': N({ en: 'Stefan–Boltzmann law', ru: 'Закон Стефана–Больцмана', uk: 'Закон Стефана–Больцмана' }),
  'thermo.rms-velocity': N({ en: 'RMS molecular velocity', ru: 'Средняя квадратичная скорость молекул', uk: 'Середня квадратична швидкість молекул' }),
  'thermo.boltzmann-entropy': N({ en: 'Boltzmann entropy', ru: 'Энтропия Больцмана', uk: 'Ентропія Больцмана' }),
  'thermo.heat-engine-work': N({ en: 'Heat engine work', ru: 'Работа тепловой машины', uk: 'Робота теплової машини' }),
  'opt.lens-equation': N({ en: 'Thin lens equation', ru: 'Формула тонкой линзы', uk: 'Формула тонкої лінзи' }),
  'opt.magnification': N({ en: 'Lens magnification', ru: 'Увеличение линзы', uk: 'Збільшення лінзи' }),
  'opt.snell': N({ en: "Snell's law", ru: 'Закон Снеллиуса', uk: 'Закон Снелліуса' }),
  'opt.critical-angle': N({ en: 'Critical angle (total internal reflection)', ru: 'Предельный угол полного отражения', uk: 'Граничний кут повного відбиття' }),
  'opt.diffraction-grating': N({ en: 'Diffraction grating', ru: 'Дифракционная решётка', uk: 'Дифракційна решітка' }),
  'opt.bragg': N({ en: "Bragg's law", ru: 'Условие Брэгга', uk: 'Умова Брегга' }),
  'em.coulomb': N({ en: "Coulomb's law", ru: 'Закон Кулона', uk: 'Закон Кулона' }),
  'em.electric-field': N({ en: 'Point-charge electric field', ru: 'Поле точечного заряда', uk: 'Поле точкового заряду' }),
  'em.potential-energy': N({ en: 'Potential energy of two charges', ru: 'Потенциальная энергия двух зарядов', uk: 'Потенціальна енергія двох зарядів' }),
  'em.lorentz-force': N({ en: 'Lorentz force', ru: 'Сила Лоренца', uk: 'Сила Лоренца' }),
  'em.magnetic-field-wire': N({ en: 'Magnetic field of a straight wire', ru: 'Поле прямого тока', uk: 'Поле прямого струму' }),
  'em.solenoid-field': N({ en: 'Solenoid magnetic field', ru: 'Поле внутри соленоида', uk: 'Поле всередині соленоїда' }),
  'em.capacitor-energy': N({ en: 'Capacitor energy', ru: 'Энергия конденсатора', uk: 'Енергія конденсатора' }),
  'em.inductor-energy': N({ en: 'Inductor energy', ru: 'Энергия катушки', uk: 'Енергія котушки' }),
  'em.lc-resonance': N({ en: 'LC resonance frequency', ru: 'Резонансная частота LC-контура', uk: 'Резонансна частота LC-контуру' }),
  'rel.lorentz-factor': N({ en: 'Lorentz factor γ', ru: 'Фактор Лоренца γ', uk: 'Фактор Лоренца γ' }),
  'rel.time-dilation': N({ en: 'Time dilation', ru: 'Замедление времени', uk: 'Уповільнення часу' }),
  'rel.length-contraction': N({ en: 'Length contraction', ru: 'Сокращение длины', uk: 'Скорочення довжини' }),
  'rel.mass-energy': N({ en: 'Mass–energy equivalence', ru: 'Эквивалентность массы и энергии', uk: 'Еквівалентність маси й енергії' }),
  'rel.relativistic-momentum': N({ en: 'Relativistic momentum', ru: 'Релятивистский импульс', uk: 'Релятивістський імпульс' }),
  'rel.total-energy': N({ en: 'Total relativistic energy', ru: 'Полная релятивистская энергия', uk: 'Повна релятивістська енергія' }),
  'rel.velocity-addition': N({ en: 'Relativistic velocity addition', ru: 'Сложение скоростей (релятивистское)', uk: 'Додавання швидкостей (релятивістське)' }),
  'qm.heisenberg': N({ en: 'Heisenberg uncertainty principle', ru: 'Принцип неопределённости Гейзенберга', uk: 'Принцип невизначеності Гайзенберга' }),
  'qm.photon-momentum': N({ en: 'Photon momentum', ru: 'Импульс фотона', uk: 'Імпульс фотона' }),
  'qm.bohr-energy': N({ en: 'Hydrogen energy level (Bohr)', ru: 'Энергия уровня водорода (модель Бора)', uk: 'Енергія рівня водню (модель Бора)' }),
  'qm.compton': N({ en: 'Compton effect', ru: 'Эффект Комптона', uk: 'Ефект Комптона' }),
  'qm.photon-energy-wavelength': N({ en: 'Photon energy from wavelength', ru: 'Энергия фотона по длине волны', uk: 'Енергія фотона за довжиною хвилі' }),
  'qm.photoelectric': N({ en: 'Photoelectric equation (Einstein)', ru: 'Уравнение Эйнштейна для фотоэффекта', uk: 'Рівняння Ейнштейна для фотоефекту' }),
  'qm.particle-in-box': N({ en: 'Particle in a box energy', ru: 'Энергия частицы в потенциальной яме', uk: 'Енергія частинки в потенціальній ямі' }),
  'astro.newton-gravity': N({ en: 'Newtonian gravity', ru: 'Закон всемирного тяготения', uk: 'Закон всесвітнього тяжіння' }),
  'astro.escape-velocity': N({ en: 'Escape velocity', ru: 'Вторая космическая скорость', uk: 'Друга космічна швидкість' }),
  'astro.orbital-velocity': N({ en: 'Orbital velocity', ru: 'Первая космическая скорость', uk: 'Перша космічна швидкість' }),
  'astro.kepler-third': N({ en: "Kepler's third law", ru: 'Третий закон Кеплера', uk: 'Третій закон Кеплера' }),
  'astro.schwarzschild': N({ en: 'Schwarzschild radius', ru: 'Радиус Шварцшильда', uk: 'Радіус Шварцшильда' }),
  'astro.hubble': N({ en: "Hubble's law", ru: 'Закон Хаббла', uk: 'Закон Габбла' }),
  'astro.gravitational-acceleration': N({ en: 'Surface gravity', ru: 'Гравитационное ускорение на поверхности', uk: 'Гравітаційне прискорення на поверхні' }),
  'geom.circle-area': N({ en: 'Circle area', ru: 'Площадь круга', uk: 'Площа круга' }),
  'geom.circle-circumference': N({ en: 'Circle circumference', ru: 'Длина окружности', uk: 'Довжина кола' }),
  'geom.sphere-volume': N({ en: 'Sphere volume', ru: 'Объём шара', uk: 'Об’єм кулі' }),
  'geom.sphere-surface': N({ en: 'Sphere surface area', ru: 'Площадь поверхности шара', uk: 'Площа поверхні кулі' }),
  'geom.cylinder-volume': N({ en: 'Cylinder volume', ru: 'Объём цилиндра', uk: 'Об’єм циліндра' }),
  'geom.cone-volume': N({ en: 'Cone volume', ru: 'Объём конуса', uk: 'Об’єм конуса' }),
  'geom.pythagoras': N({ en: 'Pythagorean theorem', ru: 'Теорема Пифагора', uk: 'Теорема Піфагора' }),
  'geom.heron': N({ en: "Heron's formula", ru: 'Площадь треугольника (формула Герона)', uk: 'Площа трикутника (формула Герона)' }),
  'geom.law-of-cosines': N({ en: 'Law of cosines', ru: 'Теорема косинусов', uk: 'Теорема косинусів' }),
  'elec.ohms-law': N({ en: "Ohm's law", ru: 'Закон Ома', uk: 'Закон Ома' }),
  'elec.power': N({ en: 'Electric power (P=UI)', ru: 'Электрическая мощность (P = UI)', uk: 'Електрична потужність (P = UI)' }),
  'elec.power-i2r': N({ en: 'Joule heating (P=I²R)', ru: 'Мощность (P = I²R)', uk: 'Потужність (P = I²R)' }),
  'elec.series-resistance': N({ en: 'Series resistance', ru: 'Последовательное соединение резисторов', uk: 'Послідовне з’єднання резисторів' }),
  'elec.parallel-resistance': N({ en: 'Parallel resistance', ru: 'Параллельное соединение резисторов', uk: 'Паралельне з’єднання резисторів' }),
  'elec.parallel-capacitance': N({ en: 'Parallel capacitance', ru: 'Параллельное соединение конденсаторов', uk: 'Паралельне з’єднання конденсаторів' }),
  'elec.series-capacitance': N({ en: 'Series capacitance', ru: 'Последовательное соединение конденсаторов', uk: 'Послідовне з’єднання конденсаторів' }),
  'elec.capacitor-plate': N({ en: 'Parallel-plate capacitance', ru: 'Ёмкость плоского конденсатора', uk: 'Ємність плоского конденсатора' }),
  'elec.material-resistance': N({ en: 'Conductor resistance', ru: 'Сопротивление проводника', uk: 'Опір провідника' }),
  'elec.voltage-divider': N({ en: 'Voltage divider', ru: 'Делитель напряжения', uk: 'Дільник напруги' }),
  'elec.rc-time': N({ en: 'RC time constant', ru: 'Постоянная времени RC-цепи', uk: 'Стала часу RC-кола' }),
  'elec.rl-time': N({ en: 'RL time constant', ru: 'Постоянная времени RL-цепи', uk: 'Стала часу RL-кола' }),
  'elec.capacitive-reactance': N({ en: 'Capacitive reactance', ru: 'Реактивное сопротивление конденсатора', uk: 'Реактивний опір конденсатора' }),
  'elec.inductive-reactance': N({ en: 'Inductive reactance', ru: 'Реактивное сопротивление катушки', uk: 'Реактивний опір котушки' }),
  'elec.rms': N({ en: 'AC RMS value', ru: 'Действующее значение AC (RMS)', uk: 'Діюче значення AC (RMS)' }),
  'chem.ideal-gas': N({ en: 'Ideal gas law', ru: 'Уравнение Менделеева–Клапейрона', uk: 'Рівняння Менделєєва–Клапейрона' }),
  'chem.ph': N({ en: 'Solution pH', ru: 'pH раствора', uk: 'pH розчину' }),
  'chem.heat-capacity': N({ en: 'Heat quantity', ru: 'Количество теплоты', uk: 'Кількість теплоти' }),
  'chem.avogadro': N({ en: 'Molecules from moles', ru: 'Число молекул через моль', uk: 'Число молекул через моль' }),
  'chem.molarity': N({ en: 'Molar concentration', ru: 'Молярная концентрация', uk: 'Молярна концентрація' }),
  'chem.arrhenius': N({ en: 'Arrhenius equation', ru: 'Уравнение Аррениуса', uk: 'Рівняння Арреніуса' }),
  'chem.henderson-hasselbalch': N({ en: 'Henderson–Hasselbalch equation', ru: 'Уравнение Гендерсона–Хассельбаха', uk: 'Рівняння Гендерсона–Гассельбаха' }),
  'chem.faraday-electrolysis': N({ en: "Faraday's electrolysis law", ru: 'Закон электролиза Фарадея', uk: 'Закон електролізу Фарадея' }),
  'bio.exponential-growth': N({ en: 'Exponential population growth', ru: 'Экспоненциальный рост популяции', uk: 'Експоненціальне зростання популяції' }),
  'bio.logistic-growth': N({ en: 'Logistic population growth', ru: 'Логистический рост популяции', uk: 'Логістичне зростання популяції' }),
  'bio.doubling-time': N({ en: 'Population doubling time', ru: 'Время удвоения популяции', uk: 'Час подвоєння популяції' }),
  'bio.hardy-weinberg': N({ en: 'Hardy–Weinberg principle', ru: 'Закон Харди–Вайнберга', uk: 'Закон Харді–Вайнберга' }),
  'bio.allele-frequency-from-q2': N({ en: 'Allele frequency from homozygote frequency', ru: 'Частота аллеля из частоты гомозигот', uk: 'Частота алеля з частоти гомозигот' }),
  'bio.michaelis-menten': N({ en: 'Michaelis–Menten equation', ru: 'Уравнение Михаэлиса–Ментен', uk: 'Рівняння Міхаеліса–Ментен' }),
  'bio.beer-lambert': N({ en: 'Beer–Lambert law', ru: 'Закон Бугера–Ламберта–Бера', uk: 'Закон Бугера–Ламберта–Бера' }),
  'bio.q10': N({ en: 'Q₁₀ temperature coefficient', ru: 'Температурный коэффициент Q₁₀', uk: 'Температурний коефіцієнт Q₁₀' }),
  'bio.bmi': N({ en: 'Body Mass Index (BMI)', ru: 'Индекс массы тела (ИМТ)', uk: 'Індекс маси тіла (ІМТ)' }),
  'bio.bmr-male': N({ en: 'BMR — male (Mifflin–St Jeor)', ru: 'Базальный метаболизм (мужчины, Mifflin-St Jeor)', uk: 'Базальний метаболізм (чоловіки, Mifflin-St Jeor)' }),
  'bio.bmr-female': N({ en: 'BMR — female (Mifflin–St Jeor)', ru: 'Базальный метаболизм (женщины, Mifflin-St Jeor)', uk: 'Базальний метаболізм (жінки, Mifflin-St Jeor)' }),
  'bio.max-heart-rate': N({ en: 'Max heart rate', ru: 'Максимальная ЧСС', uk: 'Максимальна ЧСС' }),
  'bio.body-surface-mosteller': N({ en: 'Body surface area (Mosteller)', ru: 'Площадь поверхности тела (Mosteller)', uk: 'Площа поверхні тіла (Mosteller)' }),
  'bio.dna-tm-wallace': N({ en: 'Oligonucleotide Tm (Wallace rule)', ru: 'Tm короткого олигонуклеотида (правило Уоллеса)', uk: 'Tm короткого олігонуклеотиду (правило Уоллеса)' }),
  'bio.microscope-magnification': N({ en: 'Microscope magnification', ru: 'Увеличение микроскопа', uk: 'Збільшення мікроскопа' }),
  'bio.drug-half-life': N({ en: 'Drug half-life', ru: 'Период полувыведения препарата', uk: 'Період напіввиведення препарату' }),
  'bio.volume-distribution': N({ en: 'Volume of distribution', ru: 'Объём распределения препарата', uk: 'Об’єм розподілу препарату' }),
  'bio.clearance': N({ en: 'Drug clearance', ru: 'Клиренс препарата', uk: 'Кліренс препарату' }),
  'fin.compound-interest': N({ en: 'Compound interest', ru: 'Сложный процент', uk: 'Складний відсоток' }),
  'fin.simple-interest': N({ en: 'Simple interest', ru: 'Простой процент', uk: 'Простий відсоток' }),
  'fin.loan-payment': N({ en: 'Monthly loan payment', ru: 'Ежемесячный платёж по кредиту', uk: 'Щомісячний платіж за кредитом' }),
  'fin.future-value': N({ en: 'Future value of annuity', ru: 'Будущая стоимость аннуитета', uk: 'Майбутня вартість ануїтету' }),
  'fin.present-value': N({ en: 'Present value', ru: 'Приведённая стоимость', uk: 'Приведена вартість' }),
  'fin.inflation-real-rate': N({ en: 'Real rate (inflation-adjusted)', ru: 'Реальная ставка (с учётом инфляции)', uk: 'Реальна ставка (з урахуванням інфляції)' }),
  'aero.reynolds': N({ en: 'Reynolds number', ru: 'Число Рейнольдса', uk: 'Число Рейнольдса' }),
  'aero.mach': N({ en: 'Mach number', ru: 'Число Маха', uk: 'Число Маха' }),
  'aero.lift': N({ en: 'Wing lift force', ru: 'Подъёмная сила крыла', uk: 'Підйомна сила крила' }),
  'aero.drag': N({ en: 'Drag force', ru: 'Сила сопротивления', uk: 'Сила опору' }),
  'aero.bernoulli': N({ en: "Bernoulli's equation", ru: 'Уравнение Бернулли (давление по скорости)', uk: 'Рівняння Бернуллі (тиск за швидкістю)' }),
  'aero.terminal-velocity': N({ en: 'Terminal velocity', ru: 'Установившаяся скорость падения', uk: 'Усталена швидкість падіння' }),
  'aero.hagen-poiseuille': N({ en: 'Hagen–Poiseuille flow', ru: 'Расход через трубу (Хаген–Пуазейль)', uk: 'Витрата через трубу (Хаген–Пуазейль)' }),
  'nuc.activity': N({ en: 'Radionuclide activity', ru: 'Активность радионуклида', uk: 'Активність радіонукліда' }),
  'nuc.decay-constant': N({ en: 'Decay constant from half-life', ru: 'Постоянная распада из периода полураспада', uk: 'Стала розпаду з періоду напіврозпаду' }),
  'nuc.decay-remaining': N({ en: 'Remaining nuclei after time t', ru: 'Оставшееся количество ядер после времени t', uk: 'Кількість ядер, що залишилася після часу t' }),
  'nuc.binding-energy': N({ en: 'Binding energy (mass defect)', ru: 'Энергия связи ядра (по дефекту массы)', uk: 'Енергія зв’язку ядра (за дефектом маси)' }),
  'nuc.dose-rate': N({ en: 'Equivalent dose', ru: 'Эквивалентная доза', uk: 'Еквівалентна доза' }),
  'nuc.kinetic-energy-relativistic': N({ en: 'Relativistic kinetic energy', ru: 'Кинетическая энергия релятивистской частицы', uk: 'Кінетична енергія релятивістської частинки' }),
  'acoustic.sound-pressure-level': N({ en: 'Sound pressure level', ru: 'Уровень звукового давления', uk: 'Рівень звукового тиску' }),
  'acoustic.sum-decibels': N({ en: 'Decibel sum (two sources)', ru: 'Сумма двух некогерентных источников (дБ)', uk: 'Сума двох некогерентних джерел (дБ)' }),
  'acoustic.doppler': N({ en: 'Doppler effect (sound)', ru: 'Эффект Доплера (звук)', uk: 'Ефект Доплера (звук)' }),
  'acoustic.speed-air': N({ en: 'Speed of sound in air', ru: 'Скорость звука в воздухе', uk: 'Швидкість звуку в повітрі' }),
  'acoustic.wavelength': N({ en: 'Sound wavelength', ru: 'Длина звуковой волны', uk: 'Довжина звукової хвилі' }),
  'acoustic.note-frequency': N({ en: 'Note frequency from A4 (12-TET)', ru: 'Частота ноты от A4 (равномерно-темперированный строй)', uk: 'Частота ноти від A4 (рівномірно-темперований стрій)' }),
  'crypto.shannon-entropy': N({ en: 'Shannon entropy (uniform)', ru: 'Энтропия Шеннона (макс для равновероятных)', uk: 'Ентропія Шеннона (макс для рівноймовірних)' }),
  'crypto.password-entropy': N({ en: 'Password entropy', ru: 'Энтропия пароля', uk: 'Ентропія пароля' }),
  'crypto.brute-force-time': N({ en: 'Brute-force time', ru: 'Время полного перебора', uk: 'Час повного перебору' }),
  'crypto.birthday-collision': N({ en: 'Birthday paradox', ru: 'Парадокс дня рождения (вероятность коллизии)', uk: 'Парадокс дня народження (ймовірність колізії)' }),
  'crypto.hamming-distance-bits': N({ en: 'Shannon channel capacity', ru: 'Канал Шеннона (ёмкость)', uk: 'Канал Шеннона (ємність)' }),
  'crypto.entropy-bernoulli': N({ en: 'Bernoulli entropy', ru: 'Энтропия Бернулли (двоичной случайной величины)', uk: 'Ентропія Бернуллі (двійкової випадкової величини)' }),
  'mat.stress': N({ en: 'Mechanical stress', ru: 'Механическое напряжение', uk: 'Механічна напруга' }),
  'mat.strain': N({ en: 'Engineering strain', ru: 'Относительная деформация', uk: 'Відносна деформація' }),
  'mat.hookes-law': N({ en: "Hooke's law (uniaxial)", ru: 'Закон Гука (одноосное нагружение)', uk: 'Закон Гука (одновісне навантаження)' }),
  'mat.elongation': N({ en: 'Axial elongation', ru: 'Удлинение стержня под нагрузкой', uk: 'Подовження стрижня під навантаженням' }),
  'mat.poisson': N({ en: "Poisson's ratio", ru: 'Коэффициент Пуассона', uk: 'Коефіцієнт Пуассона' }),
  'mat.shear-modulus': N({ en: 'Shear modulus from E and ν', ru: 'Модуль сдвига через E и ν', uk: 'Модуль зсуву через E і ν' }),
  'mat.euler-buckling': N({ en: 'Euler critical buckling load', ru: 'Критическая сила Эйлера (потеря устойчивости)', uk: 'Критична сила Ейлера (втрата стійкості)' }),
  'stat.combinations': N({ en: 'Combinations C(n, k)', ru: 'Число сочетаний C(n, k)', uk: 'Число комбінацій C(n, k)' }),
  'stat.permutations': N({ en: 'Permutations A(n, k)', ru: 'Число размещений A(n, k)', uk: 'Число розміщень A(n, k)' }),
  'stat.factorial': N({ en: 'Factorial', ru: 'Факториал', uk: 'Факторіал' }),
  'stat.binomial': N({ en: 'Binomial probability', ru: 'Биномиальная вероятность', uk: 'Біноміальна ймовірність' }),
  'stat.poisson': N({ en: 'Poisson distribution', ru: 'Распределение Пуассона', uk: 'Розподіл Пуассона' }),
  'stat.normal-cdf': N({ en: 'Normal CDF Φ(z)', ru: 'Функция нормального распределения Φ(x)', uk: 'Функція нормального розподілу Φ(x)' }),
  'stat.confidence-interval': N({ en: 'Confidence interval (margin)', ru: 'Доверительный интервал для среднего', uk: 'Довірчий інтервал для середнього' }),
  'stat.standard-error': N({ en: 'Standard error of the mean', ru: 'Стандартная ошибка среднего', uk: 'Стандартна похибка середнього' }),
  'earth.haversine': N({ en: 'Haversine distance', ru: 'Расстояние по большому кругу (Гаверсинус)', uk: 'Відстань великим колом (Гаверсінус)' }),
  'earth.barometric': N({ en: 'Barometric formula', ru: 'Барометрическая формула (давление по высоте)', uk: 'Барометрична формула (тиск за висотою)' }),
  'earth.dew-point': N({ en: 'Dew point (Magnus)', ru: 'Точка росы (приближение Magnus)', uk: 'Точка роси (наближення Magnus)' }),
  'earth.wind-chill': N({ en: 'Wind chill temperature', ru: 'Ощущаемая температура с учётом ветра', uk: 'Відчутна температура з урахуванням вітру' }),
  'earth.richter-energy': N({ en: 'Earthquake energy (Richter)', ru: 'Энергия землетрясения по шкале Рихтера', uk: 'Енергія землетрусу за шкалою Ріхтера' }),
  'earth.tsunami-speed': N({ en: 'Tsunami speed (long wave)', ru: 'Скорость цунами (длинной волны)', uk: 'Швидкість цунамі (довгої хвилі)' }),
  'num.gcd': N({ en: 'GCD of two numbers', ru: 'НОД двух чисел', uk: 'НСД двох чисел' }),
  'num.lcm': N({ en: 'LCM of two numbers', ru: 'НОК двух чисел', uk: 'НСК двох чисел' }),
  'num.is-prime': N({ en: 'Primality test', ru: 'Проверка простоты', uk: 'Перевірка простоти' }),
  'num.euler-phi': N({ en: "Euler's totient φ(n)", ru: 'Функция Эйлера φ(n)', uk: 'Функція Ейлера φ(n)' }),
  'num.modular-exponent': N({ en: 'Modular exponentiation', ru: 'Возведение по модулю (a^b mod m)', uk: 'Піднесення за модулем (a^b mod m)' }),
  'num.fibonacci': N({ en: 'n-th Fibonacci number', ru: 'n-е число Фибоначчи', uk: 'n-те число Фібоначчі' }),
  'num.golden-ratio-power': N({ en: "Binet's formula approximation", ru: 'Аппроксимация Бине для Фибоначчи', uk: 'Апроксимація Біне для Фібоначчі' }),
  'heat.conduction': N({ en: 'Heat conduction (Fourier)', ru: 'Теплопередача через стенку (Фурье)', uk: 'Теплопередача через стінку (Фур’є)' }),
  'heat.convection': N({ en: 'Convective heat transfer (Newton)', ru: 'Конвективный теплообмен (Ньютон)', uk: 'Конвективний теплообмін (Ньютон)' }),
  'heat.radiation-net': N({ en: 'Radiative heat transfer', ru: 'Теплоотдача излучением', uk: 'Тепловіддача випромінюванням' }),
  'heat.thermal-resistance': N({ en: 'Thermal resistance of a wall', ru: 'Термическое сопротивление стенки', uk: 'Термічний опір стінки' }),
  'heat.biot': N({ en: 'Biot number', ru: 'Число Био', uk: 'Число Біо' }),
};

export function tFormulaName(id: string, fallback: string): string {
  const locale = i18n.get();
  return formulaNames[id]?.[locale] ?? formulaNames[id]?.en ?? fallback;
}
