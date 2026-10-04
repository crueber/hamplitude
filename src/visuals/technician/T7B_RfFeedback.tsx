import { useState } from 'react'
import { Antenna, C, Choice, Diagram, Ln, T, useTime } from '../kit'

/** RF from your own antenna gets on the mic cable and feeds back into the transmitter. A ferrite choke stops it. */
export function RfFeedback() {
  const [choke, setChoke] = useState(false)
  const { t, ref } = useTime(0.8)
  const dash = -(t * 30)
  return (
    <>
      <Diagram w={640} h={214} svgRef={ref} title="Radio frequency from the antenna is picked up by the microphone cable and fed back into the transmitter, distorting the voice. A ferrite choke on the cable blocks it."
        caption="Distorted voice? RF on the mic cable may be feeding back. A clip-on ferrite choke stops it.">
        <g transform="translate(0,-48)">
        <rect x={20} y={80} width={170} height={78} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={105} y={106} anchor="middle" bold size={14}>Transmitter</T>
        <T x={105} y={134} anchor="middle" bold size={13} color={choke ? C.good : C.bad}>{choke ? 'clean audio' : 'distorted audio'}</T>
        <Ln x1={190} y1={118} x2={540} y2={118} color={C.ink} width={3} />
        <T x={365} y={102} anchor="middle" size={12} color={C.muted}>feed line</T>
        <Antenna x={560} y={118} />
        <path d="M580,84 q14,10 0,20 M592,76 q22,18 0,36" fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />
        <T x={560} y={150} anchor="middle" size={13} bold color={C.signal}>RF</T>

        <polyline points="105,158 105,216 420,216" fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <rect x={420} y={194} width={110} height={44} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={475} y={216} anchor="middle" bold size={13}>Microphone</T>
        <T x={170} y={240} anchor="middle" size={12} color={C.muted}>mic cable</T>

        <Ln x1={520} y1={134} x2={440} y2={200} color={C.bad} width={2.5} dash="6 5" arrow />
        <T x={512} y={176} size={12} bold color={C.bad} anchor="middle">picked up</T>

        {choke ? (
          <g>
            <Ln x1={400} y1={216} x2={298} y2={216} color={C.bad} width={3.5} dash="10 8" strokeDashoffset={dash} arrow />
            <rect x={240} y={203} width={52} height={26} rx={8} fill={C.power} fillOpacity={0.25} stroke={C.power} strokeWidth={2.5} />
            <T x={265} y={190} anchor="middle" size={12} bold color={C.power}>ferrite choke</T>
            <T x={365} y={198} anchor="middle" size={12} bold color={C.power}>RF stops here</T>
          </g>
        ) : (
          <>
            <Ln x1={400} y1={216} x2={120} y2={216} color={C.bad} width={3.5} dash="10 8" strokeDashoffset={dash} arrow />
            <Ln x1={105} y1={206} x2={105} y2={164} color={C.bad} width={3.5} dash="10 8" strokeDashoffset={dash} arrow />
            <T x={300} y={196} anchor="middle" size={12} bold color={C.bad}>RF feeds back into the radio</T>
          </>
        )}
        </g>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Choke" value={choke ? 'on' : 'off'} onChange={(v) => setChoke(v === 'on')} options={[{ value: 'off', label: 'No choke' }, { value: 'on', label: 'Ferrite choke on mic cable' }]} />
      </div>
    </>
  )
}
