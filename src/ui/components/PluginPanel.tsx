/**
 * Plugin manager UI.
 * Lists loaded plugins and lets the user paste a plugin source for runtime install.
 */

import { useEffect, useState } from 'react';
import { plugins } from '../../plugins/PluginManager';
import type { Plugin } from '../../core/types';

const EXAMPLE = `export default {
  id: 'my-plugin',
  name: 'Мой плагин',
  formulas: [{
    id: 'my.area-circle',
    name: 'Площадь круга',
    category: 'Геометрия',
    expression: 'S = π r²',
    inputs: [{ name: 'r', label: 'Радиус', unit: 'м', default: 1 }],
    compute: ({ r }) => ({
      result: Math.PI * r * r,
      unit: 'м²',
      latex: \`S = \\\\pi \\\\cdot \${r}^2\`,
    }),
  }],
};`;

export function PluginPanel() {
  const [list, setList] = useState<Plugin[]>([]);
  const [source, setSource] = useState('');
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null);

  useEffect(() => plugins.subscribe(setList), []);

  const install = async () => {
    if (!source.trim()) return;
    try {
      await plugins.installFromSource(source);
      setStatus({ kind: 'ok', msg: 'Плагин установлен' });
      setSource('');
    } catch (err) {
      setStatus({ kind: 'err', msg: err instanceof Error ? err.message : String(err) });
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto">
      <div>
        <h3 className="font-display text-lg mb-2" style={{ color: 'var(--text)' }}>
          Установленные плагины ({list.length})
        </h3>
        {list.length === 0 ? (
          <div className="text-sm font-mono p-3 rounded-lg"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-faint)',
            }}>
            Плагинов пока нет. Кидай файлы в /plugins или вставь код ниже.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {list.map((p) => (
              <li key={p.id} className="p-3 rounded-lg flex items-center justify-between"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {p.name} {p.version && (
                      <span className="font-mono text-xs ml-2"
                        style={{ color: 'var(--text-faint)' }}>
                        v{p.version}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs mt-0.5"
                    style={{ color: 'var(--text-muted)' }}>
                    id: {p.id} · {p.formulas?.length ?? 0} формул
                  </div>
                </div>
                <button
                  onClick={() => plugins.uninstall(p.id)}
                  className="px-3 py-1 rounded text-xs font-mono"
                  style={{ color: 'var(--rose)', background: 'transparent' }}
                >
                  удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg mb-2" style={{ color: 'var(--text)' }}>
          Установить из исходника
        </h3>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder={EXAMPLE}
          rows={12}
          className="w-full font-mono text-xs p-3 rounded-lg outline-none resize-vertical"
          style={{
            background: 'var(--display)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          }}
        />
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={install}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            Установить
          </button>
          <button
            onClick={() => setSource(EXAMPLE)}
            className="px-4 py-2 rounded-lg text-sm"
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            Вставить пример
          </button>
          {status && (
            <span
              className="text-sm font-mono"
              style={{ color: status.kind === 'ok' ? 'var(--sage)' : 'var(--rose)' }}
            >
              {status.msg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
