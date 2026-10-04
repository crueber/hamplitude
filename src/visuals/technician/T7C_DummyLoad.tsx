import { Antenna, C, Diagram, Ln, Resistor, T } from '../kit'

/** A dummy load swallows transmitter power as heat so nothing goes on the air. */
export function DummyLoad() {
  return (
    <Diagram w={640} h={262} title="A transmitter can feed an antenna, which radiates its signal on the air, or a dummy load, a 50 ohm non-inductive resistor on a heat sink, which turns the power into heat so nothing is transmitted."
      caption="Testing into a dummy load keeps your test signals off the air.">
      <rect x={14} y={40} width={110} height={170} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={69} y={125} anchor="middle" bold size={14}>Transmitter</T>

      <T x={190} y={34} bold size={14} color={C.signal}>To the antenna: signal goes on the air</T>
      <Ln x1={124} y1={78} x2={440} y2={78} color={C.ink} width={2.5} />
      <Antenna x={470} y={104} />
      <path d="M492,68 q14,10 0,20 M504,60 q22,18 0,36 M516,52 q30,26 0,52" fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />

      <T x={190} y={126} bold size={14} color={C.power}>To a dummy load: signal stays inside</T>
      <Ln x1={124} y1={176} x2={236} y2={176} color={C.ink} width={2.5} />
      <Resistor x={320} y={176} len={168} label="50 Ω" />
      <Ln x1={404} y1={176} x2={430} y2={176} color={C.ink} width={2.5} />
      <rect x={270} y={196} width={100} height={12} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      {[0, 1, 2, 3, 4, 5].map((i) => <Ln key={i} x1={278 + i * 17} y1={208} x2={278 + i * 17} y2={226} color={C.muted} width={3} />)}
      <T x={320} y={244} anchor="middle" size={12} color={C.muted}>heat sink</T>
      <path d="M452,196 q-8,-9 0,-18 t0,-18 M476,196 q-8,-9 0,-18 t0,-18 M500,196 q-8,-9 0,-18 t0,-18" fill="none" stroke={C.power} strokeWidth={2.5} strokeLinecap="round" />
      <T x={476} y={216} anchor="middle" bold size={13} color={C.power}>power becomes heat</T>
    </Diagram>
  )
}
