import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type Mode = 'am' | 'usb' | 'lsb'

/** AM sends carrier + both sidebands. SSB suppresses the carrier and one sideband: half the width. */
export function G8A_SsbSpectrum() {
  const [mode, setMode] = useState<Mode>('am')
  const cx = 320, base = 190, sw = 100 // sideband width
  const showL = mode !== 'usb', showU = mode !== 'lsb', showC = mode === 'am'
  const side = (dir: -1 | 1, on: boolean, col: string) => {
    const a = cx + dir * 10, b = cx + dir * (10 + sw)
    const p = `M${a},${base} L${a + dir * 4},${base - 70} L${b - dir * 6},${base - 96} L${b},${base} Z`
    return <path d={p} fill={on ? col : 'none'} fillOpacity={0.25} stroke={on ? col : C.muted} strokeWidth={on ? 2.5 : 1.5} strokeDasharray={on ? undefined : '4 5'} strokeLinejoin="round" opacity={on ? 1 : 0.7} />
  }
  const lo = showL ? cx - 10 - sw : cx + 10, hi = showU ? cx + 10 + sw : cx - 10
  const bwL = showC ? cx - 10 - sw : lo, bwR = showC ? cx + 10 + sw : hi
  const label = mode === 'am' ? 'AM: carrier + both sidebands = 2 × the voice width' : 'SSB: one sideband only = 1 × the voice width'
  return (
    <>
      <Diagram w={640} h={282} title="Spectrum of AM, upper sideband SSB and lower sideband SSB. AM sends the carrier and both sidebands. SSB suppresses the carrier and one sideband, so it occupies half the bandwidth"
        caption="SSB removes the carrier and one sideband: the same voice in half the space.">
        <Ln x1={40} y1={base} x2={600} y2={base} color={C.muted} width={2} />
        {side(-1, showL, C.resist)}
        {side(1, showU, C.current)}
        <Ln x1={cx} y1={base} x2={cx} y2={base - 130} color={showC ? C.signal : C.muted} width={showC ? 5 : 1.5} dash={showC ? undefined : '4 5'} opacity={showC ? 1 : 0.7} />
        <T x={cx} y={base - 144} anchor="middle" size={13} bold color={showC ? C.signal : C.muted}>{showC ? 'carrier' : 'carrier suppressed'}</T>
        <T x={cx - 60} y={base + 18} anchor="middle" size={14} bold color={showL ? C.resist : C.muted}>{showL ? 'lower sideband' : 'suppressed'}</T>
        <T x={cx + 60} y={base + 18} anchor="middle" size={14} bold color={showU ? C.current : C.muted}>{showU ? 'upper sideband' : 'suppressed'}</T>
        <Ln x1={bwL} y1={base + 42} x2={bwR} y2={base + 42} color={C.ink} width={2.5} arrow="both" />
        <T x={(bwL + bwR) / 2} y={base + 62} anchor="middle" size={14} bold>{mode === 'am' ? 'bandwidth' : 'bandwidth: half of AM'}</T>
        <T x={cx} y={14} anchor="middle" size={14} bold color={C.muted}>{label}</T>
      </Diagram>
      <Controls>
        <Choice label="Mode" value={mode} onChange={setMode} options={[{ value: 'am', label: 'AM' }, { value: 'usb', label: 'SSB (upper)' }, { value: 'lsb', label: 'SSB (lower)' }]} />
      </Controls>
    </>
  )
}
