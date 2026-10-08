import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/**
 * Transmitter noise versus receiver sensitivity. ALL numbers are illustrative.
 *   carrier           = 10 log10(P / 1 mW)
 *   noise in RX chan  = carrier + (noise density, dBc/Hz) + 10 log10(12 500 Hz)
 *   after duplexer    = that noise - isolation
 *   receiver floor    = -174 dBm/Hz + 10 log10(12 500) + noise figure (5 dB)
 *   desense           = 10 log10( (floor + noise) / floor ), in linear power
 */
const BW = 12500
const NF = 5
const FLOOR = -174 + 10 * Math.log10(BW) + NF // about -128 dBm
const LO = -150, HI = 50
const Y0 = 36, Y1 = 262 // pixel rows for HI and LO
const y = (dbm: number) => Y0 + ((HI - Math.min(HI, Math.max(LO, dbm))) / (HI - LO)) * (Y1 - Y0)

export function RepeaterHardwareAndDuplexers_Isolation() {
  const [p, setP] = useState(50)
  const [iso, setIso] = useState(92)
  const [nd, setNd] = useState(-130)

  const carrier = 10 * Math.log10(p * 1000)
  const noiseTx = carrier + nd + 10 * Math.log10(BW) // transmitter noise in the receive channel, at the transmitter
  const noiseRx = noiseTx - iso // after the duplexer, at the receiver
  const desense = 10 * Math.log10(1 + 10 ** ((noiseRx - FLOOR) / 10))
  const need = noiseTx - (FLOOR + 10 * Math.log10(10 ** 0.1 - 1)) // isolation for 1 dB desense
  const ok = desense <= 1.05
  const col = desense <= 1.05 ? C.good : desense <= 3 ? C.resist : C.bad

  const bars: { x: number; v: number; label: string; sub: string; color: string }[] = [
    { x: 130, v: carrier, label: 'Carrier', sub: 'at transmitter', color: C.signal },
    { x: 240, v: noiseTx, label: 'Noise', sub: 'at transmitter', color: C.power },
    { x: 350, v: noiseRx, label: 'Noise', sub: 'at receiver', color: C.resist },
  ]
  return (
    <>
      <Diagram w={640} h={330}
        title={`A ${p} watt transmitter is ${carrier.toFixed(0)} dBm. Its noise in the receive channel is ${noiseTx.toFixed(0)} dBm at the transmitter. After ${iso} dB of duplexer isolation it is ${noiseRx.toFixed(0)} dBm at the receiver, against a receiver noise floor of ${FLOOR.toFixed(0)} dBm, so the receiver loses ${desense.toFixed(1)} dB of sensitivity`}
        caption="Illustrative numbers: 12.5 kHz receiver, 5 dB noise figure, adjustable transmitter noise. Levels are in dBm, higher is stronger.">
        <T x={20} y={16} size={13} bold color={C.muted}>Level, dBm</T>
        {[40, 0, -40, -80, -120].map((d) => (
          <g key={d}>
            <Ln x1={56} y1={y(d)} x2={620} y2={y(d)} color={C.fill2} width={1} dash="3 5" />
            <T x={50} y={y(d)} anchor="end" size={12} mono color={C.muted}>{d}</T>
          </g>
        ))}
        {bars.map((b) => (
          <g key={b.label + b.sub}>
            <rect x={b.x - 30} y={y(b.v)} width={60} height={Math.max(2, Y1 - y(b.v))} rx={4} fill={b.color} opacity={0.85} />
            <T x={b.x} y={Math.min(y(b.v) - 14, Y1 - 14)} anchor="middle" size={13} bold color={b.color}>{`${b.v.toFixed(0)}`}</T>
            <T x={b.x} y={Y1 + 18} anchor="middle" size={13} bold>{b.label}</T>
            <T x={b.x} y={Y1 + 36} anchor="middle" size={12} color={C.muted}>{b.sub}</T>
          </g>
        ))}
        <Ln x1={272} y1={y(noiseTx) + 8} x2={322} y2={y(noiseRx) - 2} color={C.muted} width={2} dash="4 5" arrow />
        <T x={(272 + 322) / 2 + 22} y={(y(noiseTx) + y(noiseRx)) / 2} size={12.5} bold color={C.muted}>{`−${iso} dB`}</T>
        {/* receiver floor */}
        <Ln x1={56} y1={y(FLOOR)} x2={620} y2={y(FLOOR)} color={C.bad} width={2.5} />
        <T x={612} y={y(FLOOR) + 14} anchor="end" size={12.5} bold color={C.bad}>{`Receiver noise floor ${FLOOR.toFixed(0)} dBm`}</T>
        <T x={612} y={50} anchor="end" size={13} bold color={col}>{ok ? 'Noise stays under the floor' : 'Noise lifts the floor: desense'}</T>
        <T x={612} y={72} anchor="end" size={12.5} color={C.muted}>{`Sensitivity lost: ${desense.toFixed(1)} dB`}</T>
      </Diagram>
      <Controls>
        <Slider label="Transmitter power" value={p} min={1} max={100} step={1} onChange={setP} format={(v) => `${v} W`} color="var(--d-signal)" />
        <Slider label="Duplexer isolation (noise path)" value={iso} min={40} max={110} step={1} onChange={setIso} format={(v) => `${v} dB`} color="var(--d-resist)" />
        <Slider label="Transmitter noise at the receive frequency" value={nd} min={-150} max={-110} step={1} onChange={setNd} format={(v) => `${v} dBc/Hz`} color="var(--d-power)" />
        <Readout label="Desense" value={desense.toFixed(1)} unit="dB" color={col} />
        <Readout label="Isolation needed for 1 dB" value={need.toFixed(0)} unit="dB" color={C.power} />
      </Controls>
    </>
  )
}
