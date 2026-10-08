import { useState } from 'react'
import { C, Choice, Controls, Diagram, Lines, T } from '../kit'

type Status = 'coord' | 'not'

const OPTIONS: { value: Status; label: string }[] = [
  { value: 'coord', label: 'Coordinated' },
  { value: 'not', label: 'Not coordinated' },
]

function Repeater({ x, name, status }: { x: number; name: string; status: Status }) {
  const on = status === 'coord'
  const col = on ? C.good : C.resist
  return (
    <g>
      <g stroke={C.ink} strokeWidth={3} strokeLinecap="round" fill="none">
        <line x1={x} y1={72} x2={x} y2={30} />
        <polyline points={`${x - 12},44 ${x},30 ${x + 12},44`} />
      </g>
      <rect x={x - 52} y={72} width={104} height={50} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={x} y={91} anchor="middle" bold size={13.5}>{name}</T>
      <T x={x} y={109} anchor="middle" size={12} color={C.muted}>repeater</T>
      <rect x={x - 62} y={132} width={124} height={26} rx={13} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
      <T x={x} y={145} anchor="middle" bold size={12.5}>{on ? 'Coordinated' : 'Not coordinated'}</T>
    </g>
  )
}

function verdict(you: Status, other: Status): { head: string; lines: string[]; color: string } {
  if (you === other) {
    return {
      head: 'Equally and fully responsible',
      lines: ['Both licensees share the job of resolving the interference.', 'Neither has the rule on its side.'],
      color: C.signal,
    }
  }
  if (you === 'not') {
    return {
      head: 'You have primary responsibility',
      lines: ['The other repeater was recommended by a coordinator and yours', 'was not, so fixing the interference falls mainly on you.'],
      color: C.resist,
    }
  }
  return {
    head: "The other licensee has primary responsibility",
    lines: ['Yours was recommended by a coordinator and theirs was not, so', 'they have primary responsibility for resolving it.'],
    color: C.good,
  }
}

/** The 97.205(c) rule: who must fix harmful interference between two repeaters, by whether each was recommended by a coordinator. */
export function RepeaterFrequencyCoordination_Interference() {
  const [you, setYou] = useState<Status>('coord')
  const [other, setOther] = useState<Status>('not')
  const v = verdict(you, other)
  return (
    <>
      <Diagram w={640} h={316}
        title={`Two repeaters cause harmful interference to each other. Yours is ${you === 'coord' ? 'coordinated' : 'not coordinated'} and the other is ${other === 'coord' ? 'coordinated' : 'not coordinated'}. Result: ${v.head}.`}
        caption="Paraphrase of 47 CFR 97.205(c). It decides who must fix interference, not who may transmit.">
        <Repeater x={110} name="Your" status={you} />
        <Repeater x={530} name="Other" status={other} />
        <polyline points="190,98 235,98 255,76 285,120 315,76 345,120 375,76 395,98 450,98" fill="none" stroke={C.bad} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        <T x={320} y={150} anchor="middle" bold size={13} color={C.bad}>harmful interference</T>
        <rect x={20} y={176} width={600} height={124} rx={12} fill={C.fill} stroke={v.color} strokeWidth={3} />
        <T x={36} y={202} bold size={16} color={v.color}>{v.head}</T>
        <Lines x={36} y={232} lines={v.lines} lh={22} size={13.5} />
        <T x={36} y={284} size={12.5} color={C.muted}>Coordinated here means recommended by a frequency coordinator.</T>
      </Diagram>
      <Controls>
        <Choice label="Your repeater" options={OPTIONS.map((o) => ({ ...o, label: `Yours: ${o.label.toLowerCase()}` }))} value={you} onChange={setYou} />
        <Choice label="The other repeater" options={OPTIONS.map((o) => ({ ...o, label: `Other: ${o.label.toLowerCase()}` }))} value={other} onChange={setOther} />
      </Controls>
    </>
  )
}
