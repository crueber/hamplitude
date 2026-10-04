import { useState } from 'react'
import { C, Choice, Diagram, Ln, Lines, T, TAU, useTime } from '../kit'

/** Beverage antenna: a long wire low over ground. The termination resistor soaks up waves from behind. */
export function Beverage() {
  const [term, setTerm] = useState(true)
  const { t, ref } = useTime(0.5)
  const x0 = 110, x1 = 530, wy = 120, gy = 188
  const ph = (t % 1)
  // positions of travelling markers along the wire
  const wanted = x1 - ph * (x1 - x0) // right to left, toward the receiver
  const unwanted = x0 + ph * (x1 - x0) // left to right, toward the resistor
  const reflected = x1 - ph * (x1 - x0)
  void TAU
  return (
    <>
      <Diagram w={640} h={300} svgRef={ref} title={`Beverage antenna: a long wire close to the ground. A signal from the far end travels down the wire to the receiver. A signal from behind runs to the far end, where ${term ? 'the termination resistor absorbs it' : 'with no resistor it reflects back and is received too'}.`}
        caption="Wanted signals run toward the receiver. The termination resistor absorbs unwanted ones from the reverse direction instead of letting them bounce back.">
        {/* ground */}
        <Ln x1={30} y1={gy} x2={610} y2={gy} color={C.muted} width={3} />
        {Array.from({ length: 29 }, (_, i) => <Ln key={i} x1={36 + i * 20} y1={gy} x2={28 + i * 20} y2={gy + 9} color={C.muted} width={1.5} />)}
        <T x={620} y={gy + 24} anchor="end" size={12} color={C.muted}>ground</T>
        {/* poles and wire */}
        {[x0, (x0 + x1) / 2, x1].map((x) => <Ln key={x} x1={x} y1={wy} x2={x} y2={gy} color={C.fill2} width={5} />)}
        <Ln x1={x0} y1={wy} x2={x1} y2={wy} color={C.resist} width={5} />
        <T x={(x0 + x1) / 2} y={wy - 16} anchor="middle" size={13} bold color={C.resist}>wire, at least 1 wavelength long, low over ground</T>
        {/* receiver */}
        <rect x={20} y={wy - 22} width={68} height={44} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={54} y={wy} anchor="middle" size={13} bold>Receiver</T>
        <Ln x1={88} y1={wy} x2={x0} y2={wy} color={C.ink} width={4} />
        {/* termination */}
        {term ? (
          <>
            <Ln x1={x1} y1={wy} x2={x1} y2={wy + 12} color={C.ink} width={3} />
            <polyline points={`${x1},${wy + 12} ${x1 - 8},${wy + 18} ${x1 + 8},${wy + 26} ${x1 - 8},${wy + 34} ${x1 + 8},${wy + 42} ${x1},${wy + 48}`} fill="none" stroke={C.resist} strokeWidth={3} strokeLinejoin="round" />
            <Ln x1={x1} y1={wy + 48} x2={x1} y2={gy} color={C.ink} width={3} />
            <T x={x1 + 16} y={wy + 30} size={13} bold color={C.resist}>termination</T>
            <T x={x1 + 16} y={wy + 48} size={13} bold color={C.resist}>resistor</T>
          </>
        ) : (
          <T x={x1 + 12} y={wy + 20} size={13} bold color={C.bad}>open end</T>
        )}
        {/* wanted wave */}
        <T x={560} y={42} anchor="end" size={13} bold color={C.good}>wanted signal from this direction</T>
        <Ln x1={600} y1={62} x2={548} y2={62} color={C.good} width={4} arrow />
        <circle cx={wanted} cy={wy + 0} r={7} fill={C.good} stroke={C.bg} strokeWidth={2} />
        {/* unwanted wave */}
        <T x={36} y={226} size={13} bold color={C.bad}>unwanted signal from behind</T>
        <Ln x1={36} y1={244} x2={96} y2={244} color={C.bad} width={4} arrow />
        <circle cx={Math.min(unwanted, x1)} cy={wy} r={7} fill={C.bad} stroke={C.bg} strokeWidth={2} />
        {!term && <circle cx={reflected} cy={wy + 0} r={5} fill={C.bad} fillOpacity={0.6} stroke={C.bg} strokeWidth={1} />}
        <Lines x={250} y={246} lines={term ? ['absorbed by the resistor: not received'] : ['reflects off the open end and heads', 'back to the receiver: receives both ways']} lh={16} size={13} bold color={term ? C.good : C.bad} />
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Far end" value={term ? 'on' : 'off'} onChange={(v) => setTerm(v === 'on')} options={[{ value: 'on', label: 'Terminated with a resistor' }, { value: 'off', label: 'No resistor' }]} />
      </div>
    </>
  )
}
