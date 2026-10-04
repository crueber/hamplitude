import { useState } from 'react'
import { C, Choice, Controls, Diagram, T } from '../kit'

type View = 'odd' | 'even' | 'both'
const LINES = 15
const X0 = 70, X1 = 330, Y0 = 30, DY = 14

/** Interlaced scanning: odd lines in one field, even lines in the next; two fields make a frame. */
export function E2B_Interlace() {
  const [view, setView] = useState<View>('both')
  const row = (i: number) => Y0 + i * DY // i = 0..LINES-1, line number i+1
  return (
    <>
      <Diagram w={640} h={276} title="Interlaced scanning of an NTSC picture: the first field scans the odd-numbered lines, the second field scans the even-numbered lines in the gaps, and the two fields together make one 525-line frame."
        caption="Drawn with 15 lines instead of 525. Same pattern.">
        <rect x={X0 - 12} y={Y0 - 14} width={X1 - X0 + 24} height={LINES * DY + 14} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
        {Array.from({ length: LINES }, (_, i) => {
          const odd = (i + 1) % 2 === 1
          const shown = view === 'both' || (view === 'odd') === odd
          const col = odd ? C.signal : C.power
          return (
            <g key={i}>
              <line x1={X0} y1={row(i)} x2={X1} y2={row(i) + 4} stroke={col} strokeWidth={3} strokeLinecap="round" opacity={shown ? 1 : 0.1} />
              <T x={X0 - 22} y={row(i)} anchor="end" size={12} color={shown ? col : C.muted} bold={shown}>{i + 1}</T>
            </g>
          )
        })}
        <T x={X0} y={Y0 + LINES * DY + 30} size={12} color={C.muted}>each line scans left to right, top to bottom</T>
        <g transform="translate(400,40)">
          <rect x={0} y={0} width={220} height={52} rx={10} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={2} opacity={view === 'even' ? 0.35 : 1} />
          <T x={12} y={17} size={14} bold color={C.signal}>Field 1: odd lines</T>
          <T x={12} y={37} size={13} color={C.muted}>1, 3, 5 ... (60 per second)</T>
          <rect x={0} y={66} width={220} height={52} rx={10} fill={C.power} fillOpacity={0.15} stroke={C.power} strokeWidth={2} opacity={view === 'odd' ? 0.35 : 1} />
          <T x={12} y={83} size={14} bold color={C.power}>Field 2: even lines</T>
          <T x={12} y={103} size={13} color={C.muted}>2, 4, 6 ... (60 per second)</T>
          <rect x={0} y={132} width={220} height={52} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} opacity={view === 'both' ? 1 : 0.35} />
          <T x={12} y={149} size={14} bold>Frame = both fields</T>
          <T x={12} y={169} size={13} color={C.muted}>525 lines, 30 per second</T>
        </g>
      </Diagram>
      <Controls>
        <Choice label="Show" value={view} onChange={setView} options={[{ value: 'odd', label: 'Field 1 (odd)' }, { value: 'even', label: 'Field 2 (even)' }, { value: 'both', label: 'Whole frame' }]} />
      </Controls>
    </>
  )
}
