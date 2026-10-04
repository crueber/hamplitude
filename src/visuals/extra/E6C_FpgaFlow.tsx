import { C, Diagram, Ln, T } from '../kit'

/** HDL text describes the logic; tools turn it into a configuration that wires up an FPGA's blocks. */
export function FpgaFlow() {
  const cells = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ({ r, c })))
  return (
    <Diagram w={640} h={230} title="Designing an FPGA: you write a hardware description language file, software turns it into a configuration, and that wires up the chip's logic blocks."
      caption="An FPGA is configured with a hardware description language (HDL) such as VHDL or Verilog.">
      <rect x={14} y={40} width={180} height={130} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={104} y={26} anchor="middle" bold size={14}>1. Write HDL</T>
      <T x={28} y={72} size={13} mono>y = a AND b;</T>
      <T x={28} y={96} size={13} mono>q = y OR c;</T>
      <T x={28} y={120} size={13} mono>if clk ...</T>
      <T x={104} y={150} anchor="middle" size={12} color={C.muted}>describes hardware</T>
      <Ln x1={200} y1={105} x2={236} y2={105} color={C.ink} arrow />
      <rect x={242} y={55} width={150} height={100} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={317} y={26} anchor="middle" bold size={14}>2. Tools compile</T>
      <T x={317} y={96} anchor="middle" size={13} bold>synthesis +</T>
      <T x={317} y={116} anchor="middle" size={13} bold>place and route</T>
      <Ln x1={398} y1={105} x2={434} y2={105} color={C.ink} arrow />
      <T x={535} y={26} anchor="middle" bold size={14}>3. Load into FPGA</T>
      {cells.map(({ r, c }) => (
        <g key={`${r}${c}`}>
          <rect x={460 + c * 52} y={44 + r * 44} width={34} height={28} rx={5} fill={C.signal} opacity={0.25} stroke={C.signal} strokeWidth={2} />
          {c < 2 && <Ln x1={494 + c * 52} y1={58 + r * 44} x2={512 + c * 52} y2={58 + r * 44} color={C.muted} width={2} />}
          {r < 2 && <Ln x1={477 + c * 52} y1={72 + r * 44} x2={477 + c * 52} y2={88 + r * 44} color={C.muted} width={2} />}
        </g>
      ))}
      <T x={535} y={190} anchor="middle" size={12} color={C.muted}>blocks joined by wiring</T>
    </Diagram>
  )
}
