import type { ReactElement } from 'react'
import { C, Diagram, T } from '../kit'

// deterministic pseudo-noise so the still frame is stable
const rnd = (i: number) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x) }

/** JT65: many audio tones, each symbol is one of them; the decoder pulls the message out from under the noise. */
export function E2D_Jt65() {
  const GX0 = 70, GX1 = 380, GY0 = 40, GY1 = 220
  const cols = 20, rows = 14
  const cw = (GX1 - GX0) / cols, rh = (GY1 - GY0) / rows
  const tones = [3, 3, 8, 5, 11, 2, 7, 12, 4, 9, 1, 6, 10, 3, 8, 12, 5, 2, 9, 7]
  const cells: ReactElement[] = []
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    const v = rnd(c * 31 + r * 7 + 1)
    cells.push(<rect key={`${c}-${r}`} x={GX0 + c * cw} y={GY0 + r * rh} width={cw - 0.5} height={rh - 0.5} fill={C.muted} opacity={0.08 + v * 0.3} />)
  }
  const path = tones.map((t, c) => `${c ? 'L' : 'M'}${GX0 + c * cw + cw / 2},${GY1 - (t + 0.5) * rh}`).join('')
  return (
    <Diagram w={640} h={300} title="A JT65 transmission drawn as frequency against time: one of many audio tones is sent for each symbol, shown as a faint stair-step hidden in the noise. The decoder recovers the message even though the signal is below the noise. In a VHF contest, FT8 and FT4 exchange the grid square in place of the signal report."
      caption="Many tones, very weak. The decoder finds the stair-step in the noise.">
      <T x={GX0} y={22} size={14} bold color={C.muted}>JT65 on a waterfall</T>
      {cells}
      <path d={path} fill="none" stroke={C.signal} strokeWidth={2} opacity={0.9} strokeDasharray="1 5" strokeLinecap="round" />
      {tones.map((t, c) => <rect key={c} x={GX0 + c * cw} y={GY1 - (t + 1) * rh} width={cw - 0.5} height={rh - 0.5} fill={C.signal} opacity={0.35} />)}
      <T x={GX0 - 8} y={GY0} anchor="end" size={12} color={C.muted}>high</T>
      <T x={GX0 - 8} y={GY1} anchor="end" size={12} color={C.muted}>low</T>
      <T x={GX0} y={GY1 + 16} size={12} color={C.muted}>time →</T>
      <T x={400} y={52} size={14} bold color={C.signal}>Multitone AFSK</T>
      <T x={400} y={72} size={13}>Each symbol is one of many</T>
      <T x={400} y={90} size={13}>audio tones sent by AFSK.</T>
      <T x={400} y={126} size={14} bold color={C.signal}>Very low signal-to-noise</T>
      <T x={400} y={146} size={13}>The signal can sit below the</T>
      <T x={400} y={164} size={13}>noise and still be decoded.</T>
      <rect x={394} y={196} width={236} height={86} rx={10} fill={C.power} fillOpacity={0.12} stroke={C.power} strokeWidth={2} />
      <T x={406} y={214} size={13} bold color={C.power}>FT8 / FT4 in a VHF contest</T>
      <T x={406} y={238} size={14} bold mono>K1ABC W9XYZ EN52</T>
      <T x={406} y={262} size={12.5}>grid square, not an SNR report</T>
    </Diagram>
  )
}
