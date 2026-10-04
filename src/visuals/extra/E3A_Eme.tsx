import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const LIGHT = 299792.458
const D_MIN = 357000
const D_MAX = 406000

/** EME: both stations must see the Moon. Closer Moon (perigee) means a shorter, stronger round trip. */
export function Eme() {
  const [d, setD] = useState(384400)
  const k = (d - D_MIN) / (D_MAX - D_MIN)
  const ex = 110, ey = 140, er = 84
  const mx = 395 + k * 50, my = 140
  const stA: [number, number] = [ex + er * Math.cos(1.25), ey - er * Math.sin(1.25)]
  const stB: [number, number] = [ex + er * Math.cos(1.25), ey + er * Math.sin(1.25)]
  const delay = (2 * d) / LIGHT
  const loss = 40 * Math.log10(d / D_MIN)
  return (
    <>
      <Diagram w={640} h={280} title="Earth-Moon-Earth: two stations that can both see the Moon bounce signals off it. A closer Moon, near perigee, means a shorter round trip and less path loss"
        caption="Not to scale. Both stations need the Moon above their horizon, so they can be up to about 12,000 miles apart.">
        <circle cx={ex} cy={ey} r={er} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <T x={ex - 10} y={ey} anchor="middle" size={14} bold color={C.muted}>Earth</T>
        <Ln x1={stA[0]} y1={stA[1]} x2={mx - 22} y2={my - 8} color={C.signal} width={2.5} dash="2 6" arrow />
        <Ln x1={mx - 22} y1={my + 8} x2={stB[0]} y2={stB[1]} color={C.good} width={2.5} dash="2 6" arrow />
        <circle cx={stA[0]} cy={stA[1]} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <circle cx={stB[0]} cy={stB[1]} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <T x={stA[0] + 12} y={stA[1] - 14} size={14} bold>Station 1</T>
        <T x={stB[0] + 12} y={stB[1] + 14} size={14} bold>Station 2</T>
        <circle cx={mx} cy={my} r={24} fill={C.fill2} stroke={C.muted} strokeWidth={2.5} />
        <T x={mx} y={my + 42} anchor="middle" size={14} bold color={C.muted}>Moon</T>
        <Ln x1={ex} y1={262} x2={mx} y2={262} color={C.power} width={2.5} arrow="both" />
        <T x={(ex + mx) / 2 + 60} y={240} anchor="middle" size={14} bold color={C.power}>{`${d.toLocaleString('en-US')} km`}</T>
        <T x={620} y={40} anchor="end" size={14} bold color={C.signal}>signal out</T>
        <T x={620} y={62} anchor="end" size={14} bold color={C.good}>echo back</T>
        <T x={620} y={262} anchor="end" size={13} color={C.muted}>{k < 0.12 ? 'perigee: closest' : k > 0.88 ? 'apogee: farthest' : ''}</T>
      </Diagram>
      <Controls>
        <Slider label="Moon distance" value={d} min={D_MIN} max={D_MAX} step={500} onChange={setD}
          format={(v) => `${Math.round(v / 1000)},000 km`} color="var(--d-power)" />
        <Readout label="Round-trip delay" value={delay.toFixed(2)} unit="s" color="var(--d-signal)" />
        <Readout label="Extra path loss vs perigee" value={`+${loss.toFixed(1)}`} unit="dB" color="var(--d-bad)" />
      </Controls>
    </>
  )
}
