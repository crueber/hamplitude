import { C, Diagram, T } from '../kit'

/** CEPT vs IARP, plus what you may say to foreign stations. */
export function E1C_Abroad() {
  const card = (x: number, c: string, head: string, where: string, need: string) => (
    <g>
      <rect x={x} y={8} width={308} height={132} rx={12} fill={c} fillOpacity={0.12} stroke={c} strokeWidth={2} />
      <T x={x + 154} y={34} anchor="middle" bold size={22} color={c}>{head}</T>
      <T x={x + 154} y={68} anchor="middle" size={14}>{where}</T>
      <T x={x + 154} y={104} anchor="middle" size={13} color={C.muted}>{need}</T>
    </g>
  )
  return (
    <Diagram w={640} h={236} title="CEPT lets US amateurs operate in many European countries and European amateurs operate in the US, and you need a copy of FCC Public Notice DA 16-1048. IARP is a permit for operating in certain countries of the Americas. To foreign amateurs, communications are limited to those incidental to the purpose of the amateur service and personal remarks." caption="CEPT needs no /CEPT call sign suffix and no local-language ID.">
      {card(6, C.signal, 'CEPT', 'many European countries, both ways', 'carry a copy of FCC Public Notice DA 16-1048')}
      {card(326, C.resist, 'IARP', 'certain countries of the Americas', 'a permit for US amateurs')}
      <rect x={6} y={154} width={628} height={74} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={20} y={178} bold size={14}>Talking to foreign stations</T>
      <T x={20} y={206} size={14}>only things incidental to the amateur service, plus personal remarks</T>
    </Diagram>
  )
}
