import { C, Diagram, Ln, T } from '../kit'

/** Licence life: 10-year term, renew from 90 days before expiry, 2-year grace with no transmitting. */
export function T1C_Lifecycle() {
  const xs = { start: 20, win: 300, exp: 420, end: 620 }
  return (
    <Diagram w={640} h={265} title="License timeline: transmit once the grant is in the FCC database; the term is ten years; renewal may be requested up to 90 days before expiration; after expiration there is a two year grace period for renewing but you may not transmit until renewed" caption="Not to scale.">
      <T x={xs.start} y={22} bold size={14} color={C.good}>Grant appears in FCC database</T>
      <T x={xs.start} y={42} size={13} color={C.muted}>you may transmit from here</T>
      <rect x={xs.start} y={66} width={xs.exp - xs.start} height={34} rx={6} fill={C.good} fillOpacity={0.25} stroke={C.good} strokeWidth={2} />
      <T x={(xs.start + xs.exp) / 2} y={83} anchor="middle" bold size={14}>10-year term · transmit OK</T>
      <rect x={xs.exp} y={66} width={xs.end - xs.exp} height={34} rx={6} fill={C.bad} fillOpacity={0.2} stroke={C.bad} strokeWidth={2} />
      <T x={(xs.exp + xs.end) / 2} y={83} anchor="middle" bold size={14} color={C.bad}>NO transmitting</T>
      {[xs.win, xs.exp, xs.end].map((x) => <Ln key={x} x1={x} y1={100} x2={x} y2={116} color={C.ink} width={2.5} />)}
      <T x={xs.win} y={134} anchor="middle" bold size={13}>90 days before</T>
      <T x={xs.win} y={152} anchor="middle" size={13} color={C.muted}>renewal opens</T>
      <T x={xs.exp} y={134} anchor="middle" bold size={13}>Expires</T>
      <T x={xs.end} y={134} anchor="end" bold size={13}>2 years later</T>
      <T x={xs.end} y={152} anchor="end" size={13} color={C.muted}>grace ends</T>
      <rect x={xs.win} y={182} width={xs.end - xs.win} height={26} rx={6} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2} />
      <T x={(xs.win + xs.end) / 2} y={195} anchor="middle" bold size={13} color={C.signal}>renewal can be filed</T>
      <T x={320} y={238} anchor="middle" size={13} color={C.muted}>Grace period: you can still renew, but wait until it is granted to transmit.</T>
    </Diagram>
  )
}
