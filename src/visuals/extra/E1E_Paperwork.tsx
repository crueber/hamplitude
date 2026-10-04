import { C, Box, Diagram, Ln, T } from '../kit'

/** After the exam: pass or fail. */
export function E1E_Paperwork() {
  return (
    <Diagram w={640} h={350} title="After an exam: if the examinee does not pass, the VE team returns the application document to the examinee. If the examinee passes all elements needed, three VEs certify that the examinee is qualified and that they complied with the administering VE requirements, then the application document is submitted to the coordinating VEC according to the VEC's instructions." caption="The VE team does not issue the license; it submits the paperwork to the VEC.">
      <Box x={200} y={6} w={240} h={52} label="Exam graded" color={C.ink} />
      <Ln x1={270} y1={60} x2={140} y2={96} color={C.bad} width={2.5} arrow />
      <Ln x1={370} y1={60} x2={500} y2={96} color={C.good} width={2.5} arrow />
      <T x={170} y={68} anchor="end" size={14} bold color={C.bad}>fail</T>
      <T x={470} y={68} size={14} bold color={C.good}>pass</T>
      <Box x={20} y={100} w={240} h={70} label="Return the application" sub="to the examinee" color={C.bad} />
      <Box x={380} y={100} w={240} h={70} label="Three VEs certify" sub="qualified + rules followed" color={C.good} />
      <Ln x1={500} y1={172} x2={500} y2={202} color={C.good} width={2.5} arrow />
      <Box x={380} y={206} w={240} h={70} label="Submit to the VEC" sub="per the VEC's instructions" color={C.power} />
      <T x={620} y={304} anchor="end" size={13} color={C.muted}>not to the FCC directly, not back to the examinee</T>
      <T x={620} y={326} anchor="end" size={13} color={C.muted}>and the team does not issue the license</T>
    </Diagram>
  )
}
