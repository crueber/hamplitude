import { C, Diagram, Ln, T } from '../kit'

const PW = 304, PH = 150
const noise = (seed: number) => { const x = Math.sin(seed * 127.1) * 43758.5453; return x - Math.floor(x) }

/** Four common interference sources and what each one looks like. */
export function NoiseGallery() {
  const panel = (x: number, y: number, title: string, sub: string, col: string, body: React.ReactNode) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={PW} height={PH} rx={12} fill={C.fill} stroke={col} strokeWidth={2} />
      <T x={14} y={20} bold size={14} color={col}>{title}</T>
      <T x={14} y={40} size={12} color={C.muted}>{sub}</T>
      {body}
    </g>
  )
  // 1: bursts of buzzing noise (time trace)
  let burst = ''
  for (let i = 0; i <= 270; i += 2) {
    const inB = (i > 50 && i < 100) || (i > 180 && i < 215)
    const a = inB ? 24 * (noise(i) * 2 - 1) : 3 * Math.sin(i / 3)
    burst += `${i ? 'L' : 'M'}${14 + i},${106 + a}`
  }
  const comb = Array.from({ length: 9 }, (_, i) => 28 + i * 31)
  return (
    <Diagram w={640} h={346} title="Four interference sources and what they look like: arcing AC-line devices make intermittent roaring or buzzing bursts, switch-mode power supplies make carriers at regular intervals across a wide range, computer network equipment makes unstable signals at specific frequencies, and corroded metal joints mix local AM broadcast signals into spurious signals."
      caption="Learn each source by its signature: bursts, a comb of carriers, fixed spurs, or mixing products.">
      {panel(6, 8, 'Arcing contacts, doorbell, sign', 'intermittent roaring or buzzing', C.bad,
        <><Ln x1={14} y1={106} x2={284} y2={106} color={C.fill2} width={1} /><path d={burst} fill="none" stroke={C.bad} strokeWidth={2} /><T x={150} y={136} anchor="middle" size={12} color={C.muted}>time →</T></>)}
      {panel(330, 8, 'Switch-mode power supply', 'carriers at regular intervals, wide range', C.resist,
        <><Ln x1={14} y1={118} x2={290} y2={118} color={C.ink} width={2} />
          {comb.map((x, i) => <Ln key={i} x1={x + 8} y1={118} x2={x + 8} y2={118 - (62 - i * 3)} color={C.resist} width={3} />)}
          <T x={150} y={136} anchor="middle" size={12} color={C.muted}>frequency →</T></>)}
      {panel(6, 176, 'Computer network equipment', 'unstable signals at specific frequencies', C.power,
        <><Ln x1={14} y1={118} x2={290} y2={118} color={C.ink} width={2} />
          {[70, 150, 232].map((x, i) => <g key={x}><Ln x1={x} y1={118} x2={x} y2={118 - [44, 30, 52][i]} color={C.power} width={3} /><Ln x1={x - 6} y1={118 - [44, 30, 52][i]} x2={x + 6} y2={118 - [44, 30, 52][i]} color={C.power} width={2} dash="2 2" /></g>)}
          <T x={150} y={136} anchor="middle" size={12} color={C.muted}>frequency →</T></>)}
      {panel(330, 176, 'Corroded metal connection', 'mixes local AM broadcast signals', C.signal,
        <><Ln x1={14} y1={118} x2={290} y2={118} color={C.ink} width={2} />
          {[[60, 44, C.signal], [120, 44, C.signal]].map(([x, h, c], i) => <Ln key={i} x1={x as number} y1={118} x2={x as number} y2={118 - (h as number)} color={c as string} width={3} />)}
          {[[180, 36], [240, 26]].map(([x, h], i) => <Ln key={i} x1={x} y1={118} x2={x} y2={118 - h} color={C.bad} width={3} dash="4 3" />)}
          <T x={90} y={62} anchor="middle" size={12} bold color={C.signal}>2 AM stations</T>
          <T x={225} y={68} anchor="middle" size={12} bold color={C.bad}>spurs on MF/HF</T>
          <T x={150} y={136} anchor="middle" size={12} color={C.muted}>frequency →</T></>)}
    </Diagram>
  )
}
