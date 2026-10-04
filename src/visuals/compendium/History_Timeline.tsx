import type { ReactNode } from 'react'
import { C, Diagram, Ln, T } from '../kit'

type Ev = { y: string; t: string; d: string }
type Era = { name: string; color: string; events: Ev[] }

const ERAS: Era[] = [
  {
    name: 'Before licenses', color: C.signal,
    events: [
      { y: '1887–88', t: 'Hertz makes and detects radio waves', d: 'Lab proof that Maxwell’s predicted waves exist' },
      { y: '1901', t: 'Marconi reports a transatlantic signal', d: 'Wireless telegraphy becomes a serious technology' },
    ],
  },
  {
    name: 'Licenses and the shortwave era', color: C.current,
    events: [
      { y: '1912', t: 'US Radio Act', d: 'Stations and operators licensed; amateurs kept to short wavelengths' },
      { y: '1914', t: 'ARRL founded', d: 'The American Radio Relay League: amateurs organised to relay messages' },
      { y: '1921–23', t: 'Across the Atlantic', d: 'Amateur signals heard in 1921; first two-way contact in 1923' },
      { y: '1925', t: 'IARU founded', d: 'International Amateur Radio Union, formed in Paris' },
      { y: '1934', t: 'Communications Act', d: 'Creates the FCC, the regulator that still licenses US amateurs' },
    ],
  },
  {
    name: 'War, space and satellites', color: C.power,
    events: [
      { y: '1941–46', t: 'Wartime shutdown', d: 'US amateur operation suspended in WWII, then bands reopened' },
      { y: '1961', t: 'OSCAR 1', d: 'The first amateur radio satellite' },
      { y: '1983', t: 'Ham radio from the Space Shuttle', d: 'Owen Garriott, W5LFL, operates from orbit' },
    ],
  },
  {
    name: 'Modern era', color: C.resist,
    events: [
      { y: '2000', t: 'Three license classes', d: 'US restructuring leaves Technician, General and Extra' },
      { y: '2007', t: 'Morse test dropped', d: 'The FCC no longer requires code for any US class' },
      { y: '2017', t: 'FT8 released', d: 'A 15-second weak-signal digital mode spreads rapidly' },
    ],
  },
]

const ROW = 42, HEAD = 30
const total = ERAS.reduce((n, e) => n + HEAD + e.events.length * ROW + 10, 0)

/** Vertical timeline of the amateur service: from Hertz to FT8. */
export function History_Timeline() {
  const h = total + 20
  const spine = 112
  let y = 12
  const out: ReactNode[] = []
  ERAS.forEach((era) => {
    out.push(
      <g key={era.name}>
        <T x={spine + 20} y={y + 10} size={13} bold color={era.color}>{era.name.toUpperCase()}</T>
      </g>,
    )
    const top = y + HEAD
    const bottom = top + era.events.length * ROW
    out.push(<Ln key={era.name + 'l'} x1={spine} y1={y + HEAD - 4} x2={spine} y2={bottom - 12} color={era.color} width={4} />)
    era.events.forEach((e, i) => {
      const cy = top + i * ROW + 12
      out.push(
        <g key={e.y + e.t}>
          <T x={spine - 18} y={cy} anchor="end" size={14} bold color={era.color}>{e.y}</T>
          <circle cx={spine} cy={cy} r={7} fill={C.bg} stroke={era.color} strokeWidth={3} />
          <T x={spine + 20} y={cy} size={14} bold>{e.t}</T>
          <T x={spine + 20} y={cy + 18} size={12.5} color={C.muted}>{e.d}</T>
        </g>,
      )
    })
    y = bottom + 10
  })
  return (
    <Diagram w={640} h={h} title="Timeline of amateur radio: Hertz proves radio waves in 1887 to 1888, Marconi in 1901, the US Radio Act in 1912, the ARRL in 1914, transatlantic amateur contacts in 1921 to 1923, the IARU in 1925, the FCC in 1934, OSCAR 1 in 1961, a ham operating from the Space Shuttle in 1983, three license classes in 2000, the end of the code test in 2007 and FT8 in 2017"
      caption="Selected milestones, mostly American. Other countries have their own, equally rich, histories.">
      {out}
    </Diagram>
  )
}
