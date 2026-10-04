import { Box, C, Diagram, Ln, T } from '../kit'

/** Following one call: handheld, hotspot, home network, internet, remote repeater, other radio. */
export function HotspotsAndGateways_Path() {
  const y1 = 56, y2 = 206, h = 66
  const lbl = (x: number, y: number, s: string, c: string) => <T x={x} y={y} anchor="middle" size={12} bold color={c}>{s}</T>
  return (
    <Diagram w={640} h={304} title="One digital voice call, followed through its path: your handheld talks by radio to a hotspot, the hotspot sends it over your home internet to the network, and the network delivers it to a repeater or another hotspot that transmits it by radio to the other station"
      caption="Radio links (teal) are short and low power. The long distance is carried by the internet (grey).">
      <Box x={14} y={y1} w={150} h={h} label="Your handheld" sub="digital voice mode" color={C.signal} size={14} />
      <Box x={246} y={y1} w={150} h={h} label="Hotspot" sub="modem + small computer" color={C.power} size={14} />
      <Box x={478} y={y1} w={148} h={h} label="Home network" sub="Wi-Fi or Ethernet" color={C.ink} size={14} />
      <Ln x1={166} y1={y1 + h / 2} x2={244} y2={y1 + h / 2} color={C.signal} width={3} arrow="both" />
      <Ln x1={398} y1={y1 + h / 2} x2={476} y2={y1 + h / 2} color={C.muted} width={3} arrow="both" />
      {lbl(205, y1 - 12, 'radio, short', C.signal)}
      {lbl(437, y1 - 12, 'internet', C.muted)}

      <Ln x1={552} y1={y1 + h + 2} x2={552} y2={y2 - 2} color={C.muted} width={3} arrow="both" />
      <T x={566} y={(y1 + y2 + h) / 2} size={12} bold color={C.muted}>internet</T>

      <Box x={478} y={y2} w={148} h={h} label="Network" sub="servers, talkgroups" color={C.ink} fill={C.fill2} size={14} />
      <Box x={246} y={y2} w={150} h={h} label="Remote repeater" sub="or another hotspot" color={C.resist} size={14} />
      <Box x={14} y={y2} w={150} h={h} label="Other station" sub="a radio on that side" color={C.signal} size={14} />
      <Ln x1={476} y1={y2 + h / 2} x2={398} y2={y2 + h / 2} color={C.muted} width={3} arrow="both" />
      <Ln x1={244} y1={y2 + h / 2} x2={166} y2={y2 + h / 2} color={C.signal} width={3} arrow="both" />
      {lbl(437, y2 + h + 16, 'internet', C.muted)}
      {lbl(205, y2 + h + 16, 'radio', C.signal)}
    </Diagram>
  )
}
