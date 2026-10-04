import { C, Box, Diagram, Ln, T } from '../kit'

/** CTCSS rides below the voice band; squelch mutes the receiver until a (right) signal arrives. */
export function Ctcss() {
  const x0 = 50, x1 = 600
  const lo = Math.log10(30), hi = Math.log10(5000)
  const px = (f: number) => x0 + ((Math.log10(f) - lo) / (hi - lo)) * (x1 - x0)
  return (
    <Diagram w={640} h={320} title="A CTCSS tone is sub-audible: it sits below the voice audio band and is sent along with the voice. Squelch mutes the receiver until a signal, with the right tone if CTCSS is used, arrives." caption="CTCSS: a tone below the voice band, sent with your voice, opens the repeater's squelch.">
      <T x={x0} y={20} bold size={15}>Transmitted audio</T>
      <Ln x1={x0} y1={110} x2={x1} y2={110} color={C.muted} width={2} />
      <rect x={px(300)} y={50} width={px(3000) - px(300)} height={60} rx={8} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={2.2} />
      <T x={(px(300) + px(3000)) / 2} y={80} anchor="middle" bold size={15} color={C.signal}>voice</T>
      <rect x={px(67) - 10} y={50} width={20} height={60} rx={6} fill={C.power} />
      <T x={px(67) + 20} y={72} size={13} bold color={C.power}>CTCSS tone</T>
      <T x={px(67) + 20} y={90} size={13} bold color={C.power}>sub-audible</T>
      {[100, 300, 1000, 3000].map((f) => (
        <g key={f}>
          <Ln x1={px(f)} y1={104} x2={px(f)} y2={116} color={C.muted} width={2} />
          <T x={px(f)} y={130} anchor="middle" size={12} color={C.muted}>{f} Hz</T>
        </g>
      ))}
      {/* squelch gate */}
      <T x={x0} y={172} bold size={15}>Receiver</T>
      <Box x={14} y={196} w={170} h={56} label="Signal arrives" sub="plus the right tone" color={C.signal} />
      <Box x={235} y={196} w={170} h={56} label="Squelch" sub="mutes when no signal" color={C.resist} />
      <Box x={456} y={196} w={170} h={56} label="Audio out" sub="you hear it" color={C.good} />
      <Ln x1={186} y1={224} x2={233} y2={224} color={C.ink} width={2.5} arrow />
      <Ln x1={407} y1={224} x2={454} y2={224} color={C.ink} width={2.5} arrow />
      <T x={320} y={286} anchor="middle" size={13} color={C.muted}>No signal, or the wrong tone with CTCSS: gate stays shut, speaker silent.</T>
    </Diagram>
  )
}
