import { C, Diagram, Ln, T, sinePath } from '../kit'

/** A noise blanker drops receiver gain for the instant of each impulse. */
export function Blanker() {
  const x0 = 130, x1 = 610
  const spikes = [220, 360, 500]
  const sig = (cy: number, gaps: boolean) => {
    // wanted signal as a sine, optionally with a gap at each impulse
    const segs: string[] = []
    let from = x0
    const cuts = gaps ? spikes : []
    for (const s of [...cuts, x1 + 1]) {
      const to = s === x1 + 1 ? x1 : s - 8
      if (to > from) segs.push(sinePath(from, to, cy, 12, (to - from) / 44, ((from - x0) / 44) * 6.283, 60))
      from = s + 8
    }
    return segs
  }
  return (
    <Diagram w={640} h={290} title="Noise blanker: the received signal has tall, brief noise pulses. The blanker briefly turns receiver gain to zero during each pulse, so the pulses are removed and only tiny gaps remain in the wanted signal."
      caption="It doesn't clip or filter the noise. It switches the gain down for the instant a pulse arrives.">
      <T x={14} y={50} size={13} bold color={C.muted}>Received</T>
      <T x={14} y={116} size={13} bold color={C.muted}>Receiver gain</T>
      <T x={14} y={216} size={13} bold color={C.muted}>Output</T>
      {/* received */}
      <path d={sinePath(x0, x1, 62, 12, 11)} fill="none" stroke={C.signal} strokeWidth={2.5} />
      {spikes.map((s) => <Ln key={s} x1={s} y1={20} x2={s} y2={104} color={C.bad} width={4} />)}
      {/* gain */}
      <path d={`M${x0},138 ` + spikes.map((s) => `L${s - 8},138 L${s - 8},182 L${s + 8},182 L${s + 8},138`).join(' ') + ` L${x1},138`} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
      <T x={x0 - 4} y={186} anchor="end" size={12} color={C.muted}>0</T>
      <T x={x0 - 4} y={138} anchor="end" size={12} color={C.muted}>full</T>
      {spikes.map((s) => <T key={s} x={s} y={198} anchor="middle" size={12} bold color={C.power}>gain dips</T>)}
      {/* output */}
      {sig(244, true).map((d, i) => <path key={i} d={d} fill="none" stroke={C.good} strokeWidth={2.5} />)}
      {spikes.map((s) => <T key={s} x={s} y={268} anchor="middle" size={12} color={C.muted}>tiny gap</T>)}
    </Diagram>
  )
}
