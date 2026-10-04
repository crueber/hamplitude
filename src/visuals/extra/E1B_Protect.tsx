import { C, Diagram, T } from '../kit'

/** Who you must protect from your signal, and what the rule asks of you. */
export function E1B_Protect() {
  const rows = [
    { who: 'FCC monitoring facility', rule: 'protect from harmful interference within 1 mile', c: C.signal },
    { who: 'Radiolocation system (70 cm repeater)', rule: 'cease operation or change the repeater to mitigate', c: C.power },
    { who: 'Broadcast reception (good receivers)', rule: 'avoid transmitting during certain hours on the offending frequencies', c: C.resist },
    { who: 'National Radio Quiet Zone', rule: 'area around the National Radio Astronomy Observatory', c: C.current },
  ]
  return (
    <Diagram w={640} h={348} title="Who you must protect and what each rule asks: FCC monitoring facility within 1 mile; radiolocation interference from a 70 centimeter repeater means cease or mitigate; broadcast interference means avoiding certain hours; the National Radio Quiet Zone surrounds the National Radio Astronomy Observatory" caption="Interference: the protected party comes first.">
      {rows.map((r, i) => {
        const y = 6 + i * 85
        return (
          <g key={r.who}>
            <rect x={6} y={y} width={628} height={76} rx={10} fill={r.c} fillOpacity={0.12} stroke={r.c} strokeWidth={2} />
            <T x={20} y={y + 24} bold size={15} color={r.c}>{r.who}</T>
            <T x={20} y={y + 52} size={14}>{r.rule}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
