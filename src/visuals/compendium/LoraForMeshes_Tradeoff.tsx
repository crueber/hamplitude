import { C, Diagram, Ln, T } from '../kit'

// The nine general-purpose presets from the Meshtastic radio-settings page: [name, data rate kbps, link budget dB, bandwidth kHz]
const PRESETS: [string, number, number, number][] = [
  ['Long Moderate', 0.34, 156, 125],
  ['Long Fast', 1.07, 153, 250],
  ['Long Turbo', 1.34, 150, 500],
  ['Medium Slow', 1.95, 150.5, 250],
  ['Medium Fast', 3.52, 148, 250],
  ['Short Slow', 6.25, 145.5, 250],
  ['Medium Turbo', 7.03, 145, 500],
  ['Short Fast', 10.94, 143, 250],
  ['Short Turbo', 21.88, 140, 500],
]
const LABELLED = new Set(['Long Moderate', 'Long Fast', 'Medium Slow', 'Medium Fast', 'Short Fast', 'Short Turbo'])
const COLOR: Record<number, string> = { 125: C.power, 250: C.signal, 500: C.resist }

const X0 = 70, X1 = 610, Y0 = 40, Y1 = 230
const LO = Math.log10(0.3), HI = Math.log10(25)
const px = (rate: number) => X0 + ((Math.log10(rate) - LO) / (HI - LO)) * (X1 - X0)
const py = (db: number) => Y1 - ((db - 138) / 20) * (Y1 - Y0)

/** Link budget against data rate for the Meshtastic presets: the radio trades speed for reach. */
export function LoraForMeshes_Tradeoff() {
  return (
    <Diagram w={640} h={310}
      title="Link budget in decibels against data rate in kilobits per second, for nine Meshtastic presets. The presets fall along a line: the slowest, Long Moderate at 0.34 kilobits per second, has the largest link budget at 156 decibels, and the fastest, Short Turbo at 21.88 kilobits per second, has the smallest at 140 decibels. Point color shows bandwidth: 125, 250 or 500 kilohertz."
      caption="Presets and figures are from the Meshtastic project (link budget assumes 22 dBm transmit power and a 0 dB antenna).">
      <Ln x1={X0} y1={Y1} x2={X1 + 10} y2={Y1} color={C.muted} width={1.5} />
      <Ln x1={X0} y1={Y1} x2={X0} y2={Y0 - 14} color={C.muted} width={1.5} />
      {[140, 145, 150, 155].map((v) => (
        <g key={v}>
          <line x1={X0} y1={py(v)} x2={X1} y2={py(v)} stroke={C.muted} strokeOpacity={0.2} />
          <T x={X0 - 8} y={py(v)} anchor="end" size={12} color={C.muted}>{v}</T>
        </g>
      ))}
      {[0.5, 1, 2, 5, 10, 20].map((v) => (
        <g key={v}>
          <line x1={px(v)} y1={Y1} x2={px(v)} y2={Y1 + 5} stroke={C.muted} />
          <T x={px(v)} y={Y1 + 18} anchor="middle" size={12} color={C.muted}>{v}</T>
        </g>
      ))}
      <T x={(X0 + X1) / 2} y={Y1 + 38} anchor="middle" size={13} bold>Data rate, kbps (log scale), faster to the right</T>
      <T x={X0 - 6} y={Y0 - 22} size={13} bold>Link budget, dB: more reach is up</T>
      {PRESETS.map(([name, rate, db, bw]) => {
        const x = px(rate), y = py(db)
        const label = LABELLED.has(name)
        const end = name === 'Short Turbo'
        return (
          <g key={name}>
            <circle cx={x} cy={y} r={7} fill={COLOR[bw]} fillOpacity={0.35} stroke={COLOR[bw]} strokeWidth={2.5} />
            {label && <T x={end ? x - 12 : x + 11} y={y - 12} anchor={end ? 'end' : 'start'} size={12.5} bold>{name}</T>}
          </g>
        )
      })}
      {[[125, 'Bandwidth 125 kHz', 120], [250, '250 kHz', 290], [500, '500 kHz', 390]].map(([bw, text, x]) => (
        <g key={bw}>
          <circle cx={Number(x)} cy={292} r={6} fill={COLOR[Number(bw)]} fillOpacity={0.35} stroke={COLOR[Number(bw)]} strokeWidth={2.5} />
          <T x={Number(x) + 12} y={292} size={12.5}>{text}</T>
        </g>
      ))}
    </Diagram>
  )
}
