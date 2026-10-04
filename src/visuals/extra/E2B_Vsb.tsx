import { C, Diagram, Ln, T } from '../kit'

const CX = 300

/** Vestigial sideband: one full sideband plus a trimmed stub of the other. Narrower than AM, low video frequencies kept. */
export function E2B_Vsb() {
  const base = (y: number) => <Ln x1={60} y1={y} x2={600} y2={y} color={C.muted} width={1.5} />
  const car = (y: number) => <Ln x1={CX} y1={y} x2={CX} y2={y - 56} color={C.ink} width={3} />
  const up = (y: number, col: string) => <path d={`M${CX},${y} L${CX},${y - 36} L${CX + 190},${y - 36} L${CX + 210},${y} z`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={2} />
  return (
    <Diagram w={640} h={330} title="Spectrum comparison. Ordinary AM sends both sidebands in full. Vestigial sideband sends one full sideband and only a small remnant of the other, which needs less bandwidth while keeping the low frequency video components near the carrier."
      caption="Video signal frequency runs outward from the carrier. VSB trims the lower sideband's far side.">
      <T x={60} y={20} size={14} bold color={C.muted}>Ordinary AM</T>
      {base(110)}
      {up(110, C.signal)}
      <path d={`M${CX},110 L${CX},74 L${CX - 190},74 L${CX - 210},110 z`} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
      {car(110)}
      <T x={CX} y={46} anchor="middle" size={12.5} bold>carrier</T>
      <T x={CX - 100} y={92} anchor="middle" size={13} bold color={C.signal}>lower sideband</T>
      <T x={CX + 100} y={92} anchor="middle" size={13} bold color={C.signal}>upper sideband</T>
      <Ln x1={CX - 210} y1={134} x2={CX + 210} y2={134} color={C.bad} width={2} arrow="both" />
      <T x={CX} y={152} anchor="middle" size={13} bold color={C.bad}>wide: both sidebands in full</T>
      <T x={60} y={190} size={14} bold color={C.muted}>Vestigial sideband (analog fast-scan TV video)</T>
      {base(280)}
      {up(280, C.good)}
      <path d={`M${CX},280 L${CX},244 L${CX - 70},244 L${CX - 92},280 z`} fill={C.good} fillOpacity={0.3} stroke={C.good} strokeWidth={2} />
      {car(280)}
      <T x={CX - 34} y={262} anchor="end" size={13} bold color={C.good}>vestige</T>
      <T x={CX + 100} y={262} anchor="middle" size={13} bold color={C.good}>full sideband</T>
      <Ln x1={CX - 92} y1={304} x2={CX + 210} y2={304} color={C.good} width={2} arrow="both" />
      <T x={CX + 59} y={322} anchor="middle" size={13} bold color={C.good}>narrower, low video frequencies kept</T>
    </Diagram>
  )
}
