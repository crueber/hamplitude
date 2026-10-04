import { C, Diagram, T } from '../kit'

const W = 120, G = 8
const tx = (i: number) => 6 + i * (W + G)

/** Face-on sketches of the connectors in the pool, each with what it is used for. */
export function ConnectorGallery() {
  const tiles: { n: string; col: string; use: string[]; icon: React.ReactNode }[] = [
    { n: 'RCA phono', col: C.muted, use: ['low frequency', 'and DC signals', 'not for RF'], icon: (
      <g><circle r={26} fill={C.fill2} stroke={C.ink} strokeWidth={2.4} /><circle r={17} fill="none" stroke={C.ink} strokeWidth={2} /><circle r={5} fill={C.ink} /></g>) },
    { n: 'PL-259', col: C.signal, use: ['HF and VHF', 'threaded', 'mates SO-239'], icon: (
      <g><circle r={28} fill={C.fill2} stroke={C.signal} strokeWidth={2.4} strokeDasharray="3 4" /><circle r={21} fill="none" stroke={C.signal} strokeWidth={2.4} /><circle r={5} fill={C.ink} /></g>) },
    { n: 'BNC', col: C.resist, use: ['bayonet twist-lock', 'low SWR to', 'about 4 GHz'], icon: (
      <g><circle r={22} fill={C.fill2} stroke={C.resist} strokeWidth={2.4} /><circle r={5} fill={C.ink} />
        <circle cx={-22} cy={0} r={4.5} fill={C.resist} /><circle cx={22} cy={0} r={4.5} fill={C.resist} /></g>) },
    { n: 'SMA', col: C.power, use: ['small, threaded', 'several GHz', 'small gear'], icon: (
      <g><polygon points="0,-17 15,-8.5 15,8.5 0,17 -15,8.5 -15,-8.5" fill={C.fill2} stroke={C.power} strokeWidth={2.4} /><circle r={8} fill="none" stroke={C.power} strokeWidth={2} /><circle r={3} fill={C.ink} /></g>) },
    { n: 'Type N', col: C.good, use: ['moisture-resistant', 'threaded', 'useful to 10 GHz'], icon: (
      <g><circle r={25} fill={C.fill2} stroke={C.good} strokeWidth={2.4} strokeDasharray="3 4" /><circle r={17} fill="none" stroke={C.good} strokeWidth={2.4} /><circle r={5} fill={C.ink} /></g>) },
  ]
  return (
    <Diagram w={640} h={220} title="Five connectors. RCA phono for low frequency and DC signals. PL-259 for HF and VHF. BNC bayonet connector with low SWR to about 4 gigahertz. SMA small threaded connector for signals up to several gigahertz. Type N moisture-resistant connector useful to 10 gigahertz."
      caption="Match the connector to the job: DC and audio, HF and VHF, or microwave.">
      {tiles.map((t, i) => (
        <g key={t.n}>
          <rect x={tx(i)} y={6} width={W} height={196} rx={12} fill={C.fill} />
          <g transform={`translate(${tx(i) + W / 2},58)`}>{t.icon}</g>
          <T x={tx(i) + W / 2} y={108} anchor="middle" bold size={15} color={t.col}>{t.n}</T>
          {t.use.map((l, k) => <T key={k} x={tx(i) + W / 2} y={134 + k * 19} anchor="middle" size={12} color={k === 0 ? C.ink : C.muted} bold={k === 0}>{l}</T>)}
        </g>
      ))}
    </Diagram>
  )
}
