import type { ReactElement } from 'react'
import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

const GX0 = 80, GX1 = 620, GT = 150, GB = 300
const fy = (f: number) => GB - ((f - 1100) / (2400 - 1100)) * (GB - GT)

/** Analog SSTV: tone frequency = brightness, sync tone starts each line, colour lines go one after another. */
export function E2B_SstvLine() {
  const [colour, setColour] = useState(false)
  const syncW = 22
  const scans = colour ? 3 : 1
  const lineW = syncW + scans * 74
  const gap = 10
  const lineN = colour ? 2 : 3
  const parts: ReactElement[] = []
  const shapes: number[][] = [[1500, 1800, 2300, 2000, 1700], [1500, 1500, 1900, 2300, 2300], [2000, 2300, 1900, 1500, 1500]]
  const names = ['G', 'B', 'R'] // the Martin and Scottie modes send green, blue, then red
  const cols = [C.good, C.current, C.voltage]
  for (let l = 0; l < lineN; l++) {
    const x = GX0 + 10 + l * (lineW + gap)
    parts.push(<rect key={`s${l}`} x={x} y={fy(1200) - 4} width={syncW} height={GB - fy(1200) + 4 + 0} fill={C.bad} fillOpacity={0.25} stroke={C.bad} strokeWidth={2} />)
    parts.push(<T key={`st${l}`} x={x + syncW / 2} y={GB + 18} anchor="middle" size={12} bold color={C.bad}>sync</T>)
    for (let k = 0; k < scans; k++) {
      const sx = x + syncW + k * 74
      const sh = shapes[colour ? k : 0]
      const col = colour ? cols[k] : C.signal
      const pts = sh.map((f, i) => `${sx + 4 + (i * 66) / (sh.length - 1)},${fy(f)}`).join(' ')
      parts.push(<polyline key={`p${l}${k}`} points={pts} fill="none" stroke={col} strokeWidth={3.5} strokeLinejoin="round" />)
      parts.push(<T key={`n${l}${k}`} x={sx + 37} y={GB + 18} anchor="middle" size={12} bold color={col}>{colour ? names[k] : 'scan'}</T>)
    }
  }
  return (
    <>
      <Diagram w={640} h={348} title="Analog slow-scan TV is sent as audio tones. Tone frequency carries brightness: low tone is dark, high tone is bright. A sync tone at a specific frequency starts each new line. A color picture sends its color lines one after another. Before the picture, a VIS code identifies the SSTV mode."
        caption="Frequency, not amplitude, carries brightness. Specific tones mark the line start.">
        <rect x={20} y={14} width={600} height={78} rx={10} fill={C.power} fillOpacity={0.12} stroke={C.power} strokeWidth={2} />
        <T x={34} y={34} size={14} bold color={C.power}>Start of picture: VIS code</T>
        <T x={34} y={58} size={13}>A short burst of tones sent before the lines. It tells the receiver</T>
        <T x={34} y={76} size={13}><tspan fontWeight={700}>which SSTV mode</tspan> to expect. It is not the call sign and not line sync.</T>
        <T x={GX0} y={124} size={14} bold color={C.muted}>Then the lines (tone frequency over time)</T>
        <Ln x1={GX0} y1={GT - 8} x2={GX0} y2={GB} color={C.muted} width={2} />
        <Ln x1={GX0} y1={GB} x2={GX1} y2={GB} color={C.muted} width={2} />
        {[[2300, 'white'], [1500, 'black'], [1200, 'sync']].map(([f, n]) => (
          <g key={n as string}>
            <Ln x1={GX0 - 5} y1={fy(f as number)} x2={GX0} y2={fy(f as number)} color={C.muted} width={2} />
            <Ln x1={GX0 + 1} y1={fy(f as number)} x2={GX1} y2={fy(f as number)} color={C.fill2} width={1} dash="3 5" />
            <T x={GX0 - 10} y={fy(f as number)} anchor="end" size={12.5} bold color={C.muted}>{n as string}</T>
            <T x={GX1} y={fy(f as number) - 9} anchor="end" size={12} color={C.muted}>{f as number} Hz</T>
          </g>
        ))}
        {parts}
      </Diagram>
      <Controls>
        <Choice label="Picture" value={colour ? 'c' : 'g'} onChange={(v) => setColour(v === 'c')} options={[{ value: 'g', label: 'Black and white' }, { value: 'c', label: 'Color' }]} />
      </Controls>
    </>
  )
}
