import { C, Diagram, Ln, T, Antenna } from '../kit'
import { Spec, type SpecItem } from './ReceiverBasics_Chain'

const PITCH = 50, Y0 = 12, BH = 36
const BX = 184, BWID = 196
const GX = 10, GW = 150
const row = (i: number) => Y0 + i * PITCH

/** SSB transmitter, microphone to antenna, with a sketch of the signal after each stage (illustrative, not to scale). */
export function TransmitterBasics_Chain() {
  const audio: SpecItem[] = [{ at: 0.3, h: 0.5, w: 54 }]
  const dsb: SpecItem[] = [
    { at: 0.5, h: 0.5, color: C.resist, dim: true },
    { at: 0.28, h: 0.5, w: 40 }, { at: 0.72, h: 0.5, w: 40 },
  ]
  const ssb: SpecItem[] = [{ at: 0.72, h: 0.5, w: 40 }, { at: 0.28, h: 0.5, w: 40, dim: true }]
  const mix: SpecItem[] = [{ at: 0.2, h: 0.5, w: 30, color: C.muted }, { at: 0.8, h: 0.5, w: 30 }]
  const one = (h: number, extra: SpecItem[] = []): SpecItem[] => [{ at: 0.5, h, w: 30 }, ...extra]
  const rows: { name: string; spec: SpecItem[]; note: string[]; color?: string }[] = [
    { name: 'Microphone + audio amp', spec: audio, note: ['Voice becomes a small audio', 'voltage, about 300 Hz to 2.7 kHz'] },
    { name: 'Balanced modulator', spec: dsb, note: [] },
    { name: 'SSB filter', spec: ssb, note: ['Keeps one sideband, drops the', 'other (upper sideband here)'] },
    { name: 'Mixer', spec: mix, note: [] },
    { name: 'Band-pass filter', spec: one(0.5), note: ['Keeps 14.2 MHz, removes the', '3.8 MHz difference product'] },
    { name: 'Driver amplifier', spec: one(0.7), note: ['Builds the signal up to', 'a few watts (typical)'] },
    { name: 'Power amplifier', spec: one(0.95, [{ at: 0.22, h: 0.22, color: C.bad, dim: true }, { at: 0.78, h: 0.14, color: C.bad, dim: true }]), note: ['Final power: 100 W in a typical', 'HF rig. Also makes harmonics'] },
    { name: 'Low-pass filter', spec: one(0.95), note: ['Removes the harmonics before', 'the signal reaches the antenna'] },
  ]
  return (
    <Diagram w={640} h={row(9) + 8}
      title="SSB transmitter chain from microphone to antenna. Audio is mixed with a 9 MHz carrier in a balanced modulator, which removes the carrier and leaves two sidebands. A filter keeps one sideband. A mixer with a 5.2 MHz VFO moves it to 14.2 MHz. A band-pass filter, driver, power amplifier and low-pass filter follow before the antenna."
      caption="One way to build an SSB transmitter, with typical values. Sketches show the spectrum after each block (dashed or grey: removed or unwanted), not to scale.">
      {rows.map((r, i) => {
        const y = row(i)
        return (
          <g key={r.name}>
            <Spec x={GX} y={y} w={GW} h={BH} items={r.spec} />
            <Ln x1={GX + GW + 2} y1={y + BH / 2} x2={BX - 2} y2={y + BH / 2} color={C.muted} width={1.5} dash="3 3" />
            <rect x={BX} y={y} width={BWID} height={BH} rx={9} fill={C.fill} stroke={C.signal} strokeWidth={2} />
            <T x={BX + BWID / 2} y={y + BH / 2} anchor="middle" bold size={13.5}>{r.name}</T>
            {i < 7 && <Ln x1={BX + BWID / 2} y1={y + BH + 1} x2={BX + BWID / 2} y2={y + PITCH - 1} color={C.signal} width={2.5} arrow />}
            {r.note.map((l, k) => <T key={k} x={BX + BWID + 22} y={y + BH / 2 + (k - (r.note.length - 1) / 2) * 17} size={12} color={C.muted}>{l}</T>)}
          </g>
        )
      })}
      {/* side inputs */}
      <rect x={BX + BWID + 22} y={row(1)} width={176} height={BH} rx={9} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={BX + BWID + 22 + 88} y={row(1) + 11} anchor="middle" bold size={12.5}>Carrier oscillator</T>
      <T x={BX + BWID + 22 + 88} y={row(1) + 27} anchor="middle" mono bold size={12.5} color={C.resist}>9.000 MHz</T>
      <Ln x1={BX + BWID + 20} y1={row(1) + BH / 2} x2={BX + BWID + 2} y2={row(1) + BH / 2} color={C.resist} width={2.5} arrow />
      <rect x={BX + BWID + 22} y={row(3)} width={176} height={BH} rx={9} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={BX + BWID + 22 + 88} y={row(3) + 11} anchor="middle" bold size={12.5}>VFO (tuning)</T>
      <T x={BX + BWID + 22 + 88} y={row(3) + 27} anchor="middle" mono bold size={12.5} color={C.resist}>5.200 MHz</T>
      <Ln x1={BX + BWID + 20} y1={row(3) + BH / 2} x2={BX + BWID + 2} y2={row(3) + BH / 2} color={C.resist} width={2.5} arrow />
      {/* antenna */}
      <Ln x1={BX + BWID / 2} y1={row(7) + BH + 1} x2={BX + BWID / 2} y2={row(8) + 5} color={C.signal} width={2.5} arrow />
      <Antenna x={BX + BWID / 2} y={row(8) + 46} />
      <T x={BX + BWID / 2 + 24} y={row(8) + 26} bold size={13.5}>Antenna</T>
      <T x={BX + BWID + 22} y={row(8) + 26} size={12} color={C.muted}>9.0 + 5.2 = 14.2 MHz</T>
    </Diagram>
  )
}
