import { Box, C, Diagram, T } from '../kit'

const BARS = [
  { label: '1-byte hash', hops: 64, w: 360 },
  { label: '2-byte hash', hops: 32, w: 180 },
  { label: '3-byte hash', hops: 21, w: 118 },
]

/** The MeshCore packet fields, the path-length byte, and how the hash size trades against reach. */
export function MeshcoreAdvertsAndAddressing_Packet() {
  return (
    <Diagram w={640} h={320}
      title="The MeshCore packet is a header, optional transport codes, a path length byte, the path, and the payload. The path length byte holds the hop count in bits 0 to 5 and the hash size minus one in bits 6 and 7. The path field holds up to 64 bytes, so one-byte path hashes allow up to 64 hops, two-byte hashes 32 hops and three-byte hashes 21 hops. Field sizes are not to scale."
      caption="Field sizes are not to scale. Hop counts are the limits the MeshCore FAQ gives for each hash size.">
      <T x={16} y={20} size={14} bold>A packet, field by field</T>
      <Box x={16} y={36} w={60} h={58} label="header" sub="1 byte" color={C.signal} size={13} />
      <Box x={82} y={36} w={132} h={58} label="transport codes" sub="4 bytes, optional" color={C.muted} dash="5 4" size={12} />
      <Box x={220} y={36} w={92} h={58} label="path length" sub="1 byte" color={C.current} size={13} />
      <Box x={318} y={36} w={128} h={58} label="path" sub="up to 64 bytes" color={C.resist} size={13} />
      <Box x={452} y={36} w={172} h={58} label="payload" sub="up to 184 bytes" color={C.power} size={13} />

      <T x={16} y={124} size={14} bold>Inside the path length byte</T>
      <Box x={250} y={110} w={180} h={52} label="hash size" sub="bits 6-7: size minus 1" color={C.resist} size={13} />
      <Box x={436} y={110} w={188} h={52} label="hop count" sub="bits 0-5: 0 to 63" color={C.signal} size={13} />

      <T x={16} y={196} size={14} bold>The longer the hash, the shorter the reach</T>
      {BARS.map((b, i) => {
        const y = 224 + i * 30
        return (
          <g key={b.label}>
            <T x={16} y={y} size={13}>{b.label}</T>
            <rect x={130} y={y - 9} width={b.w} height={18} rx={4} fill={C.resist} fillOpacity={0.3} stroke={C.resist} strokeWidth={2} />
            <T x={130 + b.w + 10} y={y} size={13} bold>up to {b.hops} hops</T>
          </g>
        )
      })}
    </Diagram>
  )
}
