import { C, Diagram, Ln, T } from '../kit'

const F0 = 0.3, F1 = 3000
const X = (f: number) => 30 + (Math.log(f / F0) / Math.log(F1 / F0)) * 580

/** Which frequencies the FCC limits are most restrictive, and where separate E and H limits apply. */
export function MpeBand() {
  const segs = [{ a: 0.3, b: 3, n: '300 kHz – 3 MHz' }, { a: 3, b: 30, n: '3 – 30 MHz' }, { a: 30, b: 300, n: '30 – 300 MHz' }, { a: 300, b: 3000, n: '300 – 3000 MHz' }]
  return (
    <Diagram w={640} h={250} title="The FCC human exposure limits are most restrictive from 30 to 300 megahertz. Below 300 megahertz, separate electric-field and magnetic-field limits apply"
      caption="Frequency on a log scale. The body absorbs RF most readily from 30 to 300 MHz.">
      {segs.map((s, i) => {
        const hot = i === 2
        const col = hot ? C.bad : C.muted
        return (
          <g key={s.n}>
            <rect x={X(s.a)} y={92} width={X(s.b) - X(s.a)} height={56} fill={col} fillOpacity={hot ? 0.28 : 0.1} stroke={col} strokeWidth={hot ? 3 : 1.5} />
            <T x={(X(s.a) + X(s.b)) / 2} y={120} anchor="middle" size={13} bold color={hot ? C.bad : C.ink}>{s.n}</T>
          </g>
        )
      })}
      <T x={(X(30) + X(300)) / 2} y={172} anchor="middle" size={14} bold color={C.bad}>most restrictive</T>
      <Ln x1={X(0.3)} y1={64} x2={X(300)} y2={64} color={C.power} width={3} arrow="both" />
      <T x={(X(0.3) + X(300)) / 2} y={44} anchor="middle" size={14} bold color={C.power}>below 300 MHz: separate E-field and H-field limits</T>
      <T x={X(0.3)} y={214} size={13} color={C.muted}>lower frequency</T>
      <T x={X(3000)} y={214} anchor="end" size={13} color={C.muted}>higher frequency</T>
    </Diagram>
  )
}
