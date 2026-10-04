import { useState } from 'react'
import { C, Choice, Diagram, T, TAU, Wire, Dot, Source, Inductor, Diode, Resistor } from '../kit'

type Kind = 'half' | 'center' | 'bridge'
const INFO: Record<Kind, { name: string; diodes: number; part: string; pulses: string }> = {
  half: { name: 'Half-wave', diodes: 1, part: '180° of each cycle', pulses: 'one pulse per AC cycle' },
  center: { name: 'Full-wave (center-tap)', diodes: 2, part: '360°: both halves', pulses: 'two pulses per AC cycle' },
  bridge: { name: 'Full-wave bridge', diodes: 4, part: '360°: both halves', pulses: 'two pulses per AC cycle' },
}

const WX0 = 400, WX1 = 625, WY = 135, WA = 62

function Waves({ kind }: { kind: Kind }) {
  const n = 120
  const out = Array.from({ length: n + 1 }, (_, k) => {
    const s = Math.sin(TAU * 3 * (k / n))
    const v = kind === 'half' ? Math.max(0, s) : Math.abs(s)
    return `${(WX0 + (k / n) * (WX1 - WX0)).toFixed(1)},${(WY - WA * v).toFixed(1)}`
  }).join(' ')
  const inp = Array.from({ length: n + 1 }, (_, k) => `${(WX0 + (k / n) * (WX1 - WX0)).toFixed(1)},${(WY - WA * Math.sin(TAU * 3 * (k / n))).toFixed(1)}`).join(' ')
  return (
    <g>
      <T x={512} y={20} anchor="middle" bold size={14}>Output before filtering</T>
      <line x1={WX0} y1={WY} x2={WX1} y2={WY} stroke={C.fill2} strokeWidth={2} />
      <polyline points={inp} fill="none" stroke={C.muted} strokeWidth={1.8} strokeDasharray="4 4" />
      <polyline points={out} fill="none" stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
      <T x={WX0} y={WY + WA + 22} size={12} color={C.muted}>dashed = AC input, solid = DC pulses</T>
    </g>
  )
}

function Circuit({ kind }: { kind: Kind }) {
  const w = { color: C.muted, width: 2.5 }
  if (kind === 'half')
    return (
      <g>
        <Wire pts={[[50, 75], [90, 75]]} {...w} /><Wire pts={[[160, 75], [250, 75], [250, 85]]} {...w} />
        <Wire pts={[[250, 165], [250, 175], [50, 175], [50, 145]]} {...w} />
        <Source x={50} y={110} rot={90} len={70} ac />
        <Diode x={125} y={75} len={70} color={C.power} />
        <Resistor x={250} y={125} rot={90} len={80} color={C.resist} />
        <T x={125} y={50} anchor="middle" size={13} bold color={C.power}>1 diode</T>
        <T x={282} y={125} size={13} bold color={C.resist}>load</T>
      </g>
    )
  if (kind === 'center')
    return (
      <g>
        <Inductor x={50} y={110} rot={90} len={110} />
        <Wire pts={[[50, 55], [90, 55]]} {...w} /><Wire pts={[[160, 55], [210, 55], [210, 165], [160, 165]]} {...w} />
        <Wire pts={[[50, 165], [90, 165]]} {...w} />
        <Diode x={125} y={55} len={70} color={C.power} /><Diode x={125} y={165} len={70} color={C.power} />
        <Wire pts={[[210, 110], [260, 110], [260, 120]]} {...w} />
        <Resistor x={260} y={155} rot={90} len={70} color={C.resist} />
        <Wire pts={[[260, 190], [260, 205], [22, 205], [22, 110], [50, 110]]} {...w} />
        <Dot x={210} y={110} /><Dot x={50} y={110} />
        <T x={125} y={30} anchor="middle" size={13} bold color={C.power}>2 diodes</T>
        <T x={68} y={110} size={12} bold>← center tap</T>
        <T x={290} y={155} size={13} bold color={C.resist}>load</T>
      </g>
    )
  // bridge: AC in at left/right corners, output top/bottom
  return (
    <g>
      <Wire pts={[[24, 110], [100, 110]]} {...w} /><Wire pts={[[220, 110], [290, 110]]} {...w} />
      <Diode x={130} y={85} rot={-39.8} len={78} color={C.power} />
      <Diode x={190} y={85} rot={-140.2} len={78} color={C.power} />
      <Diode x={130} y={135} rot={-140.2} len={78} color={C.power} />
      <Diode x={190} y={135} rot={-39.8} len={78} color={C.power} />
      <Wire pts={[[160, 60], [160, 28], [320, 28], [320, 75]]} {...w} />
      <Wire pts={[[160, 160], [160, 195], [320, 195], [320, 145]]} {...w} />
      <Resistor x={320} y={110} rot={90} len={70} color={C.resist} />
      <circle cx={24} cy={110} r={4.5} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <circle cx={290} cy={110} r={4.5} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={24} y={130} anchor="middle" size={12} bold>AC</T>
      <T x={290} y={130} anchor="middle" size={12} bold>AC</T>
      <T x={160} y={110} anchor="middle" size={13} bold color={C.power}>4 diodes</T>
      <T x={336} y={110} size={13} bold color={C.resist}>load</T>
    </g>
  )
}

/** Half-wave, center-tap full-wave and bridge rectifiers: circuit and unfiltered output. */
export function RectifierTypes() {
  const [k, setK] = useState<Kind>('half')
  const i = INFO[k]
  return (
    <>
      <Diagram w={640} h={320} title={`${i.name} rectifier with ${i.diodes} diode${i.diodes > 1 ? 's' : ''}. It uses ${i.part} and gives ${i.pulses}.`}
        caption={`${i.name}: ${i.diodes} diode${i.diodes > 1 ? 's' : ''}, ${i.part}, ${i.pulses}.`}>
        <Circuit kind={k} />
        <line x1={382} y1={14} x2={382} y2={226} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
        <Waves kind={k} />
        <rect x={10} y={244} width={620} height={62} rx={12} fill={C.fill} />
        <T x={26} y={264} size={13} color={C.muted}>Diodes</T><T x={26} y={286} bold size={15}>{i.diodes}</T>
        <T x={150} y={264} size={13} color={C.muted}>AC cycle converted to DC</T><T x={150} y={286} bold size={15} color={C.signal}>{i.part}</T>
        <T x={430} y={264} size={13} color={C.muted}>Output pulses</T><T x={430} y={286} bold size={15} color={C.signal}>{i.pulses}</T>
      </Diagram>
      <Choice label="Rectifier type" value={k} onChange={setK} options={[
        { value: 'half', label: 'Half-wave' }, { value: 'center', label: 'Full-wave (center-tap)' }, { value: 'bridge', label: 'Bridge' },
      ]} />
    </>
  )
}
