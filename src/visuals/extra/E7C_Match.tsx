import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const STEPS = [
  { key: 0, label: '1. The load', r: 25, x: 40, say: 'Load = 25 Ω resistance + 40 Ω inductive reactance. It is complex, and not 50 Ω.' },
  { key: 1, label: '2. Cancel the reactance', r: 25, x: 0, say: 'Add equal and opposite reactance (−40 Ω): the reactive part cancels. 25 Ω, purely resistive.' },
  { key: 2, label: '3. Set the resistance', r: 50, x: 0, say: 'The network also transforms the resistance to the value you want: 50 Ω.' },
] as const

/** An impedance-matching network cancels the reactance and sets the resistance. */
export function Match() {
  const [s, setS] = useState(0)
  const st = STEPS[s]
  const ox = 70, oy = 190, sx = 4.4, sy = 2.1 // origin and px per ohm
  const px = (r: number) => ox + r * sx, py = (x: number) => oy - x * sy
  return (
    <>
      <Diagram w={640} h={270} title={`Impedance plane. ${st.say}`} caption="A matching network does two jobs: cancel the reactance, then set the resistance.">
        <rect x={20} y={20} width={410} height={230} rx={10} fill={C.fill} />
        <Ln x1={ox - 10} y1={oy} x2={ox + 340} y2={oy} color={C.muted} width={2} arrow />
        <Ln x1={ox} y1={oy + 10} x2={ox} y2={36} color={C.muted} width={2} arrow />
        <T x={ox + 340} y={oy + 16} anchor="end" size={12} color={C.resist}>resistance R (Ω)</T>
        <T x={ox + 8} y={34} size={12} color={C.power}>reactance X (Ω)</T>
        <T x={ox - 6} y={oy + 14} anchor="end" size={12} color={C.muted}>0</T>
        <Ln x1={px(50)} y1={oy - 4} x2={px(50)} y2={oy + 4} color={C.muted} width={2} />
        <T x={px(50)} y={oy + 16} anchor="middle" size={12} color={C.muted}>50</T>
        {/* target */}
        <circle cx={px(50)} cy={oy} r={11} fill="none" stroke={C.good} strokeWidth={2} strokeDasharray="4 3" />
        {s !== 2 && <T x={px(50)} y={oy - 24} anchor="middle" size={12} bold color={C.good}>goal: 50 + j0</T>}
        {/* start ghost */}
        {s > 0 && <circle cx={px(25)} cy={py(40)} r={6} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="3 3" />}
        {s === 1 && <Ln x1={px(25)} y1={py(40) + 8} x2={px(25)} y2={oy - 8} color={C.power} width={3} arrow />}
        {s === 2 && <Ln x1={px(25) + 8} y1={oy} x2={px(50) - 16} y2={oy} color={C.resist} width={3} arrow />}
        <circle cx={px(st.r)} cy={py(st.x)} r={8} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <T x={px(st.r) + (s === 2 ? 0 : 14)} y={py(st.x) - (st.x ? 0 : 22)} anchor={s === 2 ? 'middle' : 'start'} size={13} bold color={C.signal}>{`${s === 2 ? 'matched: ' : ''}${st.r} ${st.x ? '+ j' + st.x : '+ j0'} Ω`}</T>
        {/* explanation */}
        <rect x={446} y={20} width={184} height={230} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={458} y={42} size={14} bold color={C.signal}>{st.label}</T>
        {wrap(st.say, 22).map((l, i) => <T key={i} x={458} y={68 + i * 18} size={13}>{l}</T>)}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Step" value={s} onChange={setS} options={STEPS.map((x, i) => ({ value: i, label: x.label }))} />
      </div>
    </>
  )
}

function wrap(s: string, n: number): string[] {
  const out: string[] = []
  let cur = ''
  for (const w of s.split(' ')) {
    if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w } else cur = (cur + ' ' + w).trim()
  }
  if (cur) out.push(cur)
  return out
}
