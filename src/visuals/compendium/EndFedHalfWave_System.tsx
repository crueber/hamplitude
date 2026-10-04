import { C, Box, Diagram, Ln, T } from '../kit'

/** An end-fed half-wave: transformer at one end of the wire, a choke on the coax, and the coax shield acting as the counterpoise. */
export function EndFedHalfWave_System() {
  const wx0 = 262, wx1 = 624, wy = 120
  const cur: string[] = [], vol: string[] = []
  for (let i = 0; i <= 100; i++) {
    const u = i / 100
    const x = wx0 + (wx1 - wx0) * u
    cur.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(wy - 46 * Math.sin(Math.PI * u)).toFixed(1)}`)
    vol.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(wy + 46 * Math.abs(Math.cos(Math.PI * u))).toFixed(1)}`)
  }
  return (
    <Diagram w={640} h={330}
      title="An end-fed half-wave antenna: a half-wavelength wire fed at one end through a high-ratio transformer, with a common-mode choke on the coax. Voltage is highest at both ends of the wire, so the feed point impedance is very high."
      caption="Typical values. The transformer turns thousands of ohms into about 50 Ω; the choke keeps the return current off the coax.">
      <path d={cur.join('')} fill="none" stroke={C.current} strokeWidth={3} />
      <path d={vol.join('')} fill="none" stroke={C.voltage} strokeWidth={3} />
      <Ln x1={wx0} y1={wy} x2={wx1} y2={wy} color={C.resist} width={5} />
      <T x={wx0 + 10} y={22} size={13} bold color={C.current}>current: zero at the ends, peak in the middle</T>
      <T x={wx0 + 10} y={196} size={13} bold color={C.voltage}>voltage: peak at both ends</T>
      <Ln x1={14} y1={wy} x2={72} y2={wy} color={C.signal} width={4} />
      <Box x={72} y={wy - 16} w={56} h={32} label="choke" color={C.power} size={13} r={6} />
      <Ln x1={128} y1={wy} x2={160} y2={wy} color={C.signal} width={4} />
      <Box x={160} y={wy - 28} w={102} h={56} label="49:1" sub="transformer" color={C.ink} size={15} />
      <T x={14} y={wy - 24} size={13} bold color={C.signal}>coax to the radio</T>
      <T x={14} y={wy + 24} size={12} color={C.muted}>50 Ω here</T>
      <T x={211} y={wy + 44} anchor="middle" size={12} color={C.muted}>about 2450 Ω</T>
      <Ln x1={150} y1={250} x2={20} y2={250} color={C.bad} width={3} dash="6 5" arrow />
      <T x={20} y={274} size={13} bold color={C.bad}>stray return current</T>
      <T x={20} y={294} size={12} color={C.muted}>tries to flow on the coax shield,</T>
      <T x={20} y={312} size={12} color={C.muted}>which the choke is there to limit</T>
    </Diagram>
  )
}
