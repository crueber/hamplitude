import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const BITS = '101100111010010110101101110010011100'

/** Bit rate = symbol rate x bits per symbol. Same symbols per second, more bits per symbol, more data. */
export function SymbolRate() {
  const [bps, setBps] = useState(2)
  const [baud, setBaud] = useState(1000)
  const x0 = 40, cw = 93, n = 6, y = 70, h = 70
  const name = bps === 1 ? 'BPSK' : bps === 2 ? 'QPSK' : bps === 4 ? '16-QAM' : '64-QAM'
  const rate = baud * bps
  return (
    <>
      <Diagram w={640} h={236} title={`Six symbols in a row. Each symbol carries ${bps} bits (${name}). At ${baud} symbols per second the bit rate is ${rate} bits per second.`}
        caption="The waveform changes once per symbol. How many bits ride on each change is up to the code.">
        <T x={x0} y={30} size={13} bold color={C.muted}>Time, one box per symbol ({name})</T>
        {Array.from({ length: n }, (_, i) => {
          const bits = BITS.slice(i * bps, i * bps + bps)
          return (
            <g key={i}>
              <rect x={x0 + i * cw + 2} y={y} width={cw - 4} height={h} rx={8} fill={C.signal} fillOpacity={0.18} stroke={C.signal} strokeWidth={2} />
              <T x={x0 + i * cw + cw / 2} y={y + 24} anchor="middle" size={12.5} color={C.muted}>symbol {i + 1}</T>
              <T x={x0 + i * cw + cw / 2} y={y + 48} anchor="middle" size={bps > 3 ? 14 : 17} bold mono>{bits}</T>
            </g>
          )
        })}
        <Ln x1={x0} y1={162} x2={x0 + n * cw} y2={162} color={C.muted} width={1.5} arrow />
        <T x={x0} y={188} size={15} bold>
          <tspan fill={C.signal}>{baud} symbols/s</tspan>
          <tspan fill={C.muted}> × </tspan>
          <tspan fill={C.resist}>{bps} bits/symbol</tspan>
          <tspan fill={C.ink}> = {rate} bit/s</tspan>
        </T>
        <T x={x0} y={212} size={12.5} color={C.muted}>symbols per second = baud: they are the same number</T>
      </Diagram>
      <Controls>
        <Choice label="Digital code" value={bps} onChange={setBps} options={[{ value: 1, label: 'BPSK' }, { value: 2, label: 'QPSK' }, { value: 4, label: '16-QAM' }, { value: 6, label: '64-QAM' }]} />
        <Slider label="Symbol rate (baud)" value={baud} min={250} max={2000} step={250} onChange={setBaud} format={(v) => `${v} baud`} color="var(--d-signal)" />
        <Readout label="Bit rate" value={rate} unit=" bit/s" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
