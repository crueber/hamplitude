import { C, Diagram, Ln, T } from '../kit'

interface Band { n: string; lo: number; hi: number }
const HF: Band[] = [
  { n: '160 m', lo: 1.8, hi: 2.0 }, { n: '80 m', lo: 3.5, hi: 4.0 }, { n: '60 m', lo: 5.33, hi: 5.41 },
  { n: '40 m', lo: 7.0, hi: 7.3 }, { n: '30 m', lo: 10.1, hi: 10.15 }, { n: '20 m', lo: 14.0, hi: 14.35 },
  { n: '17 m', lo: 18.068, hi: 18.168 }, { n: '15 m', lo: 21.0, hi: 21.45 }, { n: '12 m', lo: 24.89, hi: 24.99 },
  { n: '10 m', lo: 28.0, hi: 29.7 },
]
const VU: Band[] = [
  { n: '6 m', lo: 50, hi: 54 }, { n: '2 m', lo: 144, hi: 148 }, { n: '1.25 m', lo: 222, hi: 225 },
  { n: '70 cm', lo: 420, hi: 450 }, { n: '33 cm', lo: 902, hi: 928 }, { n: '23 cm', lo: 1240, hi: 1300 },
]

function Strip({ bands, y, fmin, fmax, ticks, color, name, unit }: { bands: Band[]; y: number; fmin: number; fmax: number; ticks: number[]; color: string; name: string; unit: string }) {
  const x0 = 20, W = 600
  const px = (f: number) => x0 + ((Math.log10(f) - Math.log10(fmin)) / (Math.log10(fmax) - Math.log10(fmin))) * W
  return (
    <g>
      <T x={x0} y={y - 14} size={13} bold color={C.muted}>{name}</T>
      <Ln x1={x0} y1={y + 78} x2={x0 + W} y2={y + 78} color={C.fill2} width={2} />
      {ticks.map((t) => (
        <g key={t}>
          <Ln x1={px(t)} y1={y + 74} x2={px(t)} y2={y + 82} color={C.muted} width={1.5} />
          <T x={px(t)} y={y + 95} anchor="middle" size={12} color={C.muted}>{t}{unit}</T>
        </g>
      ))}
      {bands.map((b, i) => {
        const a = px(b.lo), z = px(b.hi), w = Math.max(5, z - a), up = i % 2 === 0
        const cx = (a + z) / 2
        return (
          <g key={b.n}>
            <rect x={cx - w / 2} y={y + 22} width={w} height={22} rx={3} fill={color} />
            <Ln x1={cx} y1={up ? y + 22 : y + 44} x2={cx} y2={up ? y + 15 : y + 51} color={color} width={1.5} />
            <T x={cx} y={up ? y + 6 : y + 62} anchor="middle" size={12.5} bold>{b.n}</T>
          </g>
        )
      })}
    </g>
  )
}

/** US amateur bands on a logarithmic frequency ruler (HF, then VHF and UHF). */
export function AmateurBandChart_Ruler() {
  return (
    <Diagram w={640} h={310} title="US amateur bands drawn to scale on a logarithmic frequency ruler. HF: 160, 80, 60, 40, 30, 20, 17, 15, 12 and 10 meters between 1.8 and 29.7 megahertz. VHF and UHF: 6 meters, 2 meters, 1.25 meters, 70, 33 and 23 centimeters between 50 and 1300 megahertz."
      caption="Log scale: equal distances are equal frequency ratios. Very narrow bands are drawn a few pixels wide so they stay visible. 60 m is only a marker: its channels are not shown.">
      <Strip bands={HF} y={36} fmin={1.6} fmax={32} ticks={[2, 3, 5, 10, 20, 30]} color={C.signal} name="HF (MHz)" unit="" />
      <Strip bands={VU} y={180} fmin={44} fmax={1500} ticks={[50, 100, 200, 500, 1000]} color={C.current} name="VHF / UHF (MHz)" unit="" />
    </Diagram>
  )
}
