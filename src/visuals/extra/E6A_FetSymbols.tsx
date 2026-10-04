import { C, Diagram, T } from '../kit'

type Kind = 'jp' | 'mn' | 'mp' | 'dn' | 'dp' | 'jn'

const S = { stroke: C.ink, strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** One FET symbol in exam style, centred on (0,0), circle radius 40. Arrow tip toward the channel bar = N-channel. */
function FetSym({ kind }: { kind: Kind }) {
  const jfet = kind === 'jp' || kind === 'jn'
  const dual = kind === 'dn' || kind === 'dp'
  const n = kind === 'jn' || kind === 'mn' || kind === 'dn'
  const lab = { stroke: 'none', fill: C.muted, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-body)' } as const
  return (
    <g {...S}>
      <circle cx={0} cy={0} r={40} strokeWidth={2.4} />
      <line x1={0} y1={-32} x2={0} y2={32} />
      <polyline points="0,-20 50,-20" />
      <polyline points="0,20 50,20" />
      {jfet ? (
        <>
          <line x1={-50} y1={0} x2={-16} y2={0} />
          <polygon fill={C.ink} points={n ? '-16,-8 -16,8 -2,0' : '-2,-8 -2,8 -16,0'} />
        </>
      ) : (
        <>
          {dual ? (
            <>
              <line x1={-8} y1={-22} x2={-8} y2={-4} />
              <line x1={-8} y1={2} x2={-8} y2={20} />
              <polyline points="-50,-12 -8,-12" />
              <polyline points="-50,16 -8,16" />
            </>
          ) : (
            <>
              <line x1={-8} y1={-22} x2={-8} y2={14} />
              <polyline points="-50,14 -8,14" />
            </>
          )}
          <polygon fill={C.ink} points={n ? '12,-6 12,6 1,0' : '1,-6 1,6 12,0'} />
          <polyline points="12,0 20,0 20,20" />
          <circle cx={20} cy={20} r={2.6} fill={C.ink} />
        </>
      )}
      <g {...lab}>
        <text x={54} y={-24}>D</text>
        <text x={54} y={26}>S</text>
        {dual ? (<><text x={-72} y={-8}>G2</text><text x={-72} y={20}>G1</text></>) : <text x={-62} y={jfet ? 4 : 18}>G</text>}
      </g>
    </g>
  )
}

const TILES: { fig: number; kind: Kind; name: string; hook: [string, string] }[] = [
  { fig: 1, kind: 'jp', name: 'P-channel JFET', hook: ['Gate arrow on a plain bar,', 'pointing away from it'] },
  { fig: 2, kind: 'mn', name: 'N-channel MOSFET', hook: ['Gate set apart from the bar,', 'arrow points at the bar'] },
  { fig: 3, kind: 'mp', name: 'P-channel MOSFET', hook: ['Gate set apart from the bar,', 'arrow points away'] },
  { fig: 4, kind: 'dn', name: 'N-channel dual-gate MOSFET', hook: ['Two gate leads (G1, G2),', 'arrow points at the bar'] },
  { fig: 5, kind: 'dp', name: 'P-channel dual-gate MOSFET', hook: ['Two gate leads (G1, G2),', 'arrow points away'] },
  { fig: 6, kind: 'jn', name: 'N-channel JFET', hook: ['Gate arrow on a plain bar,', 'pointing at it'] },
]

/** The six FET symbols of exam figure E6-1, each with a recognition hook. */
export function FetSymbols() {
  const cols = 3
  const gap = 10
  const pad = 10
  const tw = (640 - 2 * pad - gap * (cols - 1)) / cols
  const th = 184
  const h = 2 * th + gap + 2 * pad
  return (
    <Diagram w={640} h={h} title="The six FET symbols in figure E6-1: P-channel JFET, N-channel MOSFET, P-channel MOSFET, N-channel dual-gate MOSFET, P-channel dual-gate MOSFET and N-channel JFET."
      caption="Arrow pointing at the channel bar means N-channel. Pointing away means P-channel.">
      {TILES.map((t, k) => (
        <g key={t.fig} transform={`translate(${pad + (k % cols) * (tw + gap)},${pad + Math.floor(k / cols) * (th + gap)})`}>
          <rect width={tw} height={th} rx={12} fill={C.fill} />
          <T x={12} y={16} size={12} bold color={C.muted}>Fig. {t.fig}</T>
          <g transform={`translate(${tw / 2 + 4},72) scale(1.05)`}><FetSym kind={t.kind} /></g>
          <T x={tw / 2} y={132} anchor="middle" bold size={13}>{t.name}</T>
          <T x={tw / 2} y={150} anchor="middle" size={12} color={C.muted}>{t.hook[0]}</T>
          <T x={tw / 2} y={166} anchor="middle" size={12} color={C.muted}>{t.hook[1]}</T>
        </g>
      ))}
    </Diagram>
  )
}
