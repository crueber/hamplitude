import { useState } from 'react'
import { Antenna, C, Choice, Diagram, Ln, T } from '../kit'

type Mode = 'direct' | 'mixer'

/** SDR receive chain. Direct sampling digitises the RF itself; the other style mixes down first. */
export function SdrChain() {
  const [mode, setMode] = useState<Mode>('direct')
  const direct = mode === 'direct'
  const BY = 70, BH = 54
  const blocks: { x: number; w: number; label: string; col: string }[] = direct
    ? [
        { x: 84, w: 96, label: 'RF filter', col: C.ink },
        { x: 222, w: 96, label: 'ADC', col: C.resist },
        { x: 360, w: 96, label: 'DSP', col: C.signal },
        { x: 498, w: 96, label: 'DAC', col: C.power },
      ]
    : [
        { x: 74, w: 74, label: 'RF filter', col: C.ink },
        { x: 224, w: 74, label: 'ADC', col: C.resist },
        { x: 336, w: 74, label: 'DSP', col: C.signal },
        { x: 448, w: 74, label: 'DAC', col: C.power },
      ]
  const mixX = 188
  const adc = blocks[1]
  return (
    <>
      <Diagram w={640} h={332}
        title={direct ? 'Direct-sampling SDR: antenna, RF filter, analog-to-digital converter, digital signal processing, digital-to-analog converter. The incoming RF is digitised without being mixed with a local oscillator.' : 'SDR with a mixer: the incoming RF is mixed with a local oscillator before the analog-to-digital converter, then processed digitally.'}
        caption="After the ADC the signal is just numbers for software to process. Direct sampling skips the mixer and oscillator.">
        <rect x={10} y={32} width={adc.x - 10 - 8} height={160} rx={10} fill={C.resist} fillOpacity={0.08} stroke="none" />
        <rect x={adc.x + adc.w + 8} y={32} width={640 - (adc.x + adc.w + 8) - 10} height={160} rx={10} fill={C.signal} fillOpacity={0.1} stroke="none" />
        <T x={20} y={48} size={12} bold color={C.resist}>analog</T>
        <T x={adc.x + adc.w + 20} y={48} size={12} bold color={C.signal}>digital</T>
        <Antenna x={28} y={BY + BH / 2} />
        <Ln x1={28} y1={BY + BH / 2} x2={blocks[0].x} y2={BY + BH / 2} width={2.5} color={C.ink} />
        {blocks.map((b, i) => (
          <g key={b.label}>
            <rect x={b.x} y={BY} width={b.w} height={BH} rx={10} fill={C.fill} stroke={b.col} strokeWidth={2.5} />
            <T x={b.x + b.w / 2} y={BY + BH / 2} anchor="middle" size={15} bold color={b.col}>{b.label}</T>
            {i < blocks.length - 1 && (!(!direct && i === 0)) && <Ln x1={b.x + b.w} y1={BY + BH / 2} x2={blocks[i + 1].x - 2} y2={BY + BH / 2} color={C.signal} width={2.5} arrow />}
          </g>
        ))}
        {!direct && (
          <g>
            <Ln x1={blocks[0].x + blocks[0].w} y1={BY + BH / 2} x2={mixX - 24} y2={BY + BH / 2} color={C.signal} width={2.5} arrow />
            <circle cx={mixX} cy={BY + BH / 2} r={24} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
            <path d={`M${mixX - 11},${BY + BH / 2 - 11} L${mixX + 11},${BY + BH / 2 + 11} M${mixX + 11},${BY + BH / 2 - 11} L${mixX - 11},${BY + BH / 2 + 11}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
            <Ln x1={mixX + 24} y1={BY + BH / 2} x2={adc.x - 2} y2={BY + BH / 2} color={C.signal} width={2.5} arrow />
            <rect x={mixX - 40} y={BY + BH + 24} width={80} height={34} rx={8} fill={C.fill} stroke={C.resist} strokeWidth={2} />
            <T x={mixX} y={BY + BH + 41} anchor="middle" size={13} bold color={C.resist}>LO</T>
            <Ln x1={mixX} y1={BY + BH + 24} x2={mixX} y2={BY + BH / 2 + 26} color={C.resist} width={2.5} arrow />
          </g>
        )}
        <T x={blocks[3].x + blocks[3].w / 2} y={BY + BH + 22} anchor="middle" size={12} color={C.muted}>audio out</T>
        {/* what limits what */}
        <rect x={14} y={208} width={612} height={108} rx={12} fill={C.fill} />
        <T x={28} y={230} size={14} bold color={C.resist}>ADC sample rate</T>
        <T x={28} y={251} size={14}>sets the maximum receive bandwidth</T>
        <T x={28} y={279} size={14} bold color={C.resist}>ADC bits + reference voltage</T>
        <T x={28} y={300} size={14}>set the weakest signal it can detect</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="SDR style" value={mode} onChange={setMode} options={[{ value: 'direct', label: 'Direct sampling' }, { value: 'mixer', label: 'With a mixer' }]} />
      </div>
    </>
  )
}
