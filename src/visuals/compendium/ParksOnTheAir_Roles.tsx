import { C, Diagram, Ln, T } from '../kit'

/** The two roles in a park activation: the activator in the park, and hunters at home or elsewhere, linked by spotting and logs. */
export function ParksOnTheAir_Roles() {
  const hunters = [{ x: 340, y: 176, n: 'Hunter at home' }, { x: 340, y: 216, n: 'Hunter in a vehicle' }, { x: 340, y: 256, n: 'Hunter in another park' }]
  return (
    <Diagram w={640} h={300}
      title="A park activation: the activator operates a portable station inside a park and calls CQ; hunters at home, in a vehicle or in another park answer. The activator's frequency is posted as a spot on an online spotting service so hunters can find it, and everyone's logs are uploaded afterwards."
      caption="Illustrative. Program rules decide what counts as a park, an activation and a valid contact.">
      {/* park */}
      <rect x={10} y={30} width={248} height={260} rx={16} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} strokeDasharray="6 5" />
      <T x={24} y={50} size={14.5} bold color={C.good}>The park</T>
      {[[40, 258], [80, 268], [226, 262]].map(([x, y], i) => (
        <g key={i}><Ln x1={x} y1={y} x2={x} y2={y - 22} color={C.good} width={4} /><circle cx={x} cy={y - 30} r={13} fill={C.good} fillOpacity={0.45} /></g>
      ))}
      <rect x={96} y={170} width={96} height={58} rx={8} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={144} y={190} anchor="middle" size={13} bold color={C.signal}>Activator</T>
      <T x={144} y={210} anchor="middle" size={12.5} color={C.muted}>radio + battery</T>
      <Ln x1={144} y1={170} x2={144} y2={86} color={C.signal} width={3} />
      <Ln x1={100} y1={86} x2={188} y2={86} color={C.signal} width={3} />
      <T x={144} y={72} anchor="middle" size={12.5} color={C.muted}>wire antenna</T>
      {/* spot service */}
      <rect x={284} y={44} width={134} height={58} rx={29} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={351} y={65} anchor="middle" size={13} bold color={C.power}>Online spots</T>
      <T x={351} y={84} anchor="middle" size={12.5} color={C.muted}>"on 14.2, SSB"</T>
      <Ln x1={192} y1={190} x2={300} y2={106} color={C.power} width={2} arrow dash="4 4" />
      <T x={272} y={140} size={12.5} color={C.muted}>posts a spot</T>
      {/* hunters */}
      {hunters.map((h, i) => (
        <g key={h.n}>
          <circle cx={h.x} cy={h.y} r={11} fill={C.current} />
          <T x={h.x + 18} y={h.y} size={12.5}>{h.n}</T>
          <Ln x1={192} y1={180 + i * 20} x2={h.x - 14} y2={h.y} color={C.signal} width={2} arrow="both" dash="3 4" />
        </g>
      ))}
      <Ln x1={400} y1={102} x2={400} y2={158} color={C.power} width={2} arrow dash="4 4" />
      <T x={412} y={130} size={12.5} color={C.muted}>hunters find the spot</T>
    </Diagram>
  )
}
