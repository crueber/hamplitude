import { C, Diagram, Ln, T } from '../kit'

const sw = (k: number, narrow: boolean) => {
  const s = Math.min(4, 1 + (narrow ? 42 : 7) * k * k)
  return 230 - ((s - 1) / 3) * 150
}

/** A shortened mobile whip: loading coil and capacitance hat add electrical length; corona ball calms the tip; the price is bandwidth. */
export function Whip() {
  const gx = 400, gw = 230
  const curve = (narrow: boolean) =>
    Array.from({ length: 81 }, (_, i) => {
      const k = (i / 80) * 2 - 1
      return `${i ? 'L' : 'M'}${(gx + ((k + 1) / 2) * gw).toFixed(1)},${sw(k, narrow).toFixed(1)}`
    }).join('')
  const y2 = 230 - (1 / 3) * 150
  return (
    <Diagram w={640} h={304} title="Left: a short mobile whip with a loading coil, a capacitance hat near the top that makes it electrically longer, and a corona ball on the tip that reduces RF voltage discharge. Right: SWR versus frequency: the shortened antenna has a much narrower usable bandwidth than a full-size one."
      caption="A short antenna works, but over a narrow band.">
      {/* vehicle mount */}
      <rect x={30} y={250} width={140} height={14} rx={4} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      <Ln x1={100} y1={250} x2={100} y2={236} color={C.ink} width={3} />
      {/* coil */}
      <path d="M100,236 l-9,-5 l18,-8 l-18,-8 l18,-8 l-18,-8 l9,-5" fill="none" stroke={C.resist} strokeWidth={2.5} strokeLinejoin="round" />
      <Ln x1={100} y1={190} x2={100} y2={64} color={C.ink} width={3} />
      {/* hat */}
      <ellipse cx={100} cy={82} rx={30} ry={8} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2.5} />
      <circle cx={100} cy={52} r={7} fill={C.power} fillOpacity={0.4} stroke={C.power} strokeWidth={2.5} />
      <Ln x1={100} y1={64} x2={100} y2={59} color={C.ink} width={3} />
      <T x={116} y={46} size={12} bold color={C.power}>corona ball</T>
      <T x={116} y={62} size={12} color={C.muted}>stops RF discharge from the tip</T>
      <T x={140} y={98} size={12} bold color={C.signal}>capacitance hat</T>
      <T x={140} y={116} size={12} color={C.muted}>adds electrical length</T>
      <T x={116} y={196} size={12} bold color={C.resist}>loading coil</T>
      <T x={116} y={214} size={12} color={C.muted}>also adds length</T>
      {/* swr plot */}
      <Ln x1={gx} y1={230} x2={gx + gw} y2={230} color={C.muted} width={2} />
      <Ln x1={gx} y1={y2} x2={gx + gw} y2={y2} color={C.fill2} width={2} dash="5 5" />
      <T x={gx - 6} y={y2} anchor="end" size={12} color={C.muted}>2:1</T>
      <T x={gx - 6} y={230} anchor="end" size={12} color={C.muted}>1:1</T>
      <T x={gx + gw / 2} y={252} anchor="middle" size={12} color={C.muted}>frequency →</T>
      <T x={gx} y={64} size={12} color={C.muted}>SWR</T>
      <path d={curve(false)} fill="none" stroke={C.good} strokeWidth={3.5} />
      <path d={curve(true)} fill="none" stroke={C.bad} strokeWidth={3.5} />
      <T x={gx} y={278} size={12} bold color={C.good}>━ full-size: wide</T>
      <T x={gx + 110} y={278} size={12} bold color={C.bad}>━ shortened: narrow</T>
    </Diagram>
  )
}
