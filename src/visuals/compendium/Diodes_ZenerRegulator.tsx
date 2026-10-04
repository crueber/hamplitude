import { useState } from 'react'
import { C, Controls, Diagram, Dot, Ground, Resistor, Slider, Source, T, Wire, fmt, si } from '../kit'

const VZ = 5.1, R = 330, RL = 1000
const BX = 440, BY0 = 214, BY1 = 44 // bar chart
const bh = (v: number) => (v / 16) * (BY0 - BY1)

/** A Zener diode reverse-biased through a series resistor holds its voltage while the supply moves. Values are illustrative. */
export function Diodes_ZenerRegulator() {
  const [vin, setVin] = useState(12)
  const ir = (vin - VZ) / R
  const il = VZ / RL
  const iz = ir - il
  const pz = iz * VZ
  return (
    <>
      <Diagram w={640} h={348}
        title={`A Zener diode regulator: a ${VZ} volt Zener across a ${RL} ohm load, fed through ${R} ohms. With ${vin} volts in, the output stays at ${VZ} volts and the Zener passes ${si(iz, 'A', 3)}.`}
        caption="Illustrative ideal Zener. The Zener soaks up whatever current the load does not take, so the output voltage barely moves.">
        <Source x={40} y={135} rot={90} len={60} />
        <T x={62} y={135} size={13} bold color={C.voltage}>Vin = {vin} V</T>
        <Wire pts={[[40, 105], [40, 70], [95, 70]]} />
        <Resistor x={130} y={70} len={70} />
        <T x={130} y={46} anchor="middle" size={13} bold color={C.resist}>R = 330 Ω</T>
        <Wire pts={[[165, 70], [330, 70], [330, 110]]} />
        <Dot x={230} y={70} />
        <Wire pts={[[230, 70], [230, 100]]} />
        <g transform="translate(230,140) rotate(-90)" stroke={C.ink} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="-40,0 -12,0" /><polygon points="-12,-12 -12,12 10,0" fill={C.ink} /><polyline points="5,-16 10,-13 10,13 15,16" /><line x1={10} y1={0} x2={40} y2={0} />
        </g>
        <T x={214} y={162} anchor="end" size={13} bold color={C.signal}>Zener 5.1 V</T>
        <T x={214} y={181} anchor="end" size={12} color={C.muted}>cathode up</T>
        <Wire pts={[[230, 180], [230, 200]]} />
        <Resistor x={330} y={140} rot={90} len={60} />
        <T x={348} y={140} size={13} bold color={C.resist}>RL 1 kΩ</T>
        <Wire pts={[[330, 170], [330, 200], [40, 200], [40, 165]]} />
        <Dot x={230} y={200} />
        <Ground x={185} y={200} />
        <Dot x={330} y={70} />
        <T x={336} y={50} size={13} bold color={C.good}>Vout = {fmt(VZ, 2)} V</T>
        {/* bars */}
        <T x={BX + 70} y={24} anchor="middle" size={13} bold>Volts</T>
        <rect x={BX} y={BY0 - bh(16)} width={60} height={bh(16)} rx={4} fill={C.fill} />
        <rect x={BX} y={BY0 - bh(vin)} width={60} height={bh(vin)} rx={4} fill={C.voltage} />
        <rect x={BX + 90} y={BY0 - bh(16)} width={60} height={bh(16)} rx={4} fill={C.fill} />
        <rect x={BX + 90} y={BY0 - bh(VZ)} width={60} height={bh(VZ)} rx={4} fill={C.good} />
        <T x={BX + 30} y={BY0 - bh(vin) - 12} anchor="middle" size={13} bold color={C.voltage}>{vin} V</T>
        <T x={BX + 120} y={BY0 - bh(VZ) - 12} anchor="middle" size={13} bold color={C.good}>{VZ} V</T>
        <T x={BX + 30} y={BY0 + 16} anchor="middle" size={13} bold>Vin</T>
        <T x={BX + 120} y={BY0 + 16} anchor="middle" size={13} bold>Vout</T>
        {/* working */}
        <rect x={14} y={252} width={612} height={84} rx={12} fill={C.fill} />
        <T x={28} y={272} size={13} mono>Current through R = ({vin} − {VZ}) ÷ 330 Ω = <tspan fill={C.current} fontWeight={700}>{si(ir, 'A', 3)}</tspan></T>
        <T x={28} y={296} size={13} mono>Load takes {VZ} ÷ 1 kΩ = {si(il, 'A', 3)}; Zener takes <tspan fill={C.current} fontWeight={700}>{si(iz, 'A', 3)}</tspan></T>
        <T x={28} y={318} size={12.5} color={C.muted}>Zener dissipates about {fmt(pz * 1000, 2)} mW (current × voltage), so it must be rated for it.</T>
      </Diagram>
      <Controls>
        <Slider label="Input voltage" value={vin} min={8} max={16} step={0.5} onChange={setVin} format={(v) => `${v} V`} color={C.voltage} />
      </Controls>
    </>
  )
}
