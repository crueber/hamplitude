import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, sinePath } from '../kit'

const PRE: Record<string, [number, number, number]> = { a: [1000, 250, 500], b: [100, 100, 300], c: [100, 75, 25] }

/** Series RLC: phase angle = arctan((XL - XC) / R). Positive: voltage leads. */
export function E5B_PhaseAngle() {
  const [r, setR] = useState(100)
  const [xl, setXl] = useState(75)
  const [xc, setXc] = useState(25)
  const x = xl - xc
  const th = (Math.atan2(x, r) * 180) / Math.PI
  const key = Object.entries(PRE).find(([, v]) => v[0] === r && v[1] === xl && v[2] === xc)?.[0] ?? 'x'
  const lead = th > 0.05 ? 'leads' : th < -0.05 ? 'lags' : 'is in phase with'
  const PX = 30, PW = 580, CY = 150, A = 62
  const cyc = 1.25
  const xp = (deg: number) => PX + (deg / 360 / cyc) * PW
  const phi = (th * Math.PI) / 180
  const vPeak = 90 - th, iPeak = 90 // degrees where each first peaks
  const showArrow = Math.abs(th) > 1
  return (
    <>
      <Diagram w={640} h={260} title={`Voltage ${lead} current by ${Math.abs(th).toFixed(1)} degrees in a series RLC circuit with R ${r}, XL ${xl}, XC ${xc} ohms`}
        caption="Whichever wave peaks first is leading.">
        <Ln x1={PX} y1={CY} x2={PX + PW} y2={CY} color={C.muted} width={1.5} />
        <path d={sinePath(PX, PX + PW, CY, A, cyc, 0)} fill="none" stroke={C.current} strokeWidth={3} />
        <path d={sinePath(PX, PX + PW, CY, A, cyc, phi)} fill="none" stroke={C.voltage} strokeWidth={3} />
        <Ln x1={xp(iPeak)} y1={CY - A - 14} x2={xp(iPeak)} y2={CY} color={C.current} dash="4 4" width={1.5} />
        <Ln x1={xp(vPeak)} y1={CY - A - 14} x2={xp(vPeak)} y2={CY} color={C.voltage} dash="4 4" width={1.5} />
        {showArrow && <Ln x1={xp(Math.min(vPeak, iPeak))} y1={CY - A - 14} x2={xp(Math.max(vPeak, iPeak))} y2={CY - A - 14} color={C.ink} width={2} arrow="both" />}
        <T x={PX + PW / 2} y={30} anchor="middle" bold size={16}>
          {Math.abs(th) <= 0.05 ? 'Voltage and current in phase (0°)' : `Voltage ${lead} current by ${Math.abs(th).toFixed(1)}°`}
        </T>
        <T x={PX + 4} y={CY + A + 36} size={13} bold color={C.voltage}>voltage</T>
        <T x={PX + 80} y={CY + A + 36} size={13} bold color={C.current}>current</T>
        <T x={PX + PW} y={CY + A + 36} anchor="end" size={12} color={C.muted}>time →</T>
      </Diagram>
      <Controls>
        <Choice label="Exam examples" value={key} onChange={(k) => { const p = PRE[k]; if (p) { setR(p[0]); setXl(p[1]); setXc(p[2]) } }}
          options={[{ value: 'a', label: 'R 1k, XL 250, XC 500' }, { value: 'b', label: 'R 100, XL 100, XC 300' }, { value: 'c', label: 'R 100, XL 75, XC 25' }, ...(key === 'x' ? [{ value: 'x', label: 'custom' }] : [])]} />
        <Slider label="Resistance (R)" value={r} min={10} max={1000} step={5} onChange={setR} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="Inductive reactance (XL)" value={xl} min={0} max={1000} step={5} onChange={setXl} format={(v) => `${v} Ω`} color="var(--d-signal)" />
        <Slider label="Capacitive reactance (XC)" value={xc} min={0} max={1000} step={5} onChange={setXc} format={(v) => `${v} Ω`} color="var(--d-power)" />
        <Readout label={`θ = arctan((XL − XC) ÷ R) = arctan(${x} ÷ ${r})`} value={`${th.toFixed(1)}°`} unit={th > 0.05 ? ' voltage leads' : th < -0.05 ? ' voltage lags' : ''} />
      </Controls>
    </>
  )
}
