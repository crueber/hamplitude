import { C, Diagram, Ln, T } from '../kit'

interface Props {
  /** which named ranges to emphasise */
  highlight?: ('MF' | 'HF' | 'VHF' | 'UHF')[]
}

const RANGES = [
  { id: 'MF', from: 0.3, to: 3, label: '300 kHz – 3 MHz', color: C.muted },
  { id: 'HF', from: 3, to: 30, label: '3 – 30 MHz', color: C.resist },
  { id: 'VHF', from: 30, to: 300, label: '30 – 300 MHz', color: C.signal },
  { id: 'UHF', from: 300, to: 3000, label: '300 – 3000 MHz', color: C.power },
] as const

const HAM = [
  { n: '80 m', f: 3.7 }, { n: '40 m', f: 7.15 }, { n: '20 m', f: 14.2 }, { n: '10 m', f: 28.4 },
  { n: '6 m', f: 52 }, { n: '2 m', f: 146 }, { n: '70 cm', f: 446 },
]

/** Log-scale radio spectrum: every named range is exactly 10× wider than the one below. */
export function SpectrumBar({ highlight = ['HF', 'VHF', 'UHF'] }: Props) {
  const W = 640, H = 230
  const x0 = 30, x1 = 610
  const pos = (f: number) => x0 + ((Math.log10(f) - Math.log10(0.3)) / (Math.log10(3000) - Math.log10(0.3))) * (x1 - x0)
  return (
    <Diagram w={W} h={H} title="Radio spectrum on a log scale: HF is 3 to 30 megahertz, VHF 30 to 300 megahertz, UHF 300 to 3000 megahertz" caption="Each named range spans one factor of ten. Frequency increases to the right.">
      {RANGES.map((r) => {
        const on = (highlight as readonly string[]).includes(r.id)
        return (
          <g key={r.id} opacity={on ? 1 : 0.45}>
            <rect x={pos(r.from) + 1.5} y={52} width={pos(r.to) - pos(r.from) - 3} height={58} rx={10} fill={r.color} fillOpacity={0.2} stroke={r.color} strokeWidth={2.2} />
            <T x={(pos(r.from) + pos(r.to)) / 2} y={73} anchor="middle" bold size={22} color={r.color === C.muted ? C.ink : r.color}>{r.id}</T>
            <T x={(pos(r.from) + pos(r.to)) / 2} y={96} anchor="middle" size={12.5} mono color={C.ink}>{r.label}</T>
          </g>
        )
      })}
      <T x={x0} y={28} size={13} color={C.muted}>lower frequency · longer wavelength</T>
      <T x={x1} y={28} size={13} color={C.muted} anchor="end">higher frequency · shorter wavelength</T>
      <Ln x1={x0} y1={150} x2={x1} y2={150} color={C.muted} width={1.5} />
      {HAM.map((h, i) => (
        <g key={h.n}>
          <Ln x1={pos(h.f)} y1={140} x2={pos(h.f)} y2={160} color={C.ink} width={2.5} />
          <T x={pos(h.f)} y={i % 2 ? 190 : 176} anchor="middle" size={12.5} bold>{h.n}</T>
        </g>
      ))}
      <T x={x0} y={215} size={12} color={C.muted}>Amateur bands (named by wavelength) sit inside these ranges</T>
    </Diagram>
  )
}
