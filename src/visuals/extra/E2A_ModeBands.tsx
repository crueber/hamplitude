import { C, Diagram, T } from '../kit'

const bands = [
  { k: 'V', name: '2 m', f: 'VHF', col: C.current },
  { k: 'U', name: '70 cm', f: 'UHF', col: C.voltage },
  { k: 'L', name: '23 cm', f: '1.2 GHz', col: C.resist },
  { k: 'S', name: '13 cm', f: '2.4 GHz', col: C.power },
]

/** Satellite mode letters each name a frequency range. */
export function E2A_ModeBands() {
  return (
    <Diagram w={640} h={230} title="Satellite mode letters: V is the 2 meter band, U is 70 centimeters, L is 23 centimeters and S is 13 centimeters. A mode name lists uplink band then downlink band, for example U/V means 70 centimeters up and 2 meters down, and L/S means 23 centimeters up and 13 centimeters down."
      caption="A mode name is two band letters: uplink first, downlink second.">
      <T x={20} y={20} size={14} bold color={C.muted}>one letter = one band (longer wavelength to shorter)</T>
      {bands.map((b, i) => {
        const x = 20 + i * 154
        return (
          <g key={b.k}>
            <rect x={x} y={40} width={142} height={92} rx={12} fill={b.col} fillOpacity={0.16} stroke={b.col} strokeWidth={2.5} />
            <T x={x + 71} y={72} anchor="middle" size={34} bold color={b.col}>{b.k}</T>
            <T x={x + 71} y={106} anchor="middle" size={15} bold>{b.name}</T>
            <T x={x + 71} y={124} anchor="middle" size={12} color={C.muted}>{b.f}</T>
          </g>
        )
      })}
      <T x={20} y={160} size={14} bold color={C.muted}>read a mode as UP / DOWN</T>
      <rect x={20} y={176} width={290} height={40} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={34} y={196} size={18} bold mono>U/V</T>
      <T x={96} y={196} size={13.5}>70 cm up, 2 m down</T>
      <rect x={330} y={176} width={290} height={40} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={344} y={196} size={18} bold mono>L/S</T>
      <T x={406} y={196} size={13.5}>23 cm up, 13 cm down</T>
    </Diagram>
  )
}
