import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, Wire, Battery } from '../kit'

/** Piezoelectricity both ways: stress makes voltage, voltage makes the crystal flex. */
export function Piezo() {
  const [m, setM] = useState<'squeeze' | 'drive'>('squeeze')
  const sq = m === 'squeeze'
  return (
    <>
      <Diagram w={640} h={250}
        title={sq ? 'Squeezing a piezoelectric crystal between two electrodes generates a voltage.' : 'Applying a voltage across a piezoelectric crystal makes it flex.'}
        caption={sq ? 'Mechanical stress in, voltage out.' : 'Voltage in, mechanical deformation out.'}>
        <rect x={250} y={sq ? 108 : 98} width={140} height={sq ? 34 : 54} rx={4} fill={C.signal} opacity={0.35} stroke={C.ink} strokeWidth={2.5} />
        <T x={320} y={125} anchor="middle" size={13} bold>quartz</T>
        <rect x={250} y={sq ? 100 : 90} width={140} height={8} fill={C.muted} />
        <rect x={250} y={sq ? 142 : 152} width={140} height={8} fill={C.muted} />
        {sq ? (
          <>
            <Ln x1={320} y1={30} x2={320} y2={92} color={C.power} width={4} arrow />
            <Ln x1={320} y1={220} x2={320} y2={158} color={C.power} width={4} arrow />
            <T x={338} y={44} size={13} bold color={C.power}>squeeze</T>
            <Wire pts={[[250, 104], [190, 104], [190, 143]]} color={C.muted} width={2.5} />
            <Wire pts={[[250, 146], [190, 146]]} color={C.muted} width={2.5} />
            <circle cx={190} cy={125} r={20} fill={C.bg} stroke={C.voltage} strokeWidth={2.5} />
            <T x={190} y={125} anchor="middle" bold size={16} color={C.voltage}>V</T>
            <T x={150} y={125} anchor="end" size={14} bold color={C.voltage}>voltage appears</T>
          </>
        ) : (
          <>
            <Wire pts={[[250, 94], [190, 94], [190, 100]]} color={C.muted} width={2.5} />
            <Wire pts={[[250, 156], [190, 156], [190, 150]]} color={C.muted} width={2.5} />
            <Battery x={190} y={125} rot={90} len={50} color={C.voltage} />
            <T x={170} y={125} anchor="end" size={14} bold color={C.voltage}>apply voltage</T>
            <Ln x1={420} y1={125} x2={470} y2={125} color={C.power} width={3} arrow="both" />
            <T x={445} y={150} anchor="middle" size={13} bold color={C.power}>flexes</T>
          </>
        )}
        <T x={320} y={236} anchor="middle" size={13} color={C.muted}>works both ways: this is the piezoelectric effect</T>
      </Diagram>
      <Choice label="Direction" value={m} onChange={setM} options={[{ value: 'squeeze', label: 'Squeeze the crystal' }, { value: 'drive', label: 'Apply a voltage' }]} />
    </>
  )
}
