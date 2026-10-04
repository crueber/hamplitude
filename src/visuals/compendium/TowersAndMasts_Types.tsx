import { C, Diagram, Ln, T } from '../kit'

/** The four common kinds of antenna support, side by side (schematic silhouettes, not to scale). */
export function TowersAndMasts_Types() {
  const base = 252
  const col = (i: number) => 80 + i * 160
  const beam = (cx: number, y: number) => (
    <g>
      <Ln x1={cx - 24} y1={y} x2={cx + 24} y2={y} color={C.signal} width={3.5} />
      {[-18, -4, 10, 22].map((dx) => <Ln key={dx} x1={cx + dx} y1={y - 8} x2={cx + dx} y2={y + 8} color={C.signal} width={2.5} />)}
    </g>
  )
  const guy = (x1: number, y1: number, x2: number, y2: number) => <Ln x1={x1} y1={y1} x2={x2} y2={y2} color={C.muted} width={1.8} dash="5 3" />
  const anchor = (x: number) => <rect x={x - 5} y={base} width={10} height={8} fill={C.muted} />
  const ground = (cx: number) => <Ln x1={cx - 72} y1={base} x2={cx + 72} y2={base} color={C.muted} width={3} />
  const lattice = (cx: number, yTop: number, yBot: number, hw: number, n: number) => {
    const out = []
    const step = (yBot - yTop) / n
    out.push(<Ln key="l" x1={cx - hw} y1={yTop} x2={cx - hw} y2={yBot} color={C.ink} width={3} />)
    out.push(<Ln key="r" x1={cx + hw} y1={yTop} x2={cx + hw} y2={yBot} color={C.ink} width={3} />)
    for (let k = 0; k < n; k++) {
      const a = yTop + k * step, b = a + step
      out.push(<Ln key={`z${k}`} x1={k % 2 ? cx + hw : cx - hw} y1={a} x2={k % 2 ? cx - hw : cx + hw} y2={b} color={C.ink} width={1.8} />)
    }
    return out
  }
  const names: [string, string, string][] = [
    ['Mast or pole', 'light loads,', 'often guyed'],
    ['Guyed tower', 'tall and slim,', 'needs anchors'],
    ['Self-supporting', 'no guys, big', 'concrete base'],
    ['Crank-up or tilt-over', 'lowers for work', 'at ground level'],
  ]
  return (
    <Diagram w={640} h={344} title="Four kinds of antenna support: a mast or pole, a guyed lattice tower, a self-supporting tower on a concrete base, and a crank-up tower with nested sections"
      caption="Schematic silhouettes, not to scale. Each type trades height, footprint, cost and how it handles wind.">
      {/* 1 mast */}
      {ground(col(0))}
      <Ln x1={col(0)} y1={base} x2={col(0)} y2={96} color={C.ink} width={5} />
      {beam(col(0), 90)}
      {guy(col(0), 150, col(0) - 56, base)}{guy(col(0), 150, col(0) + 56, base)}
      {anchor(col(0) - 56)}{anchor(col(0) + 56)}
      {/* 2 guyed tower */}
      {ground(col(1))}
      {lattice(col(1), 78, base, 8, 14)}
      {beam(col(1), 70)}
      {guy(col(1), 78, col(1) - 66, base)}{guy(col(1), 78, col(1) + 66, base)}
      {guy(col(1), 160, col(1) - 40, base)}{guy(col(1), 160, col(1) + 40, base)}
      {anchor(col(1) - 66)}{anchor(col(1) + 66)}
      {/* 3 self-supporting */}
      {ground(col(2))}
      <rect x={col(2) - 38} y={base - 14} width={76} height={14} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      <Ln x1={col(2) - 30} y1={base - 14} x2={col(2) - 7} y2={74} color={C.ink} width={3} />
      <Ln x1={col(2) + 30} y1={base - 14} x2={col(2) + 7} y2={74} color={C.ink} width={3} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const y = base - 14 - k * 30
        const hw = 30 - ((base - 14 - y) / (base - 14 - 74)) * 23
        const y2 = y - 30
        const hw2 = 30 - ((base - 14 - y2) / (base - 14 - 74)) * 23
        return <Ln key={k} x1={k % 2 ? col(2) + hw : col(2) - hw} y1={y} x2={k % 2 ? col(2) - hw2 : col(2) + hw2} y2={y2} color={C.ink} width={1.8} />
      })}
      {beam(col(2), 66)}
      {/* 4 crank-up */}
      {ground(col(3))}
      <rect x={col(3) - 16} y={base - 80} width={32} height={80} fill="none" stroke={C.ink} strokeWidth={3} />
      <rect x={col(3) - 11} y={base - 140} width={22} height={60} fill="none" stroke={C.ink} strokeWidth={3} />
      <rect x={col(3) - 6} y={base - 190} width={12} height={50} fill="none" stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2].map((k) => <Ln key={k} x1={col(3) - 16} y1={base - k * 26} x2={col(3) + 16} y2={base - k * 26 - 26} color={C.ink} width={1.5} />)}
      {beam(col(3), base - 202)}
      <rect x={col(3) - 32} y={base - 14} width={64} height={14} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      {names.map(([n, d, d2], i) => (
        <g key={n}>
          <T x={col(i)} y={284} size={13.5} bold anchor="middle">{n}</T>
          <T x={col(i)} y={304} size={12.5} anchor="middle" color={C.muted}>{d}</T>
          <T x={col(i)} y={322} size={12.5} anchor="middle" color={C.muted}>{d2}</T>
        </g>
      ))}
    </Diagram>
  )
}
