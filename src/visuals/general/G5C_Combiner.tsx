import { useState } from 'react'
import { C, Choice, Controls, Diagram, Inductor, Capacitor, Resistor, Slider, T, Wire, Dot, fmt } from '../kit'

type Kind = 'R' | 'L' | 'C'
type Mode = 'series' | 'parallel'
const UNIT: Record<Kind, string> = { R: 'Ω', L: 'mH', C: 'µF' }
const NAME: Record<Kind, string> = { R: 'Resistance', L: 'Inductance', C: 'Capacitance' }
const COL: Record<Kind, string> = { R: C.resist, L: C.current, C: C.voltage }
const DEF: Record<Kind, number[]> = { R: [10, 20, 50], L: [20, 50, 10], C: [20, 50, 100] }
const SUB = ['1', '2', '3']

/** Series and parallel totals. R and L: series adds, parallel shrinks. C does the opposite. */
export function G5C_Combiner({ kinds = ['R', 'L'], start }: { kinds?: Kind[]; start?: Kind }) {
  const [kind, setKind] = useState<Kind>(start ?? kinds[0])
  const [mode, setMode] = useState<Mode>(kinds[0] === 'C' ? 'series' : 'parallel')
  const [n, setN] = useState(kinds[0] === 'C' ? 2 : 3)
  const [vals, setVals] = useState<Record<Kind, number[]>>({ R: [...DEF.R], L: [...DEF.L], C: [...DEF.C] })
  const v = vals[kind].slice(0, n)
  const adds = (kind === 'C') === (mode === 'parallel')
  const sum = v.reduce((a, b) => a + b, 0)
  const recip = v.reduce((a, b) => a + 1 / b, 0)
  const total = adds ? sum : 1 / recip
  const u = UNIT[kind], col = COL[kind]
  const part = (x: number, y: number) => {
    const p = { x, y, len: 70, color: col }
    return kind === 'R' ? <Resistor {...p} /> : kind === 'L' ? <Inductor {...p} /> : <Capacitor {...p} />
  }
  const sx = [150, 320, 490].slice(0, n)
  const py = (n === 2 ? [110, 170] : [85, 145, 205])
  const sym = kind
  const mid = (py[0] + py[n - 1]) / 2
  const work = adds
    ? `${sym}total = ${v.map((x) => fmt(x)).join(' + ')}`
    : `${sym}total = 1 ÷ (${v.map((x) => `1/${fmt(x)}`).join(' + ')}) = 1 ÷ ${fmt(recip, 4)}`
  const verdict = adds ? 'sum: bigger than any single part' : 'smaller than the smallest part'
  const rule = mode === 'series' ? 'Series' : 'Parallel'
  return (
    <>
      <Diagram w={640} h={348}
        title={`${n} ${NAME[kind].toLowerCase()} values ${v.join(', ')} ${u} in ${mode} give ${fmt(total, 4)} ${u}. ${adds ? 'They add.' : 'The total is smaller than the smallest part.'}`}
        caption={adds ? 'This arrangement adds the values.' : 'This arrangement shrinks the total below the smallest part.'}>
        {mode === 'series' ? (
          <g>
            <Wire pts={[[30, 140], [sx[0] - 35, 140]]} color={C.muted} width={2.5} />
            {sx.map((x, k) => (
              <g key={k}>
                {k > 0 && <Wire pts={[[sx[k - 1] + 35, 140], [x - 35, 140]]} color={C.muted} width={2.5} />}
                {part(x, 140)}
                <T x={x} y={104} anchor="middle" bold size={14} color={col}>{sym}{SUB[k]} = {fmt(v[k])} {u}</T>
              </g>
            ))}
            <Wire pts={[[sx[n - 1] + 35, 140], [610, 140]]} color={C.muted} width={2.5} />
            <Dot x={30} y={140} color={C.muted} /><Dot x={610} y={140} color={C.muted} />
          </g>
        ) : (
          <g>
            <Wire pts={[[30, mid], [120, mid]]} color={C.muted} width={2.5} />
            <Wire pts={[[520, mid], [610, mid]]} color={C.muted} width={2.5} />
            <Wire pts={[[120, py[0]], [120, py[n - 1]]]} color={C.muted} width={2.5} />
            <Wire pts={[[520, py[0]], [520, py[n - 1]]]} color={C.muted} width={2.5} />
            {py.map((y, k) => (
              <g key={k}>
                <Wire pts={[[120, y], [285, y]]} color={C.muted} width={2.5} />
                <Wire pts={[[355, y], [520, y]]} color={C.muted} width={2.5} />
                {part(320, y)}
                <T x={320} y={y - 26} anchor="middle" size={14} bold color={col}>{sym}{SUB[k]} = {fmt(v[k])} {u}</T>
              </g>
            ))}
            <Dot x={30} y={mid} color={C.muted} /><Dot x={610} y={mid} color={C.muted} /><Dot x={120} y={mid} color={C.muted} /><Dot x={520} y={mid} color={C.muted} />
          </g>
        )}
        <rect x={10} y={226} width={620} height={112} rx={14} fill={C.fill} />
        <T x={28} y={248} size={13} color={C.muted}>{rule}: {adds ? 'values add' : 'reciprocals add, then flip'}</T>
        <T x={28} y={278} size={15} mono>{work}</T>
        <T x={28} y={314} size={13} color={C.muted}>{sym}total</T>
        <T x={96} y={314} bold size={28} color={col}>{fmt(total, 4)} {u}</T>
        <T x={620} y={314} anchor="end" size={13} color={adds ? C.good : C.muted} bold>{verdict}</T>
      </Diagram>
      <Controls>
        {kinds.length > 1 && (
          <div>
            <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Part</span>
            <Choice label="Part" value={kind} onChange={setKind} options={kinds.map((k) => ({ value: k, label: NAME[k] }))} />
          </div>
        )}
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Connected in</span>
          <Choice label="Connection" value={mode} onChange={setMode} options={[{ value: 'series', label: 'Series' }, { value: 'parallel', label: 'Parallel' }]} />
        </div>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>How many</span>
          <Choice label="Count" value={n} onChange={setN} options={[{ value: 2, label: '2' }, { value: 3, label: '3' }]} />
        </div>
        {v.map((x, k) => (
          <Slider key={`${kind}${k}`} label={`${sym}${SUB[k]}`} value={x} min={1} max={100} step={1} color={`var(--d-${kind === 'R' ? 'resist' : kind === 'L' ? 'current' : 'voltage'})`}
            onChange={(nv) => setVals((o) => ({ ...o, [kind]: o[kind].map((y, j) => (j === k ? nv : y)) }))} format={(y) => `${y} ${u}`} />
        ))}
      </Controls>
    </>
  )
}
