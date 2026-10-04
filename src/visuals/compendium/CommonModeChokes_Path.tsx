import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

/** A dipole fed with coax: with no choke, current flows down the OUTSIDE of the shield and the cable becomes part of the antenna. */
export function CommonModeChokes_Path() {
  const [choke, setChoke] = useState(false)
  const cx = 250, fy = 66, ry = 250
  const arc = (r: number, o: number) => `M${cx + 16 + o},${fy + 70 - r * 0.9} Q${cx + 16 + o + r * 0.7},${fy + 110} ${cx + 16 + o},${fy + 100 + r * 0.9}`
  return (
    <>
      <Diagram w={640} h={296}
        title={choke
          ? 'A dipole fed with coax and a common-mode choke at the feed point. The signal current passes inside the coax. The choke stops current from flowing down the outside of the shield, so the cable does not radiate.'
          : 'A dipole fed with coax and no choke. Besides the signal inside the coax, current also flows down the outside of the shield, so the coax acts as part of the antenna: it radiates, picks up noise and brings RF into the shack.'}
        caption={choke ? 'The choke is a high impedance only to current on the outside of the shield. The signal inside the coax passes untouched.' : 'The outside of the shield is a separate conductor. Without a choke, antenna current can flow down it, and the feed line becomes part of the antenna.'}>
        <Ln x1={60} y1={fy} x2={cx - 8} y2={fy} color={C.ink} width={5} />
        <Ln x1={cx + 8} y1={fy} x2={440} y2={fy} color={C.ink} width={5} />
        <T x={60} y={fy - 20} size={12.5} color={C.muted}>dipole</T>
        <rect x={cx - 7} y={fy} width={14} height={ry - fy} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <Ln x1={cx} y1={fy} x2={cx} y2={ry} color={C.resist} width={2.5} />
        <circle cx={cx} cy={fy} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <rect x={cx - 52} y={ry} width={104} height={34} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={cx} y={ry + 17} anchor="middle" size={13.5} bold>Radio</T>
        <T x={cx + 18} y={ry - 14} size={12.5} color={C.muted}>coax</T>

        {/* choke */}
        {choke && (
          <g>
            <rect x={cx - 16} y={fy + 26} width={32} height={46} rx={6} fill={C.fill} stroke={C.power} strokeWidth={3} />
            <T x={cx + 28} y={fy + 49} size={13} bold color={C.power}>choke</T>
          </g>
        )}
        {/* current on the outside of the shield */}
        {!choke && (
          <g>
            {[100, 150, 200].map((y) => (
              <Ln key={y} x1={cx - 20} y1={y} x2={cx - 20} y2={y + 28} color={C.bad} width={3.5} arrow />
            ))}
            <T x={cx - 32} y={150} anchor="end" size={13} bold color={C.bad}>current on the</T>
            <T x={cx - 32} y={168} anchor="end" size={13} bold color={C.bad}>outside of the shield</T>
            <path d={arc(40, 54)} fill="none" stroke={C.bad} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
            <path d={arc(70, 54)} fill="none" stroke={C.bad} strokeWidth={2} strokeLinecap="round" opacity={0.55} />
            <path d={arc(100, 54)} fill="none" stroke={C.bad} strokeWidth={2} strokeLinecap="round" opacity={0.3} />
          </g>
        )}
        {choke && (
          <g>
            <Ln x1={cx - 20} y1={fy + 100} x2={cx - 20} y2={ry - 6} color={C.muted} width={2} dash="3 6" />
            <T x={cx - 32} y={150} anchor="end" size={13} bold color={C.good}>almost none on the</T>
            <T x={cx - 32} y={168} anchor="end" size={13} bold color={C.good}>outside of the shield</T>
          </g>
        )}
        {/* right-hand notes */}
        {!choke ? (
          <g>
            <T x={410} y={130} size={13.5} bold color={C.bad}>The coax now radiates</T>
            <T x={410} y={152} size={12.5} color={C.muted}>distorted pattern</T>
            <T x={410} y={172} size={12.5} color={C.muted}>noise picked up and carried in</T>
            <T x={410} y={192} size={12.5} color={C.muted}>RF in the shack, odd SWR</T>
          </g>
        ) : (
          <g>
            <T x={410} y={130} size={13.5} bold color={C.good}>The antenna is the antenna</T>
            <T x={410} y={152} size={12.5} color={C.muted}>clean pattern</T>
            <T x={410} y={172} size={12.5} color={C.muted}>less noise, less RFI</T>
            <T x={410} y={192} size={12.5} color={C.muted}>SWR steady when the coax moves</T>
          </g>
        )}
      </Diagram>
      <Controls>
        <Choice label="Choke" value={choke ? 'on' : 'off'} onChange={(v) => setChoke(v === 'on')} options={[{ value: 'off', label: 'No choke' }, { value: 'on', label: 'Choke at feed point' }]} />
      </Controls>
    </>
  )
}
