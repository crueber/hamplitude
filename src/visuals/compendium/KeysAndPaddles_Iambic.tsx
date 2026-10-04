import { C, Diagram, Ln, T } from '../kit'

const X0 = 130, U = 38 // px per dit-length unit

// Squeeze, dah paddle sensed first, so the keyer alternates dah, dit, dah, dit...
// elements (start unit, length): dah 0-3, dit 4-5, dah 6-9, dit 10-11. Paddles released at unit 8, mid third element.
const ELS: [number, number, 'dah' | 'dit'][] = [[0, 3, 'dah'], [4, 1, 'dit'], [6, 3, 'dah'], [10, 1, 'dit']]
const REL = 8

function Row({ y, label, sub, els, ghost, color }: { y: number; label: string; sub: string; els: number; ghost?: boolean; color: string }) {
  return (
    <g>
      <T x={14} y={y + 8} size={14} bold color={color}>{label}</T>
      <T x={14} y={y + 28} size={12.5} color={C.muted}>{sub}</T>
      {ELS.map(([s, l, kind], i) => {
        const on = i < els
        const isGhost = !on && ghost
        if (!on) return null
        return <rect key={i} x={X0 + s * U} y={y} width={l * U} height={22} rx={11} fill={kind === 'dit' ? C.signal : C.power} fillOpacity={isGhost ? 0.3 : 1} />
      })}
    </g>
  )
}

/** Iambic A vs B: the same squeeze, released during the third element. */
export function KeysAndPaddles_Iambic() {
  return (
    <Diagram w={640} h={262} title="Squeezing both paddles starting with the dah paddle makes dah dit dah dit. If both are released while the third element, a dah, is sounding, iambic mode A stops when that dah ends and sends K. Mode B sends one more dit and so sends C"
      caption="Same hands, same moment of release. Mode B adds one extra, opposite element after you let go.">
      <rect x={X0} y={16} width={REL * U} height={22} rx={6} fill={C.fill2} />
      <T x={14} y={27} size={14} bold>Both paddles</T>
      <T x={X0 + 8} y={27} size={13} bold>squeezed (dah side first)</T>
      <Ln x1={X0 + REL * U} y1={10} x2={X0 + REL * U} y2={218} color={C.bad} width={2} dash="5 4" />
      <T x={X0 + REL * U + 8} y={26} size={13} bold color={C.bad}>released</T>
      <Row y={62} label="Mode A" sub="stops after this dah" els={3} color={C.ink} />
      <T x={X0 + 10 * U + 4} y={73} size={14} bold color={C.ink}>= K</T>
      <Row y={128} label="Mode B" sub="one more element" els={4} color={C.ink} />
      <T x={X0 + 12 * U + 4} y={139} size={14} bold color={C.ink}>= C</T>
      <T x={X0 + 10 * U + 5} y={165} size={12.5} color={C.muted} anchor="middle">extra dit</T>
      <Ln x1={X0 + 10.5 * U} y1={156} x2={X0 + 10.5 * U} y2={152} color={C.muted} width={1.5} />
      <T x={X0} y={196} size={13} bold color={C.signal}>● dit</T>
      <T x={X0 + 60} y={196} size={13} bold color={C.power}>▬ dah</T>
      <T x={14} y={236} size={13} color={C.muted}>Time runs left to right; one dit-length = 1 unit.</T>
    </Diagram>
  )
}
