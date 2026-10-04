import { C, Diagram, Ln, T } from '../kit'

const IN = [
  { t: 'Paddles and buttons', s: 'digital input' },
  { t: 'Speed or tuning knob', s: 'analog input (ADC)' },
  { t: 'Rotator position pot', s: 'analog input (ADC)' },
  { t: 'GPS time and position', s: 'serial input' },
]
const OUT = [
  { t: 'Key line to the radio', s: 'transistor or optocoupler' },
  { t: 'Antenna-switch relays', s: 'driver transistor per relay' },
  { t: 'Rotator motor relays', s: 'driver transistor per relay' },
  { t: 'Display, sidetone, clock chip', s: 'I²C, SPI or PWM' },
]

/** Typical ham connections: sensors and controls in, driven loads out. Pins never drive big loads directly. */
export function Microcontrollers_HamUses() {
  return (
    <Diagram w={640} h={300} title="A microcontroller in the shack: paddles, knobs, a rotator potentiometer and GPS go in; a keying transistor, relay drivers and a display come out."
      caption="Inputs on the left, outputs on the right. Anything needing real current goes through a transistor, optocoupler or driver, not straight from a pin.">
      <T x={14} y={14} size={13} bold color={C.signal}>In</T>
      <T x={626} y={14} anchor="end" size={13} bold color={C.power}>Out</T>
      {IN.map((p, i) => (
        <g key={p.t}>
          <rect x={14} y={30 + i * 64} width={200} height={50} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
          <T x={26} y={48 + i * 64} size={13} bold>{p.t}</T>
          <T x={26} y={66 + i * 64} size={12} color={C.muted}>{p.s}</T>
          <Ln x1={214} y1={55 + i * 64} x2={262} y2={55 + i * 64} color={C.signal} width={2.5} arrow />
        </g>
      ))}
      <rect x={264} y={40} width={112} height={232} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <T x={320} y={140} anchor="middle" size={15} bold>Micro-</T>
      <T x={320} y={160} anchor="middle" size={15} bold>controller</T>
      <T x={320} y={188} anchor="middle" size={12} color={C.muted}>3.3 V or 5 V</T>
      {OUT.map((p, i) => (
        <g key={p.t}>
          <Ln x1={376} y1={55 + i * 64} x2={424} y2={55 + i * 64} color={C.power} width={2.5} arrow />
          <rect x={426} y={30 + i * 64} width={200} height={50} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
          <T x={438} y={48 + i * 64} size={13} bold>{p.t}</T>
          <T x={438} y={66 + i * 64} size={12} color={C.muted}>{p.s}</T>
        </g>
      ))}
    </Diagram>
  )
}
