import { C, Diagram, Ln, T } from '../kit'

/** Cells in series add volts; strings in parallel add current. */
export function PanelCells() {
  const rows = 3, cols = 6, cw = 40, gap = 18, x0 = 70, y0 = 36, dy = 52
  const xr = x0 + cols * cw + (cols - 1) * gap
  return (
    <Diagram w={640} h={212} title="Solar panel cells in series-parallel: each silicon cell gives about half a volt, cells wired in series add their voltages, and the series strings are wired in parallel to add current."
      caption="Series-parallel: series for voltage, parallel for current.">
      {Array.from({ length: rows }, (_, r) => {
        const y = y0 + r * dy
        return (
          <g key={r}>
            <Ln x1={44} y1={y + 17} x2={xr + 26} y2={y + 17} color={C.ink} width={2.5} />
            {Array.from({ length: cols }, (_, c) => (
              <g key={c}>
                <rect x={x0 + c * (cw + gap)} y={y} width={cw} height={34} rx={4} fill={C.bg} />
                <rect x={x0 + c * (cw + gap)} y={y} width={cw} height={34} rx={4} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2.5} />
                <T x={x0 + c * (cw + gap) + cw / 2} y={y + 17} anchor="middle" size={12} bold>0.5 V</T>
              </g>
            ))}
          </g>
        )
      })}
      <Ln x1={44} y1={y0 + 17} x2={44} y2={y0 + 2 * dy + 17} color={C.ink} width={2.5} />
      <Ln x1={xr + 26} y1={y0 + 17} x2={xr + 26} y2={y0 + 2 * dy + 17} color={C.ink} width={2.5} />
      <T x={x0 + (xr - x0) / 2} y={20} anchor="middle" size={13} bold color={C.voltage}>series: voltages add</T>
      <T x={xr + 40} y={y0 + dy + 17} size={13} bold color={C.current}>parallel:</T>
      <T x={xr + 40} y={y0 + dy + 35} size={13} bold color={C.current}>currents add</T>
      <T x={44} y={y0 + 2 * dy + 54} size={12} color={C.muted}>each silicon cell: about 0.5 V open circuit</T>
    </Diagram>
  )
}
