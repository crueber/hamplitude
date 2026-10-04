import { C, Diagram, Ln, T, Wire, Resistor, Inductor, Capacitor } from '../kit'

/** Quartz crystal: series RLC branch in parallel with a shunt capacitance. Impedance curve uses illustrative values. */
export function CrystalEquiv() {
  const L = 0.0507, Cs = 2e-14, R = 30, C0 = 5e-12
  const fs = 1 / (2 * Math.PI * Math.sqrt(L * Cs))
  const mag = (f: number) => {
    const w = 2 * Math.PI * f
    // Zs = R + j(wL - 1/wCs); Z0 = 1/(jw C0)
    const xs = w * L - 1 / (w * Cs)
    const x0 = -1 / (w * C0)
    const nr = -xs * x0 // numerator real: (R + j xs)(j x0) = -xs x0 + j R x0
    const ni = R * x0
    const dr = R, di = xs + x0
    const d2 = dr * dr + di * di
    const re = (nr * dr + ni * di) / d2, im = (ni * dr - nr * di) / d2
    return Math.hypot(re, im)
  }
  const f0 = fs * 0.9965, f1 = fs * 1.0068
  const x0p = 380, x1p = 620, yTop = 50, yBot = 190
  const lo = Math.log10(20), hi = Math.log10(2e6)
  const pts = Array.from({ length: 300 }, (_, i) => {
    const f = f0 + ((f1 - f0) * i) / 299
    const y = yBot - ((Math.log10(mag(f)) - lo) / (hi - lo)) * (yBot - yTop)
    return `${(x0p + ((x1p - x0p) * i) / 299).toFixed(1)},${Math.max(yTop - 4, y).toFixed(1)}`
  }).join(' ')
  // find extrema positions
  let imin = 0, imax = 0
  for (let i = 0; i < 300; i++) {
    const f = f0 + ((f1 - f0) * i) / 299
    if (mag(f) < mag(f0 + ((f1 - f0) * imin) / 299)) imin = i
    if (mag(f) > mag(f0 + ((f1 - f0) * imax) / 299) && i > imin) imax = i
  }
  const px = (i: number) => x0p + ((x1p - x0p) * i) / 299
  return (
    <Diagram w={640} h={262}
      title="Equivalent circuit of a quartz crystal: a series resistor, inductor and capacitor branch in parallel with a shunt capacitor for the electrodes and stray capacitance. Its impedance dips at the series resonance and peaks slightly higher at the parallel resonance."
      caption="Series RLC branch, in parallel with shunt C. Two resonances, very close together.">
      <Wire pts={[[40, 70], [220, 70]]} color={C.muted} width={2.5} />
      <Wire pts={[[40, 190], [220, 190]]} color={C.muted} width={2.5} />
      <circle cx={40} cy={70} r={3.5} fill={C.ink} /><circle cx={40} cy={190} r={3.5} fill={C.ink} />
      {/* series branch drawn horizontally at x=100..: R, L, C stacked vertically */}
      <rect x={60} y={86} width={80} height={90} fill={C.bg} stroke="none" />
      <Wire pts={[[100, 70], [100, 86]]} color={C.muted} width={2.5} />
      <Resistor x={100} y={102} rot={90} len={30} color={C.resist} />
      <Inductor x={100} y={130} rot={90} len={30} color={C.current} />
      <Capacitor x={100} y={158} rot={90} len={20} color={C.voltage} />
      <Wire pts={[[100, 174], [100, 190]]} color={C.muted} width={2.5} />
      <T x={120} y={102} size={13} bold color={C.resist}>R</T>
      <T x={120} y={130} size={13} bold color={C.current}>L</T>
      <T x={120} y={158} size={13} bold color={C.voltage}>C</T>
      <Wire pts={[[200, 70], [200, 110]]} color={C.muted} width={2.5} />
      <Wire pts={[[200, 150], [200, 190]]} color={C.muted} width={2.5} />
      <Capacitor x={200} y={130} rot={90} len={40} />
      <T x={212} y={130} size={13} bold>C0</T>
      <T x={126} y={36} anchor="middle" size={13} bold color={C.muted}>series branch</T>
      <T x={126} y={226} anchor="middle" size={12} color={C.muted}>the crystal's mechanical resonance</T>
      <T x={236} y={156} size={12} color={C.muted}>shunt:</T>
      <T x={236} y={172} size={12} color={C.muted}>electrodes</T>
      <T x={236} y={188} size={12} color={C.muted}>and strays</T>

      <T x={500} y={26} anchor="middle" bold size={14}>Impedance vs frequency</T>
      <rect x={x0p} y={yTop - 4} width={x1p - x0p} height={yBot - yTop + 8} rx={6} fill={C.fill} />
      <polyline points={pts} fill="none" stroke={C.current} strokeWidth={2.5} />
      <Ln x1={px(imin)} y1={yBot + 4} x2={px(imin)} y2={yBot + 10} color={C.good} width={2} />
      <circle cx={px(imin)} cy={yBot - ((Math.log10(mag(f0 + ((f1 - f0) * imin) / 299)) - lo) / (hi - lo)) * (yBot - yTop)} r={5} fill={C.good} />
      <circle cx={px(imax)} cy={yTop + 6} r={5} fill={C.bad} />
      <T x={px(imin) - 8} y={yBot + 22} anchor="end" size={12} bold color={C.good}>series: lowest Z</T>
      <T x={px(imax) + 8} y={yBot + 22} anchor="start" size={12} bold color={C.bad}>parallel: highest Z</T>
      <T x={500} y={248} anchor="middle" size={12} color={C.muted}>illustrative values · frequency axis zoomed in</T>
    </Diagram>
  )
}
