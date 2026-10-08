import { useState } from 'react'
import { Link } from 'react-router-dom'
import { C, Choice, Controls, Diagram, T } from '../kit'

type Auth = 'you' | 'coord' | 'fcc' | 'perm'

const AUTH: Record<Auth, { name: string; color: string; note: string }> = {
  you: { name: 'You / your club', color: C.signal, note: 'Your group does most of the work, and stays responsible for the repeater afterwards.' },
  coord: { name: 'Coordinator', color: C.current, note: 'A volunteer body that recommends channels. It is not the FCC and cannot issue a license.' },
  fcc: { name: 'FCC rules', color: C.power, note: 'The FCC licenses the station and sets Part 97. There is no separate "repeater license".' },
  perm: { name: 'Landlord / local', color: C.resist, note: 'Property owners, zoning, aviation and exposure rules: permission and compliance from others.' },
}

interface Step { t: string; d: string; tags: Auth[]; to: string }
const STEPS: Step[] = [
  { t: 'Decide why, and who owns it', d: 'Purpose, and who holds the station license', tags: ['you', 'fcc'], to: 'planning-a-repeater' },
  { t: 'Pick the band', d: 'VHF, UHF or HF: goal and terrain decide', tags: ['you', 'coord'], to: 'vhf-repeaters' },
  { t: 'Find a site and a landlord', d: 'Height, power, access and written permission', tags: ['perm'], to: 'site-permits-and-local-approvals' },
  { t: 'Coordinate the frequency', d: 'Ask for a pair; the coordinator recommends', tags: ['coord'], to: 'repeater-frequency-coordination' },
  { t: 'Check local and structure rules', d: 'Zoning, aviation, RF exposure', tags: ['perm', 'fcc'], to: 'site-permits-and-local-approvals' },
  { t: 'Build and bench-test', d: 'Radios, controller and duplexer, tested at home', tags: ['you'], to: 'repeater-hardware-and-duplexers' },
  { t: 'Install and tune', d: 'Antenna, feedline, duplexer, coverage check', tags: ['you'], to: 'repeater-coverage-and-antennas' },
  { t: 'Identify, set timers and tones', d: 'Station ID, time-out timer, access tone', tags: ['fcc', 'you'], to: 'fcc-rules-for-repeaters' },
  { t: 'List it and tell users', d: 'Directories, clubs, and your coordinator', tags: ['coord', 'you'], to: 'repeater-directories' },
  { t: 'Run and maintain', d: 'Control operators, monitoring, upkeep, succession', tags: ['fcc', 'you'], to: 'running-a-repeater' },
]

const FILTERS: { value: Auth | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'you', label: 'You / club' },
  { value: 'coord', label: 'Coordinator' },
  { value: 'fcc', label: 'FCC' },
  { value: 'perm', label: 'Landlord / local' },
]

/** The ten-step journey to a repeater on the air, tagged with who is the authority at each step. Pick an authority to highlight its steps. */
export function RepeaterRoadmap_Steps() {
  const [f, setF] = useState<Auth | 'all'>('all')
  const pitch = 56, y0 = 42
  const H = y0 + STEPS.length * pitch + 56
  const pillW = 104
  return (
    <>
      <Diagram w={640} h={H}
        title="The ten steps from idea to a coordinated repeater on the air, each tagged with the authority involved: your club, the frequency coordinator, the FCC rules, or landlords and local authorities. Each step links to the article that covers it."
        caption="Steps overlap and loop in practice. Choose an authority below to highlight where it matters. Each step opens its article.">
        {(Object.keys(AUTH) as Auth[]).map((k, i) => (
          <g key={k}>
            <rect x={10 + i * 156} y={12} width={14} height={14} rx={4} fill={AUTH[k].color} />
            <T x={30 + i * 156} y={19} size={12.5}>{AUTH[k].name}</T>
          </g>
        ))}
        {STEPS.map((s, i) => {
          const y = y0 + i * pitch
          const on = f === 'all' || s.tags.includes(f)
          return (
            <Link key={s.t} to={`/compendium/${s.to}`} aria-label={`Step ${i + 1}: ${s.t}`}>
              <g opacity={on ? 1 : 0.28} style={{ cursor: 'pointer' }}>
                <rect x={8} y={y} width={624} height={50} rx={12} fill={C.fill} stroke={on && f !== 'all' ? AUTH[f as Auth].color : C.fill2} strokeWidth={on && f !== 'all' ? 2.5 : 2} />
                <circle cx={34} cy={y + 25} r={15} fill={C.fill2} />
                <T x={34} y={y + 25} anchor="middle" size={14} bold>{i + 1}</T>
                <T x={60} y={y + 16} size={14} bold>{s.t}</T>
                <T x={60} y={y + 35} size={12.5} color={C.muted}>{s.d}</T>
                {s.tags.map((k, j) => {
                  const x = 632 - 8 - pillW - j * (pillW + 6)
                  return (
                    <g key={k}>
                      <rect x={x} y={y + 15} width={pillW} height={20} rx={10} fill={AUTH[k].color} fillOpacity={0.2} stroke={AUTH[k].color} strokeWidth={1.5} />
                      <T x={x + pillW / 2} y={y + 25} anchor="middle" size={12} bold>{AUTH[k].name.split(' ')[0] === 'You' ? 'You / club' : AUTH[k].name.split(' ')[0]}</T>
                    </g>
                  )
                })}
              </g>
            </Link>
          )
        })}
        <T x={14} y={y0 + STEPS.length * pitch + 18} size={13} bold color={f === 'all' ? C.muted : AUTH[f].color}>{f === 'all' ? 'Choose an authority to see where it matters' : AUTH[f].name}</T>
        <T x={14} y={y0 + STEPS.length * pitch + 38} size={12.5} color={C.muted}>{f === 'all' ? 'Coordination (a recommendation) and the FCC license (the legal permission) are different things.' : AUTH[f].note}</T>
      </Diagram>
      <Controls>
        <Choice label="Highlight steps by authority" options={FILTERS} value={f} onChange={setF} />
      </Controls>
    </>
  )
}
