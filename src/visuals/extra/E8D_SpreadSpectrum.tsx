import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

const DATA = [1, 0, 1]
const CODE = [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1]
const HOPS = [2, 5, 1, 4, 0, 3, 5, 2]
const JAM = 3

/** Direct sequence: a fast code flips the carrier phase and smears the signal wide. Frequency hopping: the carrier jumps channel to channel in a pseudorandom pattern. */
export function SpreadSpectrum() {
  const [kind, setKind] = useState<'ds' | 'fh'>('ds')
  const stepPath = (vals: number[], x0: number, w: number, y: number, h: number) => {
    const yy = (v: number) => (y + (v ? 0 : h)).toFixed(1)
    return vals.map((v, i) => (i === 0 ? `M${x0},${yy(v)}` : `H${x0 + i * w}V${yy(v)}`)).join('') + `H${x0 + vals.length * w}`
  }
  const comb = CODE.map((c, i) => c ^ DATA[Math.floor(i / 4)])
  return (
    <>
      <Diagram w={640} h={282} title={kind === 'ds'
        ? 'Direct sequence spread spectrum: a fast pseudorandom bit stream shifts the phase of the carrier, spreading a narrow signal into a wide, low one. The receiver uses the same code to recover it.'
        : 'Frequency hopping spread spectrum: the carrier frequency jumps rapidly among channels in a pseudorandom pattern. Interference on one channel only hits the hops that land on it.'}
        caption={kind === 'ds' ? 'A fast code spreads the signal wide and weak. Only a receiver with the same code collapses it back.' : 'The transmitter hops by a pseudorandom pattern. The receiver follows the same pattern.'}>
        {kind === 'ds' ? (
          <g>
            <T x={20} y={18} size={13} bold color={C.signal}>Data bits (slow)</T>
            <path d={stepPath(DATA, 20, 120, 34, 22)} fill="none" stroke={C.signal} strokeWidth={2.5} />
            <T x={20} y={92} size={13} bold color={C.resist}>Pseudorandom code (fast)</T>
            <path d={stepPath(CODE, 20, 30, 108, 22)} fill="none" stroke={C.resist} strokeWidth={2.5} />
            <T x={20} y={166} size={13} bold color={C.power}>Data and code together shift the carrier phase</T>
            <path d={stepPath(comb, 20, 30, 182, 22)} fill="none" stroke={C.power} strokeWidth={2.5} />
            <T x={20} y={236} size={13} color={C.muted}>Receiver applies the same code to recover the data.</T>
            <T x={20} y={256} size={13} color={C.muted}>Signals without that code stay spread out and weak.</T>
            <T x={500} y={18} anchor="middle" size={13} bold>Spectrum</T>
            <Ln x1={400} y1={226} x2={620} y2={226} color={C.muted} width={2} />
            <path d="M440,226 L500,40 L560,226" fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
            <path d="M404,226 C430,206 450,200 500,198 C550,200 570,206 596,226 Z" fill={C.power} fillOpacity={0.35} stroke={C.power} strokeWidth={2.5} />
            <T x={560} y={52} anchor="middle" size={12.5} color={C.muted}>plain signal:</T>
            <T x={560} y={70} anchor="middle" size={12.5} color={C.muted}>narrow, tall</T>
            <T x={500} y={244} anchor="middle" size={12.5} bold color={C.power}>spread: wide and low</T>
            <T x={500} y={264} anchor="middle" size={12.5} color={C.muted}>frequency →</T>
          </g>
        ) : (
          <g>
            <T x={20} y={18} size={13} bold color={C.signal}>Frequency over time</T>
            {Array.from({ length: 6 }, (_, ch) => {
              const y = 36 + (5 - ch) * 32
              return (
                <g key={ch}>
                  <rect x={30} y={y} width={360} height={30} rx={3} fill={ch === JAM ? C.bad : C.fill} fillOpacity={ch === JAM ? 0.18 : 0.6} stroke={C.fill2} strokeWidth={1} />
                </g>
              )
            })}
            {HOPS.map((ch, i) => {
              const y = 36 + (5 - ch) * 32
              const hit = ch === JAM
              return <rect key={i} x={34 + i * 44.5} y={y + 4} width={38} height={22} rx={4} fill={hit ? C.bad : C.signal} />
            })}
            <Ln x1={30} y1={236} x2={390} y2={236} color={C.muted} width={1.5} arrow />
            <T x={210} y={254} anchor="middle" size={12.5} color={C.muted}>time →</T>
            <T x={410} y={36 + (5 - JAM) * 32 + 15} size={12.5} bold color={C.bad}>interference on one channel</T>
            <T x={410} y={36 + 15} size={13} color={C.muted}>Hops follow a</T>
            <T x={410} y={36 + 33} size={13} color={C.muted}>pseudorandom</T>
            <T x={410} y={36 + 51} size={13} color={C.muted}>pattern.</T>
            <T x={410} y={36 + (5 - JAM) * 32 + 37} size={13} color={C.muted}>Only the hop that</T>
            <T x={410} y={36 + (5 - JAM) * 32 + 55} size={13} color={C.muted}>lands there is hit.</T>
          </g>
        )}
      </Diagram>
      <Controls>
        <Choice label="Spread spectrum type" value={kind} onChange={setKind} options={[{ value: 'ds', label: 'Direct sequence' }, { value: 'fh', label: 'Frequency hopping' }]} />
      </Controls>
    </>
  )
}
