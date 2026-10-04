import { useState } from 'react'
import { C, Choice, Diagram, Ln, Lines, T } from '../kit'

type Kind = 'gamma' | 'hairpin' | 'stub' | 'tower'

const W = 640, H = 300

/** Series capacitor drawn as two plates on a vertical wire centred at (x, y). */
function Cap({ x, y, color = C.power }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <Ln x1={x} y1={y - 12} x2={x} y2={y - 4} color={C.ink} width={3} />
      <Ln x1={x - 12} y1={y - 4} x2={x + 12} y2={y - 4} color={color} width={4} />
      <Ln x1={x - 12} y1={y + 4} x2={x + 12} y2={y + 4} color={color} width={4} />
      <Ln x1={x} y1={y + 4} x2={x} y2={y + 12} color={C.ink} width={3} />
    </g>
  )
}

function Gamma() {
  return (
    <>
      <Ln x1={80} y1={80} x2={560} y2={80} color={C.resist} width={8} />
      <T x={92} y={58} size={13} bold color={C.resist}>driven element</T>
      <Ln x1={320} y1={80} x2={320} y2={215} color={C.muted} width={10} />
      <T x={306} y={150} anchor="end" size={13} bold color={C.muted}>boom</T>
      <Ln x1={376} y1={285} x2={376} y2={225} color={C.ink} width={9} />
      <Ln x1={370} y1={222} x2={320} y2={222} color={C.ink} width={3} />
      <T x={308} y={246} anchor="end" size={13} bold>shield to the element center</T>
      <Ln x1={382} y1={222} x2={382} y2={166} color={C.ink} width={3} />
      <Cap x={382} y={154} />
      <Ln x1={382} y1={142} x2={382} y2={116} color={C.ink} width={3} />
      <Ln x1={382} y1={116} x2={452} y2={116} color={C.ink} width={4} />
      <Ln x1={452} y1={116} x2={452} y2={80} color={C.ink} width={4} />
      <T x={398} y={160} size={13} bold color={C.power}>series C</T>
      <Lines x={470} y={112} lines={['gamma rod, clamped', 'a fraction of a', 'wavelength off center']} lh={17} size={13} bold />
    </>
  )
}

function Hairpin() {
  return (
    <>
      <Ln x1={80} y1={110} x2={306} y2={110} color={C.resist} width={8} />
      <Ln x1={334} y1={110} x2={560} y2={110} color={C.resist} width={8} />
      <T x={92} y={88} size={13} bold color={C.resist}>driven element (split)</T>
      <path d="M306,110 L306,64 L334,64 L334,110" fill="none" stroke={C.power} strokeWidth={5} strokeLinejoin="round" />
      <T x={320} y={44} anchor="middle" size={13} bold color={C.power}>hairpin: an inductance across the feed point</T>
      <rect x={298} y={126} width={44} height={26} rx={4} fill={C.fill2} stroke={C.muted} strokeWidth={2} strokeDasharray="4 3" />
      <T x={290} y={139} anchor="end" size={13} bold color={C.muted}>insulator</T>
      <Ln x1={320} y1={152} x2={320} y2={262} color={C.muted} width={10} />
      <T x={334} y={252} size={13} bold color={C.muted}>boom</T>
      <Ln x1={420} y1={288} x2={420} y2={236} color={C.ink} width={9} />
      <path d="M414,236 L414,196 L306,114" fill="none" stroke={C.ink} strokeWidth={3} />
      <path d="M426,236 L426,196 L334,114" fill="none" stroke={C.ink} strokeWidth={3} />
      <Lines x={440} y={176} lines={['coax feeds the two', 'halves, not the boom']} lh={17} size={13} bold />
    </>
  )
}

function Stub() {
  return (
    <>
      <Ln x1={80} y1={78} x2={310} y2={78} color={C.resist} width={8} />
      <Ln x1={330} y1={78} x2={560} y2={78} color={C.resist} width={8} />
      <T x={92} y={56} size={13} bold color={C.resist}>antenna</T>
      <Ln x1={312} y1={84} x2={312} y2={290} color={C.ink} width={4} />
      <Ln x1={328} y1={84} x2={328} y2={290} color={C.ink} width={4} />
      <T x={300} y={270} anchor="end" size={13} bold>feed line</T>
      <circle cx={328} cy={176} r={5} fill={C.ink} />
      <circle cx={312} cy={226} r={5} fill={C.ink} />
      <Ln x1={328} y1={176} x2={392} y2={176} color={C.ink} width={4} />
      <path d="M312,226 L440,226 L440,208" fill="none" stroke={C.ink} strokeWidth={4} />
      <rect x={392} y={150} width={96} height={58} rx={8} fill={C.fill} stroke={C.power} strokeWidth={3} />
      <T x={440} y={172} anchor="middle" size={13} bold color={C.power}>stub</T>
      <T x={440} y={192} anchor="middle" size={12} color={C.muted}>short line piece</T>
      <Lines x={504} y={168} lines={['connected in', 'parallel with the', 'feed line, at or', 'near the feed point']} lh={17} size={13} bold />
    </>
  )
}

function Tower() {
  return (
    <>
      <Ln x1={230} y1={30} x2={230} y2={250} color={C.muted} width={12} />
      <T x={214} y={64} anchor="end" size={13} bold color={C.muted}>grounded tower</T>
      <Ln x1={200} y1={252} x2={260} y2={252} color={C.ink} width={3} />
      <Ln x1={208} y1={260} x2={252} y2={260} color={C.ink} width={3} />
      <Ln x1={216} y1={268} x2={244} y2={268} color={C.ink} width={3} />
      <Ln x1={296} y1={96} x2={296} y2={170} color={C.ink} width={4} />
      <Ln x1={236} y1={96} x2={296} y2={96} color={C.ink} width={4} />
      <T x={312} y={92} size={13} bold>gamma rod, strapped to the tower</T>
      <Cap x={296} y={182} />
      <Ln x1={296} y1={194} x2={296} y2={224} color={C.ink} width={3} />
      <Ln x1={296} y1={224} x2={350} y2={224} color={C.ink} width={3} />
      <T x={314} y={184} size={13} bold color={C.power}>series C</T>
      <Ln x1={600} y1={236} x2={352} y2={236} color={C.ink} width={9} />
      <Ln x1={350} y1={242} x2={236} y2={242} color={C.ink} width={3} />
      <T x={470} y={268} anchor="middle" size={13} bold>shield to the tower base</T>
      <T x={470} y={212} anchor="middle" size={13} bold color={C.muted}>coax</T>
    </>
  )
}

const FACTS: Record<Kind, string[]> = {
  gamma: ['Gamma match: shield to the center of the element, center conductor', 'out to a point a fraction of a wavelength to one side. The series capacitor cancels inductive reactance.'],
  hairpin: ['Beta (hairpin) match: the driven element is insulated from the boom, split, and fed with a hairpin.', 'It needs a capacitive feed point (element shorter than ½ λ), which the hairpin inductance cancels.'],
  stub: ['Stub match: a short length of transmission line in parallel with the feed line, at or near the feed point.', ''],
  tower: ['A gamma match also shunt-feeds a grounded tower at its base.', ''],
}
const TITLES: Record<Kind, string> = {
  gamma: 'Gamma match on a Yagi, seen from above',
  hairpin: 'Beta or hairpin match on a Yagi, seen from above',
  stub: 'Stub match across a feed point',
  tower: 'Gamma match shunt-feeding a grounded tower',
}

/** Four matching systems side by side, one at a time. */
export function MatchSystems() {
  const [k, setK] = useState<Kind>('gamma')
  return (
    <>
      <Diagram w={W} h={H} title={TITLES[k]} caption={FACTS[k].filter(Boolean).join(' ')}>
        {k === 'gamma' && <Gamma />}
        {k === 'hairpin' && <Hairpin />}
        {k === 'stub' && <Stub />}
        {k === 'tower' && <Tower />}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Matching system" value={k} onChange={setK}
          options={[{ value: 'gamma', label: 'Gamma' }, { value: 'hairpin', label: 'Beta / hairpin' }, { value: 'stub', label: 'Stub' }, { value: 'tower', label: 'Gamma on a tower' }]} />
      </div>
    </>
  )
}
