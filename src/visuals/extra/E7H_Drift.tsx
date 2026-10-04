import { C, Capacitor, Diagram, Ln, T, Wire } from '../kit'

/** Three ways a good oscillator goes wrong, and the fix for each. */
export function Drift() {
  const head = (x: number, n: string, t: string) => (
    <g>
      <T x={x + 100} y={20} anchor="middle" size={15} bold color={C.bad}>{n}</T>
      <T x={x + 100} y={40} anchor="middle" size={12.5} color={C.muted}>{t}</T>
    </g>
  )
  const fix = (x: number, t: string) => (
    <g>
      <rect x={x + 4} y={200} width={192} height={46} rx={10} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={x + 100} y={223} anchor="middle" size={13} bold color={C.good}>{t}</T>
    </g>
  )
  const spring = (x: number, y0: number, y1: number) => {
    const n = 5, a: string[] = [`M${x},${y0}`]
    for (let i = 0; i < n; i++) { const y = y0 + ((y1 - y0) * (i + 0.5)) / n; a.push(`L${x + (i % 2 ? -7 : 7)},${y}`) }
    a.push(`L${x},${y1}`)
    return <path d={a.join(' ')} fill="none" stroke={C.ink} strokeWidth={2.2} strokeLinejoin="round" />
  }
  // thermal plot
  const px = 224 + 20, pw = 150, py0 = 70, ph = 100
  const warm = `M${px},${py0 + ph * 0.75} L${px + pw},${py0 + ph * 0.1}`
  return (
    <Diagram w={640} h={262}
      title="Three oscillator stability problems and their fixes. Microphonics, frequency changes from mechanical vibration, are reduced by mechanically isolating the oscillator from its enclosure. Thermal drift is reduced with NP0 capacitors, whose value barely changes with temperature. A crystal oscillates on its specified frequency only with the specified parallel capacitance."
      caption="Know the problem, then the fix.">
      {head(10, 'Microphonics', 'vibration moves the frequency')}
      <rect x={52} y={62} width={116} height={112} rx={10} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 4" />
      <rect x={72} y={92} width={76} height={50} rx={8} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
      <T x={110} y={117} anchor="middle" size={12.5} bold color={C.signal}>oscillator</T>
      {spring(62, 62, 92)}
      {spring(158, 62, 92)}
      {spring(62, 142, 174)}
      {spring(158, 142, 174)}
      <T x={110} y={188} anchor="middle" size={12} color={C.muted}>enclosure</T>
      {fix(10, 'isolate it mechanically')}
      {head(220, 'Thermal drift', 'heat moves the frequency')}
      <Ln x1={px} y1={py0 + ph} x2={px + pw} y2={py0 + ph} color={C.muted} width={2} />
      <Ln x1={px} y1={py0} x2={px} y2={py0 + ph} color={C.muted} width={2} />
      <path d={warm} fill="none" stroke={C.bad} strokeWidth={3} />
      <Ln x1={px} y1={py0 + ph * 0.5} x2={px + pw} y2={py0 + ph * 0.5} color={C.good} width={3.5} />
      <T x={px + pw} y={py0 + ph * 0.5 + 16} anchor="end" size={12.5} bold color={C.good}>NP0: stays put</T>
      <T x={px + pw - 4} y={py0 - 4} anchor="end" size={12.5} bold color={C.bad}>other types</T>
      <T x={px + pw} y={py0 + ph + 16} anchor="end" size={12} color={C.muted}>temperature →</T>
      <T x={px - 6} y={py0 + ph / 2} anchor="end" size={12} color={C.muted}>C value</T>
      {fix(220, 'use NP0 capacitors')}
      {head(430, 'Crystal frequency', 'must see its rated load')}
      <Wire pts={[[470, 100], [500, 100]]} />
      <Wire pts={[[560, 100], [590, 100]]} />
      <rect x={512} y={88} width={36} height={24} fill={C.fill} stroke={C.ink} strokeWidth={2.2} />
      <line x1={500} y1={82} x2={500} y2={118} stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={560} y1={82} x2={560} y2={118} stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
      <T x={530} y={72} anchor="middle" size={12} color={C.muted}>crystal</T>
      <Wire pts={[[470, 100], [470, 156], [510, 156]]} />
      <Wire pts={[[550, 156], [590, 156], [590, 100]]} />
      <Capacitor x={530} y={156} len={40} color={C.resist} />
      <T x={530} y={184} anchor="middle" size={12.5} bold color={C.resist}>parallel C</T>
      {fix(430, 'specified parallel C')}
    </Diagram>
  )
}
