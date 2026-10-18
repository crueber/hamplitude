import { C, Diagram, T } from '../kit'

const HEADER: [string, string?][] = [
  ['To'], ['From'], ['Packet ID'], ['Flags', 'hop limit'],
  ['Channel', 'hash'], ['Next hop'], ['Relay node'],
]

/** A Meshtastic packet over the air: a 16-byte header sent in the clear, then a payload that is encrypted. */
export function MeshtasticChannelsAndEncryption_Packet() {
  const cw = 98, ch = 46, gap = 5, hx = 20, hy = 66
  return (
    <Diagram w={640} h={262}
      title="A Meshtastic packet over the air. A 16-byte header is sent in the clear: destination, sender, packet ID, flags including the hop limit, a channel hash, a next-hop byte and a relay-node byte. After it comes the payload, up to 239 bytes, which is encrypted. Any node can read the header and use it to relay. Only a node with the right key can read the payload."
      caption="Illustrative layout, from the over-the-air header the Meshtastic documentation describes.">
      <T x={hx} y={24} size={14} bold color={C.signal}>Header: 16 bytes, not encrypted</T>
      <T x={436} y={24} size={14} bold color={C.power}>Payload: up to 239 bytes</T>

      {HEADER.map(([label, sub], i) => {
        const col = i % 4, row = Math.floor(i / 4)
        const x = hx + col * (cw + gap), y = hy - 22 + row * (ch + gap)
        return (
          <g key={label}>
            <rect x={x} y={y} width={cw} height={ch} rx={8} fill={C.fill} stroke={C.signal} strokeWidth={2} />
            <T x={x + cw / 2} y={y + (sub ? 16 : ch / 2)} size={13} bold anchor="middle">{label}</T>
            {sub && <T x={x + cw / 2} y={y + 34} size={12} anchor="middle" color={C.muted}>{sub}</T>}
          </g>
        )
      })}

      <rect x={436} y={44} width={184} height={97} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={528} y={80} size={15} bold anchor="middle">Encrypted</T>
      <T x={528} y={104} size={13} anchor="middle" color={C.muted}>the message itself</T>

      <T x={hx} y={170} size={13.5} bold>Any node in range can read this,</T>
      <T x={hx} y={190} size={13.5} color={C.muted}>so it can relay a packet it cannot decrypt.</T>
      <T x={436} y={170} size={13.5} bold>Only a node with the key</T>
      <T x={436} y={190} size={13.5} color={C.muted}>can read this.</T>
      <T x={hx} y={232} size={13} color={C.muted}>The header also reveals who sent the packet and who it is for, as node numbers.</T>
    </Diagram>
  )
}
