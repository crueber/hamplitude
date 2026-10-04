import { C, Diagram, T, useTime } from '../kit'

const CH = 12
const ACTIVE: Record<number, string> = { 4: 'active', 9: 'active' }
const STEP = 0.3, HOLD = 2.2

// build a repeating timeline of (channel, duration) visits
const VISITS: { ch: number; d: number }[] = Array.from({ length: CH }, (_, ch) => ({ ch, d: ch in ACTIVE ? HOLD : STEP }))
const CYCLE = VISITS.reduce((a, v) => a + v.d, 0)
const START = VISITS.slice(0, 4).reduce((a, v) => a + v.d, 0) + 0.1 // still frame: stopped on a busy channel

function at(t: number) {
  let r = (t + START) % CYCLE
  for (const v of VISITS) {
    if (r < v.d) return v
    r -= v.d
  }
  return VISITS[0]
}

/** A scanner steps through stored channels, stops on an active one, then resumes. */
export function ReceiversAndScanners_Scan() {
  const { t, ref } = useTime(1)
  const cur = at(t)
  const stopped = cur.ch in ACTIVE
  const w = 44, gap = 4.5, x0 = 22
  return (
    <Diagram w={640} h={210} svgRef={ref} title="A scanner stepping through twelve stored channels: it skips quiet ones, stops on a channel with a signal while it lasts, then moves on"
      caption="Scanning: step through memories, stop on activity, resume when the signal ends.">
      <T x={x0} y={18} bold size={13} color={C.muted}>Stored channels (memories)</T>
      {Array.from({ length: CH }).map((_, i) => {
        const x = x0 + i * (w + gap)
        const act = i in ACTIVE, here = i === cur.ch
        return (
          <g key={i}>
            <rect x={x} y={64} width={w} height={44} rx={8} fill={here ? C.fill2 : C.fill} stroke={here ? C.resist : C.muted} strokeWidth={here ? 3 : 1.5} />
            <T x={x + w / 2} y={86} anchor="middle" size={13} bold>{i + 1}</T>
            {act && (
              <g>
                <path d={`M${x + w / 2 - 9},52 q9,-12 18,0`} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />
                <path d={`M${x + w / 2 - 4},58 q4,-6 8,0`} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />
              </g>
            )}
          </g>
        )
      })}
      <path d={`M${x0 + cur.ch * (w + gap) + w / 2},136 l-9,14 h18 z`} fill={C.resist} />
      <T x={x0} y={186} size={14} bold color={stopped ? C.signal : C.muted}>
        {stopped ? 'Signal found: stopped, audio on' : 'Quiet: skipping on to the next channel'}
      </T>
      <T x={x0 + 12 * (w + gap) - gap} y={186} size={12} anchor="end" color={C.muted}>waves = a signal on that channel</T>
    </Diagram>
  )
}
