import { C, Diagram, Ln, T } from '../kit'

const X0 = 70, X1 = 600, Y0 = 250, Y1 = 40
const px = (v: number) => X0 + (v / 1.0) * (X1 - X0)
const py = (i: number) => Y0 - i * (Y0 - Y1)
const curve = (vth: number) => {
  const top = vth + 0.16
  const pts: string[] = []
  for (let k = 0; k <= 100; k++) {
    const v = k / 100
    const i = Math.min(1, Math.exp((v - top) / 0.055))
    pts.push(`${px(v).toFixed(1)},${py(i).toFixed(1)}`)
  }
  return pts.join(' ')
}

/** Forward current vs voltage: nothing flows until the threshold, then current shoots up. */
export function DiodeKnee() {
  const items = [
    { v: 0.3, name: 'Germanium', label: '0.3 V', col: C.power },
    { v: 0.7, name: 'Silicon', label: '0.7 V', col: C.signal },
  ]
  return (
    <Diagram w={640} h={310} title="Forward current against forward voltage for two diodes. A germanium diode starts conducting at about 0.3 volts, a silicon diode at about 0.7 volts. Below the threshold almost no current flows."
      caption="Below its threshold a diode is nearly off. Above it, current rises steeply.">
      <Ln x1={X0} y1={Y0} x2={X1 + 14} y2={Y0} color={C.muted} arrow />
      <Ln x1={X0} y1={Y0} x2={X0} y2={Y1 - 14} color={C.muted} arrow />
      <T x={X1 + 14} y={Y0 + 22} anchor="end" size={13} color={C.muted}>forward voltage</T>
      <T x={X0 + 10} y={24} anchor="start" size={13} color={C.muted}>current</T>
      {items.map((d) => (
        <g key={d.name}>
          <Ln x1={px(d.v)} y1={Y0} x2={px(d.v)} y2={py(0.62)} color={d.col} width={2} dash="5 5" />
          <polyline points={curve(d.v)} fill="none" stroke={d.col} strokeWidth={3.2} strokeLinejoin="round" />
          <circle cx={px(d.v)} cy={Y0} r={5} fill={d.col} />
          <T x={px(d.v)} y={Y0 + 20} anchor="middle" bold size={15} color={d.col}>{d.label}</T>
          <T x={px(d.v) - 12} y={py(0.55)} anchor="end" bold size={14} color={d.col}>{d.name}</T>
        </g>
      ))}
      <T x={px(0.15)} y={Y0 - 16} anchor="middle" size={12} color={C.muted}>almost no current</T>
    </Diagram>
  )
}
