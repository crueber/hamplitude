import { C, Diagram, Ln, T } from '../kit'

const COLS = [
  { x: 20, w: 190, col: C.power, title: 'Arduino-class', sub: 'microcontroller',
    notes: ['One program at power-on', 'Reacts in microseconds', 'Milliamps; battery friendly'],
    chips: ['CW keyer', 'Rotator controller', 'Antenna switch', 'SWR meter', 'Beacon'] },
  { x: 225, w: 190, col: C.ink, title: 'Either one', sub: 'depends on the job',
    notes: ['Needs a bit of both', 'Pick by what is simplest', 'Often one of each, talking'],
    chips: ['APRS tracker', 'Band decoder', 'Rig interface', 'GPS clock'] },
  { x: 430, w: 190, col: C.signal, title: 'Raspberry Pi-class', sub: 'single-board computer',
    notes: ['Full operating system', 'Network, USB, storage', 'Watts; shut it down cleanly'],
    chips: ['Digital-voice hotspot', 'FT8 / WSJT-X station', 'APRS iGate', 'Remote station server', 'SDR host'] },
]

/** Where common ham projects fall between a microcontroller and a small computer. */
export function RaspberryPiAndArduino_Spectrum() {
  return (
    <Diagram w={640} h={330}
      title="Projects arranged between Arduino-class microcontrollers and Raspberry Pi-class computers: keyers, rotator controllers and beacons suit a microcontroller; hotspots, FT8 stations and remote servers suit a computer"
      caption="Rule of thumb: timing and pins, microcontroller; software and networking, computer. Typical examples only.">
      {COLS.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y={10} width={c.w} height={310} rx={12} fill={C.fill} stroke={c.col} strokeWidth={2} />
          <T x={c.x + c.w / 2} y={32} anchor="middle" size={15} bold color={c.col}>{c.title}</T>
          <T x={c.x + c.w / 2} y={52} anchor="middle" size={12} color={C.muted}>{c.sub}</T>
          {c.notes.map((n, i) => <T key={n} x={c.x + 12} y={82 + i * 19} size={12}>{n}</T>)}
          <Ln x1={c.x + 12} y1={146} x2={c.x + c.w - 12} y2={146} color={C.fill2} width={2} />
          {c.chips.map((p, i) => (
            <g key={p}>
              <rect x={c.x + 12} y={160 + i * 30} width={c.w - 24} height={24} rx={12} fill={C.bg} stroke={c.col} strokeWidth={1.5} />
              <T x={c.x + c.w / 2} y={172 + i * 30} anchor="middle" size={12} bold>{p}</T>
            </g>
          ))}
        </g>
      ))}
    </Diagram>
  )
}
