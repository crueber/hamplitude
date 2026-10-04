import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Resistor, Battery, Slider, T, Wire, Dot, fmt } from '../kit'

const RS = [12, 6, 4]
const XS = [210, 350, 490]

/** Parallel branches each see the full voltage. Each draws E ÷ R, and the supply must deliver the sum. */
export function G5B_ParallelCurrents() {
  const [n, setN] = useState(2)
  const [e, setE] = useState(12)
  const rs = RS.slice(0, n)
  const is = rs.map((r) => e / r)
  const tot = is.reduce((a, b) => a + b, 0)
  const lastX = XS[n - 1]
  return (
    <>
      <Diagram w={640} h={300}
        title={`A ${e} volt source feeds ${n} parallel resistor branch${n > 1 ? 'es' : ''}. Branch currents are ${is.map((i) => fmt(i)).join(', ')} amperes. The total current is their sum, ${fmt(tot)} amperes.`}
        caption="Each branch takes its own current. The source supplies all of them added up.">
        <Wire pts={[[70, 70], [lastX, 70]]} color={C.muted} width={2.5} />
        <Wire pts={[[70, 240], [lastX, 240]]} color={C.muted} width={2.5} />
        <Wire pts={[[70, 70], [70, 120]]} color={C.muted} width={2.5} />
        <Wire pts={[[70, 190], [70, 240]]} color={C.muted} width={2.5} />
        <Battery x={70} y={155} rot={90} len={70} color={C.voltage} />
        <T x={44} y={155} anchor="end" bold size={14} color={C.voltage}>{e} V</T>
        <Ln x1={100} y1={70} x2={160} y2={70} color={C.current} width={3} arrow />
        <T x={130} y={50} anchor="middle" bold size={14} color={C.current}>total {fmt(tot)} A</T>
        {rs.map((r, k) => (
          <g key={k}>
            <Wire pts={[[XS[k], 70], [XS[k], 110]]} color={C.muted} width={2.5} />
            <Wire pts={[[XS[k], 200], [XS[k], 240]]} color={C.muted} width={2.5} />
            <rect x={XS[k] - 14} y={112} width={28} height={86} fill={C.bg} />
            <Resistor x={XS[k]} y={155} rot={90} len={90} color={C.resist} />
            <T x={XS[k] + 24} y={142} size={14} bold color={C.resist}>{r} Ω</T>
            <T x={XS[k] + 24} y={166} size={14} bold color={C.current}>{fmt(is[k])} A</T>
            {k > 0 && <><Dot x={XS[k]} y={70} color={C.muted} /><Dot x={XS[k]} y={240} color={C.muted} /></>}
          </g>
        ))}
        <T x={320} y={278} anchor="middle" bold size={16}>
          I total = {is.map((i) => fmt(i)).join(' + ')}{n > 1 ? ` = ${fmt(tot)} A` : ' A'}
        </T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Branches</span>
          <Choice label="Branches" value={n} onChange={setN} options={[1, 2, 3].map((v) => ({ value: v, label: String(v) }))} />
        </div>
        <Slider label="Source voltage" value={e} min={6} max={24} step={1} onChange={setE} format={(v) => `${v} V`} color="var(--d-voltage)" />
      </Controls>
    </>
  )
}
