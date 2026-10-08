import { C, Diagram, T } from '../kit'

const ROWS: { label: string; color: string; a: string; b: string }[] = [
  { label: 'Always', color: C.signal, a: 'The controller IDs, times out and enforces the tone. Alarms, where', b: 'fitted, report power loss, high reflected power or heat.' },
  { label: 'Weekly or monthly', color: C.current, a: 'Listen on the air: ID, tone, courtesy tone and audio quality.', b: 'Read user reports and the log; answer questions from users.' },
  { label: 'Quarterly', color: C.power, a: 'Test the backup power for real. Check battery, charger, fans and', b: 'connectors, and that the control link works and codes are current.' },
  { label: 'Yearly', color: C.resist, a: 'Measure power and reflected power. Inspect antenna, feedline and', b: 'grounding. Review the site agreement, insurance and user policy.' },
  { label: 'Every few years', color: C.good, a: 'Replace batteries and ageing parts. Renew the station license', b: 'in good time. Review control operators and the succession plan.' },
]

/** A typical maintenance calendar for a repeater, from automatic checks to multi-year renewals. */
export function RunningARepeater_Calendar() {
  const rowH = 66, y0 = 8
  return (
    <Diagram w={640} h={y0 + ROWS.length * rowH}
      title="A typical repeater maintenance calendar: always (controller and alarms), weekly or monthly (listen and read the log), quarterly (test backup power and the control link), yearly (measure power, inspect the antenna system, review site agreement and policy) and every few years (replace batteries and renew licenses)."
      caption="A typical schedule to adapt, not a requirement: busy or remote sites need more.">
      {ROWS.map((r, i) => {
        const y = y0 + i * rowH
        return (
          <g key={r.label}>
            <rect x={8} y={y} width={624} height={rowH - 8} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
            <rect x={8} y={y} width={132} height={rowH - 8} rx={12} fill={r.color} fillOpacity={0.22} stroke={r.color} strokeWidth={2} />
            <T x={74} y={y + (rowH - 8) / 2} anchor="middle" size={13.5} bold>{r.label}</T>
            <T x={152} y={y + 18} size={12.5}>{r.a}</T>
            <T x={152} y={y + 38} size={12.5}>{r.b}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
