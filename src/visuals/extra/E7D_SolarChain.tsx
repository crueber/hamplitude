import { C, Diagram, Ln, T } from '../kit'

/** Solar power chain: panel, charge controller, battery, inverter. */
export function SolarChain() {
  const bs = [
    { x: 10, t: 'Solar panel', s: 'makes DC', c: C.resist },
    { x: 172, t: 'Charge controller', s: 'protects the battery', c: C.power },
    { x: 334, t: 'Battery', s: 'stores DC', c: C.voltage },
    { x: 496, t: 'Inverter', s: 'DC to AC', c: C.signal },
  ]
  return (
    <Diagram w={640} h={170} title="Solar power chain: the panel makes DC, a charge controller regulates charging of the battery, the battery stores DC, and an inverter converts DC to AC for AC loads."
      caption="Panels and batteries are DC. An inverter is what makes AC.">
      {bs.map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y={40} width={134} height={72} rx={10} fill={C.fill} stroke={b.c} strokeWidth={2.5} />
          <T x={b.x + 67} y={68} anchor="middle" size={14} bold color={b.c}>{b.t}</T>
          <T x={b.x + 67} y={92} anchor="middle" size={12} color={C.muted}>{b.s}</T>
          {i < 3 && <Ln x1={b.x + 136} y1={76} x2={bs[i + 1].x - 2} y2={76} color={C.muted} width={2.5} arrow />}
        </g>
      ))}
      <T x={563} y={136} anchor="middle" size={13} bold color={C.signal}>AC out</T>
      <T x={77} y={136} anchor="middle" size={13} bold color={C.resist}>DC</T>
      <T x={403} y={136} anchor="middle" size={13} bold color={C.voltage}>DC</T>
    </Diagram>
  )
}
