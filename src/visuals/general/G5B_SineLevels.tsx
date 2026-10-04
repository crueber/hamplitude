import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt, sinePath } from '../kit'

type Known = 'rms' | 'pk' | 'pp'
const K = Math.SQRT2
const DEF: Record<Known, number> = { rms: 120, pk: 17, pp: 200 }

/** One sine wave, three ways to quote its voltage: peak, peak-to-peak, RMS. */
export function G5B_SineLevels() {
  const [known, setKnown] = useState<Known>('rms')
  const [val, setVal] = useState(DEF.rms)
  const pk = known === 'rms' ? val * K : known === 'pk' ? val : val / 2
  const rms = pk / K
  const pp = pk * 2
  const cy = 120, amp = 90, x0 = 50, x1 = 390
  const yPk = cy - amp, yRms = cy - amp / K
  return (
    <>
      <Diagram w={640} h={262}
        title={`A sine wave with peak ${fmt(pk, 4)} volts, peak-to-peak ${fmt(pp, 4)} volts and RMS ${fmt(rms, 4)} volts. RMS is 0.707 times peak. Peak-to-peak is 2 times peak.`}
        caption="RMS is the DC-equivalent heating value: 0.707 × peak.">
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1.5} />
        <Ln x1={x0} y1={yPk} x2={x1} y2={yPk} color={C.voltage} width={1.5} dash="6 4" />
        <Ln x1={x0} y1={cy + amp} x2={x1} y2={cy + amp} color={C.voltage} width={1.5} dash="6 4" />
        <Ln x1={x0} y1={yRms} x2={x1} y2={yRms} color={C.signal} width={2.5} />
        <Ln x1={x0} y1={cy + amp / K} x2={x1} y2={cy + amp / K} color={C.signal} width={2.5} />
        <path d={sinePath(x0, x1, cy, amp, 1.5)} fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={412} y1={yPk} x2={412} y2={cy + amp} color={C.ink} width={2} arrow="both" />
        <T x={426} y={yPk} size={14} bold color={C.voltage}>peak {fmt(pk, 4)} V</T>
        <T x={426} y={yRms + 2} size={14} bold color={C.signal}>RMS {fmt(rms, 4)} V</T>
        <T x={426} y={yRms + 20} size={12} color={C.muted}>0.707 × peak</T>
        <T x={426} y={cy + 16} size={14} bold>peak-to-peak</T>
        <T x={426} y={cy + 36} size={14} bold>{fmt(pp, 4)} V</T>
        <T x={x0 + 2} y={cy + 10} size={12} color={C.muted}>0 V</T>
        <rect x={10} y={226} width={620} height={30} rx={8} fill={C.fill} />
        <T x={320} y={241} anchor="middle" size={13} mono>RMS = 0.707 × peak · peak = 1.414 × RMS · pk-pk = 2 × peak</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>You know the</span>
          <Choice label="You know the" value={known} onChange={(k) => { setKnown(k); setVal(DEF[k]) }}
            options={[{ value: 'rms', label: 'RMS' }, { value: 'pk', label: 'Peak' }, { value: 'pp', label: 'Peak-to-peak' }]} />
        </div>
        <Slider label={known === 'rms' ? 'RMS voltage' : known === 'pk' ? 'Peak voltage' : 'Peak-to-peak voltage'} value={val} min={1} max={400} step={1} onChange={setVal} format={(v) => `${v} V`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
