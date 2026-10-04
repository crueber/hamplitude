import { C, Diagram, Ln, T } from '../kit'

/** A voluntary band-plan segment: 50.100-50.125 MHz is for contacts with stations outside the 48 contiguous states. */
export function G2B_DxWindow() {
  const x0 = 50, x1 = 590
  const f = (mhz: number) => x0 + ((mhz - 50.09) / (50.135 - 50.09)) * (x1 - x0)
  const ticks = [50.1, 50.125]
  return (
    <Diagram w={640} h={270} title="Band plan segment from 50.100 to 50.125 megahertz on 6 meters. For a US station in the 48 contiguous states, it is only for contacts with stations outside the 48 contiguous states. A band plan is voluntary" caption="Band plans are voluntary agreements. Follow them anyway: that is accepted practice.">
      <T x={14} y={18} size={14} bold>6 m, zoomed in (MHz)</T>
      <Ln x1={x0} y1={118} x2={x1} y2={118} color={C.muted} width={2} />
      <rect x={f(50.1)} y={88} width={f(50.125) - f(50.1)} height={30} rx={4} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2.5} />
      <T x={(f(50.1) + f(50.125)) / 2} y={73} anchor="middle" size={14} bold color={C.signal}>DX window</T>
      {ticks.map((t) => (
        <g key={t}>
          <Ln x1={f(t)} y1={118} x2={f(t)} y2={132} color={C.ink} width={2} />
          <T x={f(t)} y={148} anchor="middle" size={14} mono bold>{t.toFixed(3)}</T>
        </g>
      ))}
      <rect x={30} y={178} width={280} height={74} rx={12} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={170} y={198} anchor="middle" size={14} bold color={C.good}>In the window</T>
      <T x={170} y={222} anchor="middle" size={13.5}>US 48 station works a</T>
      <T x={170} y={240} anchor="middle" size={13.5} bold>station outside the 48</T>
      <rect x={330} y={178} width={280} height={74} rx={12} fill={C.bad} fillOpacity={0.14} stroke={C.bad} strokeWidth={2} />
      <T x={470} y={198} anchor="middle" size={14} bold color={C.bad}>Not in the window</T>
      <T x={470} y={222} anchor="middle" size={13.5}>US 48 to US 48 contacts:</T>
      <T x={470} y={240} anchor="middle" size={13.5} bold>use another segment</T>
    </Diagram>
  )
}
