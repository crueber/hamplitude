import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

/** A generator belongs in a well-ventilated area (carbon monoxide). Solder contains lead: wash your hands. */
export function Hazards() {
  const [outside, setOutside] = useState(true)
  const { t, ref } = useTime(0.6)
  const col = outside ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={300} svgRef={ref} title="Generator: run it where there is plenty of ventilation, not in a closed space where exhaust fumes build up. Lead-tin solder: lead can reach food if you do not wash your hands after handling it."
        caption="Exhaust gas is poisonous. Lead from solder rides on your hands.">
        <T x={20} y={22} size={15} bold>Emergency generator</T>
        <rect x={20} y={40} width={300} height={200} rx={10} fill="none" stroke={outside ? C.muted : C.ink} strokeWidth={outside ? 1.5 : 4} strokeDasharray={outside ? '6 5' : undefined} />
        {!outside && <rect x={22} y={42} width={296} height={196} rx={8} fill={C.bad} fillOpacity={0.12} />}
        <T x={34} y={58} size={12} bold color={C.muted}>{outside ? 'open air' : 'closed garage'}</T>
        <rect x={60} y={150} width={100} height={60} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
        <T x={110} y={180} anchor="middle" size={14} bold>Generator</T>
        {[0, 1, 2].map((i) => {
          const p = (t * 0.5 + i / 3) % 1
          const x = 166 + p * (outside ? 130 : 40)
          return <circle key={i} cx={x} cy={170 - p * 16} r={6 + p * (outside ? 9 : 6)} fill={col} fillOpacity={0.4 * (1 - p) + 0.12} />
        })}
        <T x={170} y={226} size={13} bold color={col}>{outside ? 'fumes disperse' : 'fumes build up'}</T>
        <Ln x1={340} y1={30} x2={340} y2={250} color={C.fill2} width={2} />
        <T x={360} y={22} size={15} bold>Lead-tin solder</T>
        <rect x={360} y={78} width={74} height={64} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
        <T x={397} y={110} anchor="middle" size={13} bold>solder</T>
        <Ln x1={438} y1={110} x2={468} y2={110} color={C.bad} width={3} arrow />
        <circle cx={500} cy={110} r={26} fill={C.resist} fillOpacity={0.3} stroke={C.resist} strokeWidth={2.5} />
        <T x={500} y={110} anchor="middle" size={13} bold>hands</T>
        <Ln x1={500} y1={140} x2={500} y2={172} color={C.bad} width={3} arrow />
        <rect x={462} y={176} width={76} height={34} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <T x={500} y={193} anchor="middle" size={13} bold>food</T>
        <T x={470} y={232} anchor="middle" size={13} bold color={C.bad}>lead reaches food</T>
        <T x={470} y={254} anchor="middle" size={13} bold color={C.good}>wash hands first</T>
        <T x={20} y={284} size={13} color={C.muted}>Both dangers are quiet: you cannot see fumes or lead.</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Generator location" value={outside ? 'out' : 'in'} onChange={(v) => setOutside(v === 'out')} options={[{ value: 'out', label: 'Well ventilated' }, { value: 'in', label: 'Closed space' }]} />
      </div>
    </>
  )
}
