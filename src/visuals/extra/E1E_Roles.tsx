import { C, Box, Diagram, Ln, T } from '../kit'

/** FCC > VEC > VE team. */
export function E1E_Roles() {
  return (
    <Diagram w={640} h={330} title="The FCC has an agreement with Volunteer Examiner Coordinators, who maintain the question pools and confirm that applicants meet the requirements to be accredited as Volunteer Examiners. VEs administer the exams. VEs and VECs may be reimbursed for out-of-pocket expenses of preparing, processing, administering and coordinating an exam, not for teaching or training materials." caption="Authority flows down: FCC to VEC to VE. The VEC accredits and keeps the pools.">
      <Box x={40} y={8} w={240} h={56} label="FCC" sub="agreement with each VEC" color={C.ink} />
      <Ln x1={160} y1={66} x2={160} y2={96} color={C.signal} width={2.5} arrow />
      <Box x={40} y={100} w={240} h={80} label="VEC" sub="Volunteer Examiner Coordinator" color={C.power} />
      <T x={294} y={126} size={13} bold color={C.power}>maintains the question pools</T>
      <T x={294} y={148} size={13} bold color={C.power}>confirms a VE meets FCC rules</T>
      <Ln x1={160} y1={182} x2={160} y2={212} color={C.signal} width={2.5} arrow />
      <Box x={40} y={216} w={240} h={56} label="VE team" sub="administers the exam" color={C.signal} />
      <rect x={6} y={286} width={628} height={38} rx={10} fill={C.good} fillOpacity={0.12} stroke={C.good} strokeWidth={2} />
      <T x={20} y={305} size={13.5}><tspan fontWeight={700}>Reimbursed:</tspan> preparing, processing, administering, coordinating. <tspan fontWeight={700}>Not:</tspan> teaching or materials.</T>
    </Diagram>
  )
}
