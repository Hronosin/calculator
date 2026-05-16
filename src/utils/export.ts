/**
 * Export utilities — Markdown and printable HTML→PDF.
 */

import type { HistoryEntry } from '../core/types';

export function toMarkdown(entries: HistoryEntry[]): string {
  const date = new Date().toISOString();
  const lines: string[] = [
    `# Calculator Session`,
    ``,
    `_Exported: ${date}_`,
    ``,
    `## History`,
    ``,
  ];

  for (const entry of entries) {
    const ts = new Date(entry.timestamp).toLocaleString();
    lines.push(`### ${ts}`);
    lines.push('');
    lines.push('```');
    lines.push(`${entry.expression} = ${entry.result}`);
    lines.push('```');
    if (entry.latex) {
      lines.push('');
      lines.push(`$$${entry.latex}$$`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function downloadText(filename: string, content: string, mime = 'text/plain'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportMarkdown(entries: HistoryEntry[]): void {
  downloadText(`calc-session-${Date.now()}.md`, toMarkdown(entries), 'text/markdown');
}

/**
 * Open a printable HTML window — user uses "Save as PDF" from print dialog.
 * Works on all platforms.
 */
export function exportPDF(entries: HistoryEntry[]): void {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Allow popups to export PDF');
    return;
  }
  const rows = entries
    .map((e) => {
      const ts = new Date(e.timestamp).toLocaleString();
      return `
        <div class="entry">
          <div class="meta">${ts}</div>
          <div class="expr">${escapeHtml(e.expression)} = <strong>${escapeHtml(e.result)}</strong></div>
        </div>`;
    })
    .join('\n');

  win.document.write(`<!doctype html>
<html><head>
<meta charset="utf-8">
<title>Calculator Session</title>
<style>
  body { font-family: 'JetBrains Mono', monospace; padding: 2rem; max-width: 800px; margin: auto; color: #111; }
  h1 { font-family: system-ui, sans-serif; font-size: 1.8rem; margin: 0 0 .25rem; }
  .meta { font-size: .75rem; color: #888; margin-top: .8rem; }
  .expr { font-size: 1rem; margin-top: .15rem; padding: .5rem .75rem; background: #f5f5f7; border-radius: 6px; }
  @media print { body { padding: 1rem; } }
</style></head><body>
  <h1>Calculator Session</h1>
  <div class="meta">${new Date().toLocaleString()}</div>
  ${rows}
  <script>window.onload = () => window.print();<\/script>
</body></html>`);
  win.document.close();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
