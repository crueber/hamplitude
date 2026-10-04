import { C, Diagram, Ln, T } from '../kit'

/** Spurious emissions below 30 MHz must be at least 43 dB below the fundamental. */
export function E1C_Spur() {
  // y for dB: 0 dB at 40, -60 dB at 220  => 2.4 px per dB
  const y = (db: number) => 40 - db * 2.4
  const bar = (x: number, db: number, ok: boolean, label: string) => (
    <g>
      <rect x={x - 14} y={y(db)} width={28} height={190 - y(db)} fill={ok ? C.good : C.bad} fillOpacity={0.5} stroke={ok ? C.good : C.bad} strokeWidth={2} />
      <T x={x} y={y(db) - 12} anchor="middle" size={12} bold color={ok ? C.good : C.bad}>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={236} title="A spurious emission below 30 megahertz must be at least 43 decibels below the fundamental emission. A spur at minus 30 dB fails, a spur at minus 55 dB passes." caption="Illustrative spurs. The limit line is 43 dB below the fundamental (below 30 MHz).">
      <Ln x1={30} y1={190} x2={620} y2={190} color={C.muted} width={2} />
      <rect x={290} y={y(0)} width={60} height={190 - y(0)} fill={C.signal} fillOpacity={0.45} stroke={C.signal} strokeWidth={2} />
      <T x={320} y={26} anchor="middle" size={13} bold>fundamental, 0 dB</T>
      {bar(100, -30, false, '-30 dB: fails')}
      {bar(190, -55, true, '-55 dB: OK')}
      {bar(460, -57, true, '-57 dB: OK')}
      {bar(550, -35, false, '-35 dB: fails')}
      <Ln x1={30} y1={y(-43)} x2={620} y2={y(-43)} color={C.power} width={2.5} dash="8 5" />
      <T x={360} y={y(-43) - 14} size={13} bold color={C.power}>limit: -43 dB</T>
      <T x={320} y={212} anchor="middle" size={13} color={C.muted}>frequency</T>
    </Diagram>
  )
}
