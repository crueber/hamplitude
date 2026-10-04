import { C, Diagram, Ln, T } from '../kit'

const Chip = ({ x, y, w, label, color }: { x: number; y: number; w: number; label: string; color: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={34} rx={8} fill={C.fill} stroke={color} strokeWidth={3} />
    <T x={x + w / 2} y={y + 17} anchor="middle" size={12} bold color={color}>{label}</T>
  </g>
)

/** Where each treatment goes: filters on the signal path, chokes on the unwanted common-mode path. */
export function FiltersAndFerritesForRfi_Placement() {
  return (
    <Diagram w={640} h={330} title="Where RFI treatments go. At your transmitter, a low-pass filter sits between the transmitter and the antenna and removes harmonics. At the neighbour's TV, a high-pass or band-reject filter sits at the antenna input to keep your strong signal out, and ferrite chokes go on its AC cord and audio cables."
      caption="Filters sit in the signal path. Ferrite chokes sit on the cables that carry unwanted common-mode current.">
      <rect x={10} y={10} width={620} height={128} rx={12} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 5" />
      <T x={24} y={30} size={13} bold color={C.muted}>Your side: stop the unwanted signal leaving</T>
      <rect x={24} y={58} width={96} height={52} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={72} y={84} anchor="middle" bold size={13}>Transmitter</T>
      <Ln x1={120} y1={84} x2={176} y2={84} color={C.ink} width={3} arrow />
      <Chip x={178} y={67} w={120} label="Low-pass filter" color={C.power} />
      <Ln x1={298} y1={84} x2={454} y2={84} color={C.ink} width={3} arrow />
      <T x={376} y={68} anchor="middle" size={12} color={C.muted}>coax</T>
      <g stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" fill="none"><line x1={470} y1={110} x2={470} y2={60} /><polyline points="456,74 470,60 484,74" /></g>
      <T x={470} y={124} anchor="middle" size={12} color={C.muted}>antenna</T>
      <T x={502} y={64} size={12} bold color={C.good}>harmonics stay in</T>
      <T x={502} y={82} size={12} bold color={C.good}>the transmitter</T>
      <Ln x1={376} y1={86} x2={376} y2={98} color={C.ink} width={2.5} />
      <Chip x={324} y={98} w={104} label="Ferrite: coax" color={C.signal} />

      <rect x={10} y={150} width={620} height={168} rx={12} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 5" />
      <T x={24} y={170} size={13} bold color={C.muted}>Their side: keep the unwanted signal out</T>
      <g stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" fill="none"><line x1={64} y1={260} x2={64} y2={212} /><polyline points="50,226 64,212 78,226" /></g>
      <T x={64} y={278} anchor="middle" size={12} color={C.muted}>their antenna</T>
      <Ln x1={78} y1={244} x2={112} y2={244} color={C.ink} width={3} arrow />
      <Chip x={114} y={227} w={176} label="High-pass or band-reject" color={C.power} />
      <Ln x1={290} y1={244} x2={330} y2={244} color={C.ink} width={3} arrow />
      <rect x={332} y={202} width={130} height={84} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={397} y={234} anchor="middle" bold size={13}>TV or radio</T>
      <T x={397} y={254} anchor="middle" size={12} color={C.muted}>the victim</T>
      <Ln x1={462} y1={226} x2={500} y2={226} color={C.ink} width={3} />
      <Chip x={500} y={204} w={116} label="Ferrite: audio" color={C.signal} />
      <Ln x1={462} y1={264} x2={500} y2={264} color={C.ink} width={3} />
      <Chip x={500} y={246} w={116} label="Ferrite: AC cord" color={C.signal} />
      <T x={24} y={310} size={12} bold color={C.power}>filter in the signal path</T>
      <T x={260} y={310} size={12} bold color={C.signal}>choke on a cable</T>
    </Diagram>
  )
}
