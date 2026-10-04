import { C, Diagram, Ln, T } from '../kit'

/** 20 m: where digital modes sit, with the exam's wrong places marked. Zoom on 14.060-14.120 shows FT8. */
export function G2E_BandStrip() {
  const a = 40, b = 600
  const F = (m: number) => a + ((m - 14.0) / 0.35) * (b - a)
  const z0 = 14.06, z1 = 14.12
  const Z = (m: number) => a + ((m - z0) / (z1 - z0)) * (b - a)
  return (
    <Diagram w={640} h={330} title="The 20 meter band from 14.000 to 14.350 megahertz. Most digital operation is between 14.070 and 14.100. A zoom shows FT8 at about 14.074 to 14.077. Not digital places: slow-scan TV near 14.230, the top of the phone segment near 14.325, and 14.110 to 14.113" caption="Digital: 14.070 to 14.100. FT8: 14.074 to 14.077. SSTV and phone are higher up.">
      <T x={14} y={16} size={14} bold>20 m, whole band (MHz)</T>
      <Ln x1={a} y1={72} x2={b} y2={72} color={C.muted} width={2} />
      <rect x={F(14.07)} y={52} width={F(14.1) - F(14.07)} height={20} rx={3} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2.2} />
      <T x={F(14.07) + 4} y={42} size={13.5} bold color={C.signal}>digital</T>
      {[[14.0, '14.000'], [14.35, '14.350']].map(([m, l]) => (
        <g key={String(m)}>
          <Ln x1={F(m as number)} y1={72} x2={F(m as number)} y2={82} color={C.ink} width={2} />
          <T x={F(m as number)} y={96} anchor={m === 14.0 ? 'start' : 'end'} size={12.5} mono color={C.muted}>{l}</T>
        </g>
      ))}
      {[[14.23, 'SSTV 14.230'], [14.325, 'phone top 14.325']].map(([m, l]) => (
        <g key={String(m)}>
          <Ln x1={F(m as number)} y1={72} x2={F(m as number)} y2={58} color={C.bad} width={3} />
          <T x={F(m as number)} y={m === 14.23 ? 42 : 24} anchor="middle" size={12.5} bold color={C.bad}>{l}</T>
        </g>
      ))}
      <path d={`M${F(14.06)},82 L${Z(z0)},144 M${F(14.12)},82 L${Z(z1)},144`} stroke={C.fill2} strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
      <rect x={F(z0)} y={64} width={F(z1) - F(z0)} height={16} fill="none" stroke={C.muted} strokeWidth={1.5} />
      <T x={14} y={150} size={14} bold>Zoom: 14.060 to 14.120</T>
      <Ln x1={a} y1={206} x2={b} y2={206} color={C.muted} width={2} />
      <rect x={Z(14.07)} y={184} width={Z(14.1) - Z(14.07)} height={22} rx={3} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2.2} />
      <T x={(Z(14.07) + Z(14.1)) / 2} y={172} anchor="middle" size={13} bold color={C.signal}>14.070 to 14.100</T>
      <rect x={Z(14.074)} y={184} width={Z(14.077) - Z(14.074)} height={22} fill={C.good} fillOpacity={0.7} stroke={C.good} strokeWidth={2} />
      <Ln x1={(Z(14.074) + Z(14.077)) / 2} y1={206} x2={(Z(14.074) + Z(14.077)) / 2} y2={240} color={C.good} width={2} />
      <T x={(Z(14.074) + Z(14.077)) / 2} y={254} anchor="middle" size={14} bold color={C.good}>FT8</T>
      <T x={(Z(14.074) + Z(14.077)) / 2} y={274} anchor="middle" size={12.5} mono color={C.good}>14.074 to 14.077</T>
      <rect x={Z(14.11)} y={190} width={Z(14.113) - Z(14.11)} height={16} fill={C.bad} fillOpacity={0.5} stroke={C.bad} strokeWidth={2} />
      <Ln x1={(Z(14.11) + Z(14.113)) / 2} y1={206} x2={(Z(14.11) + Z(14.113)) / 2} y2={240} color={C.bad} width={2} />
      <T x={(Z(14.11) + Z(14.113)) / 2} y={254} anchor="middle" size={13} bold color={C.bad}>not FT8</T>
      <T x={(Z(14.11) + Z(14.113)) / 2} y={274} anchor="middle" size={12.5} mono color={C.bad}>14.110 to 14.113</T>
      {[14.07, 14.1].map((m) => <T key={m} x={Z(m)} y={222} anchor="middle" size={12} mono color={C.muted}>{m.toFixed(3)}</T>)}
    </Diagram>
  )
}
