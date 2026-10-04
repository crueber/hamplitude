import { C, Box, Diagram, Ln, T, TAU } from '../kit'

/** AC mains -> transformer -> rectifier -> filter -> regulator, with the waveform after each stage. */
export function PowerSupply() {
  const W = 116, GAP = 14, ZERO = 190, PW = 96, STEPS = 120
  // waveform generators: return y offset (up positive) over x in [0, 1)
  const cycles = 3
  const sine = (a: number) => (u: number) => a * Math.sin(TAU * cycles * u)
  const half = (a: number) => (u: number) => Math.max(0, a * Math.sin(TAU * cycles * u))
  const filtered = (a: number) => {
    let v = 0
    const out: number[] = []
    for (let i = 0; i <= STEPS; i++) {
      const r = Math.max(0, a * Math.sin((TAU * cycles * i) / STEPS))
      v = Math.max(r, v * 0.93)
      out.push(v)
    }
    return (u: number) => out[Math.round(u * STEPS)]
  }
  const flat = (a: number) => () => a
  const stages = [
    { name: 'AC mains', sub: '120 V AC', f: sine(44), note: 'big AC swing' },
    { name: 'Transformer', sub: 'steps AC down', f: sine(24), note: 'smaller AC' },
    { name: 'Rectifier', sub: 'AC to DC', f: half(24), note: 'pulsating DC' },
    { name: 'Filter', sub: 'smooths', f: filtered(24), note: 'smoothed DC' },
    { name: 'Regulator', sub: 'holds steady', f: flat(18), note: 'steady DC' },
  ]
  return (
    <Diagram w={660} h={300} title="Power supply chain. 120 volt AC goes through a transformer for lower AC, a rectifier for pulsating DC, a filter to smooth it, and a regulator to hold the voltage steady."
      caption="Rectifier: AC to DC. Regulator: steady voltage. Transformer: change the AC voltage.">
      {stages.map((s, i) => {
        const x = 6 + i * (W + GAP)
        const pts = Array.from({ length: STEPS + 1 }, (_, k) => `${(x + 8 + (PW * k) / STEPS).toFixed(1)},${(ZERO - s.f(k / STEPS)).toFixed(1)}`).join(' ')
        return (
          <g key={s.name}>
            <Box x={x} y={16} w={W} h={62} label={s.name} sub={s.sub} size={14} color={i === 0 ? C.muted : i === 2 ? C.power : i === 4 ? C.good : C.ink} />
            {i > 0 && <Ln x1={x - GAP + 1} y1={47} x2={x - 1} y2={47} color={C.muted} width={2} arrow />}
            <rect x={x} y={110} width={W} height={150} rx={10} fill={C.fill} />
            <line x1={x + 6} y1={ZERO} x2={x + W - 6} y2={ZERO} stroke={C.fill2} strokeWidth={2} />
            <polyline points={pts} fill="none" stroke={C.signal} strokeWidth={2.8} strokeLinejoin="round" />
            <T x={x + W / 2} y={278} anchor="middle" size={13} bold color={C.muted}>{s.note}</T>
          </g>
        )
      })}
      <T x={14} y={126} size={12} color={C.muted}>zero line</T>
    </Diagram>
  )
}
