import { C, Diagram, Ln, T } from '../kit'

const STEPS: { title: string; lines: [string, string, string]; color: string }[] = [
  { title: 'Build a kit', lines: ['Follow the manual,', 'learn soldering', 'and testing'], color: C.signal },
  { title: 'Repair and modify', lines: ['Fix old gear, add a', 'mod, learn how a', 'circuit really works'], color: C.current },
  { title: 'Build a design', lines: ['Take a published', 'schematic and source', 'your own parts'], color: C.power },
  { title: 'Design your own', lines: ['Adapt, simulate,', 'measure and refine', 'until it works'], color: C.resist },
]

/** The usual path from assembling a kit to designing your own circuits. */
export function KitsAndHomebrew_Ladder() {
  const W = 148, gap = 10, x0 = 12, base = 262
  return (
    <Diagram w={640} h={290}
      title="A four-step path into building: assemble a kit, repair and modify existing gear, build a published design from your own parts, then design your own circuits. Each step needs the skills of the one before."
      caption="Each step adds a skill: reading instructions, then understanding the circuit, then sourcing parts, then design.">
      <T x={20} y={22} size={14} bold>More freedom, more to learn</T>
      <Ln x1={250} y1={22} x2={620} y2={22} color={C.muted} width={2} arrow />
      {STEPS.map((s, i) => {
        const h = 100 + i * 34
        const x = x0 + i * (W + gap)
        const y = base - h
        return (
          <g key={s.title}>
            <rect x={x} y={y} width={W} height={h} rx={10} fill={C.fill} stroke={s.color} strokeWidth={2.5} />
            <T x={x + 10} y={y + 22} size={13.5} bold color={s.color}>{i + 1}  {s.title}</T>
            {s.lines.map((l, k) => <T key={k} x={x + 10} y={y + 48 + k * 18} size={12} color={C.muted}>{l}</T>)}
          </g>
        )
      })}
    </Diagram>
  )
}
