import { C, Diagram, T } from '../kit'

const CHECKS = [
  'Trained for this tower and this job',
  'A helper on the ground, in contact',
  'Harness and lanyards rated and inspected',
  'Dry, calm, daylight, no storm forecast',
  'Overhead wires located; fall zone clear',
  'Transmitters off; power locked out and tagged',
  'Tower, anchors and guys inspected',
]

/** A go / no-go checklist before anyone leaves the ground. */
export function TowerSafety_GoNoGo() {
  const y0 = 54, rh = 34
  return (
    <Diagram w={640} h={y0 + CHECKS.length * rh + 6}
      title="Pre-climb go or no-go checklist. Every item must be a yes: trained, helper on the ground, rated and inspected gear, good weather and daylight, power lines located, transmitters off and power locked out, tower inspected. Any no means stay on the ground."
      caption="A checklist, not a guarantee. Every box must be ticked each time, even for a quick job.">
      <T x={20} y={22} size={15} bold>Before you leave the ground: every answer must be yes</T>
      {CHECKS.map((c, i) => {
        const y = y0 + i * rh
        return (
          <g key={c}>
            <rect x={20} y={y} width={22} height={22} rx={4} fill={C.fill} stroke={C.good} strokeWidth={2.5} />
            <path d={`M26,${y + 11} L31,${y + 17} L38,${y + 5}`} fill="none" stroke={C.good} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <T x={54} y={y + 12} size={14}>{c}</T>
          </g>
        )
      })}
      <rect x={410} y={y0} width={210} height={102} rx={10} fill={C.good} fillOpacity={0.12} stroke={C.good} strokeWidth={2} />
      <T x={515} y={y0 + 24} anchor="middle" size={14} bold color={C.good}>All yes</T>
      <T x={515} y={y0 + 48} anchor="middle" size={13}>Climb, tied off at all</T>
      <T x={515} y={y0 + 66} anchor="middle" size={13}>times, helper watching.</T>
      <rect x={410} y={y0 + 124} width={210} height={102} rx={10} fill={C.bad} fillOpacity={0.12} stroke={C.bad} strokeWidth={2} />
      <T x={515} y={y0 + 148} anchor="middle" size={14} bold color={C.bad}>Any no</T>
      <T x={515} y={y0 + 172} anchor="middle" size={13}>Stay down. Fix it, wait,</T>
      <T x={515} y={y0 + 190} anchor="middle" size={13}>or call a tower crew.</T>
    </Diagram>
  )
}
