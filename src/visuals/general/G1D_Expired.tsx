import { C, Diagram, Ln, T } from '../kit'

/** An expired license: renew in the grace period; after it, prove the old grant and pass Element 2. */
export function G1D_Expired() {
  return (
    <Diagram w={640} h={240} title="A license expires, then there is a two-year grace period. After the grace period, a former licensee must show proof of the expired grant and pass the current Element 2 exam. Anyone who can show they once held a General, Advanced or Amateur Extra license that was not revoked can get partial exam credit" caption="Timeline, not to scale.">
      <Ln x1={30} y1={80} x2={610} y2={80} color={C.muted} width={3} />
      <circle cx={30} cy={80} r={9} fill={C.signal} />
      <T x={30} y={52} bold size={14}>Licensed</T>
      <circle cx={210} cy={80} r={9} fill={C.resist} />
      <T x={210} y={52} anchor="middle" bold size={14}>License expires</T>
      <rect x={210} y={98} width={200} height={34} rx={6} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={2} />
      <T x={310} y={115} anchor="middle" size={13} bold>2-year grace period</T>
      <circle cx={410} cy={80} r={9} fill={C.bad} />
      <T x={410} y={52} anchor="middle" bold size={14}>Grace ends</T>
      <rect x={410} y={98} width={200} height={34} rx={6} fill={C.power} fillOpacity={0.2} stroke={C.power} strokeWidth={2} />
      <T x={510} y={115} anchor="middle" size={13} bold>re-qualify</T>
      <rect x={6} y={156} width={628} height={76} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={320} y={178} anchor="middle" size={14} bold>After grace: show proof of the expired grant</T>
      <T x={320} y={200} anchor="middle" size={14} bold>and pass the current Element 2 exam</T>
      <T x={320} y={221} anchor="middle" size={12.5} color={C.muted}>Partial credit: anyone who once held General, Advanced or Extra (not revoked)</T>
    </Diagram>
  )
}
