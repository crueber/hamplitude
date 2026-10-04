import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

/** Reverse swaps your receive and transmit frequencies. */
export function Reverse() {
  const [rev, setRev] = useState(false)
  const OUT = '146.940', IN = '146.340'
  const rx = rev ? IN : OUT
  const tx = rev ? OUT : IN
  const rxColor = rev ? C.resist : C.signal
  const txColor = rev ? C.signal : C.resist
  const rxY = rev ? 190 : 60
  const txY = rev ? 60 : 190
  return (
    <>
      <Diagram w={640} h={250} title={rev ? 'Reverse: the radio receives on the repeater input and transmits on its output' : 'Normal: the radio receives on the repeater output and transmits on its input'} caption={rev ? 'Example 2 m pair. Reverse: you now hear the INPUT, where other stations transmit to the repeater.' : 'Example 2 m pair. Normal: you hear the OUTPUT and transmit on the INPUT.'}>
        <rect x={20} y={55} width={210} height={140} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={125} y={78} anchor="middle" bold size={14}>Your radio</T>
        <T x={36} y={110} size={12} color={C.muted}>RECEIVES</T>
        <T x={36} y={128} mono bold size={15} color={rxColor}>{rx}</T>
        <T x={36} y={156} size={12} color={C.muted}>TRANSMITS</T>
        <T x={36} y={174} mono bold size={15} color={txColor}>{tx}</T>
        {/* frequency tags */}
        <rect x={420} y={32} width={200} height={56} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2.2} />
        <T x={520} y={52} anchor="middle" bold size={14} color={C.signal}>Repeater OUTPUT</T>
        <T x={520} y={72} anchor="middle" mono size={13}>{OUT}</T>
        <rect x={420} y={162} width={200} height={56} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2.2} />
        <T x={520} y={182} anchor="middle" bold size={14} color={C.resist}>Repeater INPUT</T>
        <T x={520} y={202} anchor="middle" mono size={13}>{IN}</T>
        {/* links */}
        <Ln x1={418} y1={rxY === 60 ? 62 : 190} x2={234} y2={112} color={rxColor} width={3} arrow />
        <Ln x1={234} y1={150} x2={418} y2={txY === 60 ? 62 : 190} color={txColor} width={3} arrow />
        <rect x={308} y={(rev ? 153 : 86) - 10} width={44} height={20} rx={5} fill={C.bg} />
        <T x={330} y={rev ? 153 : 86} anchor="middle" bold size={13} color={rxColor}>hear</T>
        <rect x={308} y={(rev ? 104 : 171) - 10} width={44} height={20} rx={5} fill={C.bg} />
        <T x={330} y={rev ? 104 : 171} anchor="middle" bold size={13} color={txColor}>talk</T>
      </Diagram>
      <Controls>
        <Choice label="Radio mode" value={rev ? 'rev' : 'norm'} onChange={(v) => setRev(v === 'rev')} options={[{ value: 'norm', label: 'Normal' }, { value: 'rev', label: 'Reverse' }]} />
      </Controls>
    </>
  )
}
