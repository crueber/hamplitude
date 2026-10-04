import { C, Diagram, Ln, T } from '../kit'

function B({ x, y, w, h, a, b, col }: { x: number; y: number; w: number; h: number; a: string; b?: string; col: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={C.fill} stroke={col} strokeWidth={2.2} />
      <T x={x + w / 2} y={y + h / 2 - (b ? 8 : 0)} anchor="middle" bold size={13.5}>{a}</T>
      {b && <T x={x + w / 2} y={y + h / 2 + 12} anchor="middle" size={12} color={C.muted}>{b}</T>}
    </g>
  )
}

const GENERAL: [string, string, number, string][] = [
  ['Operations', 'does the tactical work', 86, C.resist],
  ['Planning', 'information and plans', 242, C.resist],
  ['Logistics', 'people, supplies, comms', 398, C.good],
  ['Finance / Admin', 'costs and records', 554, C.resist],
]

/** Standard ICS org chart: Incident Commander, Command Staff, General Staff. */
export function IncidentCommandSystem_Chart() {
  return (
    <Diagram w={640} h={440} title="A simplified Incident Command System chart. The Incident Commander is at the top. Command Staff, the Public Information Officer, Safety Officer and Liaison Officer, report directly to the commander. Four General Staff sections report to the commander: Operations, Planning, Logistics, and Finance and Administration. Communications is a unit inside Logistics, which is where amateur operators typically support the response." caption="Simplified. Real incidents scale up or down: a small one may be run by a single person.">
      <B x={240} y={14} w={160} h={52} a="Incident Commander" col={C.power} />
      <Ln x1={320} y1={66} x2={320} y2={246} color={C.muted} width={2} />

      <T x={14} y={78} size={12.5} bold color={C.muted}>Command Staff</T>
      <Ln x1={320} y1={110} x2={209} y2={110} color={C.muted} width={2} />
      <Ln x1={209} y1={110} x2={209} y2={206} color={C.muted} width={2} />
      {[
        ['Public Information Officer', 110],
        ['Safety Officer', 158],
        ['Liaison Officer', 206],
      ].map(([a, cy]) => (
        <g key={a as string}>
          <Ln x1={209} y1={cy as number} x2={204} y2={cy as number} color={C.muted} width={2} />
          <B x={14} y={(cy as number) - 18} w={190} h={36} a={a as string} col={C.signal} />
        </g>
      ))}

      <T x={334} y={226} size={12.5} bold color={C.muted}>General Staff</T>
      <Ln x1={86} y1={246} x2={554} y2={246} color={C.muted} width={2} />
      {GENERAL.map(([a, b, cx, col]) => (
        <g key={a}>
          <Ln x1={cx} y1={246} x2={cx} y2={268} color={C.muted} width={2} />
          <B x={cx - 75} y={268} w={150} h={54} a={a} b={b} col={col} />
        </g>
      ))}

      <Ln x1={398} y1={322} x2={398} y2={352} color={C.good} width={2} />
      <rect x={298} y={340} width={200} height={90} rx={12} fill="none" stroke={C.good} strokeWidth={1.6} strokeDasharray="5 4" />
      <B x={313} y={352} w={170} h={40} a="Communications Unit" col={C.good} />
      <T x={398} y={412} anchor="middle" size={12} color={C.good} bold>amateurs usually help here</T>
    </Diagram>
  )
}
