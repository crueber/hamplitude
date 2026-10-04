import { C, Diagram, Ln, T } from '../kit'

const PX = 46 // px per kHz
const CX = 320 // x of the band edge

interface Row {
  title: string
  edge: string
  side: 'USB' | 'LSB'
  carrier: string
  /** carrier offset from the edge, kHz (positive = above the edge) */
  off: number
  bw: number
  verdict: string
  ok: boolean
}

const ROWS: Row[] = [
  { title: 'USB, carrier 14.348 MHz, 3 kHz wide', edge: 'upper edge 14.350', side: 'USB', carrier: '14.348', off: -2, bw: 3, verdict: '1 kHz outside', ok: false },
  { title: 'USB data, carrier 14.1472 MHz, 2.8 kHz wide', edge: 'segment edge 14.150', side: 'USB', carrier: '14.1472', off: -2.8, bw: 2.8, verdict: 'highest legal carrier', ok: true },
  { title: 'LSB, carrier 3.601 MHz, 3 kHz wide', edge: 'lower edge 3.600', side: 'LSB', carrier: '3.601', off: 1, bw: 3, verdict: '2 kHz outside', ok: false },
]

/** A phone signal hangs off its carrier: USB upward, LSB downward. Check the far edge of the signal against the band edge. */
export function E1A_Sideband() {
  return (
    <Diagram w={640} h={456} title="Three signals drawn against a band edge. A USB signal extends above its carrier and an LSB signal below it, so the far end of the signal must stay inside the band." caption="Each row spans 6 kHz either side of the edge. Green side is inside the band, red is outside.">
      {ROWS.map((r, i) => {
        const y0 = 4 + i * 148
        const usb = r.side === 'USB'
        const carX = CX + r.off * PX
        const farX = usb ? carX + r.bw * PX : carX - r.bw * PX
        const sx = Math.min(carX, farX)
        const sw = Math.abs(farX - carX)
        const inLeft = usb // USB rows: band lies left of the edge
        const outX0 = inLeft ? CX : 40
        const outW = inLeft ? 600 - CX : CX - 40
        const inX0 = inLeft ? 40 : CX
        const inW = inLeft ? CX - 40 : 600 - CX
        const spillX0 = inLeft ? CX : sx
        const spillW = inLeft ? Math.max(0, farX - CX) : Math.max(0, CX - sx)
        return (
          <g key={r.title}>
            <T x={8} y={y0 + 10} bold size={14}>{r.title}</T>
            <rect x={inX0} y={y0 + 30} width={inW} height={84} fill={C.good} fillOpacity={0.12} />
            <rect x={outX0} y={y0 + 30} width={outW} height={84} fill={C.bad} fillOpacity={0.12} />
            <T x={inLeft ? 46 : 594} y={y0 + 42} size={12} color={C.good} bold anchor={inLeft ? 'start' : 'end'}>in band</T>
            <T x={inLeft ? 594 : 46} y={y0 + 42} size={12} color={C.bad} bold anchor={inLeft ? 'end' : 'start'}>outside</T>
            <rect x={sx} y={y0 + 54} width={sw} height={26} rx={4} fill={C.signal} fillOpacity={0.45} stroke={C.signal} strokeWidth={2} />
            {spillW > 0 && <rect x={spillX0} y={y0 + 54} width={spillW} height={26} rx={4} fill={C.bad} fillOpacity={0.65} stroke={C.bad} strokeWidth={2} />}
            <Ln x1={carX} y1={y0 + 48} x2={carX} y2={y0 + 86} color={C.ink} width={3} />
            <T x={usb ? carX : carX - 4} y={y0 + 98} anchor={usb ? 'middle' : 'start'} size={12} mono>carrier {r.carrier}</T>
            <Ln x1={CX} y1={y0 + 26} x2={CX} y2={y0 + 118} color={C.bad} width={3} dash="6 4" />
            <T x={CX} y={y0 + 130} anchor="middle" size={13} bold color={C.bad} mono>{r.edge}</T>
            <T x={inLeft ? 594 : 46} y={y0 + 66} size={13} bold color={r.ok ? C.ink : C.bad} anchor={inLeft ? 'end' : 'start'}>{r.verdict}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
