/**
 * Formulas browser panel.
 * Categories and formula names are translated via i18n/dictionaries.
 */

import { useMemo, useState } from 'react';
import { getAll, getCategories } from '../../core/formulas/registry';
import type { Formula, FormulaOutput } from '../../core/types';
import { Latex } from './Latex';
import { history } from '../../core/history';
import { useTranslation } from '../../i18n';
import { tCategory, tFormulaName } from '../../i18n/dictionaries';

const ALL_CATEGORY_KEY = 'Все';

export function FormulasPanel() {
  // Re-render when locale changes so translations update
  const { locale } = useTranslation();
  void locale;

  const rawCategories = useMemo(() => [ALL_CATEGORY_KEY, ...getCategories()], []);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY_KEY);
  const [selected, setSelected] = useState<Formula | null>(null);

  const list = useMemo(() => {
    const all = getAll();
    return activeCategory === ALL_CATEGORY_KEY
      ? all
      : all.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {rawCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors"
            style={{
              background: activeCategory === cat ? 'var(--accent-glow)' : 'transparent',
              color: activeCategory === cat ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {tCategory(cat)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="overflow-y-auto pr-1">
          <ul className="flex flex-col gap-1">
            {list.map((f) => (
              <li key={f.id}>
                <button
                  onClick={() => setSelected(f)}
                  className="w-full text-left px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background:
                      selected?.id === f.id ? 'var(--bg-hover)' : 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {tFormulaName(f.id, f.name)}
                  </div>
                  <div className="font-mono text-xs mt-0.5"
                    style={{ color: 'var(--text-faint)' }}>
                    {f.expression ?? f.id}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-y-auto pl-1">
          {selected ? (
            <FormulaForm formula={selected} key={selected.id} />
          ) : (
            <div className="text-sm font-mono p-4" style={{ color: 'var(--text-faint)' }}>
              ← {pickHint(locale)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tiny inline hint translations
function pickHint(locale: string): string {
  const hints: Record<string, string> = {
    en: 'Pick a formula on the left',
    ru: 'Выбери формулу слева',
    uk: 'Обери формулу зліва',
    es: 'Selecciona una fórmula a la izquierda',
    de: 'Wähle links eine Formel',
    fr: 'Choisis une formule à gauche',
    zh: '从左侧选择公式',
    ja: '左から数式を選択',
    pt: 'Selecione uma fórmula à esquerda',
    it: 'Seleziona una formula a sinistra',
    pl: 'Wybierz wzór po lewej',
  };
  return hints[locale] ?? hints.en;
}

function FormulaForm({ formula }: { formula: Formula }) {
  const { locale } = useTranslation();
  void locale;

  const [values, setValues] = useState<Record<string, number>>(() => {
    const v: Record<string, number> = {};
    for (const input of formula.inputs) v[input.name] = input.default;
    return v;
  });
  const [output, setOutput] = useState<FormulaOutput | null>(null);
  const [error, setError] = useState<string>('');

  const compute = () => {
    try {
      const result = formula.compute(values);
      setOutput(result);
      setError('');
      history.add({
        expression: `${tFormulaName(formula.id, formula.name)}(${Object.entries(values)
          .map(([k, v]) => `${k}=${v}`)
          .join(', ')})`,
        result: `${result.result} ${result.unit ?? ''}`.trim(),
        latex: result.latex,
        kind: 'plugin',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setOutput(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-display text-lg" style={{ color: 'var(--text)' }}>
          {tFormulaName(formula.id, formula.name)}
        </h3>
        {formula.description && (
          <div className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
            {formula.description}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {formula.inputs.map((input) => (
          <div key={input.name} className="flex items-center gap-2">
            <label className="font-mono text-sm w-24 flex-shrink-0"
              style={{ color: 'var(--accent)' }}>
              {input.name}
            </label>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="number"
                value={values[input.name]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [input.name]: Number(e.target.value) }))
                }
                className="flex-1 font-mono text-sm px-2 py-1.5 rounded outline-none"
                style={{
                  background: 'var(--display)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
              />
              {input.unit && (
                <span className="font-mono text-xs w-16"
                  style={{ color: 'var(--text-muted)' }}>
                  {input.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={compute}
        className="px-4 py-2 rounded-lg text-sm font-medium"
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-fg, var(--bg))',
        }}
      >
        {pickComputeLabel(useTranslation().locale)}
      </button>

      {error && (
        <div className="text-sm font-mono p-3 rounded-lg"
          style={{
            color: 'var(--rose)',
            background: 'rgba(255, 107, 139, 0.06)',
            border: '1px solid var(--rose)',
          }}>
          {error}
        </div>
      )}

      {output && (
        <div className="p-3 rounded-lg"
          style={{
            background: 'var(--display)',
            border: '1px solid var(--border)',
          }}>
          {output.latex && (
            <div className="mb-2 overflow-x-auto">
              <Latex expression={output.latex} displayMode />
            </div>
          )}
          <div className="font-mono text-lg" style={{ color: 'var(--accent)' }}>
            = {output.result} {output.unit ?? ''}
          </div>
        </div>
      )}
    </div>
  );
}

function pickComputeLabel(locale: string): string {
  const labels: Record<string, string> = {
    en: 'Compute',
    ru: 'Вычислить',
    uk: 'Обчислити',
    es: 'Calcular',
    de: 'Berechnen',
    fr: 'Calculer',
    zh: '计算',
    ja: '計算',
    pt: 'Calcular',
    it: 'Calcola',
    pl: 'Oblicz',
  };
  return labels[locale] ?? labels.en;
}
