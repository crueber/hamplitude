import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** A CMOS inverter switches at about half the supply, so a signal swings well clear of the threshold on both sides. */
export function CmosThreshold() {
  const [vcc, setVcc] = useState(5)
  const [vin, setVin] = useState(1)
  const th = vcc / 2
  const hi = vin > th
  const x0 = 70, x1 = 330, y0 = 50, y1 = 200
  const gx = (v: number) => x0 + (v / vcc) * (x1 - x0)
  const gy = (v: number) => y1 - (v / vcc) * (y1 - y0)
  const curve = Array.from({ length: 121 }, (_, n) => (n / 120) * vcc).map((v) => {
    const out = vcc / (1 + Math.exp((v - th) * 6)) // steep: about half the supply
    return `${gx(v).toFixed(1)},${gy(out).toFixed(1)}`
  }).join(' ')
  const out = vcc / (1 + Math.exp((vin - th) * 6))
  return (
    <>
      <Diagram w={640} h={250}
        title={`A CMOS inverter on a ${vcc} volt supply switches at about ${fmt(th)} volts, half the supply. An input of ${vin} volts reads as ${hi ? 'high' : 'low'}.`}
        caption="The switching threshold sits near half the supply, so noise on the input or the supply has to be large to flip it.">
        <rect x={x0} y={gy(vcc)} width={gx(th) - x0} height={y1 - gy(vcc)} fill={C.bad} opacity={0.1} />
        <rect x={gx(th)} y={gy(vcc)} width={gx(vcc) - gx(th)} height={y1 - gy(vcc)} fill={C.good} opacity={0.1} />
        <Ln x1={x0} y1={y1} x2={x1} y2={y1} width={1.5} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1} width={1.5} />
        <polyline points={curve} fill="none" stroke={C.current} strokeWidth={3} />
        <Ln x1={gx(th)} y1={gy(vcc)} x2={gx(th)} y2={y1} color={C.power} width={2} dash="5 4" />
        <circle cx={gx(vin)} cy={gy(out)} r={6} fill={C.voltage} />
        <T x={gx(th)} y={gy(vcc) - 10} anchor="middle" size={12} bold color={C.power}>threshold ≈ half of supply</T>
        <T x={x0 + 4} y={y1 + 18} size={12} color={C.muted}>0 V</T>
        <T x={gx(vcc)} y={y1 + 18} anchor="end" size={12} color={C.muted}>{vcc} V (supply)</T>
        <T x={(x0 + x1) / 2 + 20} y={y1 + 38} anchor="middle" size={12} color={C.muted}>input voltage</T>
        <T x={x0 - 6} y={y0 + 6} anchor="end" size={12} color={C.muted}>output</T>
        <T x={(x0 + gx(th)) / 2} y={gy(vcc) + 100} anchor="middle" size={13} bold color={C.bad}>reads as 0</T>
        <T x={(gx(th) + gx(vcc)) / 2} y={gy(vcc) + 100} anchor="middle" size={13} bold color={C.good}>reads as 1</T>

        <T x={540} y={50} anchor="middle" bold size={14}>Power drawn (not to scale)</T>
        {[['CMOS', 0.12, C.good], ['NMOS', 0.85, C.muted], ['Schottky TTL', 0.85, C.muted], ['ECL', 0.85, C.muted]].map(([n, v, c], i) => (
          <g key={n as string}>
            <T x={470} y={86 + i * 34} anchor="end" size={13} bold={i === 0}>{n as string}</T>
            <rect x={480} y={74 + i * 34} width={(v as number) * 140} height={22} rx={4} fill={c as string} opacity={i === 0 ? 0.9 : 0.5} />
          </g>
        ))}
        <T x={540} y={226} anchor="middle" size={12} color={C.muted}>CMOS draws the least</T>
      </Diagram>
      <Controls>
        <Slider label="Supply voltage" value={vcc} min={3} max={12} step={1} onChange={(v) => { setVcc(v); setVin((x) => Math.min(x, v)) }} format={(v) => `${v} V`} color={C.voltage} />
        <Slider label="Input voltage" value={vin} min={0} max={vcc} step={0.5} onChange={setVin} format={(v) => `${v} V`} color={C.signal} />
        <Readout label="Input reads as" value={hi ? 'high (1)' : 'low (0)'} color={hi ? C.good : C.bad} />
      </Controls>
    </>
  )
}
