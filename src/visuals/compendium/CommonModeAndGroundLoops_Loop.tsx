import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Fix = 'loop' | 'strip' | 'isolator'

const CAP: Record<Fix, string> = {
  loop: 'Two paths to ground, one of them the cable shield: a small voltage between the grounds drives current round the loop, and the audio hears it as hum.',
  strip: 'Both units on one outlet strip (or bonded together): almost no voltage between their grounds, so almost no loop current.',
  isolator: 'An isolation transformer in the audio line breaks the loop but passes the audio. The safety ground stays connected.',
}

/** A ground loop: two grounded units joined by a cable shield form a loop that a small voltage difference drives current around. */
export function CommonModeAndGroundLoops_Loop() {
  const [fix, setFix] = useState<Fix>('loop')
  const hum = fix === 'loop'
  const uy = 56, uh = 66, cy = uy + 33
  const ax = 40, bx = 440
  const gax = 150, gbx = 470 // where the ground wires leave the boxes
  const gl = fix === 'strip' ? 220 : 290 // ground bus height
  return (
    <>
      <Diagram w={640} h={330} title={`A radio and an audio interface are each grounded through the house wiring and also joined by a cable whose shield is a second ground connection. ${CAP[fix]}`}
        caption={CAP[fix]}>
        {hum && <rect x={gax} y={cy} width={gbx - gax} height={gl - cy} fill={C.bad} fillOpacity={0.1} />}

        <rect x={ax} y={uy} width={140} height={uh} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <T x={ax + 70} y={uy + 24} anchor="middle" bold size={14}>Radio</T>
        <T x={ax + 70} y={uy + 46} anchor="middle" size={12} color={C.muted}>chassis grounded</T>
        <rect x={bx} y={uy} width={160} height={uh} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <T x={bx + 80} y={uy + 24} anchor="middle" bold size={14}>Audio interface</T>
        <T x={bx + 80} y={uy + 46} anchor="middle" size={12} color={C.muted}>chassis grounded</T>

        <T x={310} y={uy - 10} anchor="middle" size={12} color={C.muted}>audio cable with shield</T>
        {fix === 'isolator' ? (
          <g>
            <Ln x1={ax + 140} y1={cy} x2={272} y2={cy} color={C.resist} width={4} />
            <rect x={272} y={cy - 18} width={76} height={36} rx={8} fill={C.fill} stroke={C.power} strokeWidth={3} />
            <T x={310} y={cy} anchor="middle" size={12} bold color={C.power}>isolator</T>
            <Ln x1={348} y1={cy} x2={bx} y2={cy} color={C.resist} width={4} />
          </g>
        ) : (
          <Ln x1={ax + 140} y1={cy} x2={bx} y2={cy} color={C.resist} width={4} />
        )}

        {/* ground wires through the house wiring */}
        <Ln x1={gax} y1={uy + uh} x2={gax} y2={gl} color={C.good} width={3.5} />
        <Ln x1={gbx} y1={uy + uh} x2={gbx} y2={gl} color={C.good} width={3.5} />
        <Ln x1={gax} y1={gl} x2={gbx} y2={gl} color={C.good} width={3.5} />
        {fix === 'strip' && (
          <g>
            <rect x={250} y={gl - 17} width={120} height={34} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
            <T x={310} y={gl} anchor="middle" size={12} bold>one outlet strip</T>
            <Ln x1={310} y1={gl + 17} x2={310} y2={290} color={C.good} width={3.5} />
          </g>
        )}
        <T x={gax - 10} y={uy + uh + 60} anchor="end" size={12} bold color={C.good}>safety</T>
        <T x={gax - 10} y={uy + uh + 78} anchor="end" size={12} bold color={C.good}>ground</T>
        <T x={gax - 10} y={uy + uh + 96} anchor="end" size={12} color={C.muted}>(kept)</T>

        {hum && (
          <g>
            <Ln x1={gax + 14} y1={190} x2={gax + 14} y2={150} color={C.bad} width={3.5} arrow />
            <Ln x1={250} y1={cy + 16} x2={370} y2={cy + 16} color={C.bad} width={3.5} arrow />
            <Ln x1={gbx - 14} y1={150} x2={gbx - 14} y2={190} color={C.bad} width={3.5} arrow />
            <Ln x1={370} y1={gl - 14} x2={250} y2={gl - 14} color={C.bad} width={3.5} arrow />
            <T x={310} y={176} anchor="middle" size={14} bold color={C.bad}>loop current</T>
            <T x={310} y={198} anchor="middle" size={12} color={C.bad}>a small voltage between the two grounds</T>
            <T x={310} y={216} anchor="middle" size={12} color={C.bad}>pushes it round, through the shield</T>
          </g>
        )}
        <T x={310} y={gl + 24 + (fix === 'strip' ? 70 : 0)} anchor="middle" size={12} color={C.muted}>house wiring to the one building ground</T>
        <rect x={gbx + 14} y={uy + uh + 22} width={136} height={30} rx={15} fill={C.bg} stroke={hum ? C.bad : C.good} strokeWidth={2.5} />
        <T x={gbx + 82} y={uy + uh + 37} anchor="middle" size={13} bold color={hum ? C.bad : C.good}>{hum ? 'audio has hum' : 'audio is clean'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Station wiring" value={fix} onChange={setFix} options={[
          { value: 'loop', label: 'As built' },
          { value: 'strip', label: 'Same outlet strip' },
          { value: 'isolator', label: 'Isolator in the signal line' },
        ]} />
      </div>
    </>
  )
}
