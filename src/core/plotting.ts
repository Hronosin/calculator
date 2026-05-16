/**
 * Plotting helper. Wraps function-plot with live parameter support.
 */

import functionPlot from 'function-plot';

export interface PlotParameter {
  name: string;
  min: number;
  max: number;
  value: number;
  step?: number;
}

export interface PlotSpec {
  expression: string;
  parameters: PlotParameter[];
  xDomain?: [number, number];
  yDomain?: [number, number];
  color?: string;
}

/**
 * Substitute parameter placeholders with current values.
 * "a * sin(b * x)" + {a: 2, b: 0.5} -> "2 * sin(0.5 * x)"
 */
export function substitute(expression: string, params: PlotParameter[]): string {
  let out = expression;
  for (const param of params) {
    const pattern = new RegExp(`\\b${param.name}\\b`, 'g');
    out = out.replace(pattern, `(${param.value})`);
  }
  return out;
}

export function render(container: HTMLElement, spec: PlotSpec): void {
  const expression = substitute(spec.expression, spec.parameters);
  container.innerHTML = '';

  try {
    functionPlot({
      target: container,
      width: container.clientWidth || 480,
      height: container.clientHeight || 320,
      xAxis: { domain: spec.xDomain ?? [-10, 10] },
      yAxis: spec.yDomain ? { domain: spec.yDomain } : undefined,
      grid: true,
      data: [
        {
          fn: expression,
          color: spec.color ?? '#00d9ff',
          graphType: 'polyline',
        },
      ],
    });
  } catch (err) {
    container.innerHTML = `<div style="color:#ff6b8b;padding:1rem;font-family:monospace;font-size:13px">
      Plot error: ${err instanceof Error ? err.message : String(err)}
    </div>`;
  }
}
