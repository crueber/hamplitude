import { useState } from 'react'
import { C, Choice, Controls, Diagram, Fuse, Ln, Readout, Slider, T } from '../kit'

const WIRE = 5 // the wiring is sized for a 5 A circuit

/** A 5 A circuit with a 5 A fuse vs a 20 A fuse, as the current rises. */
export function FuseFire() {
  const [rating, setRating] = useState<5 | 20>(5)
  const [amps, setAmps] = useState(15)
  const blown = amps > rating
  const hot = !blown && amps > WIRE
  const state = blown ? 'safe' : hot ? 'fire' : 'ok'
  const wireColor = state === 'fire' ? C.bad : C.ink
  const W = 640, H = 270, y = 120
  return (
    <>
      <Diagram w={W} h={H} title={`${rating} amp fuse in a ${WIRE} amp wiring circuit carrying ${amps} amps: ${state === 'safe' ? 'fuse blows, power removed' : state === 'fire' ? 'fuse holds, wiring overheats, fire risk' : 'normal'}`}
        caption="The wiring can take 5 A. A fuse must open before the wire overheats, so never use a larger fuse.">
        <Ln x1={60} y1={y} x2={160} y2={y} color={wireColor} width={5} />
        <Fuse x={210} y={y} len={100} color={blown ? C.muted : C.ink} />
        {blown && <T x={210} y={y - 28} anchor="middle" size={14} bold color={C.good}>BLOWN</T>}
        {!blown && <T x={210} y={y - 28} anchor="middle" size={13} bold color={C.muted}>{rating} A fuse</T>}
        <Ln x1={260} y1={y} x2={560} y2={y} color={blown ? C.muted : wireColor} width={5} dash={blown ? '8 6' : undefined} />
        <Ln x1={560} y1={y} x2={560} y2={200} color={blown ? C.muted : wireColor} width={5} />
        <Ln x1={60} y1={200} x2={560} y2={200} color={C.muted} width={5} />
        <Ln x1={60} y1={y} x2={60} y2={200} color={C.muted} width={5} />
        <rect x={500} y={150} width={120} height={36} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={560} y={168} anchor="middle" size={13} bold>Fault / load</T>
        {state === 'fire' && [330, 400, 470].map((x) => <path key={x} transform={`translate(${x},${y - 12}) scale(1.3)`} d="M0,0 C-10,-4 -12,-14 -4,-24 C-3,-17 2,-16 3,-22 C12,-14 10,-4 0,0Z" fill={C.bad} />)}
        <rect x={150} y={222} width={340} height={34} rx={8} fill={C.fill} />
        <T x={320} y={239} anchor="middle" size={15} bold color={state === 'ok' ? C.good : state === 'safe' ? C.good : C.bad}>
          {state === 'ok' ? 'Normal: current is within the wire rating' : state === 'safe' ? 'Fuse opens: power removed, safe' : 'Fuse holds, wire overheats: FIRE'}
        </T>
        <T x={300} y={170} anchor="middle" size={13} color={C.muted}>wiring rated for {WIRE} A</T>
      </Diagram>
      <Controls>
        <Slider label="Current drawn (fault)" value={amps} min={1} max={25} step={1} onChange={setAmps} format={(v) => `${v} A`} color="var(--d-current)" />
        <Readout label="Fuse" value={rating} unit="A" color="var(--d-bad)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Fuse rating" value={rating} onChange={setRating} options={[{ value: 5, label: 'Correct: 5 A fuse' }, { value: 20, label: 'Wrong: 20 A fuse' }]} />
      </div>
    </>
  )
}
