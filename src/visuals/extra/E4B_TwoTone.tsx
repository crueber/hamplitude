import { C, Diagram, Ln, T } from '../kit'

/** Two-tone test: two non-harmonically related audio tones into an SSB transmitter, spectrum analyzer on the RF output. */
export function TwoTone() {
  const base = 252
  const sp = (x: number, h: number, col: string, dash?: string) => <path d={`M${x - 6},${base} L${x},${base - h} L${x + 6},${base}`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} strokeLinejoin="round" strokeDasharray={dash} />
  return (
    <Diagram w={640} h={300} title="Two-tone test: two audio tones that are not harmonically related are fed into an SSB transmitter, and a spectrum analyzer on the RF output shows the two tones and any intermodulation products beside them."
      caption="Two AF tones in, spectrum analyzer on the RF out. Extra spikes beside the two tones are the intermodulation distortion.">
      <rect x={14} y={14} width={150} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={89} y={36} anchor="middle" bold size={14}>Two AF tones</T>
      <T x={89} y={58} anchor="middle" size={12} color={C.muted}>not harmonically related</T>
      <rect x={244} y={14} width={150} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={319} y={36} anchor="middle" bold size={14}>SSB transmitter</T>
      <T x={319} y={58} anchor="middle" size={12} color={C.muted}>into a dummy load</T>
      <rect x={474} y={14} width={152} height={60} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={550} y={36} anchor="middle" bold size={14} color={C.power}>Spectrum analyzer</T>
      <T x={550} y={58} anchor="middle" size={12} color={C.muted}>watches the RF output</T>
      <Ln x1={166} y1={44} x2={242} y2={44} color={C.signal} width={3} arrow />
      <Ln x1={396} y1={44} x2={472} y2={44} color={C.signal} width={3} arrow />
      <rect x={60} y={94} width={520} height={176} rx={8} fill={C.fill} />
      <Ln x1={70} y1={base} x2={570} y2={base} color={C.ink} width={2} />
      {sp(280, 110, C.signal)}{sp(360, 110, C.signal)}
      {sp(200, 66, C.resist)}{sp(440, 66, C.resist)}{sp(120, 40, C.resist)}{sp(520, 40, C.resist)}
      <T x={280} y={122} anchor="middle" size={13} bold color={C.signal}>tone 1</T>
      <T x={360} y={122} anchor="middle" size={13} bold color={C.signal}>tone 2</T>
      {[[200, 66], [440, 66], [120, 40], [520, 40]].map(([x, h]) => <T key={x} x={x} y={base - h - 10} anchor="middle" size={12} bold color={C.resist}>IMD</T>)}
      <T x={320} y={280} anchor="middle" size={12} color={C.muted}>RF frequency →</T>
    </Diagram>
  )
}
