import { C, Diagram, Ln, T } from '../kit'

const X0 = 30, X1 = 610, F0 = 28.0, F1 = 28.6
const px = (f: number) => X0 + ((f - F0) / (F1 - F0)) * (X1 - X0)

/** Technician privileges on 10 m: CW/data below 28.300, voice from 28.300 to 28.500. */
export function T1B_TenMeter({ focus = 'phone' }: { focus?: 'phone' | 'beacon' }) {
  const b = focus === 'beacon'
  return (
    <Diagram w={640} h={170} title="Technician privileges on the 10 meter band: CW and digital from 28.000 to 28.300 megahertz, voice phone from 28.300 to 28.500; automatically controlled beacons sit at 28.200 to 28.300" caption="MHz. Not drawn above 28.6 MHz." >
      <rect x={px(28.0)} y={72} width={px(28.3) - px(28.0)} height={52} fill={C.signal} fillOpacity={b ? 0.12 : 0.2} stroke={C.signal} strokeWidth={2} />
      <rect x={px(28.3)} y={72} width={px(28.5) - px(28.3)} height={52} fill={C.resist} fillOpacity={b ? 0.1 : 0.3} stroke={C.resist} strokeWidth={2} />
      <rect x={px(28.5)} y={72} width={px(28.6) - px(28.5)} height={52} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
      <T x={(px(28.0) + px(28.2)) / 2} y={98} anchor="middle" bold size={14}>CW + digital</T>
      <T x={(px(28.3) + px(28.5)) / 2} y={98} anchor="middle" bold size={15} color={C.resist}>VOICE</T>
      <T x={(px(28.5) + px(28.6)) / 2} y={98} anchor="middle" size={12} color={C.muted}>General+</T>
      {b && <rect x={px(28.2)} y={72} width={px(28.3) - px(28.2)} height={52} fill={C.power} fillOpacity={0.35} stroke={C.power} strokeWidth={2.5} />}
      {b && <T x={(px(28.2) + px(28.3)) / 2} y={98} anchor="middle" bold size={14} color={C.power}>Beacons</T>}
      {(b ? [28.0, 28.2, 28.3] : [28.0, 28.3, 28.5]).map((f) => (
        <g key={f}>
          <Ln x1={px(f)} y1={124} x2={px(f)} y2={136} color={C.ink} width={2.5} />
          <T x={px(f)} y={152} anchor="middle" mono bold size={14}>{f.toFixed(3)}</T>
        </g>
      ))}
      {b ? (
        <>
          <Ln x1={px(28.2)} y1={52} x2={px(28.3)} y2={52} color={C.power} width={2.5} arrow="both" />
          <T x={(px(28.2) + px(28.3)) / 2} y={32} anchor="middle" bold size={14} color={C.power}>propagation beacons</T>
        </>
      ) : (
        <>
          <Ln x1={px(28.3) + 3} y1={52} x2={px(28.5) - 3} y2={52} color={C.resist} width={2.5} arrow="both" />
          <T x={(px(28.3) + px(28.5)) / 2} y={32} anchor="middle" bold size={14} color={C.resist}>Technician phone</T>
        </>
      )}
    </Diagram>
  )
}
