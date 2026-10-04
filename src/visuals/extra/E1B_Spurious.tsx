import { C, Diagram, Ln, T } from '../kit'

/** A signal needs its necessary bandwidth; anything outside it that you could remove is spurious. */
export function E1B_Spurious() {
  return (
    <Diagram w={640} h={250} title="Spectrum of a transmission. The wanted signal occupies its necessary bandwidth; emissions outside that bandwidth which could be reduced or eliminated without affecting the information are spurious emissions. HF digital voice and slow-scan TV are allowed a 3 kilohertz bandwidth." caption="Spurious = outside the necessary bandwidth AND removable without hurting the message.">
      <Ln x1={20} y1={190} x2={620} y2={190} color={C.muted} width={2} />
      <rect x={250} y={50} width={140} height={140} fill={C.good} fillOpacity={0.12} />
      <rect x={250} y={74} width={140} height={116} rx={4} fill={C.signal} fillOpacity={0.4} stroke={C.signal} strokeWidth={2} />
      <T x={320} y={132} anchor="middle" bold size={15}>signal</T>
      <Ln x1={252} y1={40} x2={388} y2={40} color={C.good} width={2.5} arrow="both" />
      <T x={320} y={22} anchor="middle" bold size={14} color={C.good}>necessary bandwidth</T>
      <T x={320} y={212} anchor="middle" bold size={14} mono>3 kHz (digital voice, SSTV on HF)</T>
      {[90, 150, 490, 550].map((x, i) => (
        <g key={x}>
          <rect x={x - 6} y={i % 2 ? 150 : 140} width={12} height={i % 2 ? 40 : 50} fill={C.bad} fillOpacity={0.6} stroke={C.bad} strokeWidth={2} />
        </g>
      ))}
      <T x={120} y={120} anchor="middle" size={13} bold color={C.bad}>spurious</T>
      <T x={520} y={120} anchor="middle" size={13} bold color={C.bad}>spurious</T>
      <T x={320} y={236} anchor="middle" size={13} color={C.muted}>frequency</T>
    </Diagram>
  )
}
