import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, sinePath } from '../kit'

const FS = 10 // sample rate, kS/s
/** A digital scope only sees samples. Too few per cycle and a false low-frequency wave appears. */
export function Aliasing() {
  const [f, setF] = useState(9)
  const x0 = 30, x1 = 610, cy = 100, amp = 56, win = 2 // ms
  const k = Math.round(f / FS)
  const fa = f - k * FS // signed alias
  const aliased = f > FS / 2
  const X = (t: number) => x0 + (t / win) * (x1 - x0)
  const pts = Array.from({ length: 21 }, (_, n) => {
    const t = (n / FS) // ms
    return { x: X(t), y: cy - amp * Math.sin(2 * Math.PI * f * t) }
  })
  const col = aliased ? C.bad : C.signal
  return (
    <>
      <Diagram w={640} h={236} title={`A ${f} kilohertz signal sampled at ${FS} kilosamples per second. ${aliased ? `Too few samples per cycle: the scope displays a false ${Math.abs(fa)} kilohertz wave.` : 'Enough samples per cycle: the displayed wave matches.'}`}
        caption="Dots are what the converter captures. The display connects the dots, whatever the real signal did in between.">
        <rect x={x0 - 10} y={26} width={x1 - x0 + 20} height={150} rx={8} fill={C.fill} />
        <path d={sinePath(x0, x1, cy, amp, f * win, 0, 900)} fill="none" stroke={C.muted} strokeWidth={1.2} opacity={0.7} />
        <path d={sinePath(x0, x1, cy, amp, Math.abs(fa) * win, fa < 0 ? Math.PI : 0, 400)} fill="none" stroke={col} strokeWidth={3} />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4.5} fill={C.ink} stroke={C.bg} strokeWidth={1.5} />)}
        <T x={x0} y={196} size={13} color={C.muted}>thin grey = real signal</T>
        <T x={x0} y={216} size={13} bold color={col}>{aliased ? 'thick red = what the scope shows (false, low frequency)' : 'thick teal = what the scope shows (correct)'}</T>
        <T x={x1} y={196} anchor="end" size={13} mono color={C.muted}>{FS} kS/s sample rate</T>
        <T x={x1} y={216} anchor="end" size={13} mono bold color={col}>{aliased ? `shown: ${Math.abs(fa)} kHz` : `shown: ${f} kHz`}</T>
      </Diagram>
      <Controls>
        <Slider label="Signal frequency" value={f} min={1} max={19} step={0.5} onChange={setF} format={(v) => `${v} kHz`} color="var(--d-signal)" />
        <Readout label="Display" value={aliased ? 'aliased' : 'accurate'} color={col} />
      </Controls>
    </>
  )
}
