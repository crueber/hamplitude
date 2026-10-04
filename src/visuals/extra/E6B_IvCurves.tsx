import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Kind = 'si' | 'sch' | 'led' | 'zen'
const INFO: Record<Kind, { name: string; knee: number; drop: string; note: string; line2: string }> = {
  si: { name: 'Silicon junction', knee: 0.7, drop: 'about 0.7 V', note: 'General-purpose rectifier', line2: 'Fails from excess junction heat' },
  sch: { name: 'Schottky', knee: 0.3, drop: 'about 0.3 V', note: 'Lower drop: better power-supply', line2: 'rectifier, less wasted power' },
  led: { name: 'LED', knee: 2, drop: '2 V and up', note: 'Drop set by the band gap', line2: 'of the semiconductor material' },
  zen: { name: 'Zener', knee: 0.7, drop: 'forward 0.7 V', note: 'Run in reverse: constant voltage', line2: 'while current varies' },
}
const ZV = -5
const cur = (k: Kind, v: number) => {
  const f = Math.min(1, 0.04 * Math.exp((v - INFO[k].knee) / 0.1))
  const r = k === 'zen' ? -Math.min(1, 0.04 * Math.exp((ZV - v) / 0.12)) : 0
  return f + r
}

export function IvCurves() {
  const [k, setK] = useState<Kind>('si')
  const info = INFO[k]
  const x0 = 50, x1 = 340, y0 = 134, yTop = 30, yBot = 230
  const gx = (v: number) => x0 + ((v + 8) / 11) * (x1 - x0)
  const gy = (i: number) => y0 - i * (y0 - yTop - 4)
  const pts = Array.from({ length: 221 }, (_, n) => -8 + (n * 11) / 220)
    .map((v) => `${gx(v).toFixed(1)},${gy(cur(k, v)).toFixed(1)}`).join(' ')
  return (
    <>
      <Diagram w={640} h={262}
        title={`Current versus voltage for a ${info.name} diode. It starts conducting at a forward voltage of ${info.drop}.${k === 'zen' ? ' In reverse it conducts at a fixed breakdown voltage.' : ' In reverse it blocks.'}`}
        caption={k === 'zen' ? 'Zener: in reverse, voltage stays nearly fixed while current swings.' : 'The knee is the forward voltage drop. Below it, almost no current.'}>
        <Ln x1={x0} y1={y0} x2={x1} y2={y0} width={1.5} />
        <Ln x1={gx(0)} y1={yTop} x2={gx(0)} y2={yBot - 20} width={1.5} />
        <polyline points={pts} fill="none" stroke={C.current} strokeWidth={3} />
        <circle cx={gx(info.knee)} cy={y0} r={5} fill={C.power} />
        <T x={gx(info.knee)} y={y0 + 18} anchor="middle" size={12} bold color={C.power}>{k === 'zen' ? '0.7 V' : info.drop.replace('about ', '')}</T>
        {k === 'zen' && <circle cx={gx(ZV)} cy={y0} r={5} fill={C.power} />}
        {k === 'zen' && <T x={gx(ZV)} y={y0 - 16} anchor="middle" size={12} bold color={C.power}>breakdown</T>}
        <T x={x0} y={y0 + 40} size={12} color={C.muted}>reverse</T>
        <T x={x1} y={y0 + 40} anchor="end" size={12} color={C.muted}>forward</T>
        <T x={gx(0) - 8} y={yTop + 4} anchor="end" size={12} color={C.muted}>current</T>
        <T x={(x0 + x1) / 2} y={yBot} anchor="middle" size={12} color={C.muted}>voltage across the diode</T>

        <T x={360} y={50} bold size={17} color={C.ink}>{info.name}</T>
        <T x={360} y={82} size={14} color={C.muted}>Forward drop</T>
        <T x={360} y={106} size={20} bold color={C.power}>{info.drop}</T>
        <T x={360} y={150} size={14}>{info.note}</T>
        <T x={360} y={170} size={14}>{info.line2}</T>
      </Diagram>
      <Choice label="Diode type" value={k} onChange={setK} options={[{ value: 'si', label: 'Silicon' }, { value: 'sch', label: 'Schottky' }, { value: 'led', label: 'LED' }, { value: 'zen', label: 'Zener' }]} />
    </>
  )
}
