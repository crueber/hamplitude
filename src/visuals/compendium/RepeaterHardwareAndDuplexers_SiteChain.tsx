import { Box, C, Diagram, Ln, T } from '../kit'

/** The two paths through a repeater site: the RF path (top) and the power path (bottom), tied together by one ground. */
export function RepeaterHardwareAndDuplexers_SiteChain() {
  return (
    <Diagram w={640} h={330}
      title="A repeater site has two paths. The RF path runs from the antenna through the feed line and its surge arrestor to the duplexer, then to the receiver and transmitter, which the controller manages. The power path runs from the AC mains through a surge protector to a supply and charger that float a backup battery feeding the radios. The arrestor and the surge protector bond to one common ground."
      caption="Two paths, one ground. Failure usually starts at the edges: antenna and feed line, or the AC supply.">
      <T x={14} y={14} size={13} bold color={C.signal}>RF path</T>
      <Box x={14} y={72} w={88} h={56} label="Antenna" sub="on the tower" color={C.signal} size={14} />
      <Box x={140} y={72} w={124} h={56} label="Feed line" sub="arrestor at entry" color={C.resist} size={14} />
      <Box x={302} y={72} w={96} h={56} label="Duplexer" sub="cavity filters" color={C.power} size={14} />
      <Box x={436} y={72} w={100} h={56} label="Rx and Tx" sub="two radios" color={C.signal} size={14} />
      <Box x={562} y={72} w={64} h={56} label="Ctrl" sub="logic" color={C.current} size={14} />
      <Ln x1={102} y1={100} x2={138} y2={100} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={264} y1={100} x2={300} y2={100} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={398} y1={100} x2={434} y2={100} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={536} y1={100} x2={560} y2={100} color={C.current} width={2.5} arrow="both" />

      {/* common ground bus between the paths */}
      <Ln x1={202} y1={128} x2={202} y2={232} color={C.muted} width={2.5} />
      <Ln x1={202} y1={180} x2={330} y2={180} color={C.muted} width={2.5} />
      <T x={338} y={180} size={13} bold color={C.muted}>one common ground</T>

      <T x={14} y={206} size={13} bold color={C.voltage}>Power path</T>
      <Box x={14} y={232} w={88} h={56} label="AC mains" sub="may fail" color={C.voltage} size={14} />
      <Box x={140} y={232} w={124} h={56} label="Surge protector" sub="at the entry" color={C.resist} size={14} />
      <Box x={302} y={232} w={96} h={56} label="Supply" sub="and charger" color={C.voltage} size={14} />
      <Box x={436} y={232} w={100} h={56} label="Battery" sub="floated, backup" color={C.good} size={14} />
      <Ln x1={102} y1={260} x2={138} y2={260} color={C.voltage} width={2.5} arrow />
      <Ln x1={264} y1={260} x2={300} y2={260} color={C.voltage} width={2.5} arrow />
      <Ln x1={398} y1={260} x2={434} y2={260} color={C.voltage} width={2.5} arrow="both" />
      <Ln x1={560} y1={260} x2={538} y2={260} color={C.voltage} width={2.5} />
      <Ln x1={560} y1={260} x2={560} y2={152} color={C.voltage} width={2.5} />
      <Ln x1={560} y1={152} x2={486} y2={152} color={C.voltage} width={2.5} />
      <Ln x1={486} y1={152} x2={486} y2={130} color={C.voltage} width={2.5} arrow />
      <T x={548} y={206} size={12.5} anchor="end" color={C.muted}>DC to the radios</T>
      <T x={548} y={222} size={12.5} anchor="end" color={C.muted}>and controller</T>
      <T x={14} y={318} size={12.5} color={C.muted}>Typical arrangement; real sites vary.</T>
    </Diagram>
  )
}
