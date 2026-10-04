import { C, Diagram, Ln, T } from '../kit'

/** Anatomy of a US call sign and which format is Group D. */
export function T1C_CallSign() {
  const cw = 31 // approx. width of one 52px mono glyph
  const x0 = 320 - 3 * cw
  const rows = [
    { c: 'W1XX', p: '1 + 2 letters', v: 'not Group D', ok: false },
    { c: 'KA1X', p: '2 + 1 letters', v: 'not Group D', ok: false },
    { c: 'KF1XXX', p: '2 + 3 letters', v: 'Group D', ok: true },
  ]
  return (
    <Diagram w={640} h={290} title="A call sign is a prefix of one or two letters, one number, and a suffix of one to three letters. KF1XXX has two prefix letters and three suffix letters, which is the Group D format" caption="Count the letters before and after the number.">
      <text x={x0} y={44} fontSize={52} fontWeight={700} style={{ fontFamily: 'var(--font-mono)' }} dominantBaseline="central" textAnchor="start">
        <tspan fill={C.signal}>KF</tspan>
        <tspan fill={C.resist}>1</tspan>
        <tspan fill={C.power}>XXX</tspan>
      </text>
      <T x={x0 + cw} y={92} anchor="middle" size={13} bold color={C.signal}>prefix</T>
      <T x={x0 + cw} y={108} anchor="middle" size={12} color={C.muted}>1–2 letters</T>
      <T x={x0 + 2.5 * cw} y={9} anchor="middle" size={13} bold color={C.resist}>number</T>
      <T x={x0 + 4.5 * cw} y={92} anchor="middle" size={13} bold color={C.power}>suffix</T>
      <T x={x0 + 4.5 * cw} y={108} anchor="middle" size={12} color={C.muted}>1–3 letters</T>
      <Ln x1={10} y1={136} x2={630} y2={136} color={C.fill2} width={2} />
      <T x={40} y={158} size={12.5} bold color={C.muted}>call sign</T>
      <T x={250} y={158} size={12.5} bold color={C.muted}>prefix + suffix</T>
      <T x={470} y={158} size={12.5} bold color={C.muted}>group</T>
      {rows.map((r, i) => (
        <g key={r.c}>
          {r.ok && <rect x={10} y={178 + i * 36} width={620} height={32} rx={8} fill={C.good} fillOpacity={0.15} />}
          <T x={40} y={194 + i * 36} bold mono size={17}>{r.c}</T>
          <T x={250} y={194 + i * 36} size={14}>{r.p}</T>
          <T x={470} y={194 + i * 36} bold size={14} color={r.ok ? C.good : C.muted}>{r.ok ? '✓ ' : '✗ '}{r.v}</T>
        </g>
      ))}
    </Diagram>
  )
}
