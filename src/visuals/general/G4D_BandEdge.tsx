import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

type Mode = 'lsb' | 'usb'
const PX = 50 // px per kHz

/** A 3 kHz SSB signal extends from the displayed carrier: LSB downward, USB upward. Keep the whole signal inside the segment. */
export function BandEdge() {
  const [mode, setMode] = useState<Mode>('lsb')
  const [d, setD] = useState(3)
  const lsb = mode === 'lsb'
  const edge = lsb ? 190 : 450
  const car = lsb ? edge + d * PX : edge - d * PX
  const sx0 = lsb ? car - 3 * PX : car, sx1 = lsb ? car : car + 3 * PX
  const spill = Math.max(0, 3 - d)
  const ok = spill === 0
  const col = ok ? C.good : C.bad
  const segX0 = lsb ? edge : 30, segX1 = lsb ? 610 : edge
  const by = 120
  return (
    <>
      <Diagram w={640} h={240} title={`${lsb ? 'Lower' : 'Upper'} sideband 3 kilohertz signal with the carrier ${d} kilohertz inside the ${lsb ? 'lower' : 'upper'} edge of the phone segment. ${ok ? 'The whole signal is inside the segment.' : `The signal spills ${spill} kilohertz outside the segment.`}`}
        caption={lsb ? 'LSB extends below the carrier, so keep the carrier at least 3 kHz above the lower edge.' : 'USB extends above the carrier, so keep the carrier at least 3 kHz below the upper edge.'}>
        <rect x={segX0} y={by + 26} width={segX1 - segX0} height={22} fill={C.good} fillOpacity={0.18} />
        <T x={lsb ? 610 : 30} y={by + 70} anchor={lsb ? 'end' : 'start'} size={13} color={C.good} bold>phone segment</T>
        <Ln x1={30} y1={by + 26} x2={610} y2={by + 26} color={C.muted} width={2} />
        <Ln x1={edge} y1={44} x2={edge} y2={by + 56} color={C.ink} width={3} dash="6 4" />
        <T x={edge} y={30} anchor="middle" bold size={14}>{lsb ? 'lower edge' : 'upper edge'}</T>
        {/* signal */}
        <path d={lsb ? `M${sx0},${by + 26} L${sx0 + 18},${by - 30} L${sx1 - 6},${by - 52} L${sx1},${by + 26} Z` : `M${sx0},${by + 26} L${sx0 + 6},${by - 52} L${sx1 - 18},${by - 30} L${sx1},${by + 26} Z`}
          fill={col} fillOpacity={0.3} stroke={col} strokeWidth={2.5} strokeLinejoin="round" />
        <Ln x1={car} y1={by + 26} x2={car} y2={by - 70} color={C.ink} width={2.5} dash="4 4" />
        <T x={car} y={by - 84} anchor={lsb ? 'start' : 'end'} size={13} bold>{lsb ? ' carrier (dial)' : 'carrier (dial) '}</T>
        <T x={(sx0 + sx1) / 2} y={by + 10} anchor="middle" size={13} bold color={col}>3 kHz {lsb ? 'LSB' : 'USB'}</T>
        <T x={lsb ? 40 : 600} y={by + 70} anchor={lsb ? 'start' : 'end'} size={13} color={C.bad} bold>not allowed</T>
        <rect x={150} y={198} width={340} height={30} rx={15} fill={col} fillOpacity={0.15} stroke={col} strokeWidth={2} />
        <T x={320} y={213} anchor="middle" bold size={14} color={col}>{ok ? 'Entire signal inside the segment' : `Spills ${spill} kHz outside`}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Sideband</span>
          <Choice label="Sideband" value={mode} onChange={setMode} options={[{ value: 'lsb', label: 'LSB, lower edge' }, { value: 'usb', label: 'USB, upper edge' }]} />
        </div>
        <Slider label="Carrier distance inside the edge" value={d} min={0} max={6} step={0.5} onChange={setD} format={(v) => `${v} kHz`} color="var(--d-signal)" />
        <Readout label="Signal" value={ok ? 'Inside' : 'Outside'} color={ok ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
