import { C, Diagram, Ln, T } from '../kit'

/** Spread spectrum only above 222 MHz. */
export function E1F_SpreadSpectrum() {
  const bands = [
    { n: '6 m', r: '50 – 54', ok: false },
    { n: '2 m', r: '144 – 148', ok: false },
    { n: '1.25 m', r: '222 – 225', ok: true },
    { n: '70 cm', r: '420 – 450', ok: true },
  ]
  const x = (i: number) => 8 + i * 158
  return (
    <Diagram w={640} h={168} title="Spread spectrum transmissions are permitted only on amateur frequencies above 222 megahertz. 6 meters and 2 meters are below that; 1.25 meters and 70 centimeters are above." caption="Bands in order, not to scale. Frequencies in MHz.">
      {bands.map((b, i) => (
        <g key={b.n}>
          <rect x={x(i)} y={30} width={146} height={76} rx={10} fill={b.ok ? C.good : C.fill} fillOpacity={b.ok ? 0.2 : 1} stroke={b.ok ? C.good : C.bad} strokeWidth={2.5} />
          <T x={x(i) + 73} y={56} anchor="middle" bold size={19}>{b.n}</T>
          <T x={x(i) + 73} y={82} anchor="middle" mono size={13}>{b.r}</T>
          <T x={x(i) + 73} y={126} anchor="middle" bold size={14} color={b.ok ? C.good : C.bad}>{b.ok ? 'spread spectrum OK' : 'not allowed'}</T>
        </g>
      ))}
      <Ln x1={x(2) - 6} y1={16} x2={x(2) - 6} y2={116} color={C.power} width={3} dash="6 4" />
      <T x={x(2) - 12} y={12} anchor="end" bold size={13} color={C.power}>above 222 MHz only</T>
    </Diagram>
  )
}
