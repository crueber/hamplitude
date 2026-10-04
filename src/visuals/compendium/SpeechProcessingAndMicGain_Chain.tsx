import { C, Diagram, Ln, T } from '../kit'

const STAGES = [
  { label: 'Mic gain', a: 'Sets how hard', b: 'the voice drives', c: 'the chain', color: C.voltage },
  { label: 'Compressor', a: 'Evens out loud', b: 'and quiet', c: 'syllables', color: C.power },
  { label: 'Modulator', a: 'Makes the', b: 'SSB signal', c: 'from audio', color: C.signal },
  { label: 'Power amp', a: 'Boosts the', b: 'signal to', c: 'output level', color: C.resist },
]

/** The transmit audio chain: gain, optional compression, modulation, power amplifier, with ALC feeding back. */
export function SpeechProcessingAndMicGain_Chain() {
  const bw = 104, gap = 26, x0 = 76, y = 54, bh = 56
  const bx = (i: number) => x0 + i * (bw + gap)
  return (
    <Diagram w={640} h={250}
      title="Transmit audio chain: microphone, mic gain, compressor, modulator, power amplifier. ALC watches the output and turns the drive back down."
      caption="Set the levels in order: mic gain first (watch ALC), then add compression only if you need it.">
      <T x={20} y={y + bh / 2} size={14} bold color={C.muted}>Mic</T>
      <Ln x1={52} y1={y + bh / 2} x2={bx(0) - 2} y2={y + bh / 2} color={C.ink} width={2.5} arrow />
      {STAGES.map((s, i) => (
        <g key={s.label}>
          <rect x={bx(i)} y={y} width={bw} height={bh} rx={10} fill={C.fill} stroke={s.color} strokeWidth={2.5} />
          <T x={bx(i) + bw / 2} y={y + bh / 2} anchor="middle" size={14} bold>{s.label}</T>
          {i < 3 && <Ln x1={bx(i) + bw + 2} y1={y + bh / 2} x2={bx(i + 1) - 2} y2={y + bh / 2} color={C.ink} width={2.5} arrow />}
          <T x={bx(i) + bw / 2} y={y + bh + 22} anchor="middle" size={12} color={C.muted}>{s.a}</T>
          <T x={bx(i) + bw / 2} y={y + bh + 38} anchor="middle" size={12} color={C.muted}>{s.b}</T>
          <T x={bx(i) + bw / 2} y={y + bh + 54} anchor="middle" size={12} color={C.muted}>{s.c}</T>
        </g>
      ))}
      <Ln x1={bx(3) + bw + 4} y1={y + bh / 2} x2={bx(3) + bw + 22} y2={y + bh / 2} color={C.ink} width={2.5} arrow />
      <T x={622} y={y - 10} anchor="end" size={12} color={C.muted}>to antenna</T>
      {/* ALC feedback path */}
      <path d={`M${bx(3) + bw / 2},${y + bh + 66} L${bx(3) + bw / 2},206 L${bx(0) + bw / 2},206 L${bx(0) + bw / 2},${y + bh + 66}`}
        fill="none" stroke={C.bad} strokeWidth={2.5} strokeDasharray="6 4" markerEnd="url(#hx-arrow)" />
      <rect x={225} y={192} width={190} height={26} rx={13} fill={C.bg} stroke={C.bad} strokeWidth={1.5} />
      <T x={320} y={205} anchor="middle" size={13} bold color={C.bad}>ALC: turns drive down</T>
      <T x={320} y={238} anchor="middle" size={12} color={C.muted}>Past the ALC limit the peaks are flattened: distortion and splatter.</T>
    </Diagram>
  )
}
