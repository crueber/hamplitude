import { C, Box, Diagram, Ln, T } from '../kit'

/** Path from exam to transmitting: the FCC database entry is the proof. */
export function T1A_LicenseGrant() {
  const xs = [4, 162, 320, 478]
  const steps = [
    { label: 'Pass exam', sub: 'get a CSCE', color: C.ink },
    { label: 'FCC emails you', sub: 'link to your grant', color: C.ink },
    { label: 'Grant in ULS', sub: 'FCC database', color: C.good },
    { label: 'Transmit', sub: 'call sign is yours', color: C.signal },
  ]
  return (
    <Diagram w={640} h={150} title="After passing the exam the FCC emails a link to your license grant; the grant appearing in the FCC ULS database is the proof, and then you may transmit" caption="Not proof: the exam certificate or an email from the VEs or NCVEC.">
      {steps.map((s, i) => (
        <g key={s.label}>
          <Box x={xs[i]} y={30} w={130} h={76} label={s.label} sub={s.sub} color={s.color} fill={i === 2 ? C.fill2 : C.fill} size={14} />
          {i < 3 && <Ln x1={xs[i] + 130 + 2} y1={68} x2={xs[i + 1] - 2} y2={68} color={C.muted} width={2.5} arrow />}
        </g>
      ))}
      <T x={mid(xs[2])} y={128} anchor="middle" size={13} bold color={C.good}>this is the proof</T>
      <Ln x1={mid(xs[2])} y1={118} x2={mid(xs[2])} y2={108} color={C.good} width={2} arrow />
    </Diagram>
  )
}
const mid = (x: number) => x + 65
