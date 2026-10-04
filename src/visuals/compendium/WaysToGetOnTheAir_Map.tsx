import { C, Diagram, T } from '../kit'

const CARDS = [
  { t: ['Talk', 'locally'], c: C.signal, items: ['Repeaters', 'Simplex', 'Nets', 'Ragchewing'] },
  { t: ['Talk the', 'world'], c: C.current, items: ['HF voice (SSB)', 'CW (Morse)', 'DXing', '6 m openings'] },
  { t: ['Digital', 'modes'], c: C.power, items: ['FT8 and FT4', 'PSK31, RTTY', 'Packet, APRS', 'Winlink email'] },
  { t: ['Compete', 'and collect'], c: C.resist, items: ['Contests', 'Awards', 'Special events', 'Logging'] },
  { t: ['Outdoors', 'and portable'], c: C.good, items: ['Parks on the Air', 'Summits on the Air', 'Field Day', 'Mobile'] },
  { t: ['Space', 'and sky'], c: C.voltage, items: ['Satellites', 'The ISS', 'Moonbounce', 'Balloons'] },
  { t: ['Build and', 'experiment'], c: C.signal, items: ['Kits, homebrew', 'SDR listening', 'Pi and Arduino', 'Microwaves'] },
  { t: ['Serve', 'the public'], c: C.bad, items: ['ARES, RACES', 'SKYWARN', 'Public events', 'Emergency nets'] },
]

/** Eight families of amateur radio activity, each with a few examples. */
export function WaysToGetOnTheAir_Map() {
  const w = 152, gap = 10, h = 150
  return (
    <Diagram w={640} h={326} title="Eight families of amateur radio activity: talk locally, talk the world, digital modes, compete and collect, outdoors and portable, space and sky, build and experiment, and serve the public"
      caption="Most operators drift across several of these. Each name is covered in its own article.">
      {CARDS.map((k, i) => {
        const col = i % 4, row = Math.floor(i / 4)
        const x = 1 + col * (w + gap), y = 6 + row * (h + 12)
        return (
          <g key={k.t.join()}>
            <rect x={x} y={y} width={w} height={h} rx={12} fill={C.fill} stroke={k.c} strokeWidth={2.2} />
            <path d={`M${x},${y + 46} V${y + 12} a12,12 0 0 1 12,-12 H${x + w - 12} a12,12 0 0 1 12,12 V${y + 46} Z`} fill={k.c} fillOpacity={0.2} />
            <T x={x + 12} y={y + 15} size={14} bold>{k.t[0]}</T>
            <T x={x + 12} y={y + 32} size={14} bold>{k.t[1]}</T>
            {k.items.map((it, j) => (
              <g key={it}>
                <circle cx={x + 16} cy={y + 68 + j * 22} r={3.5} fill={k.c} />
                <T x={x + 28} y={y + 68 + j * 22} size={12.5}>{it}</T>
              </g>
            ))}
          </g>
        )
      })}
    </Diagram>
  )
}
