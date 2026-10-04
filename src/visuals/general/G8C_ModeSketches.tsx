import { C, Diagram, T } from '../kit'

/** Each digital mode as a tiny waterfall sketch (frequency across, time down) beside its pool facts. */
export function G8C_ModeSketches() {
  const tw = 120, th = 54, x0 = 14
  const seq = (n: number, m: number, seed: number) => Array.from({ length: n }, (_, i) => (i * seed + (i * i) % 5 + 1) % m)
  const thumb = (y: number, kind: 'wspr' | 'ft8' | 'psk' | 'rtty' | 'voice', col: string) => {
    const cx = x0 + tw / 2
    const segs: React.ReactNode[] = []
    for (let i = 0; i < 9; i++) for (let j = 0; j < 20; j++) segs.push(<rect key={`n${i}-${j}`} x={x0 + 4 + j * 5.7} y={y + 3 + i * 5.6} width={5.2} height={5} fill={col} opacity={0.05 + 0.13 * (((i * 31 + j * 17) % 7) / 6)} />)
    if (kind === 'wspr') {
      seq(6, 4, 3).forEach((t, i) => segs.push(<rect key={i} x={cx - 9 + t * 6} y={y + 3 + i * 8.5} width={5} height={8} rx={1.5} fill={col} />))
    } else if (kind === 'ft8') {
      seq(8, 8, 3).forEach((t, i) => segs.push(<rect key={i} x={cx - 30 + t * 8} y={y + 3 + i * 6.3} width={7} height={6} rx={1.5} fill={col} />))
    } else if (kind === 'psk') {
      for (let i = 0; i < 12; i++) segs.push(<rect key={i} x={cx - 2 + (i % 3 === 0 ? 0.5 : -0.5)} y={y + 3 + i * 4.2} width={4} height={4.3} fill={col} opacity={0.6 + 0.4 * ((i * 7) % 3 === 0 ? 1 : 0.6)} />)
    } else if (kind === 'rtty') {
      seq(10, 2, 3).forEach((t, i) => segs.push(<rect key={i} x={cx - 24 + t * 46} y={y + 3 + i * 5} width={5} height={4.8} rx={1} fill={col} />))
    } else {
      for (let i = 0; i < 10; i++) for (let j = 0; j < 8; j++) segs.push(<rect key={`${i}-${j}`} x={cx - 32 + j * 8} y={y + 3 + i * 5} width={7} height={4.4} fill={col} opacity={0.35 + 0.5 * (((i * 5 + j * 3) % 4) / 3)} />)
    }
    return (
      <g>
        <rect x={x0} y={y} width={tw} height={th} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
        {segs}
      </g>
    )
  }
  const rows: { name: string; line1: string; line2: string; kind: 'wspr' | 'ft8' | 'psk' | 'rtty' | 'voice'; col: string }[] = [
    { name: 'WSPR', line1: 'Low-power beacon', line2: 'Used to assess HF propagation', kind: 'wspr', col: C.power },
    { name: 'FT8', line1: '8-tone FSK. Decodes very weak signals', line2: 'Report +3 = +3 dB signal-to-noise in a 2.5 kHz bandwidth', kind: 'ft8', col: C.signal },
    { name: 'PSK31', line1: 'Varicode characters, one narrow trace', line2: 'No error correction (QPSK31 adds it)', kind: 'psk', col: C.current },
    { name: 'RTTY', line1: 'FSK: two tones, mark and space', line2: 'Baudot code, 5 bits per character', kind: 'rtty', col: C.resist },
    { name: 'Digital voice', line1: 'DMR, D-STAR, System Fusion', line2: 'FT8, FT4, FST4 and WSPR are data, not voice', kind: 'voice', col: C.voltage },
  ]
  const rh = 68
  return (
    <Diagram w={640} h={rows.length * rh + 30} title="Digital modes as waterfall sketches: WSPR low-power propagation beacon, FT8 eight-tone FSK for very weak signals, PSK31 with Varicode, RTTY with mark and space tones and Baudot code, and digital voice modes DMR, D-STAR and System Fusion"
      caption="Sketches: frequency runs across, time runs down. Each mode leaves a different shape.">
      {rows.map((r, i) => {
        const y = 12 + i * rh
        return (
          <g key={r.name}>
            {thumb(y, r.kind, r.col)}
            <T x={156} y={y + 12} size={16} bold color={r.col}>{r.name}</T>
            <T x={156} y={y + 32} size={13.5} bold>{r.line1}</T>
            <T x={156} y={y + 50} size={12.5} color={C.muted}>{r.line2}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
