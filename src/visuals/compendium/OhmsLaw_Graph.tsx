import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const RS = [5, 10, 20]
const EMAX = 24, IMAX = 5

/** Current against voltage for three resistors: each is a straight line, and a bigger resistance is a shallower line. */
export function OhmsLaw_Graph() {
  const [e, setE] = useState(12)
  const x0 = 70, x1 = 390, y0 = 240, y1 = 30
  const px = (v: number) => x0 + ((x1 - x0) * v) / EMAX
  const py = (i: number) => y0 - ((y0 - y1) * i) / IMAX
  return (
    <>
      <Diagram w={640} h={300}
        title={`Current against voltage for 5, 10 and 20 ohm resistors. At ${e} volts they carry ${fmt(e / 5)}, ${fmt(e / 10)} and ${fmt(e / 20)} amperes. Each is a straight line; a larger resistance gives a shallower line.`}
        caption="Double the voltage and the current doubles. Double the resistance and the current halves.">
        {[0, 6, 12, 18, 24].map((v) => (
          <g key={v}>
            <Ln x1={px(v)} y1={y0} x2={px(v)} y2={y1} color={C.fill2} width={1} />
            <T x={px(v)} y={y0 + 16} anchor="middle" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <Ln x1={x0} y1={py(i)} x2={x1} y2={py(i)} color={C.fill2} width={1} />
            <T x={x0 - 10} y={py(i)} anchor="end" size={12} color={C.muted}>{i}</T>
          </g>
        ))}
        <Ln x1={x0} y1={y0} x2={x1} y2={y0} color={C.muted} width={2} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1} color={C.muted} width={2} />
        <T x={(x0 + x1) / 2} y={y0 + 38} anchor="middle" size={13} bold color={C.voltage}>Voltage E (volts)</T>
        <T x={28} y={(y0 + y1) / 2} anchor="middle" size={13} bold color={C.current} transform={`rotate(-90 28 ${(y0 + y1) / 2})`}>Current I (amperes)</T>

        {RS.map((r) => (
          <g key={r}>
            <Ln x1={x0} y1={y0} x2={px(EMAX)} y2={py(EMAX / r)} color={C.resist} width={3} />
            <T x={px(EMAX) + 8} y={py(EMAX / r)} size={13} bold color={C.resist}>{r} Ω</T>
          </g>
        ))}
        <Ln x1={px(e)} y1={y0} x2={px(e)} y2={y1} color={C.voltage} width={2} dash="5 5" />
        {RS.map((r) => <circle key={r} cx={px(e)} cy={py(e / r)} r={6} fill={C.current} stroke={C.bg} strokeWidth={2} />)}

        <T x={450} y={44} size={13} bold color={C.muted}>At {e} V:</T>
        {RS.map((r, k) => (
          <g key={r}>
            <T x={450} y={96 + k * 56} size={13} bold color={C.resist}>{r} Ω</T>
            <T x={450} y={118 + k * 56} size={14} mono>{e} ÷ {r} = {fmt(e / r)} A</T>
          </g>
        ))}
      </Diagram>
      <Controls>
        <Slider label="Voltage (E)" value={e} min={0} max={EMAX} onChange={setE} format={(v) => `${v} V`} color="var(--d-voltage)" />
        <Readout label="Current through 10 Ω" value={fmt(e / 10)} unit="A" color="var(--d-current)" />
      </Controls>
    </>
  )
}
