import { C, Diagram, T } from '../kit'

const GROUPS = [
  { n: 'HF', bands: [['40 m', true], ['30 m', false], ['20 m', true], ['17 m', false], ['15 m', true], ['10 m', true]] },
  { n: 'VHF', bands: [['6 m', false], ['2 m', true], ['1.25 m', false]] },
  { n: 'UHF', bands: [['70 cm', true], ['33 cm', false], ['13 cm', true]] },
] as const

/** Which amateur bands have space station allocations (bands named in the question pool). */
export function E1D_SpaceBands() {
  return (
    <Diagram w={640} h={276} title="Amateur bands with space station allocations: HF 40, 20, 15 and 10 meters; VHF 2 meters only; UHF 70 centimeters and 13 centimeters. 30 meters, 17 meters, 6 meters, 1.25 meters and 33 centimeters have none." caption="Not to scale. Shaded = has space station frequencies. Only bands named in the questions are shown.">
      {GROUPS.map((g, gi) => {
        const y = 8 + gi * 86
        return (
          <g key={g.n}>
            <T x={8} y={y + 32} bold size={16} color={C.muted}>{g.n}</T>
            {g.bands.map(([n, yes], i) => {
              const x = 64 + i * 94
              return (
                <g key={n}>
                  <rect x={x} y={y + 8} width={84} height={52} rx={8} fill={yes ? C.good : C.fill} fillOpacity={yes ? 0.25 : 1} stroke={yes ? C.good : C.muted} strokeWidth={yes ? 2.5 : 1.5} strokeDasharray={yes ? undefined : '4 3'} />
                  <T x={x + 42} y={y + 34} anchor="middle" bold size={15} color={yes ? C.ink : C.muted}>{n}</T>
                </g>
              )
            })}
          </g>
        )
      })}
      <T x={632} y={258} anchor="end" size={13} bold color={C.good}>green = space stations allowed</T>
    </Diagram>
  )
}
