import { C, Diagram, Lines, T, Ln } from '../kit'

/** Three kinds of IC, with a symbol/sketch each, plus CMOS vs TTL. */
export function IcFamilies() {
  const W = 200, G = 10
  const tx = (i: number) => 10 + i * (W + G)
  const Wr = ({ pts }: { pts: [number, number][] }) => <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  return (
    <Diagram w={640} h={300} title="Three kinds of integrated circuit. Analog ICs such as op-amps handle continuously varying signals. Digital ICs such as logic gates handle ones and zeros. A MMIC is a Monolithic Microwave Integrated Circuit, a whole microwave amplifier on one chip. CMOS digital chips use less power than TTL."
      caption="Analog = smooth signals. Digital = ones and zeros. MMIC = microwave stage on one chip.">
      {[
        { n: 'Analog', c: C.signal, a: ['Op-amp: output follows', 'the input smoothly'] },
        { n: 'Digital', c: C.power, a: ['Logic gates: only', 'high or low (1 or 0)'] },
        { n: 'MMIC', c: C.resist, a: ['Monolithic Microwave IC:', 'a microwave stage on one chip'] },
      ].map((t, i) => (
        <g key={t.n}>
          <rect x={tx(i)} y={10} width={W} height={196} rx={12} fill={C.fill} />
          <T x={tx(i) + W / 2} y={34} anchor="middle" bold size={16} color={t.c}>{t.n}</T>
          <g transform={`translate(${tx(i) + W / 2},96)`}>
            {i === 0 && (
              <g>
                <polygon points="-24,-30 -24,30 30,0" fill={C.fill2} stroke={C.signal} strokeWidth={2.4} strokeLinejoin="round" />
                <Wr pts={[[-54, -14], [-24, -14]]} /><Wr pts={[[-54, 14], [-24, 14]]} /><Wr pts={[[30, 0], [60, 0]]} />
                <T x={-17} y={-14} size={14} bold>−</T><T x={-17} y={14} size={14} bold>+</T>
              </g>
            )}
            {i === 1 && (
              <g>
                <path d="M-26,-26 L0,-26 A26,26 0 0 1 0,26 L-26,26 Z" fill={C.fill2} stroke={C.power} strokeWidth={2.4} strokeLinejoin="round" />
                <Wr pts={[[-54, -14], [-26, -14]]} /><Wr pts={[[-54, 14], [-26, 14]]} /><Wr pts={[[26, 0], [58, 0]]} />
                <T x={-8} y={0} size={14} bold>&amp;</T>
              </g>
            )}
            {i === 2 && (
              <g>
                <rect x={-34} y={-26} width={68} height={52} rx={4} fill={C.fill2} stroke={C.resist} strokeWidth={2.4} />
                {[-14, 0, 14].map((y) => <g key={y}><Ln x1={-46} y1={y} x2={-34} y2={y} color={C.ink} /><Ln x1={34} y1={y} x2={46} y2={y} color={C.ink} /></g>)}
                <T x={0} y={0} bold size={14}>amp</T>
              </g>
            )}
          </g>
          <Lines x={tx(i) + W / 2} y={160} anchor="middle" size={12.5} color={C.muted} lh={18} lines={t.a} />
        </g>
      ))}
      <rect x={10} y={218} width={620} height={66} rx={12} fill={C.fill} />
      <T x={26} y={238} bold size={14}>Digital logic families</T>
      <T x={26} y={264} bold size={14} color={C.good}>CMOS</T>
      <rect x={90} y={254} width={70} height={20} rx={5} fill={C.good} opacity={0.85} />
      <T x={170} y={264} size={13} color={C.muted}>low power consumption</T>
      <T x={346} y={264} bold size={14} color={C.bad}>TTL</T>
      <rect x={378} y={254} width={150} height={20} rx={5} fill={C.bad} opacity={0.85} />
      <T x={534} y={264} size={13} color={C.muted}>more power</T>
    </Diagram>
  )
}
