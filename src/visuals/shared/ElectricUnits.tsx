import { C, Diagram, T } from '../kit'

const ALL = {
  voltage: { q: 'Voltage', sym: 'V', unit: 'volt', note: ['the push that', 'moves electrons'], color: C.voltage },
  current: { q: 'Current', sym: 'A', unit: 'ampere', note: ['the flow of', 'electrons'], color: C.current },
  resistance: { q: 'Resistance', sym: 'Ω', unit: 'ohm', note: ['opposes', 'current flow'], color: C.resist },
  power: { q: 'Power', sym: 'W', unit: 'watt', note: ['rate energy', 'is used'], color: C.power },
  frequency: { q: 'Frequency', sym: 'Hz', unit: 'hertz', note: ['cycles', 'per second'], color: C.signal },
  capacitance: { q: 'Capacitance', sym: 'F', unit: 'farad', note: ['stores energy in', 'an electric field'], color: C.ink },
  inductance: { q: 'Inductance', sym: 'H', unit: 'henry', note: ['stores energy in', 'a magnetic field'], color: C.ink },
  impedance: { q: 'Impedance', sym: 'Ω', unit: 'ohm', note: ['opposes', 'AC current'], color: C.resist },
} as const

export type UnitKey = keyof typeof ALL

/** Quantity → unit cards. Pick which to show with `keys` (4 per row). */
export function ElectricUnits({
  keys = ['voltage', 'current', 'power', 'frequency'],
  caption = 'Each quantity has exactly one unit.',
}: { keys?: UnitKey[]; caption?: string }) {
  const cw = 148, gap = 12, ch = 136
  const rows = Math.ceil(keys.length / 4)
  const H = rows * ch + (rows - 1) * gap + 4
  return (
    <Diagram w={640} h={H} title={`Units: ${keys.map((k) => `${ALL[k].q.toLowerCase()} is measured in ${ALL[k].unit}s (${ALL[k].sym})`).join('; ')}`} caption={caption}>
      {keys.map((k, i) => {
        const d = ALL[k]
        const col = i % 4, row = Math.floor(i / 4)
        const n = Math.min(4, keys.length - row * 4)
        const x = 320 - (n * cw + (n - 1) * gap) / 2 + col * (cw + gap)
        const y = 2 + row * (ch + gap)
        return (
          <g key={k}>
            <rect x={x} y={y} width={cw} height={ch} rx={12} fill={C.fill} stroke={d.color} strokeWidth={2} />
            <T x={x + cw / 2} y={y + 20} anchor="middle" bold size={14} color={C.muted}>{d.q}</T>
            <T x={x + cw / 2} y={y + 54} anchor="middle" bold size={34} color={d.color}>{d.sym}</T>
            <T x={x + cw / 2} y={y + 84} anchor="middle" bold size={16}>{d.unit}</T>
            <T x={x + cw / 2} y={y + 107} anchor="middle" size={12} color={C.muted}>{d.note[0]}</T>
            <T x={x + cw / 2} y={y + 123} anchor="middle" size={12} color={C.muted}>{d.note[1]}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
