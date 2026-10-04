import { useState } from 'react'
import { C, Choice, Controls, Diagram, Dot, Readout, Resistor, Slider, T, Wire, fmt } from '../kit'

/** Resistor values for a matched Pi or T attenuator of A dB in a Z0 system. */
export function padValues(A: number, z0: number) {
  const K = Math.pow(10, A / 20)
  return {
    K,
    tSeries: (z0 * (K - 1)) / (K + 1),
    tShunt: (2 * z0 * K) / (K * K - 1),
    piShunt: (z0 * (K + 1)) / (K - 1),
    piSeries: (z0 * (K * K - 1)) / (2 * K),
  }
}

/** A resistor pad: pick the dB and the system impedance, read off the resistors. */
export function Attenuators_Pad() {
  const [db, setDb] = useState(10)
  const [z0, setZ0] = useState(50)
  const [kind, setKind] = useState<'pi' | 'T'>('pi')
  const p = padValues(db, z0)
  const out = 100 / Math.pow(10, db / 10)
  const ser = kind === 'pi' ? p.piSeries : p.tSeries
  const shu = kind === 'pi' ? p.piShunt : p.tShunt
  const yT = 100, yB = 192, yM = 146

  return (
    <>
      <Diagram w={640} h={272}
        title={`A ${db} dB ${kind === 'pi' ? 'Pi' : 'T'} attenuator for ${z0} ohms: series resistor ${fmt(ser, 3)} ohms and shunt resistors of ${fmt(shu, 3)} ohms. It looks like ${z0} ohms from either end and passes ${fmt(out, 3)} percent of the power.`}
        caption="Three resistors set the loss and still look like the system impedance from both ends.">
        <T x={36} y={32} size={14} bold>{`${db} dB ${kind === 'pi' ? 'Pi' : 'T'} pad, ${z0} Ω system`}</T>
        {kind === 'pi' ? (
          <>
            <Wire pts={[[40, yT], [270, yT]]} />
            <Wire pts={[[370, yT], [600, yT]]} />
            <Resistor x={320} y={yT} len={100} color={C.resist} />
            <T x={320} y={yT - 24} anchor="middle" size={13} bold color={C.resist}>{`series ${fmt(ser, 3)} Ω`}</T>
            <Resistor x={160} y={yM} rot={90} len={70} color={C.resist} />
            <T x={140} y={yM} anchor="end" size={13} bold color={C.resist}>{`shunt ${fmt(shu, 3)} Ω`}</T>
            <Resistor x={480} y={yM} rot={90} len={70} color={C.resist} />
            <T x={500} y={yM} size={13} bold color={C.resist}>{`shunt ${fmt(shu, 3)} Ω`}</T>
            <Wire pts={[[160, yT], [160, yM - 35]]} /><Wire pts={[[160, yM + 35], [160, yB]]} />
            <Wire pts={[[480, yT], [480, yM - 35]]} /><Wire pts={[[480, yM + 35], [480, yB]]} />
            <Dot x={160} y={yT} /><Dot x={480} y={yT} /><Dot x={160} y={yB} /><Dot x={480} y={yB} />
          </>
        ) : (
          <>
            <Wire pts={[[40, yT], [140, yT]]} />
            <Wire pts={[[240, yT], [400, yT]]} />
            <Wire pts={[[500, yT], [600, yT]]} />
            <Resistor x={190} y={yT} len={100} color={C.resist} />
            <T x={190} y={yT - 24} anchor="middle" size={13} bold color={C.resist}>{`series ${fmt(ser, 3)} Ω`}</T>
            <Resistor x={450} y={yT} len={100} color={C.resist} />
            <T x={450} y={yT - 24} anchor="middle" size={13} bold color={C.resist}>{`series ${fmt(ser, 3)} Ω`}</T>
            <Resistor x={320} y={yM} rot={90} len={70} color={C.resist} />
            <T x={340} y={yM} size={13} bold color={C.resist}>{`shunt ${fmt(shu, 3)} Ω`}</T>
            <Wire pts={[[320, yT], [320, yM - 35]]} /><Wire pts={[[320, yM + 35], [320, yB]]} />
            <Dot x={320} y={yT} /><Dot x={320} y={yB} />
          </>
        )}
        <Wire pts={[[40, yB], [600, yB]]} />
        {[40, 600].map((x) => (
          <g key={x}>
            <circle cx={x} cy={yT} r={4.5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
            <circle cx={x} cy={yB} r={4.5} fill={C.bg} stroke={C.ink} strokeWidth={2} />
          </g>
        ))}
        <T x={40} y={yB + 20} anchor="middle" size={12} bold color={C.muted}>in</T>
        <T x={600} y={yB + 20} anchor="middle" size={12} bold color={C.muted}>out</T>
        <T x={320} y={236} anchor="middle" size={14} bold>{`${db} dB: voltage ÷ ${fmt(p.K, 3)}, power ÷ ${fmt(Math.pow(10, db / 10), 3)}`}</T>
        <T x={320} y={256} anchor="middle" size={13} color={C.muted}>{`With 100 W in: ${fmt(out, 3)} W out, ${fmt(100 - out, 3)} W of heat in the resistors.`}</T>
      </Diagram>
      <Controls>
        <Choice label="Pad type" value={kind} options={[{ value: 'pi', label: 'Pi' }, { value: 'T', label: 'T' }]} onChange={setKind} />
        <Choice label="System impedance" value={z0} options={[{ value: 50, label: '50 Ω' }, { value: 75, label: '75 Ω' }]} onChange={setZ0} />
        <Slider label="Attenuation" value={db} min={1} max={30} onChange={setDb} format={(v) => `${v} dB`} color={C.resist} />
        <Readout label="Power out for 100 W in" value={fmt(out, 3)} unit="W" color={C.power} />
      </Controls>
    </>
  )
}
