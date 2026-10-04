import { C, Diagram, Ln, T } from '../kit'

/** Noise hunting in two views: bearings from two spots cross at the pole, and arc noise is strongest on the lower frequencies. */
export function PowerLineNoise_Hunt() {
  const pole = { x: 250, y: 120 }
  const A = { x: 70, y: 232 }
  const B = { x: 420, y: 232 }
  const poles = [70, 160, 250, 340, 430].map((x) => ({ x, y: 120 }))
  // arc-noise level against frequency: a falling curve on a log axis
  const gx0 = 470, gx1 = 622, gy0 = 80, gy1 = 220
  const lx = (f: number) => gx0 + ((Math.log10(f) - Math.log10(1)) / (Math.log10(1000) - 0)) * (gx1 - gx0)
  const ly = (f: number) => gy0 + ((Math.log10(f)) / 3) * (gy1 - gy0) * 0.9
  const curve = Array.from({ length: 31 }, (_, i) => {
    const f = Math.pow(10, (i * 3) / 30)
    return `${i ? 'L' : 'M'}${lx(f).toFixed(1)},${ly(f).toFixed(1)}`
  }).join('')
  return (
    <Diagram w={640} h={300} title="Left: a street seen from above. Bearings taken with a directional antenna from two positions cross at the pole where the noise starts. Right: noise from an arc is strongest at low frequencies and falls with frequency, so a medium-wave radio finds the area and a VHF or UHF receiver with a directional antenna pinpoints the pole."
      caption="Take bearings from two or more spots. Use a low frequency to find the area, a higher one to pinpoint.">
      <T x={14} y={20} size={13} bold color={C.muted}>Plan view</T>
      <rect x={14} y={150} width={440} height={34} rx={4} fill={C.fill2} fillOpacity={0.5} />
      <T x={30} y={167} size={12} color={C.muted}>street</T>
      <Ln x1={40} y1={120} x2={460} y2={120} color={C.muted} width={2} dash="2 4" />
      <T x={46} y={104} size={12} color={C.muted}>power line</T>
      {poles.map((p) => <circle key={p.x} cx={p.x} cy={p.y} r={4.5} fill={C.ink} />)}
      <circle cx={pole.x} cy={pole.y} r={22} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2.5} strokeDasharray="4 4" />
      <circle cx={pole.x} cy={pole.y} r={5.5} fill={C.bad} />
      <T x={pole.x} y={78} anchor="middle" size={13} bold color={C.bad}>noisy pole</T>
      <Ln x1={pole.x} y1={86} x2={pole.x} y2={pole.y - 28} color={C.bad} width={2} arrow />

      <Ln x1={A.x + 6} y1={A.y - 8} x2={pole.x - 12} y2={pole.y + 8} color={C.signal} width={3} dash="7 5" arrow />
      <Ln x1={B.x - 6} y1={B.y - 8} x2={pole.x + 12} y2={pole.y + 8} color={C.signal} width={3} dash="7 5" arrow />
      {[A, B].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={9} fill={C.bg} stroke={C.signal} strokeWidth={3} />
          <T x={p.x} y={p.y + 24} anchor="middle" size={12} bold color={C.signal}>{i === 0 ? 'bearing 1' : 'bearing 2'}</T>
        </g>
      ))}
      <T x={14} y={286} size={12} color={C.muted}>Stay well clear of the line and the pole. Never touch them.</T>

      <line x1={464} y1={30} x2={464} y2={288} stroke={C.fill2} strokeWidth={1.5} />
      <T x={478} y={20} size={13} bold color={C.muted}>Arc noise level</T>
      <Ln x1={gx0} y1={gy1 + 6} x2={gx1} y2={gy1 + 6} color={C.muted} width={1.5} arrow />
      <Ln x1={gx0} y1={gy1 + 6} x2={gx0} y2={gy0 - 10} color={C.muted} width={1.5} arrow />
      <path d={curve} fill="none" stroke={C.bad} strokeWidth={3.5} strokeLinecap="round" />
      <T x={gx1} y={gy1 + 24} anchor="end" size={12} color={C.muted}>frequency</T>
      <circle cx={lx(1.2)} cy={ly(1.2)} r={5} fill={C.bg} stroke={C.signal} strokeWidth={3} />
      <T x={lx(1.2) + 30} y={ly(1.2) - 14} size={12} bold color={C.signal}>AM radio</T>
      <T x={lx(1.2) + 30} y={ly(1.2) + 2} size={12} color={C.muted}>finds the area</T>
      <circle cx={lx(200)} cy={ly(200)} r={5} fill={C.bg} stroke={C.signal} strokeWidth={3} />
      <T x={lx(200) - 10} y={ly(200) + 16} anchor="end" size={12} bold color={C.signal}>VHF/UHF + beam</T>
      <T x={lx(200) - 10} y={ly(200) + 32} anchor="end" size={12} color={C.muted}>pinpoints</T>
    </Diagram>
  )
}
