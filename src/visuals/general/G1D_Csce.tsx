import { C, Diagram, Ln, T } from '../kit'

/** After passing General: CSCE valid 365 days; use General privileges right away, ID with AG until the database shows the upgrade. */
export function G1D_Csce() {
  const x0 = 40
  const x1 = 600
  return (
    <Diagram w={640} h={250} title="After you pass the General exam, the CSCE is valid for 365 days of element credit. A Technician holding a valid CSCE may use any General or Technician segment, adding AG after the call sign until the FCC database shows the upgrade" caption="Timeline after passing the General exam (not to scale).">
      <Ln x1={x0} y1={100} x2={x1} y2={100} color={C.muted} width={3} />
      <circle cx={x0} cy={100} r={9} fill={C.signal} />
      <T x={x0} y={72} bold size={14}>Pass exam</T>
      <T x={x0} y={46} size={13} color={C.muted}>CSCE issued</T>
      <rect x={x0} y={122} width={250} height={36} rx={6} fill={C.resist} fillOpacity={0.25} stroke={C.resist} strokeWidth={2} />
      <T x={x0 + 125} y={140} anchor="middle" bold size={13}>General segments OK, ID "AG"</T>
      <circle cx={x0 + 250} cy={100} r={9} fill={C.good} />
      <T x={x0 + 250} y={72} anchor="middle" bold size={14}>Database shows General</T>
      <T x={x0 + 250} y={46} anchor="middle" size={13} color={C.muted}>FCC upgrade posted</T>
      <rect x={x0 + 250} y={122} width={310} height={36} rx={6} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={2} />
      <T x={x0 + 405} y={140} anchor="middle" bold size={13}>No more "AG" needed</T>
      <circle cx={x1} cy={100} r={9} fill={C.bad} />
      <T x={x1} y={72} anchor="end" bold size={14}>CSCE expires</T>
      <T x={x1} y={46} anchor="end" size={13} color={C.muted}>365 days</T>
      <Ln x1={x0} y1={190} x2={x1} y2={190} color={C.signal} width={2} arrow="both" />
      <T x={320} y={214} anchor="middle" size={14} bold color={C.signal}>CSCE gives exam element credit for 365 days</T>
    </Diagram>
  )
}
