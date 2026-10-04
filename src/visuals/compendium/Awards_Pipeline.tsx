import { C, Diagram, Ln, T } from '../kit'

const STEPS = [
  { h: 'Work', d: ['Make the contact and', 'log it accurately'], c: C.signal },
  { h: 'Confirm', d: ['The other station logs', 'it too: card or LoTW'], c: C.current },
  { h: 'Apply', d: ['Submit to the award', "sponsor under its rules"], c: C.power },
  { h: 'Receive', d: ['Certificate, plaque', 'or listing online'], c: C.good },
]
const COLL = [
  { h: 'Entities', d: 'DXCC-style: separate entities' },
  { h: 'States', d: 'WAS-style: every US state' },
  { h: 'Continents', d: 'WAC-style: every continent' },
  { h: 'Places and refs', d: 'Islands, parks, summits, lighthouses' },
]

/** The path from a contact to a certificate, and the kinds of things awards ask you to collect. */
export function Awards_Pipeline() {
  const w = 140, gap = 20, x0 = 10
  return (
    <Diagram w={640} h={274}
      title="How an award works: you work a station, confirm the contact, apply to the award sponsor, and receive the award. Below, the four kinds of thing awards ask you to collect: entities, states, continents, and places or references."
      caption="Each program defines its own list, bands, modes and what counts as a confirmation. Check the current rules.">
      {STEPS.map((s, i) => {
        const x = x0 + i * (w + gap)
        return (
          <g key={s.h}>
            <rect x={x} y={8} width={w} height={96} rx={12} fill={C.fill} stroke={s.c} strokeWidth={2} />
            <T x={x + w / 2} y={30} anchor="middle" size={15} bold color={s.c}>{s.h}</T>
            <T x={x + w / 2} y={62} anchor="middle" size={12.5}>{s.d[0]}</T>
            <T x={x + w / 2} y={82} anchor="middle" size={12.5}>{s.d[1]}</T>
            {i < 3 && <Ln x1={x + w + 2} y1={56} x2={x + w + gap - 2} y2={56} color={C.muted} width={2.5} arrow />}
          </g>
        )
      })}
      <T x={14} y={130} size={13.5} bold color={C.muted}>What you collect</T>
      {COLL.map((c, i) => {
        const x = 10 + (i % 2) * 316, y = 148 + Math.floor(i / 2) * 62
        return (
          <g key={c.h}>
            <rect x={x} y={y} width={304} height={54} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
            <T x={x + 12} y={y + 17} size={13.5} bold>{c.h}</T>
            <T x={x + 12} y={y + 37} size={12.5} color={C.muted}>{c.d}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
