import { C, Diagram, T } from '../kit'

/** Situations needing extra care about interference, and two related limits. */
export function G1E_Care() {
  const tiles = [
    { a: 'Within one mile of an', b: 'FCC Monitoring Station' },
    { a: 'On a band where', b: 'amateurs are secondary' },
    { a: 'Transmitting', b: 'spread spectrum' },
  ]
  return (
    <Diagram w={640} h={236} title="Take steps to avoid harmful interference within one mile of an FCC Monitoring Station, on a band where the amateur service is secondary, and when transmitting spread spectrum. Spread spectrum is limited to 10 watts PEP. There is no part of the 2.4 GHz band where you may communicate with non-licensed Wi-Fi stations" caption="Interference duties, and two limits.">
      {tiles.map((t, i) => {
        const x = 6 + i * 212
        return (
          <g key={t.a}>
            <rect x={x} y={6} width={204} height={86} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
            <T x={x + 102} y={36} anchor="middle" size={14} bold>{t.a}</T>
            <T x={x + 102} y={58} anchor="middle" size={14} bold>{t.b}</T>
            <T x={x + 102} y={80} anchor="middle" size={12} color={C.muted}>avoid interference</T>
          </g>
        )
      })}
      <rect x={6} y={110} width={310} height={118} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={161} y={132} anchor="middle" size={14} bold color={C.power}>Spread spectrum power</T>
      <T x={161} y={174} anchor="middle" size={30} bold>10 W</T>
      <T x={161} y={206} anchor="middle" size={13} color={C.muted}>PEP output, maximum</T>
      <rect x={324} y={110} width={310} height={118} rx={10} fill={C.fill} stroke={C.bad} strokeWidth={2} />
      <T x={479} y={132} anchor="middle" size={14} bold color={C.bad}>2.4 GHz Wi-Fi stations</T>
      <T x={479} y={170} anchor="middle" size={15} bold>No part of the band</T>
      <T x={479} y={192} anchor="middle" size={13} color={C.muted}>for talking to unlicensed users</T>
    </Diagram>
  )
}
