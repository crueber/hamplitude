import { C, Diagram, Ln, T } from '../kit'

const COLS = [C.signal, C.resist, C.power]
const NAMES = ['A', 'B', 'C']

/** Time-frequency grids: FDM gives each stream its own band all the time; TDM gives each its own time slot on the whole channel. */
export function Multiplex() {
  const panel = (px: number, kind: 'fdm' | 'tdm') => {
    const w = 270, h = 150, top = 52
    return (
      <g>
        <T x={px} y={16} size={15} bold>{kind === 'fdm' ? 'FDM: frequency division' : 'TDM: time division'}</T>
        <T x={px} y={36} size={12.5} color={C.muted}>{kind === 'fdm' ? 'each stream gets its own band' : 'each stream gets its own time slot'}</T>
        <rect x={px} y={top} width={w} height={h} fill={C.fill} stroke={C.muted} strokeWidth={1.5} rx={4} />
        {kind === 'fdm'
          ? NAMES.map((n, i) => (
              <g key={n}>
                <rect x={px + 2} y={top + h - (i + 1) * (h / 3) + 3} width={w - 4} height={h / 3 - 6} rx={4} fill={COLS[i]} fillOpacity={0.3} stroke={COLS[i]} strokeWidth={2} />
                <T x={px + w / 2} y={top + h - (i + 0.5) * (h / 3)} anchor="middle" size={15} bold color={COLS[i]}>{`Stream ${n}`}</T>
              </g>
            ))
          : Array.from({ length: 6 }, (_, i) => {
              const sw = w / 6
              return (
                <g key={i}>
                  <rect x={px + i * sw + 2} y={top + 3} width={sw - 4} height={h - 6} rx={4} fill={COLS[i % 3]} fillOpacity={0.3} stroke={COLS[i % 3]} strokeWidth={2} />
                  <T x={px + i * sw + sw / 2} y={top + h / 2} anchor="middle" size={17} bold color={COLS[i % 3]}>{NAMES[i % 3]}</T>
                </g>
              )
            })}
        <Ln x1={px} y1={top + h + 14} x2={px + w} y2={top + h + 14} color={C.muted} width={1.5} arrow />
        <T x={px + w / 2} y={top + h + 34} anchor="middle" size={12.5} color={C.muted}>time</T>
        <T x={px - 16} y={top + h / 2} anchor="middle" size={12.5} color={C.muted} transform={`rotate(-90 ${px - 16} ${top + h / 2})`}>frequency</T>
      </g>
    )
  }
  return (
    <Diagram w={640} h={268} title="Multiplexing on a time and frequency grid. Frequency division gives each of three streams its own band all the time. Time division gives each stream the whole channel in turn, in repeating time slots."
      caption="FDM splits the band. TDM splits the time.">
      {panel(48, 'fdm')}
      {panel(350, 'tdm')}
    </Diagram>
  )
}
