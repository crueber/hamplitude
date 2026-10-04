import { C, Diagram, Ln, T } from '../kit'

/** A balanced line (equal and opposite currents) and the three common forms, with nominal impedances. */
export function OpenWireLine_Balanced() {
  const types = [
    { x: 20, name: 'Twin-lead', z: 'about 300 Ω', gap: 22, kind: 'web' },
    { x: 230, name: 'Window line', z: 'about 450 Ω', gap: 40, kind: 'window' },
    { x: 440, name: 'Open-wire line', z: 'about 600 Ω, varies', gap: 66, kind: 'open' },
  ] as const
  const y0 = 262
  return (
    <Diagram w={640} h={372}
      title="A balanced feed line has two parallel wires carrying equal and opposite currents, held apart by spacers. Three common forms are twin-lead, window line and open-wire line, with typical impedances of about 300, 450 and 600 ohms."
      caption="Equal and opposite currents make the two wires' fields cancel. More spacing and more air mean higher Z0 and lower loss. Impedances are typical.">
      <T x={20} y={20} size={14} bold>Balanced line: the two wires carry equal and opposite current</T>
      <Ln x1={30} y1={62} x2={610} y2={62} color={C.ink} width={4} />
      <Ln x1={30} y1={128} x2={610} y2={128} color={C.ink} width={4} />
      {[100, 240, 380, 520].map((x) => (
        <Ln key={x} x1={x} y1={62} x2={x} y2={128} color={C.muted} width={5} />
      ))}
      <Ln x1={262} y1={62} x2={358} y2={62} color={C.current} width={3} arrow />
      <Ln x1={358} y1={128} x2={262} y2={128} color={C.current} width={3} arrow />
      <T x={310} y={46} anchor="middle" size={12.5} bold color={C.current}>current out</T>
      <T x={310} y={146} anchor="middle" size={12.5} bold color={C.current}>same current back</T>
      <Ln x1={440} y1={66} x2={440} y2={124} color={C.muted} width={1.5} arrow="both" />
      <T x={450} y={95} size={12.5} color={C.muted}>spacing</T>
      <T x={100} y={146} anchor="middle" size={12.5} color={C.muted}>spacer</T>
      <T x={320} y={186} anchor="middle" size={13} color={C.muted}>Each wire's field is cancelled by the other's, so a balanced line radiates very little.</T>

      {types.map((t) => {
        const w = 170
        const ya = y0 - t.gap / 2, yb = y0 + t.gap / 2
        return (
          <g key={t.name}>
            {t.kind === 'web' && <rect x={t.x} y={ya} width={w} height={t.gap} fill={C.fill2} stroke="none" />}
            {t.kind === 'window' && (
              <>
                <rect x={t.x} y={ya} width={w} height={t.gap} fill={C.fill2} stroke="none" />
                {[0, 1, 2].map((i) => <rect key={i} x={t.x + 14 + i * 52} y={ya + 7} width={34} height={t.gap - 14} rx={3} fill={C.bg} />)}
              </>
            )}
            {t.kind === 'open' && [0, 1, 2].map((i) => (
              <Ln key={i} x1={t.x + 10 + i * 75} y1={ya} x2={t.x + 10 + i * 75} y2={yb} color={C.muted} width={5} />
            ))}
            <Ln x1={t.x} y1={ya} x2={t.x + w} y2={ya} color={C.ink} width={3.5} />
            <Ln x1={t.x} y1={yb} x2={t.x + w} y2={yb} color={C.ink} width={3.5} />
            <T x={t.x + w / 2} y={312} anchor="middle" size={14} bold>{t.name}</T>
            <T x={t.x + w / 2} y={334} anchor="middle" size={12.5} color={C.muted}>{t.z}</T>
          </g>
        )
      })}
      <T x={20} y={226} size={13} bold color={C.muted}>Common forms (side view)</T>
      <T x={320} y={360} anchor="middle" size={12.5} color={C.muted}>Mostly air between the wires: lowest loss. Solid web: easier to handle, but wet or dirty web adds loss.</T>
    </Diagram>
  )
}
