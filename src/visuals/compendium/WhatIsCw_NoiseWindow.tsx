import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const X0 = 40, X1 = 600, FULL = 2400 // axis spans a 2.4 kHz SSB-width slice
const px = (hz: number) => (hz / FULL) * (X1 - X0)
const noiseAt = (i: number) => 12 + 9 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.9 + 1)) + 7 * Math.abs(Math.sin(i * 4.3))

/** A narrow filter lets in less noise; a keyed carrier keeps all its power in that narrow slice. */
export function WhatIsCw_NoiseWindow() {
  const [bw, setBw] = useState(2400)
  const cx = (X0 + X1) / 2
  const wx0 = cx - px(bw) / 2, wx1 = cx + px(bw) / 2
  const base = 150
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= 140; i++) pts.push({ x: X0 + (i / 140) * (X1 - X0), y: base - noiseAt(i) })
  const line = (a: number, b: number) => pts.filter((p) => p.x >= a - 0.5 && p.x <= b + 0.5)
  const inside = line(wx0, wx1)
  const gain = 10 * Math.log10(FULL / bw)
  const noiseBar = (px(bw) / (X1 - X0)) * 400

  return (
    <>
      <Diagram w={640} h={282} title={`A ${bw} hertz filter passes a keyed CW carrier at full strength but only ${Math.round((bw / FULL) * 100)} percent as much noise as a 2400 hertz filter`}
        caption="Noise is spread evenly across frequency, so noise power grows with filter width. A CW tone is one frequency: a narrow filter keeps all of it and throws noise away. Schematic.">
        <T x={X0} y={14} size={13} bold color={C.muted}>Receiver passband (frequency →)</T>
        <Ln x1={X0} y1={base} x2={X1} y2={base} color={C.muted} width={2} />
        <polyline points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke={C.fill2} strokeWidth={2} />
        {inside.length > 1 && (
          <polygon points={`${inside[0].x},${base} ${inside.map((p) => `${p.x},${p.y}`).join(' ')} ${inside[inside.length - 1].x},${base}`} fill={C.resist} fillOpacity={0.35} stroke={C.resist} strokeWidth={2} />
        )}
        <rect x={wx0} y={36} width={wx1 - wx0} height={base - 36} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="5 4" rx={3} />
        <Ln x1={cx} y1={base} x2={cx} y2={52} color={C.signal} width={5} />
        <T x={cx + 10} y={50} size={13} bold color={C.signal}>CW carrier</T>
        <T x={X0} y={base + 22} size={12.5} color={C.muted}>2.4 kHz of band shown</T>
        <T x={X1} y={base + 22} size={12.5} bold anchor="end">{bw >= 1000 ? `${(bw / 1000).toFixed(1)} kHz` : `${bw} Hz`} filter</T>

        <T x={X0} y={206} size={13} bold>Signal</T>
        <rect x={110} y={197} width={400} height={18} rx={4} fill={C.signal} />
        <T x={X0} y={238} size={13} bold>Noise</T>
        <rect x={110} y={229} width={Math.max(4, noiseBar)} height={18} rx={4} fill={C.resist} />
        <T x={116 + Math.max(4, noiseBar)} y={238} size={12.5} bold color={C.ink} style={{ display: noiseBar > 330 ? 'none' : undefined }}>{`${Math.round((bw / FULL) * 100)}% of the 2.4 kHz noise`}</T>
        <T x={104 + Math.max(4, noiseBar)} y={238} size={12.5} bold color={C.bg} anchor="end" style={{ display: noiseBar > 330 ? undefined : 'none' }}>{`${Math.round((bw / FULL) * 100)}% of the 2.4 kHz noise`}</T>
        <T x={X0} y={268} size={12.5} color={C.muted}>Signal bar is the same length at every width: the tone fits inside the window.</T>
      </Diagram>
      <Controls>
        <Slider label="Filter width" value={bw} min={100} max={2400} step={50} onChange={setBw} format={(v) => `${v} Hz`} color="var(--d-resist)" />
        <Readout label="Signal-to-noise gain vs 2.4 kHz" value={gain.toFixed(1)} unit="dB" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
