import { C, Diagram, Ln, T } from '../kit'

/** SSB keeps one side of the carrier. Convention: LSB below 10 MHz, USB above. */
export function Sidebands() {
  const W = 640, H = 290
  const cx = 320, base = 120
  const lsb = [['160 m'], ['80 m'], ['40 m']]
  const usb = [['20 m'], ['15 m'], ['10 m'], ['6 m'], ['2 m'], ['70 cm']]
  const chip = (x: number, label: string, col: string) => (
    <g key={label}>
      <rect x={x} y={206} width={56} height={32} rx={8} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
      <T x={x + 28} y={222} anchor="middle" size={14} bold>{label}</T>
    </g>
  )
  return (
    <Diagram w={W} h={H} title="Upper sideband sits above the carrier frequency, lower sideband below it. Below 10 megahertz the convention is LSB; at 10 megahertz and above, including 10 meters, VHF and UHF, it is USB" caption="Choose one sideband to send. The carrier and the other side are left out.">
      <Ln x1={60} y1={base} x2={580} y2={base} color={C.muted} width={2} />
      <path d={`M${cx - 110},${base} L${cx - 100},${base - 52} L${cx - 14},${base - 36} L${cx - 10},${base} Z`} fill={C.resist} fillOpacity={0.25} stroke={C.resist} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={`M${cx + 10},${base} L${cx + 14},${base - 36} L${cx + 100},${base - 52} L${cx + 110},${base} Z`} fill={C.current} fillOpacity={0.25} stroke={C.current} strokeWidth={2.5} strokeLinejoin="round" />
      <Ln x1={cx} y1={base} x2={cx} y2={base - 78} color={C.muted} width={2} dash="4 4" />
      <T x={cx} y={base - 92} anchor="middle" size={13} color={C.muted}>carrier (removed)</T>
      <T x={cx - 60} y={base + 20} anchor="middle" size={15} bold color={C.resist}>LSB</T>
      <T x={cx + 60} y={base + 20} anchor="middle" size={15} bold color={C.current}>USB</T>
      <T x={62} y={base - 62} size={13} color={C.muted}>lower frequency</T>
      <T x={578} y={base - 62} size={13} color={C.muted} anchor="end">higher frequency</T>
      {lsb.map(([l], i) => chip(24 + i * 62, l, C.resist))}
      <Ln x1={240} y1={196} x2={240} y2={248} color={C.ink} width={2} />
      {usb.map(([l], i) => chip(256 + i * 62, l, C.current))}
      <T x={110} y={186} anchor="middle" size={14} bold color={C.resist}>Below 10 MHz: LSB</T>
      <T x={436} y={186} anchor="middle" size={14} bold color={C.current}>10 MHz and up: USB</T>
      <T x={240} y={266} anchor="middle" size={12.5} color={C.muted}>10 MHz</T>
    </Diagram>
  )
}
