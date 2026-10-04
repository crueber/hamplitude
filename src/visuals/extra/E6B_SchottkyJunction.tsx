import { C, Diagram, T } from '../kit'

/** Three junction styles side by side: silicon PN, Schottky (metal-semiconductor), point contact. */
export function SchottkyJunction() {
  const col = (x: number, title: string) => <T x={x + 100} y={22} anchor="middle" bold size={14}>{title}</T>
  return (
    <Diagram w={640} h={264} title="Three diode constructions. Silicon junction diode: P-type against N-type, drop about 0.7 volts. Schottky: metal against N-type semiconductor, lower drop and fast. Point contact: a fine wire touching a crystal, tiny capacitance, used as an RF detector."
      caption="A Schottky barrier diode is a metal-semiconductor junction.">
      {/* silicon */}
      {col(10, 'Silicon junction')}
      <rect x={30} y={52} width={160} height={30} fill={C.resist} opacity={0.3} stroke={C.ink} strokeWidth={2} />
      <rect x={30} y={82} width={160} height={44} fill={C.current} opacity={0.3} stroke={C.ink} strokeWidth={2} />
      <T x={110} y={67} anchor="middle" bold size={13} color={C.resist}>P-type</T>
      <T x={110} y={104} anchor="middle" bold size={13} color={C.current}>N-type</T>
      <T x={110} y={152} anchor="middle" size={13} color={C.muted}>PN junction</T>
      <T x={110} y={186} anchor="middle" bold size={14} color={C.power}>drop ≈ 0.7 V</T>
      <T x={110} y={210} anchor="middle" size={13}>power rectifier,</T>
      <T x={110} y={226} anchor="middle" size={13}>general use</T>
      {/* schottky */}
      {col(220, 'Schottky')}
      <rect x={240} y={52} width={160} height={30} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <rect x={240} y={82} width={160} height={44} fill={C.current} opacity={0.3} stroke={C.ink} strokeWidth={2} />
      <T x={320} y={67} anchor="middle" bold size={13}>metal</T>
      <T x={320} y={104} anchor="middle" bold size={13} color={C.current}>semiconductor</T>
      <T x={320} y={152} anchor="middle" size={13} color={C.muted}>metal-semiconductor</T>
      <T x={320} y={186} anchor="middle" bold size={14} color={C.power}>drop ≈ 0.3 V</T>
      <T x={320} y={210} anchor="middle" size={13}>low-loss rectifier,</T>
      <T x={320} y={226} anchor="middle" size={13}>VHF/UHF mixer, detector</T>
      {/* point contact */}
      {col(430, 'Point contact')}
      <polyline points="510,44 510,66 520,86" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <rect x={450} y={86} width={160} height={40} fill={C.current} opacity={0.3} stroke={C.ink} strokeWidth={2} />
      <T x={530} y={106} anchor="middle" bold size={13} color={C.current}>crystal</T>
      <T x={548} y={58} size={13} color={C.muted}>fine wire</T>
      <T x={530} y={152} anchor="middle" size={13} color={C.muted}>tiny contact area</T>
      <T x={530} y={186} anchor="middle" bold size={14} color={C.power}>very low capacitance</T>
      <T x={530} y={210} anchor="middle" size={13}>RF detector</T>
    </Diagram>
  )
}
