import { useState } from 'react'
import { C, Controls, Diagram, Slider, T } from '../kit'

/** Dashboard: SFI (the Sun), K (Earth's field, short term), A (Earth's field, long term). */
export function Indices() {
  const [sfi, setSfi] = useState(150)
  const [k, setK] = useState(1)
  const [a, setA] = useState(6)
  const storm = k >= 5
  const verdict = storm
    ? 'Geomagnetic storm: HF degraded, worst at high latitudes. Aurora may reflect VHF.'
    : sfi >= 120
      ? 'Quiet field and high flux: the higher HF bands should open.'
      : 'Quiet field but low flux: expect the lower HF bands to do the work.'
  const rows = [
    { y: 52, name: 'SFI', what: 'Solar flux at 10.7 cm', where: 'measures the Sun', frac: (sfi - 60) / 190, good: sfi >= 120, col: C.resist, hint: 'higher = higher bands open' },
    { y: 128, name: 'K index', what: 'Short-term stability', where: "of Earth's magnetic field", frac: k / 9, good: k < 5, col: C.current, hint: 'lower = calmer' },
    { y: 204, name: 'A index', what: 'Long-term stability', where: "of Earth's magnetic field", frac: a / 60, good: a < 30, col: C.current, hint: 'lower = calmer' },
  ]
  const bx = 190, bw = 250
  return (
    <>
      <Diagram w={640} h={300} title="Propagation dashboard: the solar flux index measures the Sun's 10.7 centimetre radio emission. The K index is the short-term and the A index the long-term stability of Earth's geomagnetic field."
        caption="SFI is about the Sun. K and A are about Earth's magnetic field. Good/poor cut-offs are rough rules of thumb, not official limits.">
        {rows.map((r) => (
          <g key={r.name}>
            <T x={14} y={r.y - 12} bold size={17}>{r.name}</T>
            <T x={14} y={r.y + 10} size={13} color={C.muted}>{r.what}</T>
            <T x={14} y={r.y + 28} size={13} color={C.muted}>{r.where}</T>
            <rect x={bx} y={r.y - 8} width={bw} height={20} rx={10} fill={C.fill2} stroke={C.muted} />
            <rect x={bx} y={r.y - 8} width={Math.max(20, bw * Math.min(1, Math.max(0, r.frac)))} height={20} rx={10} fill={r.col} fillOpacity={0.5} stroke={r.col} strokeWidth={2} />
            <T x={bx + 2} y={r.y + 34} size={12} color={C.muted}>{r.hint}</T>
            <circle cx={bx + bw + 50} cy={r.y + 2} r={12} fill={r.good ? C.good : C.bad} />
            <T x={bx + bw + 72} y={r.y + 2} size={13} bold color={r.good ? C.good : C.bad}>{r.good ? 'good' : 'poor'}</T>
          </g>
        ))}
        <rect x={14} y={258} width={612} height={34} rx={10} fill={C.fill} stroke={storm ? C.bad : C.good} strokeWidth={2} />
        <T x={26} y={275} size={13} bold color={storm ? C.bad : C.ink}>{verdict}</T>
      </Diagram>
      <Controls>
        <Slider label="Solar flux index (SFI)" value={sfi} min={60} max={250} step={5} onChange={setSfi} color="var(--d-resist)" />
        <Slider label="K index (0 to 9)" value={k} min={0} max={9} onChange={setK} color="var(--d-current)" />
        <Slider label="A index" value={a} min={0} max={60} onChange={setA} color="var(--d-current)" />
      </Controls>
    </>
  )
}
