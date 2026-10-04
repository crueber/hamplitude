import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type O = 'v' | 'h'

/** Polarization = direction of the electric field = orientation of the antenna's wire. */
export function Polarization() {
  const [tx, setTx] = useState<O>('v')
  const [rx, setRx] = useState<O>('v')
  const match = tx === rx
  const W = 640, H = 310, ya = 150
  const ant = (x: number, o: O, color: string) => (
    <g>
      <Ln x1={x} y1={ya} x2={x} y2={ya + 80} color={C.muted} width={5} />
      {o === 'v' ? <Ln x1={x} y1={ya - 80} x2={x} y2={ya + 40} color={color} width={6} /> : <Ln x1={x - 48} y1={ya + 36} x2={x + 48} y2={ya - 36} color={color} width={6} />}
    </g>
  )
  const xs = [150, 205, 260, 315, 370, 425]
  const amps = [0.9, 0.6, 0.95, 0.65, 0.9, 0.7]
  return (
    <>
      <Diagram w={W} h={H} title={`Transmitting antenna is ${tx === 'v' ? 'vertical' : 'horizontal'}, receiving antenna is ${rx === 'v' ? 'vertical' : 'horizontal'}: signal is ${match ? 'strong' : 'weak'}`}
        caption="The wire's direction sets the electric-field direction (red). A receiving antenna works best when it points the same way.">
        <T x={80} y={22} anchor="middle" bold size={14}>Transmit</T>
        <T x={520} y={22} anchor="middle" bold size={14}>Receive</T>
        {ant(80, tx, C.resist)}
        {ant(520, rx, C.resist)}
        {xs.map((x, i) => {
          const a = 42 * amps[i]
          return tx === 'v'
            ? <Ln key={x} x1={x} y1={ya - a} x2={x} y2={ya + a} color={C.voltage} width={3} arrow="both" />
            : <Ln key={x} x1={x + a * 0.6} y1={ya - a * 0.45} x2={x - a * 0.6} y2={ya + a * 0.45} color={C.voltage} width={3} arrow="both" />
        })}
        <Ln x1={118} y1={ya} x2={480} y2={ya} color={C.muted} width={1.5} dash="3 5" arrow />
        <T x={300} y={ya + 62} anchor="middle" size={13} color={C.muted}>E-field {tx === 'v' ? 'up and down' : 'sideways (slanted to show depth)'}</T>
        <rect x={210} y={236} width={180} height={34} rx={8} fill={C.fill} />
        <T x={300} y={253} anchor="middle" size={15} bold color={match ? C.good : C.bad}>{match ? 'Matched: strong' : 'Mismatched: weak'}</T>
      </Diagram>
      <Controls>
        <div><div style={{ fontSize: 13, marginBottom: 6 }}>Transmit antenna</div><Choice label="Transmit antenna" value={tx} onChange={setTx} options={[{ value: 'v', label: 'Vertical' }, { value: 'h', label: 'Horizontal' }]} /></div>
        <div><div style={{ fontSize: 13, marginBottom: 6 }}>Receive antenna</div><Choice label="Receive antenna" value={rx} onChange={setRx} options={[{ value: 'v', label: 'Vertical' }, { value: 'h', label: 'Horizontal' }]} /></div>
      </Controls>
    </>
  )
}
