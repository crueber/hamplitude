import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Scn = 'voice' | 'cw'

/** Two ways to remove a nearby interferer: notch it out of the passband, or flip sidebands so it falls outside. */
export function Passband() {
  const [scn, setScn] = useState<Scn>('voice')
  const [fix, setFix] = useState(false)
  const X = (k: number) => 320 + k * 66 // kHz -> x
  const base = 190, top = 78
  const voice = scn === 'voice'
  // passband edges (kHz)
  const pb: [number, number] = voice ? [0, 2.4] : fix ? [-2.1, 0.3] : [-0.3, 2.1]
  const spikeK = voice ? 1.4 : 1.5
  const inBand = spikeK > pb[0] && spikeK < pb[1]
  const heard = voice ? !fix : inBand
  const notch = voice && fix
  const sigCol = C.good, badCol = C.bad
  return (
    <>
      <Diagram w={640} h={300} title={voice
        ? (fix ? 'Voice signal in the receiver passband with a notch cut at the interfering carrier: the whistle is removed.' : 'Voice signal in the receiver passband with an unwanted carrier inside it: a whistle is heard.')
        : (fix ? 'CW signal received on the opposite sideband: the passband now lies on the other side, and the nearby interfering signal falls outside it.' : 'CW signal with a nearby interfering signal inside the passband.')}
        caption={voice ? 'A notch filter cuts a narrow slot out of the passband at the carrier.' : 'Reverse sideband flips the passband to the other side of the signal.'}>
        <Ln x1={40} y1={base} x2={600} y2={base} color={C.muted} width={2} />
        {/* passband */}
        <rect x={X(pb[0])} y={top} width={X(pb[1]) - X(pb[0])} height={base - top} rx={4} fill={C.power} fillOpacity={0.12} stroke={C.power} strokeWidth={2} strokeDasharray="6 4" />
        <T x={(X(pb[0]) + X(pb[1])) / 2} y={top - 14} anchor="middle" size={13} bold color={C.power}>receiver passband</T>
        {/* notch slot */}
        {notch && <rect x={X(spikeK) - 7} y={top} width={14} height={base - top} fill={C.bg} stroke={C.power} strokeWidth={2} />}
        {/* wanted signal */}
        {voice ? (
          <path d={`M${X(0.2)},${base} L${X(0.5)},${base - 50} L${X(1.0)},${base - 36} L${X(1.8)},${base - 52} L${X(2.2)},${base}`} fill={sigCol} fillOpacity={0.3} stroke={sigCol} strokeWidth={2.5} strokeLinejoin="round" />
        ) : (
          <Ln x1={X(0)} y1={base} x2={X(0)} y2={base - 70} color={sigCol} width={5} />
        )}
        <T x={voice ? X(1.2) : X(0)} y={base + 18} anchor="middle" size={13} bold color={sigCol}>{voice ? 'voice (SSB)' : 'CW signal'}</T>
        {/* interferer */}
        <Ln x1={X(spikeK)} y1={base} x2={X(spikeK)} y2={base - 82} color={badCol} width={5} dash={heard ? undefined : '3 5'} opacity={heard ? 1 : 0.55} />
        <T x={X(spikeK)} y={base + 38} anchor="middle" size={13} bold color={badCol}>{voice ? 'carrier' : 'interferer'}</T>
        <T x={X(spikeK)} y={base + 18} anchor="middle" size={12} color={C.muted}>{' '}</T>
        {/* verdict */}
        <rect x={160} y={246} width={320} height={34} rx={17} fill={heard ? C.bad : C.good} fillOpacity={0.15} stroke={heard ? C.bad : C.good} strokeWidth={2} />
        <T x={320} y={263} anchor="middle" bold size={15} color={heard ? C.bad : C.good}>{heard ? 'Interference heard' : 'Interference gone'}</T>
        <T x={44} y={30} size={13} color={C.muted}>frequency →</T>
      </Diagram>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '-6px 0 14px' }}>
        <Choice label="Situation" value={scn} onChange={(v) => { setScn(v); setFix(false) }} options={[{ value: 'voice', label: 'Carrier on an SSB signal' }, { value: 'cw', label: 'Neighbour on CW' }]} />
        <Choice label="Fix" value={fix ? 'on' : 'off'} onChange={(v) => setFix(v === 'on')} options={[{ value: 'off', label: 'No fix' }, { value: 'on', label: voice ? 'Notch filter on' : 'Opposite sideband' }]} />
      </div>
    </>
  )
}
