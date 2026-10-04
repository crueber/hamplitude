import { C, Diagram, T } from '../kit'
import { Verdict } from './T1D_Broadcast'

/** Money and ham radio: what is OK. */
export function T1D_Money() {
  return (
    <Diagram w={640} h={250} title="Allowed: announcing ham radio equipment for sale when not done regularly, and being paid to operate as part of classroom instruction. Not allowed: regular selling, operating for pay for an employer's equipment sales, or getting emergency information for a broadcast station for pay" caption="Occasional and educational is fine. Regular or commercial is not.">
      <T x={6} y={18} bold size={14} color={C.good}>OK</T>
      <T x={334} y={18} bold size={14} color={C.bad}>Not OK</T>
      <rect x={6} y={30} width={310} height={210} rx={10} fill={C.good} fillOpacity={0.1} stroke={C.good} strokeWidth={2} />
      <rect x={326} y={30} width={308} height={210} rx={10} fill={C.bad} fillOpacity={0.1} stroke={C.bad} strokeWidth={2} />
      <Verdict x={30} y={62} ok label="Announce ham gear for sale," />
      <T x={50} y={82} size={13.5} bold>if not on a regular basis</T>
      <Verdict x={30} y={134} ok label="Paid to operate as part of" />
      <T x={50} y={154} size={13.5} bold>classroom instruction at a school</T>
      <Verdict x={350} y={62} ok={false} label="Selling gear regularly" />
      <T x={370} y={82} size={13} color={C.muted}>(running a business)</T>
      <Verdict x={350} y={122} ok={false} label="Operating for pay to sell" />
      <T x={370} y={142} size={13.5} bold>your employer's equipment</T>
      <Verdict x={350} y={190} ok={false} label="Paid to get emergency info" />
      <T x={370} y={210} size={13.5} bold>for a broadcast station</T>
    </Diagram>
  )
}
