import { sinePath, useTime, TAU } from '@/visuals/kit'

// One coordinate system for both layers (waves and rings): the sides are cropped, never the top or bottom, so the wave
// keeps its proportions on any screen. 4000 units wide is more than any realistic window needs.
const W = 4000, Y0 = 40, H = 320, CX = W / 2
const FEED = 100 // the antenna's feed point
const UP = 1500 // the rings layer reaches this far above the band, up through the hero and the header
const RMAX = 1500 // rings fade out by this radius

/** The hero's carrier, audio and modulated wave as a window-wide band, with the antenna standing in it and its rings
 *  spreading up behind the hero text and the header. */
export function WaveBand() {
  const { t, ref } = useTime(0.5)
  const phase = -t * TAU
  const env = (x: number) => 1 + 0.55 * Math.sin(TAU * 3.75 * (x / W) + phase * 0.35)
  const pts: string[] = []
  for (let i = 0; i <= 1600; i++) {
    const x = (i / 1600) * W
    const y = 235 - 40 * env(x) * Math.sin(TAU * 80 * (x / W) + phase)
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  const box = `0 ${Y0} ${W} ${H}`
  const tall = `0 ${Y0 - UP} ${W} ${H + UP}` // same scale as `box`, just taller
  return (
    <div className="hm-band">
      {/* rings: a taller layer that shares the waves' scale, so they travel up behind the hero text and, faintly, through
          the translucent header, and stop at the band's bottom edge (CSS gives it the matching height) */}
      <svg className="hm-band-rings" viewBox={tall} preserveAspectRatio="xMidYMax slice" aria-hidden>
        <g fill="none" strokeWidth="1.6" stroke="var(--primary)">
          {Array.from({ length: 17 }, (_, i) => {
            const r = ((t * 45 + i * 90) % RMAX) + 14
            return <circle key={i} cx={CX} cy={FEED} r={r} opacity={0.3 * Math.pow(Math.max(0, 1 - r / RMAX), 1.5)} />
          })}
        </g>
      </svg>
      <svg ref={ref} className="hm-band-waves" viewBox={box} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Animated radio waves: an audio signal modulating a carrier">
        <defs>
          <linearGradient id="wb" gradientUnits="userSpaceOnUse" x1={CX - 900} x2={CX + 900}>
            <stop offset="0" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <g stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none">
          <line x1={CX} y1={FEED} x2={CX} y2={168} />
          <polyline points={`${CX - 26},${FEED - 34} ${CX},${FEED} ${CX + 26},${FEED - 34}`} />
          <line x1={CX - 15} y1={168} x2={CX + 15} y2={168} />
        </g>
        <circle cx={CX} cy={FEED} r="6" fill="var(--accent)" />
        <path d={sinePath(0, W, 150, 18, 17.5, phase * 0.8)} fill="none" stroke="var(--ink-2)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
        <path d={pts.join('')} fill="none" stroke="url(#wb)" strokeWidth="3.5" strokeLinecap="round" />
        <path d={sinePath(0, W, 322, 8, 65, phase * 1.4)} fill="none" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
