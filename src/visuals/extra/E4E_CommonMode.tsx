import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Differential current goes out and back and its fields cancel. Common-mode current flows the same way on everything and radiates. */
export function CommonMode() {
  const [choke, setChoke] = useState(false)
  const arrows = (y: number, dir: 1 | -1, col: string, key: string, op = 1) => (
    <g key={key} opacity={op}>
      {[262, 362, 462].map((x) => <Ln key={x} x1={dir === 1 ? x : x + 50} y1={y} x2={dir === 1 ? x + 50 : x} y2={y} color={col} width={3.5} arrow />)}
    </g>
  )
  return (
    <>
      <Diagram w={640} h={316} title={`Differential-mode current flows in opposite directions on a pair, so the fields cancel. Common-mode current flows the same way on all conductors and the shield, so the cable radiates and receives interference${choke ? '; a ferrite choke blocks it' : ''}.`}
        caption="Common-mode current is the same on every conductor. It turns a cable into an antenna. A ferrite choke blocks it and passes the wanted current.">
        <rect x={14} y={14} width={612} height={108} rx={12} fill={C.fill} />
        <T x={28} y={34} bold size={14} color={C.good}>Differential mode</T>
        <T x={28} y={54} size={12} color={C.muted}>opposite directions: fields cancel</T>
        <rect x={246} y={42} width={310} height={66} rx={12} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        {arrows(62, 1, C.current, 'd1')}{arrows(88, -1, C.current, 'd2')}
        <T x={594} y={62} anchor="middle" size={12} color={C.muted}>wire A</T>
        <T x={594} y={88} anchor="middle" size={12} color={C.muted}>wire B</T>
        <rect x={14} y={134} width={612} height={168} rx={12} fill={C.fill} />
        <T x={28} y={154} bold size={14} color={C.bad}>Common mode</T>
        <T x={28} y={174} size={12} color={C.muted}>same direction on all, shield included</T>
        <rect x={246} y={190} width={310} height={96} rx={12} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        {[206, 238, 270].map((y, i) => arrows(y, 1, C.voltage, `c${i}`, choke ? 0.2 : 1))}
        <T x={594} y={206} anchor="middle" size={12} color={C.muted}>wire A</T>
        <T x={594} y={238} anchor="middle" size={12} color={C.muted}>wire B</T>
        <T x={594} y={270} anchor="middle" size={12} color={C.muted}>shield</T>
        {!choke && [0, 1].map((i) => <path key={i} d={`M${300 + i * 90},184 q10,-14 0,-28 M${312 + i * 90},184 q18,-14 0,-28`} fill="none" stroke={C.bad} strokeWidth={2.5} strokeLinecap="round" />)}
        {!choke && <T x={612} y={150} anchor="end" size={12} bold color={C.bad}>radiates and picks up interference</T>}
        {choke && <><rect x={330} y={192} width={30} height={92} rx={8} fill={C.power} opacity={0.85} /><T x={345} y={298} anchor="middle" size={12} bold color={C.power}>ferrite choke</T><T x={612} y={150} anchor="end" size={12} bold color={C.good}>common-mode blocked</T></>}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Choke" value={choke ? 'on' : 'off'} onChange={(v) => setChoke(v === 'on')} options={[{ value: 'off', label: 'No choke' }, { value: 'on', label: 'Add ferrite choke' }]} />
      </div>
    </>
  )
}
