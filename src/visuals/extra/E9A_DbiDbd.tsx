import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

const MIN = -3, MAX = 14, X0 = 40, X1 = 600
const X = (v: number) => X0 + ((v - MIN) / (MAX - MIN)) * (X1 - X0)

/** dBi and dBd are the same scale with a 2.15 dB shift: the dipole is +2.15 dBi. */
export function E9A_DbiDbd() {
  const [dbi, setDbi] = useState(6)
  const dbd = dbi - 2.15
  const yi = 92, yd = 178
  return (
    <>
      <Diagram w={640} h={276} title={`Two gain rulers offset by 2.15 dB. An antenna with ${dbi} dBi gain has ${dbd.toFixed(2)} dBd gain, because a half-wave dipole is 2.15 dBi.`}
        caption="Same antenna, same point on the line. The dBd ruler is just the dBi ruler slid by 2.15 dB.">
        <T x={X0} y={26} size={14} bold color={C.signal}>dBi: compared with isotropic</T>
        <Ln x1={X0} y1={yi} x2={X1} y2={yi} color={C.muted} width={3} />
        {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).filter((v) => v % 2 === 0).map((v) => (
          <g key={v}><Ln x1={X(v)} y1={yi - 6} x2={X(v)} y2={yi + 6} color={C.muted} width={2} /><T x={X(v)} y={yi - 20} anchor="middle" size={12} mono color={C.muted}>{v}</T></g>
        ))}
        <T x={X0} y={yd + 76} size={14} bold color={C.resist}>dBd: compared with a half-wave dipole</T>
        <Ln x1={X0} y1={yd} x2={X1} y2={yd} color={C.muted} width={3} />
        {Array.from({ length: 16 }, (_, i) => i - 2).filter((v) => v % 2 === 0 && X(v + 2.15) <= X1).map((v) => (
          <g key={v}><Ln x1={X(v + 2.15)} y1={yd - 6} x2={X(v + 2.15)} y2={yd + 6} color={C.muted} width={2} /><T x={X(v + 2.15)} y={yd + 22} anchor="middle" size={12} mono color={C.muted}>{v}</T></g>
        ))}
        {/* references */}
        <circle cx={X(0)} cy={yi} r={7} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <T x={X(0)} y={yi + 24} anchor="middle" size={12} bold>isotropic = 0 dBi</T>
        <circle cx={X(2.15)} cy={yd} r={7} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <T x={X(2.15)} y={yd - 22} anchor="middle" size={12} bold>dipole = 0 dBd</T>
        <Ln x1={X(0)} y1={yi + 38} x2={X(2.15)} y2={yd - 38} color={C.muted} width={1.5} dash="3 4" />
        <T x={X(2.15) + 22} y={136} size={13} color={C.muted}>dipole = +2.15 dBi</T>
        {/* antenna */}
        <Ln x1={X(dbi)} y1={yi} x2={X(dbi)} y2={yd} color={C.good} width={3} dash="5 4" />
        <circle cx={X(dbi)} cy={yi} r={9} fill={C.good} stroke={C.bg} strokeWidth={3} />
        <circle cx={X(dbi)} cy={yd} r={9} fill={C.good} stroke={C.bg} strokeWidth={3} />
        <T x={Math.min(X(dbi), 560)} y={yi - 44} anchor="middle" size={15} bold color={C.good}>{dbi} dBi</T>
        <T x={Math.min(X(dbi), 560)} y={yd + 46} anchor="middle" size={15} bold color={C.good}>{dbd.toFixed(2)} dBd</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna gain (dBi)" value={dbi} min={0} max={12} step={0.5} onChange={setDbi} format={(v) => `${v} dBi`} color="var(--d-good)" />
      </Controls>
    </>
  )
}
