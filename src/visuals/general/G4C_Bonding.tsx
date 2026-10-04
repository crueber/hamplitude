import { useState } from 'react'
import { Box, C, Choice, Diagram, Ground, Ln, T } from '../kit'

/** Bonding enclosures together removes the loop that picks up hum and spreads RF. */
export function Bonding() {
  const [bonded, setBonded] = useState(false)
  const xs = [30, 235, 440], w = 170
  const names = ['Transceiver', 'Amplifier', 'Computer']
  const gy = 248
  return (
    <>
      <Diagram w={640} h={300} title={bonded ? 'Three equipment enclosures bonded together with a strap and tied to ground at one point: no ground loop, and no enclosure can sit at a different voltage.' : 'Three equipment enclosures each grounded separately and joined by audio cables: the cables and ground wires form a loop that carries hum current, and the enclosures can sit at different RF voltages.'}
        caption={bonded ? 'Bonded: enclosures share one potential, so no hum loop and no RF hot spots.' : 'Separate paths: a loop forms between audio cable and ground wires.'}>
        {!bonded && <rect x={xs[0] + w / 2} y={108} width={xs[2] - xs[0]} height={gy - 108} fill={C.bad} fillOpacity={0.12} stroke="none" />}
        {names.map((n, i) => <Box key={n} x={xs[i]} y={48} w={w} h={60} label={n} color={bonded ? C.good : C.ink} />)}
        <Ln x1={xs[0] + w} y1={78} x2={xs[1]} y2={78} color={C.signal} width={3} />
        <Ln x1={xs[1] + w} y1={78} x2={xs[2]} y2={78} color={C.signal} width={3} />
        {!bonded && (
          <g>
            {names.map((n, i) => <Ln key={n} x1={xs[i] + w / 2} y1={108} x2={xs[i] + w / 2} y2={gy} color={C.ink} width={2.5} />)}
            <Ln x1={xs[0] + w / 2} y1={gy} x2={590} y2={gy} color={C.ink} width={2.5} />
            <Ground x={590} y={gy} />
            <T x={218} y={160} anchor="middle" bold size={14} color={C.bad}>ground loop</T>
            <T x={218} y={180} anchor="middle" size={12} color={C.bad}>hum current circulates</T>
            <T x={320} y={288} anchor="middle" size={12} color={C.muted}>each box reaches ground by its own path</T>
          </g>
        )}
        {bonded && (
          <g>
            <Ln x1={xs[0] + w / 2} y1={108} x2={xs[0] + w / 2} y2={140} color={C.good} width={4} />
            <Ln x1={xs[1] + w / 2} y1={108} x2={xs[1] + w / 2} y2={140} color={C.good} width={4} />
            <Ln x1={xs[2] + w / 2} y1={108} x2={xs[2] + w / 2} y2={140} color={C.good} width={4} />
            <Ln x1={xs[0] + w / 2} y1={140} x2={xs[2] + w / 2} y2={140} color={C.good} width={6} />
            <T x={320} y={122} anchor="middle" bold size={13} color={C.good}>bonding strap</T>
            <Ln x1={320} y1={140} x2={320} y2={gy - 4} color={C.ink} width={3} />
            <Ground x={320} y={gy - 4} />
            <T x={400} y={200} size={12} color={C.muted}>one ground point</T>
          </g>
        )}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Grounding" value={bonded ? 'b' : 's'} onChange={(v) => setBonded(v === 'b')} options={[{ value: 's', label: 'Separate grounds' }, { value: 'b', label: 'Bonded together' }]} />
      </div>
    </>
  )
}
