import { C, Diagram, Ln, T } from '../kit'

const STATIONS = [40, 82, 118, 168, 214, 252, 300, 346, 388, 430]

/** Two contest strategies on a band segment: run (sit and call CQ) versus search and pounce (tune and call). */
export function Contesting_RunVsSearch() {
  const panel = (y0: number, title: string, sub: string, col: string, run: boolean) => (
    <g>
      <rect x={10} y={y0} width={620} height={128} rx={12} fill={C.fill} stroke={col} strokeWidth={2} />
      <T x={24} y={y0 + 20} size={14.5} bold color={col}>{title}</T>
      <T x={620} y={y0 + 20} anchor="end" size={12.5} color={C.muted}>{sub}</T>
      <Ln x1={28} y1={y0 + 96} x2={612} y2={y0 + 96} color={C.muted} width={2} />
      {STATIONS.map((x, i) => {
        const sx = 60 + x * 1.25
        const me = run && i === 4
        return <Ln key={i} x1={sx} y1={y0 + 96} x2={sx} y2={y0 + (me ? 44 : 78)} color={me ? col : C.muted} width={me ? 6 : 4} />
      })}
      {run ? (
        <>
          <T x={60 + STATIONS[4] * 1.25} y={y0 + 34} anchor="middle" size={12.5} bold color={col}>you: CQ TEST</T>
          {[0, 2, 7, 9].map((i) => (
            <Ln key={i} x1={60 + STATIONS[i] * 1.25} y1={y0 + 70} x2={60 + STATIONS[4] * 1.25 + (i < 4 ? -10 : 10)} y2={y0 + 58} color={C.signal} width={1.8} arrow dash="3 4" />
          ))}
          <T x={24} y={y0 + 116} size={12.5}>You stay put on one frequency. Other stations tune to you and call.</T>
        </>
      ) : (
        <>
          <rect x={60 + STATIONS[3] * 1.25 - 14} y={y0 + 44} width={28} height={52} rx={4} fill="none" stroke={col} strokeWidth={2} />
          <T x={60 + STATIONS[3] * 1.25} y={y0 + 28} anchor="middle" size={12.5} bold color={col}>your dial</T>
          <Ln x1={60 + STATIONS[0] * 1.25} y1={y0 + 54} x2={60 + STATIONS[3] * 1.25 - 20} y2={y0 + 54} color={col} width={2} arrow />
          <T x={24} y={y0 + 116} size={12.5}>You tune across the band and call each station that is calling CQ.</T>
        </>
      )}
    </g>
  )
  return (
    <Diagram w={640} h={296}
      title="Two contest strategies on a stretch of a band, drawn as signal spikes on a frequency axis. Running: you stay on one frequency, call CQ and other stations come to you. Search and pounce: you tune across the band and call stations that are already calling CQ."
      caption="Most operators mix both: run while the rate is good, then hunt for stations they still need.">
      {panel(8, 'Run', 'a steady rate once you have a clear frequency', C.signal, true)}
      {panel(148, 'Search and pounce', 'good for new multipliers and for small stations', C.power, false)}
    </Diagram>
  )
}
