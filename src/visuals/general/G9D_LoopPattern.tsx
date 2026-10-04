import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, TAU } from '../kit'

/** Small loop: figure-eight, nulls broadside to the loop. Halo: a loop lying flat, omnidirectional in its plane. */
export function G9D_LoopPattern() {
  const [k, setK] = useState<'small' | 'halo'>('small')
  const small = k === 'small'
  const cx = 470, cy = 150, R = 100
  const path = small
    ? Array.from({ length: 181 }, (_, i) => {
        const a = (i / 180) * TAU
        const r = Math.abs(Math.cos(a))
        return `${i ? 'L' : 'M'}${(cx + R * r * Math.cos(a)).toFixed(1)},${(cy - R * r * Math.sin(a)).toFixed(1)}`
      }).join('') + 'Z'
    : ''
  return (
    <>
      <Diagram w={640} h={300} title={small ? 'Electrically small loop: seen from above the pattern is a figure-eight with maxima in the plane of the loop and nulls broadside to the loop' : 'Halo antenna lying flat: seen from above the pattern is a circle, omnidirectional in the plane of the halo'}
        caption={small ? 'Small loop: signal arrives best in the plane of the loop. The nulls are broadside to it.' : 'Halo: a loop lying flat, strongest equally in every direction around its plane.'}>
        <T x={150} y={18} anchor="middle" size={13} bold color={C.muted}>{small ? 'Loop, face-on' : 'Halo, side view'}</T>
        {small ? <circle cx={150} cy={140} r={62} fill="none" stroke={C.voltage} strokeWidth={6} /> : <ellipse cx={150} cy={140} rx={70} ry={14} fill="none" stroke={C.voltage} strokeWidth={6} />}
        {small ? <g stroke={C.bad} strokeWidth={3} strokeLinecap="round" fill="none"><circle cx={150} cy={140} r={12} /><line x1={142} y1={132} x2={158} y2={148} /><line x1={158} y1={132} x2={142} y2={148} /></g> : <Ln x1={150} y1={110} x2={150} y2={50} color={C.bad} width={3} arrow />}
        <T x={150} y={small ? 240 : 38} anchor="middle" size={13} bold color={C.bad}>{small ? 'broadside (into the page): null' : 'broadside: above'}</T>
        <T x={cx} y={18} anchor="middle" size={13} bold color={C.muted}>Pattern from above</T>
        {small ? (
          <>
            <path d={path} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
            <Ln x1={cx - 50} y1={cy} x2={cx + 50} y2={cy} color={C.voltage} width={6} />
            <T x={cx} y={cy - 64} anchor="middle" size={13} bold color={C.bad}>null</T>
            <T x={cx} y={cy + 64} anchor="middle" size={13} bold color={C.bad}>null</T>
            <T x={cx} y={cy + 96} anchor="middle" size={13} bold color={C.voltage}>loop edge-on (thick line)</T>
            <T x={cx} y={cy + 118} anchor="middle" size={13} bold color={C.good}>strongest in the plane of the loop</T>
          </>
        ) : (
          <>
            <circle cx={cx} cy={cy} r={R} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} />
            <circle cx={cx} cy={cy} r={22} fill="none" stroke={C.voltage} strokeWidth={6} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Ln key={i} x1={cx + 36 * Math.cos((i * TAU) / 8)} y1={cy + 36 * Math.sin((i * TAU) / 8)} x2={cx + 76 * Math.cos((i * TAU) / 8)} y2={cy + 76 * Math.sin((i * TAU) / 8)} color={C.good} width={2} arrow />)}
            <T x={cx} y={cy + R + 22} anchor="middle" size={13} bold color={C.good}>omnidirectional in the plane of the halo</T>
          </>
        )}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Antenna" value={k} onChange={setK} options={[{ value: 'small', label: 'Small loop' }, { value: 'halo', label: 'VHF/UHF halo' }]} />
      </div>
    </>
  )
}
