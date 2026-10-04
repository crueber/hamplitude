import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T } from '../kit'

const X0 = 70, X1 = 570, WID = 50
const UY = 100, DY = 300

/** An inverting linear transponder mirrors the passband: tune up the uplink, the downlink tunes down; USB becomes LSB. */
export function E2A_Transponder() {
  const [pos, setPos] = useState(0.3)
  const [sb, setSb] = useState<'usb' | 'lsb'>('usb')
  const ux = X0 + 40 + pos * (X1 - X0 - 130), dx = X0 + 40 + (1 - pos) * (X1 - X0 - 130)
  const dir = sb === 'usb' ? 1 : -1 // sideband extends up (USB) or down (LSB) from the carrier
  const sideband = (x: number, y: number, d: number, col: string) => (
    <g>
      <path d={`M${x},${y} L${x + d * WID},${y} L${x},${y - 34} z`} fill={col} fillOpacity={0.35} stroke={col} strokeWidth={2} />
      <Ln x1={x} y1={y} x2={x} y2={y - 42} color={col} width={3} />
    </g>
  )
  return (
    <>
      <Diagram w={640} h={364} title="An inverting linear transponder: a signal in the uplink passband is mixed with a local oscillator and the difference is sent down, so the passband is mirrored. A signal low in the uplink band appears high in the downlink band, and upper sideband becomes lower sideband."
        caption="Downlink = oscillator minus uplink. The whole band is flipped.">
        <T x={X0} y={20} size={14} bold color={C.voltage}>UPLINK passband (you → satellite)</T>
        <Ln x1={X0} y1={UY} x2={X1} y2={UY} color={C.voltage} width={3} />
        <T x={X0} y={UY + 16} size={12} color={C.muted}>low</T>
        <T x={X1} y={UY + 16} anchor="end" size={12} color={C.muted}>high</T>
        {sideband(ux, UY, dir, C.voltage)}
        <T x={ux + dir * (WID / 2)} y={UY - 52} anchor="middle" size={14} bold color={C.voltage}>{sb === 'usb' ? 'USB' : 'LSB'}</T>
        <rect x={240} y={166} width={160} height={46} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={320} y={182} anchor="middle" size={14} bold>mix with oscillator</T>
        <T x={320} y={200} anchor="middle" size={12.5} color={C.muted}>keep the difference</T>
        <Ln x1={ux} y1={UY + 8} x2={300} y2={162} color={C.muted} width={2} arrow />
        <Ln x1={340} y1={216} x2={dx} y2={DY - 48} color={C.muted} width={2} arrow />
        <T x={X0} y={DY + 46} size={14} bold color={C.current}>DOWNLINK passband (satellite → you)</T>
        <Ln x1={X0} y1={DY} x2={X1} y2={DY} color={C.current} width={3} />
        <T x={X0} y={DY + 16} size={12} color={C.muted}>low</T>
        <T x={X1} y={DY + 16} anchor="end" size={12} color={C.muted}>high</T>
        {sideband(dx, DY, -dir, C.current)}
        <T x={dx - dir * (WID / 2)} y={DY + 16} anchor="middle" size={14} bold color={C.current}>{sb === 'usb' ? 'LSB' : 'USB'}</T>
      </Diagram>
      <Controls>
        <Slider label="Your uplink frequency" value={pos} min={0} max={1} step={0.01} onChange={setPos} format={(v) => (v < 0.4 ? 'low in band' : v > 0.6 ? 'high in band' : 'mid band')} color="var(--d-voltage)" />
        <Choice label="Uplink sideband" value={sb} onChange={setSb} options={[{ value: 'usb', label: 'Send USB' }, { value: 'lsb', label: 'Send LSB' }]} />
      </Controls>
    </>
  )
}
