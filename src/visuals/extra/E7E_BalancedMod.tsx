import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T } from '../kit'

type Keep = 'both' | 'upper' | 'lower'

/** Balanced modulator: carrier cancelled, two sidebands remain. A filter then removes one for SSB. */
export function BalancedMod() {
  const [bal, setBal] = useState(100)
  const [keep, setKeep] = useState<Keep>('both')
  const cx = 480, base = 300
  const carrierH = 110 * (1 - bal / 100)
  const lsbOn = keep !== 'upper', usbOn = keep !== 'lower'
  const out = keep === 'both' ? 'DSB: two sidebands' : 'SSB: one sideband'
  const Block = ({ x, y, w, label, col }: { x: number; y: number; w: number; label: string; col: string }) => (
    <g>
      <rect x={x} y={y} width={w} height={40} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={y + 20} anchor="middle" size={13} bold color={col}>{label}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={372}
        title={`Balanced modulator: the carrier is cancelled (${bal} percent balanced) and two sidebands remain. Sideband filter set to ${keep === 'both' ? 'pass both' : keep === 'upper' ? 'keep upper only' : 'keep lower only'}, giving ${out}.`}
        caption="The balanced modulator cancels the carrier. A filter then removes one sideband: SSB.">
        <Block x={14} y={14} w={104} label="Audio" col={C.power} />
        <Block x={14} y={64} w={104} label="Carrier osc." col={C.resist} />
        <Ln x1={118} y1={34} x2={168} y2={60} color={C.power} width={2.5} />
        <Ln x1={118} y1={84} x2={168} y2={66} color={C.resist} width={2.5} />
        <Block x={168} y={40} w={150} label="Balanced modulator" col={C.signal} />
        <Ln x1={318} y1={60} x2={346} y2={60} color={C.signal} width={2.5} arrow />
        <Block x={346} y={40} w={116} label="Sideband filter" col={C.current} />
        <Ln x1={462} y1={60} x2={496} y2={60} color={C.signal} width={2.5} arrow />
        <T x={500} y={60} size={14} bold color={C.signal}>out</T>
        {/* baseband mini-spectrum */}
        <rect x={14} y={140} width={150} height={200} rx={10} fill={C.fill} />
        <T x={89} y={160} anchor="middle" size={13} bold color={C.power}>Audio: baseband</T>
        <Ln x1={36} y1={300} x2={150} y2={300} color={C.muted} width={2} />
        <rect x={38} y={236} width={60} height={64} fill={C.power} fillOpacity={0.3} stroke={C.power} strokeWidth={2} />
        <T x={38} y={316} size={12} color={C.muted}>0</T>
        <T x={98} y={316} anchor="middle" size={12} color={C.muted}>3 kHz</T>
        <T x={89} y={332} anchor="middle" size={12} color={C.muted}>message, before modulation</T>
        {/* output spectrum */}
        <T x={cx} y={186} anchor="middle" size={13} bold color={C.signal}>{out}</T>
        <Ln x1={190} y1={base} x2={626} y2={base} color={C.muted} width={2} />
        {carrierH > 0 ? <Ln x1={cx} y1={base} x2={cx} y2={base - carrierH} color={C.resist} width={4} /> : (
          <>
            <Ln x1={cx} y1={base} x2={cx} y2={base - 72} color={C.muted} width={2} dash="4 4" />
            <T x={cx} y={base - 86} anchor="middle" size={13} bold color={C.muted}>carrier cancelled</T>
          </>
        )}
        {carrierH > 0 && <T x={cx} y={base - carrierH - 12} anchor="middle" size={13} bold color={C.resist}>carrier leaks</T>}
        <path d={`M${cx - 96},${base} L${cx - 88},${base - 62} L${cx - 14},${base - 44} L${cx - 10},${base} Z`} fill={C.signal} fillOpacity={lsbOn ? 0.3 : 0.05} stroke={C.signal} strokeWidth={lsbOn ? 2.5 : 1.5} strokeDasharray={lsbOn ? undefined : '5 4'} />
        <path d={`M${cx + 10},${base} L${cx + 14},${base - 44} L${cx + 88},${base - 62} L${cx + 96},${base} Z`} fill={C.signal} fillOpacity={usbOn ? 0.3 : 0.05} stroke={C.signal} strokeWidth={usbOn ? 2.5 : 1.5} strokeDasharray={usbOn ? undefined : '5 4'} />
        <T x={cx - 52} y={base + 18} anchor="middle" size={13} bold color={lsbOn ? C.signal : C.muted}>lower</T>
        <T x={cx + 52} y={base + 18} anchor="middle" size={13} bold color={usbOn ? C.signal : C.muted}>upper</T>
        <T x={cx} y={base + 38} anchor="middle" size={12} color={C.muted}>carrier frequency</T>
      </Diagram>
      <Controls>
        <Slider label="Balance (carrier cancelled)" value={bal} min={0} max={100} step={5} onChange={setBal} format={(v) => `${v}%`} color="var(--d-resist)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Sideband filter keeps</span>
          <Choice label="Sideband filter" value={keep} onChange={setKeep} options={[{ value: 'both', label: 'Both (DSB)' }, { value: 'upper', label: 'Upper' }, { value: 'lower', label: 'Lower' }]} />
        </div>
      </Controls>
    </>
  )
}
