import { useState } from 'react'
import { C, Choice, Controls, Diagram, Resistor, Slider, Source, T, Wire, fmt } from '../kit'

const SETUPS: Record<string, { label: string; loss: number }> = {
  bare: { label: 'Few radials, poor soil', loss: 30 },
  some: { label: 'Some radials', loss: 12 },
  many: { label: 'Many radials', loss: 3 },
}

/** Efficiency = radiation resistance ÷ total resistance. Power divides in the same ratio as the resistances. */
export function E9A_Efficiency() {
  const [rr, setRr] = useState(36)
  const [loss, setLoss] = useState(12)
  const [sel, setSel] = useState('some')
  const tot = rr + loss
  const eff = rr / tot
  const bx = 40, bw = 560
  return (
    <>
      <Diagram w={640} h={262} title={`Antenna efficiency. Radiation resistance ${rr} ohms and loss resistance ${loss} ohms in series. Efficiency = ${rr} divided by ${tot} = ${Math.round(eff * 100)} percent.`}
        caption="The same current flows through both resistances, so power splits in proportion to resistance.">
        <Wire pts={[[110, 70], [150, 70]]} />
        <Source x={110} y={96} ac rot={90} len={52} />
        <T x={84} y={96} anchor="end" size={13} bold color={C.muted}>TX</T>
        <Wire pts={[[110, 122], [110, 140], [470, 140], [470, 70]]} />
        <Resistor x={210} y={70} len={120} label="Radiation R" value={`${rr} Ω`} color={C.good} />
        <Resistor x={390} y={70} len={120} label="Loss R" value={`${loss} Ω`} color={C.bad} />
        <Wire pts={[[270, 70], [330, 70]]} />
        <Wire pts={[[450, 70], [470, 70]]} />
        <T x={500} y={52} size={12} color={C.good} bold>becomes radio waves</T>
        <T x={500} y={76} size={12} color={C.bad} bold>becomes heat</T>
        <T x={500} y={100} size={12} color={C.muted}>(ground, wire, coil)</T>

        <rect x={bx} y={176} width={bw * eff} height={30} fill={C.good} fillOpacity={0.85} />
        <rect x={bx + bw * eff} y={176} width={bw * (1 - eff)} height={30} fill={C.bad} fillOpacity={0.85} />
        <rect x={bx} y={176} width={bw} height={30} fill="none" stroke={C.muted} strokeWidth={2} />
        <T x={bx} y={164} size={13} bold color={C.muted}>Where the power goes</T>
        <T x={bx + 6} y={242} size={14} bold color={C.good}>efficiency = {rr} ÷ ({rr} + {loss}) = {Math.round(eff * 100)}%</T>
        <T x={bx + bw} y={242} anchor="end" size={13} color={C.bad}>{Math.round((1 - eff) * 100)}% lost</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Ground-mounted ¼ wave vertical</span>
          <Choice label="Ground system" value={sel} onChange={(v) => { setSel(v); setLoss(SETUPS[v].loss) }}
            options={Object.entries(SETUPS).map(([k, v]) => ({ value: k, label: v.label }))} />
        </div>
        <Slider label="Radiation resistance" value={rr} min={5} max={73} step={1} onChange={(v) => { setRr(v); setSel('') }} format={(v) => `${v} Ω`} color="var(--d-good)" />
        <Slider label="Loss resistance" value={loss} min={0} max={40} step={1} onChange={(v) => { setLoss(v); setSel('') }} format={(v) => `${fmt(v)} Ω`} color="var(--d-bad)" />
      </Controls>
    </>
  )
}
