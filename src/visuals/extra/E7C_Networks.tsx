import { useState } from 'react'
import { C, Capacitor, Choice, Diagram, Dot, Ground, Inductor, Ln, T, Wire } from '../kit'

type El = { kind: 'series' | 'shunt'; part: 'L' | 'C'; v: number; label: string }
type Net = { name: string; blurb: string; els: El[]; type: 'low' | 'high' }

const NETS: Record<string, Net> = {
  pi: { name: 'Pi network (low-pass)', blurb: 'Capacitor to ground at input and output, inductor between.', type: 'low',
    els: [{ kind: 'shunt', part: 'C', v: 1, label: 'C' }, { kind: 'series', part: 'L', v: 2, label: 'L' }, { kind: 'shunt', part: 'C', v: 1, label: 'C' }] },
  pil: { name: 'Pi-L network (low-pass)', blurb: 'A Pi network plus one more inductor in series at the output.', type: 'low',
    els: [{ kind: 'shunt', part: 'C', v: 0.7654, label: 'C' }, { kind: 'series', part: 'L', v: 1.8478, label: 'L' }, { kind: 'shunt', part: 'C', v: 1.8478, label: 'C' }, { kind: 'series', part: 'L', v: 0.7654, label: 'L' }] },
  t: { name: 'T network (high-pass)', blurb: 'Series capacitors in the signal path, inductor to ground.', type: 'high',
    els: [{ kind: 'series', part: 'C', v: 1, label: 'C' }, { kind: 'shunt', part: 'L', v: 0.5, label: 'L' }, { kind: 'series', part: 'C', v: 1, label: 'C' }] },
}

type Z = [number, number]
const mul = (a: Z, b: Z): Z => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
const add = (a: Z, b: Z): Z => [a[0] + b[0], a[1] + b[1]]
const inv = (a: Z): Z => { const d = a[0] * a[0] + a[1] * a[1]; return [a[0] / d, -a[1] / d] }
type M = [Z, Z, Z, Z]
const mmul = (p: M, q: M): M => [add(mul(p[0], q[0]), mul(p[1], q[2])), add(mul(p[0], q[1]), mul(p[1], q[3])), add(mul(p[2], q[0]), mul(p[3], q[2])), add(mul(p[2], q[1]), mul(p[3], q[3]))]
/** Insertion loss in dB (always at or below 0) of a ladder between equal 1-ohm terminations, f normalised to the cutoff. */
function dB(els: El[], f: number): number {
  const w = f
  let m: M = [[1, 0], [0, 0], [0, 0], [1, 0]]
  for (const e of els) {
    const jwx: Z = [0, w * e.v]
    const imp: Z = e.part === 'L' ? jwx : inv(jwx) // impedance of L is jwL, of C is 1/(jwC)
    const cap: Z = e.part === 'C' ? jwx : inv(jwx) // admittance
    const el: M = e.kind === 'series' ? [[1, 0], [imp[0], imp[1]], [0, 0], [1, 0]] : [[1, 0], [0, 0], [cap[0], cap[1]], [1, 0]]
    m = mmul(m, el)
  }
  const den = add(add(m[0], m[1]), add(m[2], m[3]))
  return -20 * Math.log10(Math.hypot(den[0], den[1]) / 2)
}

/** Ladder networks: where the L and C sit decides low-pass or high-pass. Response computed from the circuit. */
export function Networks() {
  const [k, setK] = useState('pi')
  const net = NETS[k]
  const els = net.els
  const railY = 80, gndY = 190
  const n = els.length
  const x0 = 40, x1 = 330
  const pos = els.map((_, i) => x0 + 20 + ((i + 0.5) * (x1 - x0 - 40)) / n)
  // rail wire segments, broken around series parts
  const segs: [number, number][] = []
  let cur = x0
  els.forEach((e, i) => { if (e.kind === 'series') { segs.push([cur, pos[i] - 25]); cur = pos[i] + 25 } })
  segs.push([cur, x1])
  // response plot
  const px0 = 420, px1 = 622, py0 = 64, py1 = 190, fmax = 4, dmax = 50
  const PX = (f: number) => px0 + (f / fmax) * (px1 - px0)
  const PY = (d: number) => py0 + (Math.min(dmax, -d) / dmax) * (py1 - py0)
  const curve = (list: El[]) => Array.from({ length: 161 }, (_, i) => { const f = 0.02 + (i / 160) * (fmax - 0.02); return `${PX(f)},${PY(dB(list, f))}` }).join(' ')
  const f2 = 2
  const low = net.type === 'low'
  const a2 = dB(els, f2)
  const aPi = dB(NETS.pi.els, f2)
  return (
    <>
      <Diagram w={640} h={300} title={`${net.name}. ${net.blurb}`} caption={net.blurb}>
        <T x={x0} y={22} size={14} bold>{net.name}</T>
        <circle cx={x0 - 6} cy={railY} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <circle cx={x1 + 6} cy={railY} r={5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={x0 - 14} y={railY - 18} size={12} color={C.muted}>in</T>
        <T x={x1 - 4} y={railY - 18} size={12} color={C.muted}>out</T>
        {segs.map(([a, b], i) => <Wire key={i} pts={[[i === 0 ? a - 1 : a, railY], [i === segs.length - 1 ? b + 1 : b, railY]]} />)}
        <Wire pts={[[x0 - 1, gndY], [x1 + 1, gndY]]} />
        {els.map((e, i) => {
          const common = { color: C.signal, label: e.label } as const
          if (e.kind === 'series') {
            return e.part === 'L' ? <Inductor key={i} x={pos[i]} y={railY} len={50} {...common} /> : <Capacitor key={i} x={pos[i]} y={railY} len={50} {...common} />
          }
          return (
            <g key={i}>
              {e.part === 'L' ? <Inductor x={pos[i]} y={(railY + gndY) / 2} rot={90} len={gndY - railY} labelPos="below" {...common} /> : <Capacitor x={pos[i]} y={(railY + gndY) / 2} rot={90} len={gndY - railY} labelPos="below" {...common} />}
              <Dot x={pos[i]} y={railY} /><Dot x={pos[i]} y={gndY} />
            </g>
          )
        })}
        <Ground x={(x0 + x1) / 2} y={gndY} />
        {/* response */}
        <T x={(px0 + px1) / 2} y={22} anchor="middle" size={14} bold>Response (computed)</T>
        <rect x={px0 - 40} y={py0 - 22} width={px1 - px0 + 52} height={py1 - py0 + 62} rx={8} fill={C.fill} />
        <Ln x1={px0} y1={py1} x2={px1} y2={py1} color={C.muted} width={1.5} />
        <Ln x1={px0} y1={PY(0)} x2={px1} y2={PY(0)} color={C.fill2} width={1} dash="3 4" />
        {low && k === 'pil' && <polyline points={curve(NETS.pi.els)} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />}
        <polyline points={curve(els)} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <Ln x1={PX(1)} y1={py0 - 4} x2={PX(1)} y2={py1} color={C.fill2} width={1.5} dash="3 3" />
        <T x={PX(1)} y={py1 + 14} anchor="middle" size={12} color={C.muted}>cutoff</T>
        {low && <Ln x1={PX(f2)} y1={py0 - 4} x2={PX(f2)} y2={py1} color={C.resist} width={1.5} dash="3 3" />}
        {low && <T x={PX(f2) + 4} y={py0 - 10} size={12} color={C.resist}>2nd harmonic</T>}
        <T x={px0 - 8} y={PY(0)} anchor="end" size={12} color={C.muted}>0 dB</T>
        <T x={px0 - 30} y={py1 + 32} size={12} color={C.muted}>{low ? 'passes low, blocks high' : 'blocks low, passes high'}</T>
        <T x={20} y={250} size={13}>{low ? `At 2× cutoff (the 2nd harmonic): about ${Math.round(-a2)} dB${k === 'pil' ? ` (Pi alone: ${Math.round(-aPi)} dB)` : ''}.` : 'Series C and shunt L: low frequencies are blocked.'}</T>
        <T x={20} y={274} size={13} color={C.muted}>{low ? 'Illustrative Butterworth values, equal terminations. Real networks differ.' : 'Series L / shunt C pass low. Series C / shunt L pass high.'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Network" value={k} onChange={setK} options={[{ value: 'pi', label: 'Pi' }, { value: 'pil', label: 'Pi-L' }, { value: 't', label: 'T, series C' }]} />
      </div>
    </>
  )
}
