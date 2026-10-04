import { C, Diagram, T } from '../kit'

interface Part { t: string; c: string; w: number }
interface Line { who: string; col: string; parts: Part[]; note: string }
const L: Line[] = [
  { who: 'A', col: C.signal, parts: [{ t: 'CQ TEST', c: C.muted, w: 74 }, { t: 'N0CALL', c: C.signal, w: 64 }], note: 'A is "running": calling CQ, announcing the contest and the call sign.' },
  { who: 'B', col: C.power, parts: [{ t: 'N0DEMO', c: C.power, w: 64 }], note: 'B answers with only its call sign. Nothing else is needed yet.' },
  { who: 'A', col: C.signal, parts: [{ t: 'N0DEMO', c: C.power, w: 64 }, { t: '5NN', c: C.current, w: 40 }, { t: '017', c: C.resist, w: 40 }], note: "A confirms B's call, then sends the exchange: report and serial number." },
  { who: 'B', col: C.power, parts: [{ t: 'R', c: C.muted, w: 18 }, { t: '5NN', c: C.current, w: 40 }, { t: '231', c: C.resist, w: 40 }], note: 'B acknowledges with R and sends its own report and serial number.' },
  { who: 'A', col: C.signal, parts: [{ t: 'TU', c: C.muted, w: 28 }, { t: 'N0CALL', c: C.signal, w: 64 }], note: 'TU, thanks. A signs, then calls CQ again. The contact took seconds.' },
]

/** Anatomy of a typical contest exchange on CW, with the exchange pieces coloured. Placeholder calls, example format. */
export function Contesting_Exchange() {
  const rh = 56
  return (
    <Diagram w={640} h={L.length * rh + 40}
      title="A typical contest contact on CW with placeholder call signs. Station A calls CQ TEST, B answers with a call sign, A sends B's call plus a signal report and a serial number, B replies with R plus its own report and number, and A says TU and signs. The report is coloured blue and the serial number amber."
      caption="Illustrative: the exchange is different in every contest. 5NN is the CW shorthand for the report 599.">
      {L.map((l, i) => {
        const y = 8 + i * rh
        let x = 70
        return (
          <g key={i}>
            <circle cx={30} cy={y + 20} r={13} fill={l.col} />
            <T x={30} y={y + 20} anchor="middle" size={13} bold color={C.bg}>{l.who}</T>
            {l.parts.map((p, j) => {
              const cx = x
              x += p.w + 8
              return (
                <g key={j}>
                  <rect x={cx} y={y + 6} width={p.w} height={28} rx={6} fill={p.c} fillOpacity={0.16} stroke={p.c} strokeWidth={1.6} />
                  <T x={cx + p.w / 2} y={y + 20} anchor="middle" size={13} mono bold>{p.t}</T>
                </g>
              )
            })}
            <T x={70} y={y + 44} size={12.5} color={C.muted}>{l.note}</T>
          </g>
        )
      })}
      <g transform={`translate(0 ${L.length * rh + 6})`}>
        <rect x={70} y={6} width={14} height={14} rx={3} fill={C.current} fillOpacity={0.5} stroke={C.current} />
        <T x={90} y={14} size={12.5}>signal report</T>
        <rect x={200} y={6} width={14} height={14} rx={3} fill={C.resist} fillOpacity={0.5} stroke={C.resist} />
        <T x={220} y={14} size={12.5}>serial number</T>
        <rect x={340} y={6} width={14} height={14} rx={3} fill={C.signal} fillOpacity={0.5} stroke={C.signal} />
        <T x={360} y={14} size={12.5}>caller's call sign</T>
        <rect x={490} y={6} width={14} height={14} rx={3} fill={C.power} fillOpacity={0.5} stroke={C.power} />
        <T x={510} y={14} size={12.5}>answerer's call</T>
      </g>
    </Diagram>
  )
}
