import { C, Diagram, T } from '../kit'

/** First 100 kHz of 6 m and 2 m is CW only; the rest takes SSB, FM and digital. */
export function T1B_CwOnly() {
  const row = (y: number, name: string, lo: string, mid: string, hi: string) => (
    <g>
      <T x={6} y={y - 18} bold size={16}>{name}</T>
      <rect x={6} y={y} width={150} height={52} rx={8} fill={C.resist} fillOpacity={0.25} stroke={C.resist} strokeWidth={2} />
      <T x={81} y={y + 18} anchor="middle" bold size={14}>CW only</T>
      <T x={81} y={y + 38} anchor="middle" mono size={12.5}>{lo} – {mid}</T>
      <rect x={156} y={y} width={478} height={52} rx={8} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={2} />
      <T x={395} y={y + 18} anchor="middle" bold size={14}>SSB · FM · digital · CW</T>
      <T x={395} y={y + 38} anchor="middle" mono size={12.5}>{mid} – {hi}</T>
    </g>
  )
  return (
    <Diagram w={640} h={190} title="The first 100 kilohertz of the 6 meter band (50.0 to 50.1) and the 2 meter band (144.0 to 144.1) are CW only; above that, SSB, FM and digital modes are allowed" caption="MHz. Segments exaggerated: the CW-only slice is only 100 kHz wide.">
      {row(28, '6 m', '50.0', '50.1', '54.0')}
      {row(120, '2 m', '144.0', '144.1', '148.0')}
    </Diagram>
  )
}
