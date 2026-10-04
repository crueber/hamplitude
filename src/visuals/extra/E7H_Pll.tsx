import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T } from '../kit'

type Use = 'synth' | 'demod'

/** Phase-locked loop: phase detector, low-pass filter, VCO, and a stable reference. Use as synthesizer or FM demodulator. */
export function Pll() {
  const [use, setUse] = useState<Use>('synth')
  const [n, setN] = useState(144)
  const synth = use === 'synth'
  const BY = 70, BH = 54, MY = BY + BH / 2
  const box = (x: number, w: number, lines: string[], col: string, sub?: string) => (
    <g>
      <rect x={x} y={BY} width={w} height={BH} rx={10} fill={C.fill} stroke={col} strokeWidth={2.5} />
      {lines.map((l, i) => (
        <T key={l} x={x + w / 2} y={sub ? BY + 20 : MY + (i - (lines.length - 1) / 2) * 18} anchor="middle" size={13.5} bold color={col}>{l}</T>
      ))}
      {sub && <T x={x + w / 2} y={BY + 39} anchor="middle" size={12} color={C.muted}>{sub}</T>}
    </g>
  )
  return (
    <>
      <Diagram w={640} h={330}
        title={synth ? `Phase-locked loop as a frequency synthesizer: a stable reference oscillator and a divide-by-${n} counter in the feedback path make the VCO run at ${n} times the reference, ${n} megahertz for a 1 megahertz reference.` : 'Phase-locked loop as an FM demodulator: the loop keeps the VCO locked to the incoming FM signal, so the control voltage that steers the VCO is the recovered audio.'}
        caption={synth ? 'The loop forces the divided VCO to match the reference. So the VCO runs at N times the reference.' : 'To follow the FM, the VCO control voltage must move with the audio. That voltage is the output.'}>
        {box(10, 96, synth ? ['Reference'] : ['FM in'], synth ? C.resist : C.signal, synth ? 'stable, 1 MHz' : undefined)}
        <Ln x1={106} y1={MY} x2={136} y2={MY} color={C.signal} width={2.5} arrow />
        {box(138, 92, ['Phase', 'detector'], C.current)}
        <Ln x1={230} y1={MY} x2={260} y2={MY} color={C.signal} width={2.5} arrow />
        {box(262, 92, ['Low-pass', 'filter'], C.power)}
        <Ln x1={354} y1={MY} x2={384} y2={MY} color={C.signal} width={2.5} arrow />
        {box(386, 84, ['VCO'], C.signal)}
        <Ln x1={470} y1={MY} x2={512} y2={MY} color={C.signal} width={2.5} arrow />
        {synth && <T x={520} y={MY} size={15} bold color={C.signal}>{n} MHz</T>}
        {!synth && <T x={520} y={MY} size={14} bold color={C.signal}>locked</T>}
        {/* feedback */}
        <Ln x1={490} y1={MY} x2={490} y2={190} color={C.signal} width={2.5} />
        <Ln x1={490} y1={190} x2={synth ? 396 : 184} y2={190} color={C.signal} width={2.5} />
        {synth && (
          <>
            <rect x={286} y={170} width={110} height={40} rx={8} fill={C.fill} stroke={C.resist} strokeWidth={2.5} />
            <T x={341} y={190} anchor="middle" size={14} bold color={C.resist}>÷ {n}</T>
            <Ln x1={286} y1={190} x2={184} y2={190} color={C.signal} width={2.5} />
          </>
        )}
        <Ln x1={184} y1={190} x2={184} y2={128} color={C.signal} width={2.5} arrow />
        <circle cx={490} cy={MY} r={4} fill={C.signal} />
        {/* labels */}
        <T x={500} y={152} anchor="end" size={12} color={C.muted}>VCO = voltage-controlled oscillator</T>
        {!synth && (
          <>
            <Ln x1={308} y1={BY} x2={308} y2={36} color={C.power} width={2.5} arrow />
            <T x={308} y={22} anchor="middle" size={14} bold color={C.power}>audio out</T>
          </>
        )}
        <rect x={14} y={226} width={612} height={86} rx={12} fill={C.fill} />
        {synth ? (
          <>
            <T x={28} y={250} size={14} bold>Locked: the detector sees equal frequencies</T>
            <T x={28} y={274} size={14} mono>{n} MHz ÷ {n} = 1 MHz = reference</T>
            <T x={28} y={297} size={14} mono color={C.signal}>VCO = N × reference = {n} × 1 MHz = {n} MHz</T>
          </>
        ) : (
          <>
            <T x={28} y={250} size={14} bold>FM in: the frequency swings with the voice</T>
            <T x={28} y={274} size={14}>The loop must steer the VCO to follow every swing.</T>
            <T x={28} y={297} size={14} color={C.power} bold>The steering voltage is the audio.</T>
          </>
        )}
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Use the loop as</span>
          <Choice label="PLL use" value={use} onChange={setUse} options={[{ value: 'synth', label: 'Frequency synthesizer' }, { value: 'demod', label: 'FM demodulator' }]} />
        </div>
        {synth && <Slider label="Divide-by value N" value={n} min={100} max={150} onChange={setN} format={(v) => `÷ ${v}`} color="var(--d-resist)" />}
      </Controls>
    </>
  )
}
