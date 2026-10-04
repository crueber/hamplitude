import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Door = 'antenna' | 'audio' | 'power' | 'case'

const INFO: Record<Door, { name: string; symptom: string; why: string; fix: string }> = {
  antenna: {
    name: 'Antenna or cable input',
    symptom: 'Disturbance when you transmit, on many channels',
    why: 'Tuner front end overloaded by a strong signal outside its band',
    fix: 'Filter at its input: high-pass (HF into a TV), band-reject (2 m into FM)',
  },
  audio: {
    name: 'Speaker and audio cables',
    symptom: 'Voice, buzz or clicks in the speakers, even with the tuner off',
    why: 'Cables act as antennas; a junction rectifies the RF into audio',
    fix: 'Ferrite chokes on the cables, plus a small bypass capacitor',
  },
  power: {
    name: 'AC power cord',
    symptom: 'Changes when you move the cord or plug it elsewhere',
    why: 'RF rides in on the mains wiring as common-mode current',
    fix: 'Ferrite on the cord, or a plug-in line filter',
  },
  case: {
    name: 'Case and internal wiring',
    symptom: 'Interference remains with every cable unplugged',
    why: 'Unshielded internal wiring picks up the RF directly',
    fix: 'Hard to fix at the device: reduce your field there, ask the maker',
  },
}

/** Four doors into a consumer device, and what each looks like and costs to fix. */
export function TviAndConsumerElectronics_EntryPoints() {
  const [door, setDoor] = useState<Door>('antenna')
  const on = (d: Door) => (d === door ? C.bad : C.muted)
  const w = (d: Door) => (d === door ? 4 : 2)
  const info = INFO[door]
  return (
    <>
      <Diagram w={640} h={330} title={`A consumer device has four ways in for RF. Selected: ${info.name}. Symptom: ${info.symptom}. Cause: ${info.why}. Fix: ${info.fix}.`}
        caption="RF has four ways into a TV or stereo. The symptom usually tells you which one.">
        <rect x={220} y={56} width={200} height={110} rx={14} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <T x={320} y={96} anchor="middle" bold size={15}>TV, stereo or phone</T>
        <T x={320} y={120} anchor="middle" size={12} color={C.muted}>the victim</T>
        <rect x={228} y={64} width={184} height={94} rx={10} fill="none" stroke={on('case')} strokeWidth={w('case')} strokeDasharray="6 5" />
        <Ln x1={80} y1={111} x2={216} y2={111} color={on('antenna')} width={w('antenna')} arrow />
        <T x={80} y={92} size={12} bold color={on('antenna')}>antenna / cable in</T>
        <Ln x1={424} y1={111} x2={560} y2={111} color={on('audio')} width={w('audio')} arrow="both" />
        <T x={560} y={92} anchor="end" size={12} bold color={on('audio')}>speakers / audio</T>
        <Ln x1={320} y1={24} x2={320} y2={52} color={on('power')} width={w('power')} arrow />
        <T x={344} y={34} size={12} bold color={on('power')}>AC cord</T>
        <Ln x1={320} y1={198} x2={320} y2={170} color={on('case')} width={w('case')} arrow />
        <T x={344} y={192} size={12} bold color={on('case')}>through the case</T>
        <path d="M30,40 q10,10 0,20 M42,34 q16,16 0,32 M54,28 q22,22 0,44" fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />
        <T x={20} y={136} size={12} color={C.muted}>your signal</T>
        <T x={20} y={154} size={12} color={C.muted}>reaches all four</T>

        <rect x={14} y={212} width={612} height={106} rx={12} fill={C.fill} stroke={C.bad} strokeWidth={2} />
        <T x={28} y={232} size={13} bold color={C.bad}>{info.name}</T>
        <T x={28} y={254} size={12} bold color={C.muted}>You notice</T><T x={110} y={254} size={12}>{info.symptom}</T>
        <T x={28} y={276} size={12} bold color={C.muted}>Why</T><T x={110} y={276} size={12}>{info.why}</T>
        <T x={28} y={298} size={12} bold color={C.good}>Fix</T><T x={110} y={298} size={12}>{info.fix}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Way in" value={door} onChange={setDoor} options={[
          { value: 'antenna', label: 'Antenna input' },
          { value: 'audio', label: 'Audio cables' },
          { value: 'power', label: 'AC cord' },
          { value: 'case', label: 'Case' },
        ]} />
      </div>
    </>
  )
}
