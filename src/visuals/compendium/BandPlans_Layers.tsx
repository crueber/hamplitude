import { C, Diagram, Ln, T } from '../kit'

const SEGS = [
  { t: 'CW', sub: 'and weak signal', w: 0.24, c: C.signal },
  { t: 'Digital', sub: 'data modes', w: 0.2, c: C.resist },
  { t: 'Phone', sub: 'SSB voice', w: 0.56, c: C.current },
]

/** The two layers on a band: FCC limits (mandatory) and the band plan (voluntary), drawn for a generic HF band. */
export function BandPlans_Layers() {
  const x0 = 130, W = 490
  let acc = 0
  return (
    <Diagram w={640} h={236} title="Two layers on every amateur band. The FCC rules set the band edges and which emissions are allowed, and are mandatory. The band plan is a voluntary agreement that places CW and weak-signal work lowest, digital modes next and phone highest, as an illustration of a typical HF band."
      caption="Typical shape of an HF band plan. Illustrative: the exact layout differs on every band.">
      <T x={14} y={44} size={14} bold color={C.bad}>FCC rules</T>
      <T x={14} y={64} size={12.5} color={C.muted}>mandatory</T>
      <rect x={x0} y={24} width={W} height={52} rx={8} fill={C.fill} stroke={C.bad} strokeWidth={2.2} />
      <T x={x0 + W / 2} y={44} anchor="middle" size={13.5} bold>Band edges, power, who may use which part</T>
      <T x={x0 + W / 2} y={63} anchor="middle" size={12.5} color={C.muted}>and which emissions are allowed where</T>

      <T x={14} y={126} size={14} bold color={C.signal}>Band plan</T>
      <T x={14} y={146} size={12.5} color={C.muted}>voluntary</T>
      {SEGS.map((s) => {
        const x = x0 + acc * W
        acc += s.w
        return (
          <g key={s.t}>
            <rect x={x + 1} y={106} width={s.w * W - 2} height={52} rx={6} fill={s.c} fillOpacity={0.2} stroke={s.c} strokeWidth={2} />
            <T x={x + (s.w * W) / 2} y={124} anchor="middle" size={14} bold>{s.t}</T>
            <T x={x + (s.w * W) / 2} y={143} anchor="middle" size={12} color={C.muted}>{s.sub}</T>
          </g>
        )
      })}
      <Ln x1={x0} y1={84} x2={x0} y2={100} color={C.muted} dash="4 4" width={1.5} />
      <Ln x1={x0 + W} y1={84} x2={x0 + W} y2={100} color={C.muted} dash="4 4" width={1.5} />
      <Ln x1={x0} y1={190} x2={x0 + W} y2={190} color={C.muted} width={2} arrow />
      <T x={x0} y={210} size={12.5} color={C.muted}>lower edge</T>
      <T x={x0 + W} y={210} anchor="end" size={12.5} color={C.muted}>upper edge</T>
      <T x={x0 + W / 2} y={210} anchor="middle" size={12.5} bold color={C.muted}>frequency</T>
    </Diagram>
  )
}
