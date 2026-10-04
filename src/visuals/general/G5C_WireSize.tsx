import { C, Diagram, Ln, T, Transformer } from '../kit'

/** Ideal step-up transformer: same power both sides, so the low-voltage primary carries more current and needs thicker wire. */
export function G5C_WireSize() {
  return (
    <Diagram w={640} h={242}
      title="A step-up transformer. The primary has low voltage and high current, drawn with thick wire. The secondary has high voltage and low current, drawn with thin wire. Power is the same on both sides."
      caption="Example, ideal transformer: 120 V × 0.75 A = 360 V × 0.25 A = 90 W.">
      <g transform="translate(320,112) scale(1.8)"><Transformer x={0} y={0} /></g>
      <Ln x1={110} y1={58} x2={304} y2={58} color={C.current} width={10} />
      <Ln x1={110} y1={166} x2={304} y2={166} color={C.current} width={10} />
      <Ln x1={336} y1={58} x2={530} y2={58} color={C.current} width={3} />
      <Ln x1={336} y1={166} x2={530} y2={166} color={C.current} width={3} />
      <T x={90} y={112} anchor="end" bold size={15}>Primary</T>
      <T x={550} y={112} bold size={15}>Secondary</T>
      <T x={90} y={134} anchor="end" bold size={15} color={C.voltage}>120 V</T>
      <T x={550} y={134} bold size={15} color={C.voltage}>360 V</T>
      <T x={180} y={196} anchor="middle" bold size={16} color={C.current}>0.75 A, thick wire</T>
      <T x={460} y={196} anchor="middle" bold size={16} color={C.current}>0.25 A, thin wire</T>
      <T x={180} y={28} anchor="middle" size={13} color={C.muted}>low voltage, high current</T>
      <T x={460} y={28} anchor="middle" size={13} color={C.muted}>high voltage, low current</T>
      <T x={320} y={224} anchor="middle" size={13} color={C.muted}>power in = power out, so more volts means fewer amperes</T>
    </Diagram>
  )
}
