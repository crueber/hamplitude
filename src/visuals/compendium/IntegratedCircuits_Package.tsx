import { C, Diagram, T } from '../kit'

interface PkgProps { cx: number; top: number; pitch: number; bodyW: number; pinLen: number; pinH: number; smd?: boolean; col: string }

/** Top view of an 8-pin dual-row package: through-hole or surface-mount, pin 1 marked, numbered counter-clockwise. */
function Pkg({ cx, top, pitch, bodyW, pinLen, pinH, smd, col }: PkgProps) {
  const bodyH = 4 * pitch + 10
  const x0 = cx - bodyW / 2, x1 = cx + bodyW / 2
  const py = (i: number) => top + 5 + pitch / 2 + i * pitch
  const nx = pinLen + 16
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x0 - pinLen} y={py(i) - pinH / 2} width={pinLen} height={pinH} rx={smd ? 1 : 3} fill={C.muted} />
          <rect x={x1} y={py(i) - pinH / 2} width={pinLen} height={pinH} rx={smd ? 1 : 3} fill={C.muted} />
          <T x={x0 - nx} y={py(i)} anchor="middle" size={13} bold color={i === 0 ? col : C.ink}>{i + 1}</T>
          <T x={x1 + nx} y={py(i)} anchor="middle" size={13} bold>{8 - i}</T>
        </g>
      ))}
      <path d={`M${x0},${top} H${cx - 11} A11,11 0 0 0 ${cx + 11},${top} H${x1} V${top + bodyH} H${x0} Z`} fill={C.fill2} stroke={C.ink} strokeWidth={2.2} strokeLinejoin="round" />
      <circle cx={x0 + 13} cy={top + 15} r={5} fill={col} />
      <path d={`M${x0 + 18},${top + 30} V${top + bodyH - 20} H${x1 - 18} V${top + 30}`} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 5" markerEnd="url(#hx-arrow)" />
    </g>
  )
}

export function IntegratedCircuits_Package() {
  return (
    <Diagram w={640} h={330}
      title="Two 8-pin chip packages seen from above: a through-hole DIP and a surface-mount SOIC. Each has a notch at the top and a dot beside pin 1. Pins are numbered counter-clockwise: down the left side from pin 1, then up the right side."
      caption="Find the notch or dot, put it at the top: pin 1 is top left, and the numbers run counter-clockwise.">
      <Pkg cx={150} top={72} pitch={42} bodyW={88} pinLen={26} pinH={12} col={C.resist} />
      <T x={150} y={30} anchor="middle" size={14} bold>Through-hole (DIP-8)</T>
      <T x={150} y={296} anchor="middle" size={12.5} color={C.muted}>leads go through the board</T>
      <Pkg cx={470} top={86} pitch={32} bodyW={64} pinLen={20} pinH={9} smd col={C.resist} />
      <T x={470} y={30} anchor="middle" size={14} bold>Surface-mount (SOIC-8)</T>
      <T x={470} y={296} anchor="middle" size={12.5} color={C.muted}>leads solder to pads on top</T>
      <T x={320} y={150} anchor="middle" size={13} bold color={C.resist}>● pin 1</T>
      <T x={320} y={172} anchor="middle" size={12} color={C.muted}>dot and notch</T>
    </Diagram>
  )
}
