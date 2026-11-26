import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

// From recent WFDA rules: setup may begin 1600 UTC Friday (12 hours of setup at most, in total),
// operating runs 1600 UTC Saturday to 2159 UTC Sunday. January is standard time in the US.
const ZONES = [
  { id: 'ET', label: 'Eastern', name: 'Eastern', off: -5 },
  { id: 'CT', label: 'Central', name: 'Central', off: -6 },
  { id: 'MT', label: 'Mountain', name: 'Mountain', off: -7 },
  { id: 'PT', label: 'Pacific', name: 'Pacific', off: -8 },
  { id: 'UTC', label: 'UTC', name: 'UTC', off: 0 },
]
const DAYS = ['Friday', 'Saturday', 'Sunday']
const H0 = 6 // the axis starts at 06:00 Friday, local
const SPAN = 66 // and ends at midnight Sunday into Monday
const X0 = 40, X1 = 600
const x = (h: number) => X0 + ((h - H0) / SPAN) * (X1 - X0)

/** Hours since local midnight Friday, as "Sat 10:00 AM" (or "Sat 1600 UTC"). */
function when(h: number, utc: boolean, min: number) {
  const day = DAYS[Math.floor(h / 24)].slice(0, 3)
  const hr = ((h % 24) + 24) % 24
  const mm = String(min).padStart(2, '0')
  if (utc) return `${day} ${String(hr).padStart(2, '0')}${mm} UTC`
  return `${day} ${hr % 12 === 0 ? 12 : hr % 12}:${mm} ${hr < 12 ? 'AM' : 'PM'}`
}

/** The Winter Field Day weekend on a local-time line: when setup may begin, and the 30-hour operating window. */
export function WinterFieldDay_Weekend() {
  const [zone, setZone] = useState('CT')
  const z = ZONES.find((v) => v.id === zone)!
  const utc = z.off === 0
  const setup = 16 + z.off // Friday
  const start = 24 + 16 + z.off // Saturday
  const end = 48 + 21 + z.off // Sunday, plus 59 minutes
  const sSetup = when(setup, utc, 0), sStart = when(start, utc, 0), sEnd = when(end, utc, 59)
  return (
    <>
      <Diagram w={640} h={262}
        title={`Winter Field Day in ${z.name} time: setup may begin ${sSetup}, and the 30-hour operating period runs from ${sStart} to ${sEnd}.`}
        caption="From recent rules: on the air 1600 UTC Saturday to 2159 UTC Sunday. January is standard time.">
        <Ln x1={X0} y1={206} x2={X1} y2={206} color={C.muted} width={1.5} />
        {DAYS.map((d, i) => {
          const a = Math.max(i * 24, H0), b = (i + 1) * 24
          return (
            <g key={d}>
              <Ln x1={x(b)} y1={197} x2={x(b)} y2={215} color={C.muted} width={1.5} />
              <Ln x1={x(i * 24 + 12)} y1={202} x2={x(i * 24 + 12)} y2={210} color={C.muted} width={1.5} />
              <T x={(x(a) + x(b)) / 2} y={232} anchor="middle" size={13} bold color={C.muted}>{d}</T>
            </g>
          )
        })}
        {/* guides from each moment down to the day axis */}
        {[setup, start, end + 59 / 60].map((h) => <Ln key={h} x1={x(h)} y1={134} x2={x(h)} y2={206} color={C.muted} width={1} dash="3 4" />)}
        {/* setup window: opens Friday, 12 hours of it at most */}
        <T x={x(setup)} y={34} size={13} bold color={C.resist}>Setup may begin, {sSetup}</T>
        <T x={x(setup)} y={53} size={12.5} color={C.muted}>12 hours of setup at most, in total</T>
        <rect x={x(setup)} y={102} width={x(start) - x(setup)} height={30} rx={8} fill={C.resist} fillOpacity={0.12} stroke={C.resist} strokeWidth={1.5} strokeDasharray="5 4" />
        <T x={(x(setup) + x(start)) / 2} y={117} anchor="middle" size={13} bold color={C.resist}>setup</T>
        {/* operating window */}
        <T x={x(start)} y={90} size={13} bold color={C.signal}>Starts {sStart}</T>
        <rect x={x(start)} y={102} width={x(end + 59 / 60) - x(start)} height={30} rx={8} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={2} />
        <T x={(x(start) + x(end + 1)) / 2} y={117} anchor="middle" size={13} bold color={C.signal}>30 hours on the air</T>
        <T x={x(end + 59 / 60) - 8} y={162} anchor="end" size={13} bold color={C.signal} stroke={C.bg} strokeWidth={4} paintOrder="stroke" strokeLinejoin="round">Ends {sEnd}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Time zone" value={zone} onChange={setZone} options={ZONES.map((v) => ({ value: v.id, label: v.label }))} />
      </div>
    </>
  )
}
