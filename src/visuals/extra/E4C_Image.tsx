import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const RF = 14.2
/** The mixer's image: a second frequency 2 x IF away that also lands on the IF. A higher IF puts it far from the signal. */
export function Image() {
  const [iff, setIf] = useState(9)
  const lo = RF + iff, img = RF + 2 * iff
  const maxF = 110
  const x0 = 40, x1 = 610, base = 232
  const X = (f: number) => x0 + (f / maxF) * (x1 - x0)
  const out = img > RF + 3 // outside the front-end filter
  const spike = (f: number, h: number, col: string, dash?: string) => <path d={`M${X(f) - 6},${base} L${X(f)},${base - h} L${X(f) + 6},${base}`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} strokeLinejoin="round" strokeDasharray={dash} />
  const fw = (v: number) => (v < 1 ? `${v * 1000} kHz` : `${v} MHz`)
  return (
    <>
      <Diagram w={640} h={296} title={`Mixer with ${fw(iff)} IF: the wanted signal at ${RF} MHz and an image at ${img.toFixed(iff < 1 ? 2 : 1)} MHz, ${(2 * iff).toFixed(2)} MHz away, both mix to the IF. ${out ? 'The front-end filter easily rejects the distant image.' : 'The image sits too close for the front-end filter to reject it.'}`}
        caption="The image lies 2 × IF from the wanted signal. A higher IF moves it far enough away for the front-end filter to reject.">
        <rect x={14} y={10} width={100} height={44} rx={8} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={64} y={26} anchor="middle" size={13} bold color={C.signal}>Signal in</T>
        <T x={64} y={43} anchor="middle" size={12} mono color={C.muted}>{RF} MHz</T>
        <circle cx={250} cy={32} r={22} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <path d="M238,20 L262,44 M262,20 L238,44" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <Ln x1={250} y1={72} x2={250} y2={58} color={C.resist} width={2.5} arrow />
        <T x={250} y={84} anchor="middle" size={12} bold color={C.resist}>oscillator {lo.toFixed(iff < 1 ? 3 : 1)} MHz</T>
        <Ln x1={116} y1={32} x2={226} y2={32} color={C.signal} width={2.5} arrow />
        <Ln x1={274} y1={32} x2={366} y2={32} color={C.power} width={2.5} arrow />
        <rect x={370} y={10} width={120} height={44} rx={8} fill={C.fill} stroke={C.power} strokeWidth={2} />
        <T x={430} y={26} anchor="middle" size={13} bold color={C.power}>IF</T>
        <T x={430} y={43} anchor="middle" size={12} mono color={C.muted}>{fw(iff)}</T>
        <T x={560} y={32} anchor="middle" size={12} color={C.muted}>signal and image</T>
        <T x={560} y={48} anchor="middle" size={12} color={C.muted}>both land here</T>
        {/* front-end filter response */}
        <path d={`M${X(RF) - 70},${base} C${X(RF) - 20},${base} ${X(RF) - 22},${base - 100} ${X(RF)},${base - 100} C${X(RF) + 22},${base - 100} ${X(RF) + 20},${base} ${X(RF) + 70},${base}`} fill={C.power} fillOpacity={0.12} stroke={C.power} strokeWidth={2} strokeDasharray="6 4" />
        <T x={X(RF) + 26} y={base - 100} size={12} bold color={C.power}>front-end filter</T>
        <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.ink} width={2} />
        {spike(RF, 76, C.signal)}
        {spike(img, 76, out ? C.muted : C.bad, out ? '4 3' : undefined)}
        <T x={X(RF) - 8} y={base + 16} anchor="end" size={12} bold color={C.signal}>wanted {RF}</T>
        <T x={Math.min(X(img) + (out ? 0 : 8), x1)} y={base + 16} anchor={out ? 'middle' : 'start'} size={12} bold color={out ? C.muted : C.bad}>image {img.toFixed(iff < 1 ? 2 : 1)}</T>
        <T x={x1} y={86} anchor="end" size={13} bold color={out ? C.good : C.bad}>{out ? 'image rejected' : 'image gets through'}</T>
        <Ln x1={X(RF)} y1={base + 36} x2={X(img)} y2={base + 36} color={C.resist} width={2} arrow="both" />
        <T x={320} y={base + 56} anchor="middle" size={13} bold mono color={C.resist}>image = signal + 2 × IF = {RF} + {fw(2 * iff)}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="IF" value={iff} onChange={setIf} options={[{ value: 0.455, label: 'IF 455 kHz' }, { value: 9, label: 'IF 9 MHz' }, { value: 45, label: 'IF 45 MHz' }]} />
      </div>
    </>
  )
}
