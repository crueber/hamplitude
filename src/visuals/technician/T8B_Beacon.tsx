import { C, Diagram, Ln, T } from '../kit'

/** A beacon is a one-way broadcast of satellite status that anyone can receive. */
export function Beacon() {
  const rx = (x: number, y: number) => (
    <g>
      <Ln x1={x} y1={y} x2={x} y2={y - 22} color={C.ink} width={3} />
      <Ln x1={x - 9} y1={y - 30} x2={x} y2={y - 22} color={C.ink} width={3} />
      <Ln x1={x + 9} y1={y - 30} x2={x} y2={y - 22} color={C.ink} width={3} />
    </g>
  )
  return (
    <Diagram w={640} h={240} title="A satellite beacon broadcasts telemetry about the satellite's health and status; anyone can receive it" caption="One-way broadcast. No key, no license needed to listen.">
      <g transform="translate(90,70)">
        <rect x={-18} y={-13} width={36} height={26} rx={5} fill={C.power} stroke={C.bg} strokeWidth={3} />
        <rect x={-62} y={-6} width={38} height={12} fill={C.signal} />
        <rect x={24} y={-6} width={38} height={12} fill={C.signal} />
      </g>
      <T x={90} y={106} anchor="middle" size={13} bold>Beacon</T>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${170 + i * 30},${46 - i * 8} Q${190 + i * 30},70 ${170 + i * 30},${94 + i * 8}`} fill="none" stroke={C.signal} strokeWidth={3} strokeLinecap="round" opacity={1 - i * 0.25} />
      ))}
      <rect x={290} y={34} width={190} height={74} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={385} y={50} anchor="middle" size={13} bold color={C.signal}>Telemetry: health and status</T>
      <T x={385} y={72} anchor="middle" size={13}>battery · temperature</T>
      <T x={385} y={92} anchor="middle" size={13}>solar power · more</T>
      <Ln x1={385} y1={110} x2={385} y2={152} color={C.signal} width={2} dash="4 5" />
      <Ln x1={385} y1={152} x2={150} y2={176} color={C.signal} width={2} dash="4 5" />
      <Ln x1={385} y1={152} x2={385} y2={176} color={C.signal} width={2} dash="4 5" />
      <Ln x1={385} y1={152} x2={560} y2={176} color={C.signal} width={2} dash="4 5" />
      {rx(150, 214)}
      {rx(385, 214)}
      {rx(560, 214)}
      <T x={385} y={232} anchor="middle" size={13} bold color={C.muted}>anyone can receive</T>
    </Diagram>
  )
}
