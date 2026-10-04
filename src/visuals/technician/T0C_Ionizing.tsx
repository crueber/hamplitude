import { C, Diagram, Ln, T } from '../kit'

const SEG = [
  { n: 'Radio, microwaves', w: 170, c: C.signal },
  { n: 'Infrared', w: 80, c: C.voltage },
  { n: 'Visible', w: 80, c: C.resist },
  { n: 'Ultraviolet', w: 90, c: C.power },
  { n: 'X-rays', w: 80, c: C.current },
  { n: 'Gamma', w: 80, c: C.bad },
]

/** The electromagnetic spectrum by photon energy. Radio sits at the harmless-to-DNA end. */
export function Ionizing() {
  const x0 = 30, y = 110
  let x = x0
  const bars = SEG.map((s) => { const r = { ...s, x }; x += s.w; return r })
  const cut = x0 + 170 + 80 + 80 // visible / ultraviolet boundary: ionizing starts in the UV
  return (
    <Diagram w={640} h={290} title="The electromagnetic spectrum by energy: radio waves are non-ionizing, so they cannot break chemical bonds or damage DNA. Ionizing radiation starts in the ultraviolet and continues through X-rays and gamma rays"
      caption="Radio waves have far too little energy per photon to ionize atoms. Their risk is heating.">
      {bars.map((b) => (
        <g key={b.n}>
          <rect x={b.x} y={y} width={b.w} height={50} fill={b.c} fillOpacity={0.22} stroke={b.c} strokeWidth={2} />
          <T x={b.x + b.w / 2} y={y + 25} anchor="middle" size={b.w > 100 ? 14 : 12} bold color={b.c}>{b.n}</T>
        </g>
      ))}
      <Ln x1={x0} y1={y + 74} x2={610} y2={y + 74} color={C.muted} width={2.5} arrow />
      <T x={x0} y={y + 92} size={13} color={C.muted}>lower energy</T>
      <T x={610} y={y + 92} anchor="end" size={13} color={C.muted}>higher energy</T>
      <Ln x1={cut} y1={y - 28} x2={cut} y2={y + 60} color={C.ink} width={2.5} dash="5 4" />
      <Ln x1={x0} y1={y - 22} x2={cut - 8} y2={y - 22} color={C.good} width={3} arrow="both" />
      <T x={(x0 + cut) / 2} y={y - 42} anchor="middle" size={15} bold color={C.good}>Non-ionizing</T>
      <T x={(x0 + cut) / 2} y={y - 62} anchor="middle" size={13} color={C.muted}>too little energy to ionize atoms</T>
      <Ln x1={cut + 8} y1={y - 22} x2={610} y2={y - 22} color={C.bad} width={3} arrow="both" />
      <T x={(cut + 610) / 2} y={y - 42} anchor="middle" size={15} bold color={C.bad}>Ionizing</T>
      <T x={(cut + 610) / 2} y={y - 62} anchor="middle" size={13} color={C.muted}>starts in the UV: can change cells</T>
      <rect x={90} y={236} width={460} height={36} rx={8} fill={C.fill} />
      <T x={320} y={254} anchor="middle" size={14} bold color={C.signal}>RF danger = heat (RF burns, tissue heating), not DNA damage</T>
    </Diagram>
  )
}
