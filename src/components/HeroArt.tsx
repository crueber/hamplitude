import { sinePath, useTime, TAU } from '@/visuals/kit'

/** Animated carrier + audio + modulated wave: the idea of the whole site in one picture. */
export function HeroArt() {
  const { t, ref } = useTime(0.5)
  const phase = -t * TAU
  const W = 500, H = 400
  const env = (x: number) => 1 + 0.55 * Math.sin(TAU * 1.5 * (x / W) + phase * 0.35)
  const pts: string[] = []
  for (let i = 0; i <= 320; i++) {
    const x = (i / 320) * W
    const y = 305 - 38 * env(x) * Math.sin(TAU * 14 * (x / W) + phase)
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Animated radio waves: an audio signal modulating a carrier">
      <defs>
        <linearGradient id="hg" x1="0" x2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="0.25" stopColor="var(--primary)" />
          <stop offset="0.75" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g opacity="0.5" fill="none" strokeWidth="1.5">
        {[0, 1, 2, 3, 4].map((k) => {
          const r = ((t * 40 + k * 56) % 280) + 10
          return <circle key={k} cx="250" cy="116" r={r} stroke="var(--primary)" opacity={1 - r / 290} />
        })}
      </g>
      {/* mast */}
      <g stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="250" y1="116" x2="250" y2="210" />
        <polyline points="226,84 250,116 274,84" />
        <line x1="236" y1="210" x2="264" y2="210" />
      </g>
      <circle cx="250" cy="116" r="6" fill="var(--accent)" />
      <path d={sinePath(0, W, 180, 18, 3, phase * 0.8)} fill="none" stroke="var(--ink-2)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
      <path d={pts.join('')} fill="none" stroke="url(#hg)" strokeWidth="3.5" strokeLinecap="round" />
      <path d={sinePath(0, W, 365, 10, 9, phase * 1.4)} fill="none" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
