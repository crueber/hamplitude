import { C, Diagram, Ln, T } from '../kit'

/** Dynamic range: the window of signal levels between the noise floor and the point where strong signals cause trouble. */
export function Window() {
  const lo = -130, hi = 20, y0 = 232, y1 = 20
  const Y = (d: number) => y0 - ((d - lo) / (hi - lo)) * (y0 - y1)
  const lines: [number, string, string, string][] = [
    [0, '1 dB gain compression', '0 dBm', C.bad],
    [-33, 'two strong signals: IM3 products reach the noise floor', '−33 dBm', C.resist],
    [-120, 'noise floor', '−120 dBm', C.muted],
  ]
  return (
    <Diagram w={640} h={262} title="Receiver dynamic range for an example receiver. The blocking dynamic range is the span in dB from the noise floor to the level that causes 1 dB of gain compression. Two-tone intermodulation products reach the noise floor at a lower level."
      caption="Example numbers. Signals inside the window are received cleanly; below it they vanish in noise, above it the receiver distorts.">
      <rect x={110} y={Y(0)} width={260} height={Y(-120) - Y(0)} fill={C.good} fillOpacity={0.14} />
      <T x={240} y={(Y(0) + Y(-33)) / 2} anchor="middle" bold size={14} color={C.good}>usable window</T>
      <rect x={110} y={Y(-120)} width={260} height={y0 - Y(-120)} fill={C.muted} fillOpacity={0.15} />
      <T x={240} y={(Y(-120) + y0) / 2} anchor="middle" size={13} color={C.muted}>lost in noise</T>
      {lines.map(([d, , v, col]) => (
        <g key={d}>
          <Ln x1={110} y1={Y(d)} x2={370} y2={Y(d)} color={col} width={3} />
          <T x={104} y={Y(d)} anchor="end" size={12} mono bold color={col}>{v}</T>
        </g>
      ))}
      <T x={116} y={Y(0) - 12} size={12} bold color={C.bad}>1 dB gain compression</T>
      <T x={116} y={Y(-33) + 14} size={12} bold color={C.resist}>IM3 products reach the floor</T>
      <T x={116} y={Y(-120) - 12} size={12} bold color={C.muted}>noise floor</T>
      <Ln x1={390} y1={Y(0)} x2={390} y2={Y(-120)} color={C.bad} width={2.5} arrow="both" />
      <T x={404} y={(Y(0) + Y(-120)) / 2 - 22} size={13} bold color={C.bad}>Blocking dynamic range</T>
      <T x={404} y={(Y(0) + Y(-120)) / 2} size={12} color={C.muted}>floor to 1 dB compression</T>
      <T x={404} y={(Y(0) + Y(-120)) / 2 + 22} size={13} mono bold color={C.bad}>0 − (−120) = 120 dB</T>
      <Ln x1={620} y1={Y(-33)} x2={620} y2={Y(-120)} color={C.resist} width={2.5} arrow="both" />
      <T x={608} y={Y(-105)} anchor="end" size={13} bold color={C.resist}>IMD range ≈ 87 dB</T>
    </Diagram>
  )
}
