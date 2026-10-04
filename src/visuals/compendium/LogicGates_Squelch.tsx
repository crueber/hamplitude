import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

/** A tone-squelch decision built from two gates: audio is unmuted when (carrier AND right tone) OR the monitor button is held. */
export function LogicGates_Squelch() {
  const [carrier, setCarrier] = useState<0 | 1>(1)
  const [tone, setTone] = useState<0 | 1>(0)
  const [mon, setMon] = useState<0 | 1>(0)
  const both = carrier & tone
  const out = both | mon
  const lvl = (v: number) => (v ? C.good : C.muted)
  const andBody = 'M170,60 L196,60 A40,40 0 0 1 196,140 L170,140 Z'
  const orBody = 'M370,80 Q395,80 425,115 Q395,150 370,150 Q387,115 370,80 Z'
  return (
    <>
      <Diagram w={640} h={250}
        title={`Tone squelch logic: carrier detected ${carrier}, correct tone ${tone}, monitor button ${mon}. The AND gate gives ${both}; the OR gate gives ${out}, so the speaker is ${out ? 'unmuted' : 'muted'}.`}
        caption="Two gates decide whether you hear audio: signal AND the right tone, OR the monitor button.">
        <T x={14} y={54} size={13} bold color={lvl(carrier)}>Carrier present = {carrier}</T>
        <T x={14} y={114} size={13} bold color={lvl(tone)}>Right tone = {tone}</T>
        <T x={14} y={174} size={13} bold color={lvl(mon)}>Monitor button = {mon}</T>
        <Ln x1={14} y1={70} x2={170} y2={70} color={lvl(carrier)} width={3} />
        <Ln x1={14} y1={130} x2={170} y2={130} color={lvl(tone)} width={3} />
        <path d={andBody} fill={C.fill} stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
        <T x={190} y={100} anchor="middle" size={13} bold>AND</T>
        <Ln x1={236} y1={100} x2={382} y2={100} color={lvl(both)} width={3} />
        <Ln x1={14} y1={190} x2={340} y2={190} color={lvl(mon)} width={3} />
        <Ln x1={340} y1={190} x2={340} y2={130} color={lvl(mon)} width={3} />
        <Ln x1={340} y1={130} x2={382} y2={130} color={lvl(mon)} width={3} />
        <path d={orBody} fill={C.fill} stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
        <T x={400} y={115} anchor="middle" size={13} bold>OR</T>
        <Ln x1={425} y1={115} x2={500} y2={115} color={lvl(out)} width={3} />
        <rect x={500} y={85} width={126} height={60} rx={10} fill={out ? C.good : C.fill} opacity={out ? 0.22 : 1} stroke={out ? C.good : C.muted} strokeWidth={2.5} />
        <T x={563} y={107} anchor="middle" size={14} bold color={out ? C.good : C.muted}>{out ? 'Audio ON' : 'Audio muted'}</T>
        <T x={563} y={128} anchor="middle" size={12} color={C.muted}>speaker gate</T>
        <T x={320} y={218} anchor="middle" size={13.5} bold>{`(${carrier} AND ${tone}) OR ${mon}  =  ${both} OR ${mon}  =  ${out}`}</T>
        <T x={320} y={238} anchor="middle" size={12.5} color={C.muted}>A strong signal with the wrong tone stays muted until you hold monitor.</T>
      </Diagram>
      <Controls>
        <Choice label="Carrier detected" value={carrier} onChange={setCarrier} options={[{ value: 0, label: 'No carrier' }, { value: 1, label: 'Carrier present' }]} />
        <Choice label="Correct tone" value={tone} onChange={setTone} options={[{ value: 0, label: 'Wrong or no tone' }, { value: 1, label: 'Correct tone' }]} />
        <Choice label="Monitor" value={mon} onChange={setMon} options={[{ value: 0, label: 'Monitor off' }, { value: 1, label: 'Monitor held' }]} />
      </Controls>
    </>
  )
}
