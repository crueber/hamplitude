import { C, Diagram, T } from '../kit'

const HF: [string, boolean][] = [['160', true], ['80', true], ['40', true], ['30', false], ['20', true], ['17', false], ['15', true], ['12', false], ['10', true]]

/** HF: contests skip 30 m (and the other WARC bands). VHF/UHF: SSB and CW activity piles up in the weak-signal segment near the calling frequency. */
export function E2C_ContestBands() {
  const bars = [6, 10, 14, 24, 38, 56, 70, 52, 34, 22, 14, 9]
  return (
    <Diagram w={640} h={336} title="Left: HF bands, with contests held on all but 30 meters, 17 meters and 12 meters. Right: a VHF or UHF band during a contest, where SSB and CW activity peaks in the weak-signal segment close to the calling frequency."
      caption="No contests on 30 m. In a VHF/UHF contest, go to the weak-signal segment.">
      <T x={20} y={22} size={14} bold color={C.muted}>HF bands (meters)</T>
      {HF.map(([b, on], i) => {
        const col = on ? C.good : C.bad
        const x = 20 + (i % 5) * 64, y = 40 + Math.floor(i / 5) * 72
        return (
          <g key={b}>
            <rect x={x} y={y} width={56} height={60} rx={10} fill={col} fillOpacity={on ? 0.14 : 0.2} stroke={col} strokeWidth={on ? 2 : 3} strokeDasharray={on ? undefined : '5 4'} />
            <T x={x + 28} y={y + 24} anchor="middle" size={19} bold color={col}>{b}</T>
            <T x={x + 28} y={y + 46} anchor="middle" size={12} bold color={col}>{on ? 'contests' : 'none'}</T>
          </g>
        )
      })}
      <T x={20} y={196} size={13.5} color={C.muted}>30 m is one of the three WARC bands (30, 17, 12 m):</T>
      <T x={20} y={216} size={13.5} color={C.muted}>contests are generally excluded from them.</T>
      <T x={360} y={22} size={14} bold color={C.muted}>A VHF/UHF band in a contest</T>
      <rect x={360} y={150} width={260} height={30} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <rect x={360} y={150} width={104} height={30} rx={6} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
      <T x={412} y={165} anchor="middle" size={12.5} bold color={C.signal}>weak-signal</T>
      <T x={542} y={165} anchor="middle" size={12.5} color={C.muted}>FM, repeaters, other</T>
      {bars.map((h, i) => (
        <rect key={i} x={364 + i * 8} y={146 - h * 1.2} width={6} height={h * 1.2} rx={2} fill={C.signal} />
      ))}
      <T x={400} y={42} anchor="middle" size={13} bold color={C.signal}>SSB / CW activity</T>
      <path d="M416,194 L416,184" stroke={C.ink} strokeWidth={2.5} markerEnd="url(#hx-arrow)" />
      <T x={416} y={212} anchor="middle" size={13} bold>calling frequency</T>
      <T x={416} y={232} anchor="middle" size={12} color={C.muted}>(2 m example: 144.200 MHz)</T>
      <T x={20} y={270} size={14.5}>VHF/UHF contest SSB and CW: <tspan fontWeight={700}>weak-signal segment,</tspan></T>
      <T x={20} y={292} size={14.5}><tspan fontWeight={700}>most activity near the calling frequency.</tspan></T>
      <T x={20} y={314} size={13} color={C.muted}>Not at the band top, not mid-band, not on a "contest" sub-band.</T>
    </Diagram>
  )
}
