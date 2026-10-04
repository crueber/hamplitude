import { C, Diagram, T } from '../kit'

/** Baudot: 5 data bits and two shift codes to switch between letters and figures. ASCII: 7 or 8 bits, upper and lower case, no shifts. */
export function BaudotAscii() {
  const u = 14 // px per data bit
  const x0 = 20
  const boxes = (items: { t: string; bits: number; kind: 'shift' | 'char' }[], y: number, bits: number) => {
    let x = x0
    return items.map((it, i) => {
      const w = it.bits * u
      const el = (
        <g key={i}>
          <rect x={x} y={y} width={w - 4} height={44} rx={6} fill={it.kind === 'shift' ? C.resist : C.signal} fillOpacity={0.25} stroke={it.kind === 'shift' ? C.resist : C.signal} strokeWidth={2} />
          <T x={x + (w - 4) / 2} y={y + 22} anchor="middle" size={it.t.length > 2 ? 12.5 : 16} bold mono>{it.t}</T>
        </g>
      )
      x += w
      void bits
      return el
    })
  }
  const bau = [
    { t: 'LTRS', bits: 5, kind: 'shift' as const }, { t: 'C', bits: 5, kind: 'char' as const }, { t: 'Q', bits: 5, kind: 'char' as const },
    { t: 'FIGS', bits: 5, kind: 'shift' as const }, { t: '7', bits: 5, kind: 'char' as const }, { t: '3', bits: 5, kind: 'char' as const },
  ]
  const asc = [{ t: 'C', bits: 7, kind: 'char' as const }, { t: 'q', bits: 7, kind: 'char' as const }, { t: '7', bits: 7, kind: 'char' as const }, { t: '3', bits: 7, kind: 'char' as const }]
  return (
    <Diagram w={640} h={236} title="Baudot sends each character as 5 data bits and needs two shift codes, LTRS and FIGS, to switch between letters and figures. ASCII uses 7 or 8 bits per character, has upper and lower case, and no letter or figure shift codes."
      caption="Box width is proportional to the number of data bits.">
      <T x={x0} y={20} size={14} bold color={C.signal}>Baudot: 5 bits per character, letters/figures shifts</T>
      {boxes(bau, 34, 5)}
      <T x={x0} y={106} size={12.5} color={C.muted}>The same 5-bit code means a letter or a figure, depending on the last shift.</T>
      <T x={x0} y={138} size={14} bold color={C.power}>ASCII: 7 or 8 bits per character, no shifts</T>
      {boxes(asc, 152, 7)}
      <T x={x0} y={224} size={12.5} color={C.muted}>Upper and lowercase both exist, so no shift code is needed.</T>
    </Diagram>
  )
}
