import { C, Diagram, T } from '../kit'

/** External RF amplifiers: certification, dealer exception, standard. */
export function E1F_Amplifier() {
  return (
    <Diagram w={640} h={292} title="An external RF power amplifier capable of operation below 144 megahertz needs FCC certification before a dealer sells it. The exception in the pool is a used amplifier bought from an amateur and sold to another amateur for use at that operator's station. Kit assembly, a reciprocal certification agreement country and low gain are not exceptions. To be certified, the amplifier must meet the FCC spurious emission standards when operated at the lesser of 1500 watts or its full output power." caption="Certification requires clean output at full power.">
      <rect x={6} y={6} width={308} height={280} rx={12} fill={C.resist} fillOpacity={0.1} stroke={C.resist} strokeWidth={2} />
      <T x={160} y={30} anchor="middle" bold size={15} color={C.resist}>Dealer selling an uncertified amp</T>
      <T x={22} y={64} bold size={16} color={C.good}>✓</T>
      <T x={46} y={64} size={13.5}>Used, bought from an amateur,</T>
      <T x={46} y={84} size={13.5}>sold to another amateur for use</T>
      <T x={46} y={104} size={13.5}>at that operator's station</T>
      <T x={22} y={148} bold size={16} color={C.bad}>✗</T>
      <T x={46} y={148} size={13.5} color={C.muted}>Assembled by the dealer from a kit</T>
      <T x={22} y={180} bold size={16} color={C.bad}>✗</T>
      <T x={46} y={180} size={13.5} color={C.muted}>Certified in a reciprocal country</T>
      <T x={22} y={212} bold size={16} color={C.bad}>✗</T>
      <T x={46} y={212} size={13.5} color={C.muted}>Gain below 23 dB</T>
      <rect x={326} y={6} width={308} height={280} rx={12} fill={C.power} fillOpacity={0.1} stroke={C.power} strokeWidth={2} />
      <T x={480} y={30} anchor="middle" bold size={15} color={C.power}>To earn FCC certification</T>
      <T x={342} y={70} size={14}>Meet the FCC spurious</T>
      <T x={342} y={90} size={14}>emission standards when</T>
      <T x={342} y={110} size={14}>run at the lesser of:</T>
      <T x={342} y={148} bold size={20} color={C.power}>1500 W</T>
      <T x={342} y={174} size={14}>or the amp's full output power,</T>
      <T x={342} y={194} size={14}>whichever is less</T>
      <T x={342} y={224} size={13.5} color={C.muted}>Not the standard: gain under 23 dB,</T>
      <T x={342} y={244} size={13.5} color={C.muted}>5 W drive, or UL certification</T>
    </Diagram>
  )
}
