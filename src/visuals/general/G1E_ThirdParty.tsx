import { C, Diagram, T } from '../kit'

/** Third-party rules the pool supports. */
export function G1E_ThirdParty() {
  return (
    <Diagram w={640} h={226} title="Third-party rules: a third party whose license was revoked and not reinstated is disqualified, but citizenship and language do not matter; messages to a third-party-agreement country must be about amateur radio, personal remarks or emergencies and disaster relief; third-party messages may go via remote control wherever third-party messages are permitted" caption="Third-party messages.">
      <rect x={6} y={6} width={202} height={214} rx={10} fill={C.fill} stroke={C.bad} strokeWidth={2} />
      <T x={107} y={28} anchor="middle" size={15} bold color={C.bad}>Disqualifies</T>
      <T x={107} y={64} anchor="middle" size={14} bold>License revoked,</T>
      <T x={107} y={84} anchor="middle" size={14} bold>not reinstated</T>
      <T x={107} y={126} anchor="middle" size={13} color={C.muted}>Does not disqualify:</T>
      <T x={107} y={148} anchor="middle" size={13}>non-US citizen</T>
      <T x={107} y={168} anchor="middle" size={13}>speaking another language</T>
      <rect x={219} y={6} width={202} height={214} rx={10} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={320} y={28} anchor="middle" size={15} bold color={C.good}>Agreement country</T>
      <T x={320} y={52} anchor="middle" size={13} color={C.muted}>message must be about:</T>
      <T x={320} y={88} anchor="middle" size={14} bold>amateur radio</T>
      <T x={320} y={116} anchor="middle" size={14} bold>or personal remarks</T>
      <T x={320} y={144} anchor="middle" size={14} bold>or emergencies and</T>
      <T x={320} y={164} anchor="middle" size={14} bold>disaster relief</T>
      <rect x={432} y={6} width={202} height={214} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={533} y={28} anchor="middle" size={15} bold color={C.signal}>Via remote control</T>
      <T x={533} y={80} anchor="middle" size={14} bold>Any time third-party</T>
      <T x={533} y={100} anchor="middle" size={14} bold>messages are allowed</T>
      <T x={533} y={140} anchor="middle" size={13} color={C.muted}>same rules as at</T>
      <T x={533} y={160} anchor="middle" size={13} color={C.muted}>the local station</T>
    </Diagram>
  )
}
