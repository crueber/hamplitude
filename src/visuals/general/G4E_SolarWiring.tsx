import { useState } from 'react'
import { Battery, Box, C, Choice, Diagram, Diode, Ln, Source, T, Wire } from '../kit'

type View = 'day' | 'nodiode' | 'diode'

/** Series diode blocks night-time discharge through the panel; a charge controller regulates charging (needed for LiFePO4). */
export function SolarWiring() {
  const [v, setV] = useState<View>('day')
  const night = v !== 'day'
  const y = 120
  const verdict = v === 'day' ? 'Day: panel charges the battery' : v === 'nodiode' ? 'Night, no diode: battery drains into the panel' : 'Night, diode in line: nothing flows back'
  const vc = v === 'nodiode' ? C.bad : C.good
  return (
    <>
      <Diagram w={640} h={262} title={`Solar panel wired through a series diode and a charge controller to a battery. ${verdict}.`}
        caption="Diode: one-way valve. Charge controller: regulates charging, required for lithium iron phosphate.">
        <Wire pts={[[110, y - 30], [110, 50], [530, 50], [530, y - 30]]} color={C.ink} />
        <Wire pts={[[110, y + 30], [110, 210], [530, 210], [530, y + 30]]} color={C.ink} />
        <Source x={110} y={y} rot={90} len={60} />
        <Battery x={530} y={y} rot={90} len={60} />
        <T x={150} y={y} size={12} bold color={night ? C.muted : C.signal}>{night ? 'Panel (dark)' : 'Panel (sunlit)'}</T>
        <T x={490} y={y} anchor="end" size={12} bold>Battery</T>
        <Box x={330} y={32} w={130} h={36} label="Charge controller" size={12} color={C.good} />
        {v !== 'nodiode' ? (
          <>
            <Diode x={210} y={50} len={50} color={C.power} />
            <T x={210} y={22} anchor="middle" size={12} bold color={C.power}>series diode</T>
          </>
        ) : (
          <T x={210} y={22} anchor="middle" size={12} bold color={C.muted}>no diode</T>
        )}
        {v === 'day' && <Ln x1={160} y1={90} x2={480} y2={90} color={C.current} width={4} arrow />}
        {v === 'day' && <T x={320} y={110} anchor="middle" size={13} bold color={C.current}>charging current</T>}
        {v === 'nodiode' && <Ln x1={480} y1={90} x2={160} y2={90} color={C.bad} width={4} arrow />}
        {v === 'nodiode' && <T x={320} y={110} anchor="middle" size={13} bold color={C.bad}>battery current flows back</T>}
        {v === 'diode' && <Ln x1={480} y1={90} x2={250} y2={90} color={C.bad} width={4} dash="8 6" arrow />}
        {v === 'diode' && <T x={210} y={90} anchor="middle" bold size={22} color={C.bad}>✕</T>}
        {v === 'diode' && <T x={365} y={110} anchor="middle" size={13} bold color={C.good}>blocked at the diode</T>}
        <T x={320} y={246} anchor="middle" bold size={14} color={vc}>{verdict}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Situation" value={v} onChange={setV} options={[{ value: 'day', label: 'Daytime' }, { value: 'nodiode', label: 'Night, no diode' }, { value: 'diode', label: 'Night, with diode' }]} />
      </div>
    </>
  )
}
