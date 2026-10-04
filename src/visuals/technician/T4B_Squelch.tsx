import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const ROWS = [
  { name: 'Background noise', level: 28, col: C.muted },
  { name: 'Weak FM signal', level: 52, col: C.resist },
  { name: 'Strong FM signal', level: 86, col: C.good },
]

/** Squelch mutes the speaker unless the input is stronger than the threshold. */
export function Squelch() {
  const [thr, setThr] = useState(65)
  const x0 = 200, sx = 4
  const tx = x0 + thr * sx
  const heardWeak = ROWS[1].level > thr
  const hint = thr === 0 ? 'Open: audio always on' : thr < ROWS[0].level ? 'Noise gets through' : heardWeak ? 'Quiet, weak signal heard' : 'Weak signal muted'
  const col = thr === 0 ? C.resist : heardWeak && thr >= ROWS[0].level ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={250} title="The squelch threshold line mutes anything weaker than it. Setting it to zero keeps the audio on all the time, so a weak signal can be heard."
        caption="Audio plays only for signals that reach past the threshold line.">
        {ROWS.map((r, i) => {
          const y = 56 + i * 62
          const on = r.level > thr
          return (
            <g key={r.name}>
              <T x={20} y={y - 8} bold size={14}>{r.name}</T>
              <T x={20} y={y + 12} size={13} bold color={on ? C.good : C.muted}>{on ? 'audio on' : 'muted'}</T>
              <rect x={x0} y={y - 14} width={r.level * sx} height={28} rx={6} fill={r.col} opacity={on ? 1 : 0.4} />
            </g>
          )
        })}
        <Ln x1={tx} y1={26} x2={tx} y2={226} color={C.power} width={3} dash="6 5" />
        <T x={Math.min(tx + 8, 470)} y={30} size={13} bold color={C.power}>squelch threshold</T>
      </Diagram>
      <Controls>
        <Slider label="Squelch" value={thr} min={0} max={100} step={1} onChange={setThr} format={(v) => (v === 0 ? 'open' : v > 70 ? 'tight' : `${v}`)} color="var(--d-power)" />
        <Readout label="Result" value={hint} color={col} />
      </Controls>
    </>
  )
}
