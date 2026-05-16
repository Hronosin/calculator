/**
 * History side panel.
 * Subscribes to the history store and renders entries.
 */

import { useEffect, useState } from 'react';
import { history } from '../../core/history';
import type { HistoryEntry } from '../../core/types';
import { useTranslation } from '../../i18n';
import { exportMarkdown, exportPDF } from '../../utils/export';

interface Props {
  onRecall: (entry: HistoryEntry) => void;
}

export function History({ onRecall }: Props) {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => history.subscribe(setEntries), []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="text-xs uppercase tracking-widest font-medium"
          style={{ color: 'var(--text-muted)' }}>
          {t('history.title')}
        </span>
        <div className="flex gap-2 text-[11px]">
          <button
            className="font-mono px-2 py-1 rounded hover:bg-opacity-10"
            style={{ color: 'var(--text-faint)' }}
            onClick={() => exportMarkdown(entries)}
            title="Export Markdown"
          >
            .md
          </button>
          <button
            className="font-mono px-2 py-1 rounded"
            style={{ color: 'var(--text-faint)' }}
            onClick={() => exportPDF(entries)}
            title="Export PDF"
          >
            .pdf
          </button>
          <button
            className="font-mono px-2 py-1 rounded"
            style={{ color: 'var(--rose)' }}
            onClick={() => history.clear()}
          >
            {t('history.clear')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {entries.length === 0 ? (
          <div className="text-xs px-3 py-8 text-center" style={{ color: 'var(--text-faint)' }}>
            {t('history.empty')}
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            {entries.map((entry) => (
              <li key={entry.id}>
                <button
                  onClick={() => onRecall(entry)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-opacity-50 transition-colors"
                  style={{ background: 'transparent' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="font-mono text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {entry.expression}
                  </div>
                  <div className="font-mono text-sm truncate mt-0.5" style={{ color: 'var(--text)' }}>
                    = {entry.result}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
