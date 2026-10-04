import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Wire, Battery, Resistor, fmt, useTime } from '../kit'

type Unknown = 'E' | 'I' | 'R'

/** Interactive Ohm's law: a live circuit plus the E-I-R triangle. */
export function OhmsLaw() {
  const [e, setE] = useState(12)
  const [r, setR] = useState(6)
  const [unknown, setUnknown] = useState<Unknown>('I')
  const i = e / r
  const { t, ref } = useTime(1)
  const W = 640, H = 270

  // current dots circulate around the loop; speed ∝ current
  const loop: [number, number][] = [[90, 70], [330, 70], [330, 210], [90, 210]]
  const perim = 240 + 140 + 240 + 140
  const dots = Array.from({ length: 16 }, (_, k) => {
    let d = ((((k / 16) * perim + t * i * 34) % perim) + perim) % perim
    for (let s = 0; s < 4; s++) {
      const [ax, ay] = loop[s]
      const [bx, by] = loop[(s + 1) % 4]
      const len = Math.hypot(bx - ax, by - ay)
      if (d <= len) return { x: ax + ((bx - ax) * d) / len, y: ay + ((by - ay) * d) / len }
      d -= len
    }
    return { x: 90, y: 70 }
  })

  const cover: Record<Unknown, string> = { E: 'E = I × R', I: 'I = E ÷ R', R: 'R = E ÷ I' }
  const calc: Record<Unknown, string> = {
    E: `${fmt(i)} × ${fmt(r)} = ${fmt(e)} V`,
    I: `${fmt(e)} ÷ ${fmt(r)} = ${fmt(i)} A`,
    R: `${fmt(e)} ÷ ${fmt(i)} = ${fmt(r)} Ω`,
  }
  const tri = (k: Unknown, x: number, y: number) => (
    <g key={k} onClick={() => setUnknown(k)} style={{ cursor: 'pointer' }} role="button" aria-label={`Solve for ${k}`}>
      <circle cx={x} cy={y} r={22} fill={unknown === k ? C.power : C.fill} stroke={unknown === k ? C.power : C.fill2} strokeWidth={2} />
      <T x={x} y={y} anchor="middle" bold size={20} color={unknown === k ? C.bg : k === 'E' ? C.voltage : k === 'I' ? C.current : C.resist}>{unknown === k ? '?' : k}</T>
    </g>
  )

  return (
    <>
      <Diagram w={W} h={H} title={`Circuit with ${e} volts across ${r} ohms drives ${fmt(i)} amperes`} svgRef={ref}
        caption="Tap E, I or R in the triangle to cover the one you want to find.">
        <Wire pts={[[90, 70], [330, 70], [330, 210], [90, 210], [90, 70]]} color={C.muted} width={2.5} />
        {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={4.5} fill={C.current} opacity={0.9} />)}
        <rect x={74} y={106} width={32} height={68} fill={C.bg} />
        <Battery x={90} y={140} rot={90} len={70} cells={1} color={C.voltage} />
        <T x={60} y={140} anchor="end" bold color={C.voltage}>{e} V</T>
        <rect x={298} y={106} width={64} height={68} fill={C.bg} />
        <Resistor x={330} y={140} rot={90} len={90} color={C.resist} />
        <T x={372} y={140} bold color={C.resist}>{r} Ω</T>
        <T x={210} y={52} anchor="middle" bold color={C.current}>{fmt(i)} A</T>
        <Ln x1={160} y1={90} x2={260} y2={90} color={C.current} width={2.5} arrow />

        {/* triangle */}
        <g transform="translate(60,0)">
          <polygon points="470,52 410,160 530,160" fill="none" stroke={C.fill2} strokeWidth={3} />
          <Ln x1={420} y1={120} x2={520} y2={120} color={C.fill2} width={2} />
          {tri('E', 470, 90)}
          {tri('I', 440, 148)}
          {tri('R', 500, 148)}
          <T x={470} y={196} anchor="middle" bold size={18} mono color={C.ink}>{cover[unknown]}</T>
          <T x={470} y={222} anchor="middle" size={14} mono color={C.muted}>{calc[unknown]}</T>
        </g>
      </Diagram>
      <Controls>
        <Slider label="Voltage (E)" value={e} min={1} max={24} onChange={setE} format={(v) => `${v} V`} color="var(--d-voltage)" />
        <Slider label="Resistance (R)" value={r} min={1} max={30} onChange={setR} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Readout label="Current (I = E ÷ R)" value={fmt(i)} unit="A" color="var(--d-current)" />
      </Controls>
    </>
  )
}
