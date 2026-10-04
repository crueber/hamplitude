import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, useTime } from '../kit'

/** FM: louder or closer to the mic means a wider frequency swing (deviation). Too wide = over-deviation. */
export function Deviation() {
  const [level, setLevel] = useState(1.5)
  const { t, ref } = useTime(0.5)
  const x0 = 40, x1 = 600, cy = 66, A = 28, N = 280
  const beta = level * 2.2
  const pts: string[] = []
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const s = u - t * 0.08
    const ph = TAU * 12 * s + beta * (1 - Math.cos(TAU * 2 * s))
    pts.push(`${i ? 'L' : 'M'}${(x0 + (x1 - x0) * u).toFixed(1)},${(cy - A * Math.sin(ph)).toFixed(1)}`)
  }
  const over = level > 1.22
  const col = over ? C.bad : C.good
  const half = level * 90
  const cx = 320
  const word = level < 0.6 ? 'far / quiet' : over ? 'loud or too close' : 'normal'
  return (
    <>
      <Diagram w={640} h={268} svgRef={ref} title="An FM signal's frequency swing grows as you talk louder or closer to the microphone. Too wide a swing spills past the channel: over-deviation."
        caption="Louder or closer to the mic = wider frequency swing (deviation).">
        <T x={x0} y={16} bold size={13} color={C.signal}>FM signal: your voice swings the frequency</T>
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x0} y={114} bold size={13}>How far the frequency swings, against the channel</T>
        <rect x={90} y={142} width={110} height={70} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
        <rect x={440} y={142} width={110} height={70} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
        <T x={145} y={226} anchor="middle" size={12} color={C.muted}>next channel</T>
        <T x={495} y={226} anchor="middle" size={12} color={C.muted}>next channel</T>
        <rect x={210} y={134} width={220} height={86} rx={8} fill={C.signal} fillOpacity={0.1} stroke={C.signal} strokeWidth={2} />
        <T x={cx} y={150} anchor="middle" size={12} color={C.signal} bold>your channel</T>
        <Ln x1={cx} y1={160} x2={cx} y2={212} color={C.muted} width={1} dash="3 4" />
        <Ln x1={cx - half} y1={186} x2={cx + half} y2={186} color={col} width={10} />
        <Ln x1={cx - half} y1={170} x2={cx - half} y2={202} color={col} width={3} />
        <Ln x1={cx + half} y1={170} x2={cx + half} y2={202} color={col} width={3} />
        <T x={cx} y={250} anchor="middle" bold size={14} color={col}>{over ? 'Over-deviating: spills into the next channel, sounds distorted' : 'Within the channel: clear audio'}</T>
      </Diagram>
      <Controls>
        <Slider label="Voice at the microphone" value={level} min={0.2} max={1.6} step={0.02} onChange={setLevel} format={() => word} color="var(--d-signal)" />
        <Readout label="Deviation" value={over ? 'Too wide' : 'OK'} color={over ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
