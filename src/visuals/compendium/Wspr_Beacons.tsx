import { C, Diagram, Ln, T } from '../kit'

/** WSPR: a tiny beacon, many listening stations, one shared public map. */
export function Wspr_Beacons() {
  const rx = [
    { y: 34, l: 'Receiver 1' },
    { y: 108, l: 'Receiver 2' },
    { y: 182, l: 'Receiver 3' },
  ]
  return (
    <Diagram w={640} h={352}
      title="WSPR in four steps. A low-power beacon transmits its call sign, grid square and power for just under two minutes. Listening stations far away decode it and upload a spot report over the internet. A shared database turns the reports into a map showing where the signal was heard."
      caption="The beacon never talks to anyone. The listeners' reports are the result.">
      <rect x={14} y={80} width={150} height={100} rx={12} fill={C.power} fillOpacity={0.14} stroke={C.power} strokeWidth={2.5} />
      <T x={89} y={104} anchor="middle" size={15} bold>Beacon</T>
      <T x={89} y={128} anchor="middle" size={12.5} color={C.muted}>call sign</T>
      <T x={89} y={146} anchor="middle" size={12.5} color={C.muted}>grid square</T>
      <T x={89} y={164} anchor="middle" size={12.5} color={C.muted}>power in dBm</T>
      {rx.map((r, i) => (
        <g key={r.l}>
          <Ln x1={166} y1={130} x2={248} y2={r.y + 26} color={C.signal} width={2.2} arrow dash="6 4" />
          <rect x={250} y={r.y} width={130} height={52} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
          <T x={315} y={r.y + 18} anchor="middle" size={13.5} bold>{r.l}</T>
          <T x={315} y={r.y + 37} anchor="middle" size={12} color={C.muted}>decodes, notes SNR</T>
          <Ln x1={382} y1={r.y + 26} x2={438} y2={104 + i * 26} color={C.current} width={2.2} arrow />
        </g>
      ))}
      <rect x={442} y={80} width={184} height={100} rx={12} fill={C.current} fillOpacity={0.14} stroke={C.current} strokeWidth={2.5} />
      <T x={534} y={106} anchor="middle" size={15} bold>Spot database</T>
      <T x={534} y={130} anchor="middle" size={12.5} color={C.muted}>reports uploaded</T>
      <T x={534} y={148} anchor="middle" size={12.5} color={C.muted}>over the internet,</T>
      <T x={534} y={166} anchor="middle" size={12.5} color={C.muted}>shown on a map</T>
      <T x={14} y={254} size={13} bold color={C.muted}>Timing: slots are 2 minutes long</T>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={14 + i * 153} y={272} width={149} height={30} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
          {i === 1 && <rect x={16 + i * 153} y={274} width={140} height={26} rx={5} fill={C.power} fillOpacity={0.35} stroke={C.power} strokeWidth={1.5} />}
          <T x={14 + i * 153 + 74} y={287} anchor="middle" size={12.5} bold color={i === 1 ? C.ink : C.muted}>{i === 1 ? 'transmit' : 'listen'}</T>
        </g>
      ))}
      <T x={14} y={326} size={13} color={C.muted}>Illustrative: a station transmits in some slots and listens in the rest.</T>
    </Diagram>
  )
}
