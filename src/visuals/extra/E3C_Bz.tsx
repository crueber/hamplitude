import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Bz is the north-south part of the solar wind's magnetic field. Southward opposes Earth's field at the nose and links up with it. */
export function Bz() {
  const [south, setSouth] = useState(true)
  const ex = 520, ey = 150
  const col = south ? C.bad : C.good
  return (
    <>
      <Diagram w={640} h={300} title={south ? 'Bz southward: the solar wind field points opposite to Earth\'s field at the front of the magnetosphere, so they link up and energy and particles enter, giving disturbed conditions' : 'Bz northward: the solar wind field points the same way as Earth\'s field, so the solar wind flows around and conditions stay quieter'}
        caption="Schematic, side view. Bz is the north-south strength of the interplanetary magnetic field (IMF).">
        {[70, 110, 150, 190, 230].map((y) => <Ln key={y} x1={20} y1={y} x2={100} y2={y} color={C.resist} width={2} dash="2 6" arrow opacity={0.7} />)}
        <T x={20} y={34} size={13} bold color={C.resist}>solar wind</T>
        <path d={`M${ex - 110},${ey - 90} C${ex - 150},${ey - 30} ${ex - 150},${ey + 30} ${ex - 110},${ey + 90}`} fill="none" stroke={C.muted} strokeWidth={3} strokeDasharray="6 5" />
        <circle cx={ex} cy={ey} r={34} fill={C.fill} stroke={C.muted} strokeWidth={2.5} />
        <T x={ex} y={ey} anchor="middle" size={13} bold color={C.muted}>Earth</T>
        <Ln x1={ex - 70} y1={ey + 22} x2={ex - 70} y2={ey - 22} color={C.current} width={4} arrow />
        <T x={ex - 36} y={ey + 52} anchor="middle" size={12} bold color={C.current}>Earth's field: north</T>
        <Ln x1={250} y1={ey + (south ? -30 : 30)} x2={250} y2={ey + (south ? 30 : -30)} color={col} width={5} arrow />
        <T x={268} y={ey} size={14} bold color={col}>{south ? 'Bz south' : 'Bz north'}</T>
        {south ? (
          <>
            <circle cx={ex - 120} cy={ey} r={9} fill={C.bad} fillOpacity={0.4} stroke={C.bad} strokeWidth={2} />
            <T x={ex - 160} y={ey + 30} anchor="end" size={12} bold color={C.bad}>links up</T>
            <T x={20} y={278} size={15} bold color={C.bad}>opposed fields: energy gets in, disturbed conditions</T>
          </>
        ) : (
          <T x={20} y={278} size={15} bold color={C.good}>same direction: deflected around Earth, quieter</T>
        )}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Bz" value={south ? 's' : 'n'} onChange={(v) => setSouth(v === 's')} options={[{ value: 'n', label: 'Bz northward' }, { value: 's', label: 'Bz southward' }]} />
      </div>
    </>
  )
}
