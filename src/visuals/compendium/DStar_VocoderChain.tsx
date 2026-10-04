import { C, Box, Diagram, Ln, T } from '../kit'

/** The idea behind every digital voice mode: a vocoder turns speech into a small stream of bits, which are protected and then sent. */
export function DStar_VocoderChain() {
  const w = 134, gap = 24, x0 = 14
  const bx = (i: number) => x0 + i * (w + gap)
  const tx = [
    { l: 'Voice', s: 'microphone', c: C.ink },
    { l: 'Vocoder', s: 'speech to a few bits', c: C.power },
    { l: 'Error protection', s: 'extra bits added', c: C.resist },
    { l: 'Modulator', s: 'bits to RF', c: C.signal },
  ]
  const rx = [
    { l: 'Demodulator', s: 'RF to bits', c: C.signal },
    { l: 'Error correction', s: 'repairs bit errors', c: C.resist },
    { l: 'Vocoder', s: 'bits back to speech', c: C.power },
    { l: 'Speaker', s: 'you hear it', c: C.ink },
  ]
  return (
    <Diagram w={640} h={290}
      title="Digital voice chain: at the sender, a vocoder compresses speech into a small stream of bits, error protection is added and the bits modulate a carrier; the receiver reverses each step"
      caption="The vocoder is the heart of digital voice. Different systems use different vocoders and different ways of sending the bits.">
      <T x={14} y={22} size={15} bold color={C.current}>Transmit</T>
      {tx.map((b, i) => <Box key={b.l} x={bx(i)} y={36} w={w} h={62} label={b.l} sub={b.s} color={b.c} size={14} />)}
      {[0, 1, 2].map((i) => <Ln key={i} x1={bx(i) + w + 2} y1={67} x2={bx(i + 1) - 2} y2={67} color={C.muted} width={2.5} arrow />)}
      <Ln x1={bx(3) + w / 2} y1={100} x2={bx(3) + w / 2} y2={178} color={C.signal} width={3} dash="5 5" arrow />
      <T x={bx(3) + w / 2 - 8} y={139} size={13} color={C.muted} anchor="end">over the air</T>
      <T x={14} y={166} size={15} bold color={C.good}>Receive</T>
      {rx.map((b, i) => <Box key={b.l + 'r'} x={bx(3 - i)} y={180} w={w} h={62} label={b.l} sub={b.s} color={b.c} size={14} />)}
      {[0, 1, 2].map((i) => <Ln key={i} x1={bx(3 - i) - 2} y1={211} x2={bx(2 - i) + w + 2} y2={211} color={C.muted} width={2.5} arrow />)}
      <T x={320} y={270} anchor="middle" size={13} color={C.muted}>A weak signal corrupts bits: error correction repairs a few, then the audio breaks up.</T>
    </Diagram>
  )
}
