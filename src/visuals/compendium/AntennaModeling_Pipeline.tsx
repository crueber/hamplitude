import { C, Diagram, Ln, T } from '../kit'

const N = 11 // segments in the example wire (about 10 per half wavelength is the usual minimum)

/** Modeling workflow: describe wires in segments, solve for each segment's current (method of moments), read the results. */
export function AntennaModeling_Pipeline() {
  const seg = (x0: number, x1: number, i: number) => x0 + ((x1 - x0) * i) / N
  const bars = Array.from({ length: N }, (_, i) => Math.sin((Math.PI * (i + 0.5)) / N))
  const px = 534, py = 128, pr = 44
  const eight: string[] = []
  for (let a = 1; a <= 359; a += 2) {
    const sn = Math.abs(Math.sin((a * Math.PI) / 180))
    const r = (pr * 1.15 * Math.abs(Math.cos((Math.PI / 2) * Math.cos((a * Math.PI) / 180)))) / Math.max(sn, 0.05)
    eight.push(`${a > 1 ? 'L' : 'M'}${(px + r * Math.cos((a * Math.PI) / 180)).toFixed(1)},${(py - r * Math.sin((a * Math.PI) / 180)).toFixed(1)}`)
  }
  return (
    <Diagram w={640} h={330} title="Antenna modeling in three steps: describe the wires as short segments plus ground and frequency; the solver computes the current in every segment; the results are pattern, gain, feed-point impedance and SWR"
      caption="The program is only as good as the description. Too few segments, or the wrong ground, gives answers that look precise and are not.">
      {[10, 224, 438].map((x, i) => (
        <rect key={i} x={x} y={14} width={192} height={252} rx={12} fill={C.fill} />
      ))}
      <Ln x1={204} y1={140} x2={222} y2={140} color={C.muted} width={2.5} arrow />
      <Ln x1={418} y1={140} x2={436} y2={140} color={C.muted} width={2.5} arrow />

      {/* 1 describe */}
      <T x={24} y={36} size={14} bold>1  Describe it</T>
      <Ln x1={26} y1={100} x2={194} y2={100} color={C.ink} width={5} />
      {Array.from({ length: N + 1 }, (_, i) => <Ln key={i} x1={seg(26, 194, i)} y1={92} x2={seg(26, 194, i)} y2={108} color={C.resist} width={2} />)}
      <circle cx={110} cy={100} r={6} fill={C.power} />
      <T x={110} y={78} size={12.5} anchor="middle" color={C.power} bold>source</T>
      <Ln x1={26} y1={196} x2={194} y2={196} color={C.muted} width={3} />
      <Ln x1={44} y1={104} x2={44} y2={192} color={C.muted} width={1.5} arrow="both" dash="4 4" />
      <T x={52} y={150} size={12.5} color={C.muted}>height</T>
      <T x={118} y={214} size={12.5} anchor="middle" color={C.muted}>ground type</T>
      <T x={118} y={238} size={12.5} anchor="middle" color={C.muted}>wires cut into segments</T>
      <T x={118} y={256} size={12.5} anchor="middle" color={C.muted}>+ frequency</T>

      {/* 2 solve */}
      <T x={238} y={36} size={14} bold>2  Solve</T>
      <T x={238} y={56} size={12.5} color={C.muted}>method of moments</T>
      {bars.map((b, i) => {
        const bx = seg(240, 408, i)
        const bw = (408 - 240) / N - 3
        const bh = 84 * b
        return <rect key={i} x={bx + 1.5} y={156 - bh} width={bw} height={bh} fill={C.current} fillOpacity={0.8} />
      })}
      <Ln x1={240} y1={156} x2={408} y2={156} color={C.ink} width={3} />
      <T x={324} y={176} size={12.5} anchor="middle" color={C.muted}>current in each segment</T>
      <T x={324} y={214} size={12.5} anchor="middle" color={C.muted}>every segment affects</T>
      <T x={324} y={232} size={12.5} anchor="middle" color={C.muted}>every other, so the solver</T>
      <T x={324} y={250} size={12.5} anchor="middle" color={C.muted}>finds them all together</T>

      {/* 3 results */}
      <T x={452} y={36} size={14} bold>3  Read results</T>
      <path d={eight.join('') + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={2.5} />
      <T x={534} y={196} size={12.5} anchor="middle" color={C.muted}>pattern and gain</T>
      <T x={534} y={216} size={12.5} anchor="middle" color={C.muted}>feed point R + jX</T>
      <T x={534} y={236} size={12.5} anchor="middle" color={C.muted}>SWR against frequency</T>
      <T x={534} y={256} size={12.5} anchor="middle" color={C.muted}>currents on the wires</T>

      <T x={320} y={296} size={13.5} anchor="middle" bold color={C.resist}>Common guideline: at least about 10 segments per half wavelength</T>
      <T x={320} y={316} size={12.5} anchor="middle" color={C.muted}>fewer can make the computed feed-point impedance wrong</T>
    </Diagram>
  )
}
