import { C, Diagram, Ln, T } from '../kit'

/** Intermodulation of two signals F1 and F2. Odd-order products land right beside them; even-order ones land far away. */
export function G8B_Intermod() {
  const base = 126, d = 64, c1 = 288, c2 = 352
  const bar = (x: number, h: number, col: string, lab?: string, lab2?: string) => (
    <g>
      <Ln x1={x} y1={base} x2={x} y2={base - h} color={col} width={6} />
      {lab && <T x={x} y={base + 16} anchor="middle" size={12} bold color={col}>{lab}</T>}
      {lab2 && <T x={x} y={base + 32} anchor="middle" size={12} color={C.muted}>{lab2}</T>}
    </g>
  )
  const wb = 278, wx = (m: number) => 60 + m * 190
  return (
    <Diagram w={640} h={340} title="Two signals F1 and F2 mix in a non-linear circuit. Odd-order intermodulation products, such as 2F1 minus F2 and 2F2 minus F1, land right next to the originals. Even-order products land near zero and near twice the frequency, far away"
      caption="Odd-order products (3rd, 5th) fall right beside your signals. Even-order products land far away.">
      <T x={20} y={14} size={13} bold color={C.muted}>Zoomed in around F1 and F2</T>
      <Ln x1={40} y1={base} x2={600} y2={base} color={C.muted} width={2} />
      {bar(c1, 86, C.signal, 'F1')}
      {bar(c2, 86, C.signal, 'F2')}
      {bar(c1 - d, 46, C.bad, '2F1−F2', '3rd order')}
      {bar(c2 + d, 46, C.bad, '2F2−F1', '3rd order')}
      {bar(c1 - 2 * d, 24, C.resist, '3F1−2F2', '5th order')}
      {bar(c2 + 2 * d, 24, C.resist, '3F2−2F1', '5th order')}
      <T x={20} y={196} size={13} bold color={C.muted}>Zoomed out: where every kind lands</T>
      <Ln x1={40} y1={wb} x2={600} y2={wb} color={C.muted} width={2} />
      <rect x={wx(1) - 10} y={wb - 40} width={20} height={40} rx={4} fill={C.bad} fillOpacity={0.25} stroke={C.bad} strokeWidth={2} />
      <T x={wx(1)} y={wb + 18} anchor="middle" size={12} bold color={C.bad}>odd order</T>
      <T x={wx(1)} y={wb + 34} anchor="middle" size={12} color={C.muted}>same place as F1 and F2</T>
      <Ln x1={wx(0)} y1={wb} x2={wx(0)} y2={wb - 26} color={C.muted} width={5} />
      <T x={wx(0)} y={wb + 18} anchor="middle" size={12} bold color={C.muted}>F2−F1</T>
      <T x={wx(0)} y={wb + 34} anchor="middle" size={12} color={C.muted}>2nd order</T>
      {[-3, 0, 3].map((o) => <Ln key={o} x1={wx(2) + o} y1={wb} x2={wx(2) + o} y2={wb - 26} color={C.muted} width={3} />)}
      <T x={wx(2)} y={wb + 18} anchor="middle" size={12} bold color={C.muted}>2F1, F1+F2, 2F2</T>
      <T x={wx(2)} y={wb + 34} anchor="middle" size={12} color={C.muted}>even order, about 2 × F</T>
      <T x={wx(0)} y={wb - 46} anchor="middle" size={12} color={C.muted}>near 0</T>
    </Diagram>
  )
}
