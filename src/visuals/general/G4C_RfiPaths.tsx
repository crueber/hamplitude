import { useState } from 'react'
import { Antenna, Box, Capacitor, C, Choice, Diagram, Ground, Ln, T, Wire } from '../kit'

type Fix = 'none' | 'ferrite' | 'bypass'

/** RF rides along an audio cable (common mode) into the amplifier. A ferrite choke stops it on the cable; a bypass capacitor shorts it to ground at the input. */
export function RfiPaths() {
  const [fix, setFix] = useState<Fix>('none')
  const clean = fix !== 'none'
  return (
    <>
      <Diagram w={640} h={314} title="Your antenna's RF is picked up by an audio cable and travels along it into an amplifier, where it is heard as interference. A ferrite choke on the cable blocks it; a bypass capacitor at the input shunts it to ground."
        caption="Block RF on the cable with a ferrite choke, or shunt it to ground with a bypass capacitor.">
        <Antenna x={300} y={96} />
        <T x={300} y={26} anchor="middle" bold size={14}>Your antenna</T>
        <path d="M322,54 q14,10 0,20 M334,46 q22,18 0,36" fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />
        <Box x={14} y={192} w={110} h={66} label="Audio source" />
        <Box x={490} y={180} w={136} h={90} label="Amplifier" sub={clean ? 'clean audio' : 'hears interference'} color={clean ? C.good : C.bad} />
        <Wire pts={[[124, 225], [490, 225]]} color={C.ink} width={3.5} />
        <T x={190} y={206} anchor="middle" size={12} color={C.muted}>audio cable</T>
        <Ln x1={300} y1={134} x2={300} y2={216} color={C.bad} width={2.5} dash="6 5" arrow />
        <T x={312} y={168} size={12} bold color={C.bad}>RF picked up</T>
        {fix === 'none' && <Ln x1={310} y1={246} x2={440} y2={246} color={C.bad} width={3.5} dash="10 8" arrow />}
        {fix === 'none' && <T x={375} y={264} anchor="middle" size={12} bold color={C.bad}>RF runs into the amp</T>}
        {fix === 'ferrite' && (
          <g>
            <rect x={380} y={210} width={46} height={30} rx={8} fill={C.power} fillOpacity={0.25} stroke={C.power} strokeWidth={2.5} />
            <T x={403} y={262} anchor="middle" size={12} bold color={C.power}>ferrite choke</T>
            <T x={403} y={280} anchor="middle" size={12} bold color={C.good}>RF stops on the cable</T>
          </g>
        )}
        {fix === 'bypass' && (
          <g>
            <Wire pts={[[462, 225], [462, 238]]} color={C.ink} width={2.2} />
            <Capacitor x={462} y={254} rot={90} len={32} color={C.power} />
            <Wire pts={[[462, 270], [462, 280]]} color={C.ink} width={2.2} />
            <Ground x={462} y={280} color={C.ink} />
            <T x={440} y={254} anchor="end" size={12} bold color={C.power}>bypass capacitor</T>
            <T x={440} y={272} anchor="end" size={12} bold color={C.good}>RF goes to ground</T>
          </g>
        )}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Fix" value={fix} onChange={setFix} options={[{ value: 'none', label: 'No fix' }, { value: 'ferrite', label: 'Ferrite choke' }, { value: 'bypass', label: 'Bypass capacitor' }]} />
      </div>
    </>
  )
}
