import { C, Diagram, T } from '../kit'

/** Telecommand station on/near Earth: three things posted; balloon ID; model craft power. */
export function E1D_Posted() {
  const items = ['A photocopy of the station license', 'A label: name, address, phone of the licensee', 'A label: name, address, phone of the control operator']
  return (
    <Diagram w={640} h={258} title="A telecommand station on or within 50 kilometers of the Earth's surface must post a copy of the license and labels with the licensee and the control operator's name, address and phone number. A model craft telecommand transmitter is limited to 1 watt. A balloon telemetry station's ID must include a call sign." caption="Posted at the station: all three. Model craft: 1 W. Balloon ID: call sign.">
      <rect x={6} y={6} width={628} height={140} rx={12} fill={C.power} fillOpacity={0.1} stroke={C.power} strokeWidth={2} />
      <T x={20} y={30} bold size={15} color={C.power}>Telecommand station on or within 50 km of the surface: post all three</T>
      {items.map((t, i) => (
        <g key={t}>
          <T x={22} y={64 + i * 28} bold size={16} color={C.good}>✓</T>
          <T x={48} y={64 + i * 28} size={14}>{t}</T>
        </g>
      ))}
      <rect x={6} y={158} width={308} height={92} rx={12} fill={C.resist} fillOpacity={0.12} stroke={C.resist} strokeWidth={2} />
      <T x={160} y={184} anchor="middle" bold size={14} color={C.resist}>Model craft telecommand</T>
      <T x={160} y={218} anchor="middle" bold size={26} color={C.resist}>1 W</T>
      <rect x={326} y={158} width={308} height={92} rx={12} fill={C.signal} fillOpacity={0.12} stroke={C.signal} strokeWidth={2} />
      <T x={480} y={184} anchor="middle" bold size={14} color={C.signal}>Balloon telemetry ID needs</T>
      <T x={480} y={218} anchor="middle" bold size={24} color={C.signal}>call sign</T>
    </Diagram>
  )
}
