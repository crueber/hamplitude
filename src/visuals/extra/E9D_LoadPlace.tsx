import { C, Diagram, Ln, T } from '../kit'

const Coil = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x},${y} ` + Array.from({ length: 3 }, () => 'a8,5 0 0 1 0,10').join(' ')} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinecap="round" />
)

/** Where to put the loading: current profile along a short whip. Radiation comes from current, so more current up the whip = more radiation. */
export function E9D_LoadPlace() {
  const gy = 232, h = 150
  const cols = [
    { x: 105, n: 'Base coil', c: C.bad, v: 'least efficient', prof: (t: number) => 1 - t },
    { x: 320, n: 'Center coil', c: C.signal, v: 'better: near the center', prof: (t: number) => (t < 0.5 ? 1 - t * 0.7 : (1 - t) * 1.3) },
    { x: 535, n: 'Top hat', c: C.good, v: 'improves efficiency', prof: (t: number) => 1 - t * t * 0.25 },
  ]
  return (
    <Diagram w={640} h={310} title="Three ways to load a short vertical: coil at the base, coil near the center, or a capacitance hat at the top. The shaded area beside each whip is its current; more current along the radiator means more radiation, so a top hat improves radiation efficiency and a center coil beats a base coil."
      caption="Shaded = current along the whip. Radiation comes from current, so more of it high up is better.">
      {cols.map((k, i) => {
        const pts = Array.from({ length: 21 }, (_, j) => { const t = j / 20; return `${k.x + 50 * k.prof(t)},${gy - t * h}` })
        return (
          <g key={k.n}>
            <T x={k.x} y={22} anchor="middle" size={14} bold color={k.c}>{k.n}</T>
            <Ln x1={k.x - 36} y1={gy} x2={k.x + 36} y2={gy} color={C.muted} width={5} />
            <polygon points={`${k.x},${gy} ${pts.join(' ')} ${k.x},${gy - h}`} fill={k.c} fillOpacity={0.25} stroke={k.c} strokeWidth={2} />
            <Ln x1={k.x} y1={gy} x2={k.x} y2={gy - h} color={C.resist} width={5} />
            {i === 0 && <Coil x={k.x} y={gy - 50} />}
            {i === 1 && <Coil x={k.x} y={gy - h / 2 - 10} />}
            {i === 2 && <><Ln x1={k.x - 32} y1={gy - h} x2={k.x + 32} y2={gy - h} color={C.voltage} width={5} /><T x={k.x} y={gy - h - 16} anchor="middle" size={12} bold color={C.voltage}>hat</T></>}
            <T x={k.x} y={gy + 24} anchor="middle" size={12} bold color={k.c}>{k.v}</T>
          </g>
        )
      })}
      <T x={320} y={290} anchor="middle" size={12} color={C.muted}>current is highest at the base and zero at the tip</T>
    </Diagram>
  )
}
