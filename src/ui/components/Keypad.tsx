/**
 * Calculator keypad.
 * Layout matches the PyQt5 version's button arrangement closely
 * but rebuilt as a data-driven grid.
 */

interface KeySpec {
  label: string;
  kind: 'num' | 'op' | 'fn' | 'const' | 'mem' | 'eq' | 'clr';
  /** Action key — what to do when pressed. */
  action: string;
  /** Span columns (default 1) */
  span?: number;
}

const ROWS: KeySpec[][] = [
  // Row 1: top — mode/clear
  [
    { label: 'AC', kind: 'clr', action: 'clear' },
    { label: '⌫', kind: 'clr', action: 'delete' },
    { label: 'INV', kind: 'fn', action: 'inv' },
    { label: 'RAD', kind: 'fn', action: 'angle' },
    { label: '%', kind: 'fn', action: 'percent' },
    { label: 'ANS', kind: 'fn', action: 'ans' },
  ],
  // Row 2: trig
  [
    { label: 'sin', kind: 'fn', action: 'fn:sin(' },
    { label: 'cos', kind: 'fn', action: 'fn:cos(' },
    { label: 'tan', kind: 'fn', action: 'fn:tan(' },
    { label: 'ln', kind: 'fn', action: 'fn:log(' },
    { label: 'log', kind: 'fn', action: 'fn:log10(' },
    { label: 'eˣ', kind: 'fn', action: 'fn:exp(' },
  ],
  // Row 3: powers/roots
  [
    { label: 'x²', kind: 'fn', action: 'op:^2' },
    { label: 'x³', kind: 'fn', action: 'op:^3' },
    { label: 'xʸ', kind: 'fn', action: 'op:^' },
    { label: '√', kind: 'fn', action: 'fn:sqrt(' },
    { label: '∛', kind: 'fn', action: 'fn:cbrt(' },
    { label: 'n!', kind: 'fn', action: 'op:!' },
  ],
  // Row 4: constants and parens
  [
    { label: 'π', kind: 'const', action: 'ins:pi' },
    { label: 'e', kind: 'const', action: 'ins:e' },
    { label: '(', kind: 'fn', action: 'ins:(' },
    { label: ')', kind: 'fn', action: 'ins:)' },
    { label: 'MC', kind: 'mem', action: 'mem:clear' },
    { label: 'MR', kind: 'mem', action: 'mem:recall' },
  ],
  // Row 5: 7-8-9 + ops
  [
    { label: '7', kind: 'num', action: 'ins:7' },
    { label: '8', kind: 'num', action: 'ins:8' },
    { label: '9', kind: 'num', action: 'ins:9' },
    { label: '÷', kind: 'op', action: 'ins:/' },
    { label: 'M+', kind: 'mem', action: 'mem:plus' },
    { label: 'M−', kind: 'mem', action: 'mem:minus' },
  ],
  // Row 6
  [
    { label: '4', kind: 'num', action: 'ins:4' },
    { label: '5', kind: 'num', action: 'ins:5' },
    { label: '6', kind: 'num', action: 'ins:6' },
    { label: '×', kind: 'op', action: 'ins:*' },
    { label: ',', kind: 'fn', action: 'ins:,' },
    { label: 'EE', kind: 'fn', action: 'ins:e' },
  ],
  // Row 7
  [
    { label: '1', kind: 'num', action: 'ins:1' },
    { label: '2', kind: 'num', action: 'ins:2' },
    { label: '3', kind: 'num', action: 'ins:3' },
    { label: '−', kind: 'op', action: 'ins:-' },
    { label: '|x|', kind: 'fn', action: 'fn:abs(' },
    { label: 'mod', kind: 'fn', action: 'ins:%' },
  ],
  // Row 8 - 0, dot, sign, =, +
  [
    { label: '±', kind: 'fn', action: 'op:neg' },
    { label: '0', kind: 'num', action: 'ins:0' },
    { label: '.', kind: 'num', action: 'ins:.' },
    { label: '+', kind: 'op', action: 'ins:+' },
    { label: '=', kind: 'eq', action: 'eval', span: 2 },
  ],
];

interface Props {
  onAction: (action: string) => void;
}

export function Keypad({ onAction }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {ROWS.map((row, i) => (
        <div key={i} className="grid grid-cols-6 gap-2">
          {row.map((key, j) => (
            <button
              key={`${i}-${j}-${key.label}`}
              className={`calc-btn calc-btn-${key.kind}`}
              style={key.span ? { gridColumn: `span ${key.span}` } : undefined}
              onClick={() => onAction(key.action)}
            >
              {key.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
