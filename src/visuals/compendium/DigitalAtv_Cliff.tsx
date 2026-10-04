import { C, Diagram, Ln, T } from '../kit'

const X0 = 70, X1 = 610, Y0 = 30, Y1 = 220

/** Analog degrades gradually; digital is perfect until it falls off a cliff. Schematic, not measured. */
export function DigitalAtv_Cliff() {
  const x = (t: number) => X0 + t * (X1 - X0)
  const y = (q: number) => Y1 - q * (Y1 - Y0)
  const analog = Array.from({ length: 41 }, (_, i) => { const t = i / 40; return `${x(t)},${y(Math.pow(t, 0.9) * 0.95)}` }).join(' ')
  const digital = Array.from({ length: 81 }, (_, i) => { const t = i / 80; const q = t < 0.45 ? 0.0 : 0.98 / (1 + Math.exp(-(t - 0.45) * 90)); return `${x(t)},${y(q)}` }).join(' ')
  return (
    <Diagram w={640} h={282} title="Picture quality against received signal strength. Analog television improves gradually from a snowy picture to a clean one. Digital television is no picture at all below a threshold, then suddenly perfect, with error correction hiding noise above it"
      caption="Schematic, not measured. Digital trades graceful decay for a cleaner picture above the threshold.">
      <Ln x1={X0} y1={Y1} x2={X1} y2={Y1} color={C.muted} width={2} />
      <Ln x1={X0} y1={Y0 - 10} x2={X0} y2={Y1} color={C.muted} width={2} />
      <T x={X0} y={14} size={13} bold color={C.muted}>Picture quality ↑</T>
      <T x={X1} y={Y1 + 22} size={13} bold color={C.muted} anchor="end">Received signal strength →</T>
      <T x={X0 - 8} y={y(0.95)} size={12.5} anchor="end" color={C.muted}>clean</T>
      <T x={X0 - 8} y={y(0.05)} size={12.5} anchor="end" color={C.muted}>none</T>
      <polyline points={analog} fill="none" stroke={C.resist} strokeWidth={3.5} strokeLinejoin="round" />
      <polyline points={digital} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinejoin="round" />
      <T x={x(0.62)} y={y(0.45)} size={14} bold color={C.resist}>Analog: snow, then clearer</T>
      <T x={x(0.52)} y={y(1.0) - 10} size={14} bold color={C.power}>Digital (DVB): clean, with error correction</T>
      <Ln x1={x(0.45)} y1={y(0)} x2={x(0.45)} y2={y(0.5)} color={C.bad} width={1.5} dash="4 4" />
      <T x={x(0.45) - 6} y={y(0.12)} size={12.5} bold color={C.bad} anchor="end">cliff</T>
      <T x={14} y={264} size={13} color={C.muted}>Weak analog is watchable, weak digital is blocky, frozen or gone.</T>
    </Diagram>
  )
}
