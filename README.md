# Engineering Calculator — Modular Edition

Инженерный калькулятор второго поколения. Работает **в браузере, на десктопе и на смартфоне** из одного исходника. Полностью модульная архитектура, расширяется плагинами, рендерит LaTeX, считает символьно (производные, упрощение, пошаговое решение), рисует графики с live-слайдерами, поддерживает встроенный мини-REPL и командную палитру.

```
┌──────────────────────────────────────────────────────────────┐
│  ƒ(x)  Engineering Calculator                       ⌘K  ⚙   │
├──────────────────────────┬───────────────────────────────────┤
│                          │  History                          │
│              42          │  ──────                           │
│   sin(π/4) + √2          │  sin(π/4)+√2 = 2.121              │
│   ────────────────       │  3*(2+5)     = 21                 │
│   = 2.121320343          │  ∫ x² dx     = x³/3               │
│                          │                                   │
│   [ 7 ][ 8 ][ 9 ][ ÷ ]   │  Plot: y = a·sin(bx)              │
│   [ 4 ][ 5 ][ 6 ][ × ]   │  ╭─────────────╮                  │
│   [ 1 ][ 2 ][ 3 ][ − ]   │  │   ∿∿∿∿∿∿∿  │                  │
│   [ 0 ][ . ][ = ][ + ]   │  ╰─────────────╯                  │
│                          │  a ────●────── 2.4                │
│                          │  b ──●──────── 0.8                │
└──────────────────────────┴───────────────────────────────────┘
```

---

## 🚀 Что внутри

| Фича | Описание |
|---|---|
| 🧠 **Символьные вычисления** | Производные, интегралы, упрощение, решение уравнений — без сервера, прямо в браузере (algebrite) |
| 🔌 **Плагины** | Кидаешь `.js`-файл в `plugins/` — появляется новая формула или вкладка. Без перекомпиляции. |
| 📐 **LaTeX-рендер** | Все выражения отображаются красиво. Экспорт сессии в Markdown / PDF одной кнопкой |
| ⌘ **Командная палитра** | `Ctrl+K` / `⌘K` — мгновенный поиск по всем формулам, конвертерам, функциям и истории |
| 📊 **Графики 2D** | Live-слайдеры параметров: меняешь `a`, `b`, `c` — кривая перестраивается в реальном времени |
| ⌨ **Скриптинг (REPL)** | Встроенный мини-REPL с доступом к `history`, `memory`, `ans` и любым формулам через JS |
| 🌗 **Темы** | Тёмная по умолчанию + светлая. Темы вынесены в CSS-переменные, легко добавить свою |
| 🌍 **i18n** | Русский, English, Українська. Локали в `*.json`, никаких dict в коде |
| 💾 **Persistence** | История, память, состояние, плагины — всё сохраняется автоматически |

---

## 🌐 Платформы

Один кодовый base — **6 платформ**:

| Платформа | Чем собирается | Команда |
|---|---|---|
| 🌍 Web | Vite | `npm run build` → `dist/` |
| 📱 PWA (iOS/Android в браузере) | Vite + manifest | автоматически при build |
| 🐧 Linux | Tauri 2 | `npm run tauri build` |
| 🪟 Windows | Tauri 2 | `npm run tauri build` |
| 🍎 macOS | Tauri 2 | `npm run tauri build` |
| 📲 Android (native) | Tauri 2 Mobile | `npm run tauri android build` |
| 📲 iOS (native) | Tauri 2 Mobile | `npm run tauri ios build` |

Tauri 2 — это **~10MB** native-обёртка против ~120MB Electron. Реально быстро.

---

## ⚡ Быстрый старт

Нужен только **Node.js 18+**. Всё остальное `npm` поставит сам.

```bash
# 1. Установка зависимостей
npm install

# 2. Запуск в режиме разработки (откроется http://localhost:5173)
npm run dev

# 3. Сборка под Web
npm run build
npm run preview          # посмотреть готовую сборку
```

Для desktop/mobile сборок:

```bash
# Один раз: поставить Tauri CLI
npm install -g @tauri-apps/cli

# Desktop (текущая ОС)
npm run tauri dev        # запуск
npm run tauri build      # релизный билд → src-tauri/target/release/bundle/

# Mobile (нужен Android Studio / Xcode)
npm run tauri android init && npm run tauri android dev
npm run tauri ios init && npm run tauri ios dev
```

---

## 📁 Архитектура

Главный принцип: **`core/` не знает про React и Qt**. Это чистый TypeScript, который можно покрыть тестами и переиспользовать где угодно.

```
calculator/
├── README.md                       ← вы здесь
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
│
├── src/
│   ├── main.tsx                    Точка входа React
│   ├── App.tsx                     Корневой компонент
│   │
│   ├── core/                       💡 ВСЯ ЛОГИКА — ноль зависимостей от UI
│   │   ├── types.ts                Общие типы (Result, HistoryEntry, ...)
│   │   ├── evaluator.ts            Безопасный eval арифметики (mathjs)
│   │   ├── symbolic.ts             Символьные вычисления (algebrite)
│   │   ├── history.ts              Модель истории + persistence
│   │   ├── memory.ts               M+ / M- / MR / MC
│   │   ├── plotting.ts             Подготовка данных для графиков
│   │   │
│   │   ├── formulas/               Регистрируемые формулы
│   │   │   ├── registry.ts         Автоматический реестр
│   │   │   ├── physics.ts
│   │   │   ├── electric.ts
│   │   │   └── chemistry.ts
│   │   │
│   │   └── converters/             Конвертеры единиц
│   │       ├── registry.ts
│   │       ├── length.ts
│   │       ├── mass.ts
│   │       └── temperature.ts
│   │
│   ├── i18n/                       Интернационализация
│   │   ├── index.ts                LocaleManager
│   │   └── locales/
│   │       ├── ru.json
│   │       ├── en.json
│   │       └── uk.json
│   │
│   ├── plugins/                    Система плагинов
│   │   └── PluginManager.ts        Динамическая загрузка
│   │
│   ├── ui/                         Всё про React
│   │   ├── theme.tsx               ThemeProvider + переменные
│   │   ├── components/
│   │   │   ├── Calculator.tsx      Главный экран
│   │   │   ├── Display.tsx         Дисплей с LaTeX
│   │   │   ├── Keypad.tsx          Кнопки
│   │   │   ├── History.tsx         Боковая панель истории
│   │   │   ├── CommandPalette.tsx  ⌘K
│   │   │   ├── PlotPanel.tsx       Графики со слайдерами
│   │   │   ├── SymbolicPanel.tsx   Символьные вычисления
│   │   │   ├── ReplPanel.tsx       Мини-REPL
│   │   │   └── UnitConverter.tsx   Конвертер единиц
│   │   └── styles/
│   │       └── global.css          CSS variables + reset
│   │
│   └── utils/
│       ├── storage.ts              LocalStorage / Tauri FS
│       └── export.ts               Markdown / PDF экспорт
│
└── plugins/                        💡 ПОЛЬЗОВАТЕЛЬСКИЕ ПЛАГИНЫ
    └── example-thermodynamics.js   Пример: вкладка с формулами термодинамики
```

### Почему так

- **`core/` без зависимостей от UI** — можно тестировать в Node, можно переиспользовать в CLI, можно подключить к боту. Сегодня PyQt, завтра React, послезавтра Telegram — логика одна.
- **Registry-паттерн** для формул и конвертеров — добавление новой формулы не требует трогать UI-код. Формула сама регистрируется при импорте.
- **Plugins ≠ Formulas** — формулы это встроенный набор, плагины это user-space. Плагин может добавить целую новую вкладку, не только формулу.
- **i18n в JSON, а не в Python dict** — переводчик не должен читать код.

---

## 🔌 Как написать свой плагин

Создай файл в `plugins/`, например `plugins/my-thermo.js`:

```javascript
// plugins/my-thermo.js
export default {
  id: 'thermo-pv-nrt',
  name: 'Уравнение Менделеева-Клапейрона',

  formulas: [{
    id: 'thermo.pv-nrt',
    name: 'PV = nRT',
    category: 'Термодинамика',
    inputs: [
      { name: 'n', label: 'Количество вещества (моль)', default: 1 },
      { name: 'T', label: 'Температура (К)', default: 298.15 },
      { name: 'V', label: 'Объём (м³)', default: 0.0224 },
    ],
    compute: ({ n, T, V }) => ({
      result: (n * 8.314 * T) / V,
      unit: 'Па',
      latex: `P = \\frac{nRT}{V}`,
    }),
  }],
};
```

Сохраняешь → файл подхватится автоматически → в командной палитре (⌘K) появится новая формула. **Без перезапуска.**

Можно установить плагин прямо из UI (вкладка «Плагины» → вставить код → «Установить»).

---

## ⌨ Горячие клавиши

| Клавиши | Действие |
|---|---|
| `Ctrl+K` / `⌘K` | Открыть командную палитру |
| `Enter` / `=` | Вычислить |
| `Esc` | Очистить |
| `Backspace` | Удалить последний символ |
| `Ctrl+H` | Показать/скрыть историю |
| `Ctrl+/` | Сменить язык |
| `Ctrl+T` | Сменить тему |

---

## 🛠 Стек

- **[Vite](https://vitejs.dev/)** — сборка
- **[React 18](https://react.dev/)** + **TypeScript** — UI
- **[Tailwind CSS](https://tailwindcss.com/)** — стили
- **[mathjs](https://mathjs.org/)** — арифметика и парсинг
- **[algebrite](http://algebrite.org/)** — символьная математика в браузере
- **[KaTeX](https://katex.org/)** — рендер LaTeX
- **[function-plot](https://mauriciopoppe.github.io/function-plot/)** — графики
- **[Tauri 2](https://tauri.app/)** — нативные обёртки

Никакого Electron. Никакого Python в браузере. Никакого тормозного MathJax.

---

## 🐛 Известные ограничения

- Tauri Mobile (iOS/Android native) пока в beta — для production лучше PWA.
- Сложные LaTeX-выражения с матрицами рендерятся медленнее простых формул (особенность KaTeX).
- Plugin sandbox простой — плагины имеют полный доступ к API. Не запускай плагины из непроверенных источников.

---

## 📜 Лицензия

MIT.

---

## 🙋 FAQ

**Q: А где Python? Старый калькулятор же на PyQt5 был.**
A: Python не работает в браузере и на мобильных. Один TypeScript-codebase покрывает все 6 платформ. Старый PyQt5-калькулятор остался в git-истории — все его формулы перенесены 1:1 в `core/formulas/`.

**Q: Почему не Electron?**
A: Electron-приложение весит ~120MB и ест ~300MB RAM на калькулятор. Tauri — 10MB / 30MB. Разница принципиальная.

**Q: Можно ли использовать без интернета?**
A: Да. Web-версия — это PWA, после первой загрузки работает offline.
