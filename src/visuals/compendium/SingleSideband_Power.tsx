import { C, Diagram, Ln, T } from '../kit'

/** Where the transmitted power goes for a 100% modulated tone: AM vs SSB. Shares: carrier 2/3, sidebands 1/6 each. */
export function SingleSideband_Power() {
  const x0 = 150, W = 420
  const seg = (x: number, w: number, y: number, col: string, label: string, dark = false) => (
    <g>
      <rect x={x} y={y} width={w} height={44} fill={col} fillOpacity={0.28} stroke={col} strokeWidth={2} rx={4} />
      <T x={x + w / 2} y={y + 22} anchor="middle" size={12.5} bold color={dark ? C.ink : col}>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={278}
      title="Where the power goes. AM at 100 percent modulation: two thirds in the carrier, which carries no information, and one sixth in each sideband. SSB: all of it in one sideband, in half the bandwidth."
      caption="Both sidebands of an AM signal carry the same information, and the carrier carries none.">
      <T x={x0} y={16} size={13.5} bold color={C.muted}>Share of transmitted power (tone, 100% modulation)</T>
      <T x={14} y={66} size={15} bold color={C.resist}>AM</T>
      <T x={14} y={86} size={12.5} color={C.muted}>both sidebands</T>
      {seg(x0, (W * 2) / 3, 44, C.resist, 'carrier 2/3')}
      {seg(x0 + (W * 2) / 3, W / 6, 44, C.power, '1/6')}
      {seg(x0 + (W * 5) / 6, W / 6, 44, C.power, '1/6')}
      <T x={x0 + (W * 2) / 3 + W / 12} y={104} anchor="middle" size={12.5} color={C.power}>LSB</T>
      <T x={x0 + (W * 5) / 6 + W / 12} y={104} anchor="middle" size={12.5} color={C.power}>USB</T>
      <T x={x0} y={104} size={12.5} color={C.muted}>no information</T>
      <T x={x0} y={126} size={13} bold color={C.ink}>Width: 2 × the audio frequency (6 kHz for 3 kHz audio)</T>
      <Ln x1={14} y1={146} x2={626} y2={146} color={C.fill2} width={1.5} />
      <T x={14} y={196} size={15} bold color={C.signal}>SSB</T>
      <T x={14} y={216} size={12.5} color={C.muted}>one sideband</T>
      {seg(x0, W, 174, C.signal, 'one sideband (USB shown): 100% of the power')}
      <T x={x0} y={236} size={13} bold color={C.ink}>Width: about the audio width (roughly 2.4 to 3 kHz)</T>
      <T x={x0} y={256} size={12.5} color={C.muted}>Carrier and the other sideband are suppressed.</T>
    </Diagram>
  )
}
