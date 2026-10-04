import { C, Diagram, Ln, T } from '../kit'

const N = 120
/** Voltage across the device, current through it, and the heat (V x I): linear versus switching. */
export function SwitchAmp() {
  const cols = [{ x: 20, name: 'Linear amplifier', sub: 'in between most of the time', col: C.resist }, { x: 335, name: 'Switching amplifier', sub: 'fully on or fully off', col: C.good }]
  const pw = 270, ph = 46
  const rows = [{ name: 'Voltage across device', c: C.voltage }, { name: 'Current through device', c: C.current }, { name: 'Heat = V × I', c: C.power }]
  // normalised 0..1 waveforms over 2 cycles
  const lin = (r: number, u: number) => {
    const s = Math.sin(u * 4 * Math.PI + 0.35)
    const v = 0.5 + 0.35 * s, i = 0.5 - 0.35 * s
    return r === 0 ? v : r === 1 ? i : v * i * 4
  }
  const sw = (r: number, u: number) => {
    const on = Math.sin(u * 4 * Math.PI + 0.35) > 0
    const v = on ? 0.02 : 1, i = on ? 1 : 0.02
    return r === 0 ? v : r === 1 ? i : v * i * 4
  }
  return (
    <Diagram w={640} h={390} title="Voltage, current and heat in a linear amplifier device versus a switching device. The linear device has both voltage and current at once, so it makes a lot of heat. The switching device is either on with almost no voltage or off with almost no current, so heat is near zero."
      caption="Heat is voltage times current. A switch never has both at once.">
      {cols.map((c, ci) => (
        <g key={c.name}>
          <T x={c.x + pw / 2} y={20} anchor="middle" bold size={15} color={c.col}>{c.name}</T>
          <T x={c.x + pw / 2} y={40} anchor="middle" size={12} color={C.muted}>{c.sub}</T>
          {rows.map((r, ri) => {
            const y0 = 62 + ri * 108
            const pts = Array.from({ length: N + 1 }, (_, k) => {
              const u = k / N
              const v = Math.min(1, ci === 0 ? lin(ri, u) : sw(ri, u))
              return `${c.x + u * pw},${y0 + ph + 14 - v * ph}`
            }).join(' ')
            return (
              <g key={r.name}>
                <rect x={c.x} y={y0 - 6} width={pw} height={ph + 40} rx={8} fill={C.fill} />
                <T x={c.x + 8} y={y0 + 6} size={12} bold color={r.c}>{r.name}</T>
                <Ln x1={c.x + 8} y1={y0 + ph + 14} x2={c.x + pw - 8} y2={y0 + ph + 14} color={C.fill2} width={1} />
                {ri === 2 && <polygon points={`${c.x},${y0 + ph + 14} ${pts} ${c.x + pw},${y0 + ph + 14}`} fill={C.power} opacity={0.25} />}
                <polyline points={pts} fill="none" stroke={r.c} strokeWidth={3} strokeLinejoin="round" />
                {ri === 2 && <T x={c.x + pw - 8} y={y0 + 6} anchor="end" size={12} bold color={ci === 0 ? C.bad : C.good}>{ci === 0 ? 'lots of heat' : 'almost none'}</T>}
              </g>
            )
          })}
        </g>
      ))}
    </Diagram>
  )
}
