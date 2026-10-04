import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Link budget = TX power + antenna gains - system losses, as seen at the receiver. Margin = received - minimum needed. */
export function G8A_LinkBudget() {
  const [tx, setTx] = useState(30)
  const [gt, setGt] = useState(6)
  const [gr, setGr] = useState(6)
  const [loss, setLoss] = useState(130)
  const [min, setMin] = useState(-100)
  const rx = tx + gt - loss + gr
  const margin = rx - min
  const ok = margin >= 0
  const top = 50, bot = -150, y0 = 28, y1 = 262
  const Y = (v: number) => y0 + ((top - v) / (top - bot)) * (y1 - y0)
  const steps = [
    { label: 'Transmit power', from: bot, to: tx, col: C.power, val: `${tx} dBm` },
    { label: '+ TX antenna', from: tx, to: tx + gt, col: C.good, val: `+${gt} dB` },
    { label: '− System losses', from: tx + gt, to: tx + gt - loss, col: C.bad, val: `−${loss} dB` },
    { label: '+ RX antenna', from: tx + gt - loss, to: rx, col: C.good, val: `+${gr} dB` },
    { label: 'At the receiver', from: bot, to: rx, col: C.signal, val: `${rx} dBm` },
  ]
  const cw = 76, gap = 20, xs = 30
  return (
    <>
      <Diagram w={640} h={330} title={`Link budget: ${tx} dBm transmit power plus ${gt} and ${gr} dB antenna gains minus ${loss} dB losses gives ${rx} dBm at the receiver. Minimum needed is ${min} dBm, so the link margin is ${margin} dB`}
        caption="Budget = power + gains − losses, measured at the receiver. Margin = that level minus the minimum the receiver needs.">
        <Ln x1={xs - 8} y1={Y(0)} x2={500} y2={Y(0)} color={C.fill2} width={1.5} />
        <T x={498} y={Y(0) - 9} anchor="end" size={11.5} color={C.muted}>0 dBm</T>
        {steps.map((s, i) => {
          const x = xs + i * (cw + gap)
          const a = Math.min(Y(s.from), Y(s.to)), h = Math.max(3, Math.abs(Y(s.from) - Y(s.to)))
          const last = i === steps.length - 1
          return (
            <g key={s.label}>
              <rect x={x} y={a} width={cw} height={h} rx={5} fill={s.col} fillOpacity={last || i === 0 ? 0.3 : 0.85} stroke={s.col} strokeWidth={2} />
              <T x={x + cw / 2} y={y1 + 16} anchor="middle" size={12} bold>{s.label}</T>
              <T x={x + cw / 2} y={y1 + 36} anchor="middle" size={13} bold mono color={s.col}>{s.val}</T>
            </g>
          )
        })}
        <Ln x1={xs + 3 * (cw + gap)} y1={Y(min)} x2={636} y2={Y(min)} color={C.ink} width={2} dash="7 5" />
        <Ln x1={506} y1={Y(rx)} x2={506} y2={Y(min)} color={ok ? C.good : C.bad} width={3.5} arrow />
        <T x={518} y={Math.min(Y(rx), Y(min)) - 14} size={13} bold color={ok ? C.good : C.bad}>margin {ok ? '+' : ''}{margin} dB</T>
        <T x={518} y={Math.max(Y(rx), Y(min)) + 14} size={12} bold>minimum {min} dBm</T>
      </Diagram>
      <Controls>
        <Slider label="Transmit power" value={tx} min={10} max={50} onChange={setTx} format={(v) => `${v} dBm`} color="var(--d-power)" />
        <Slider label="TX antenna gain" value={gt} min={0} max={20} onChange={setGt} format={(v) => `${v} dB`} color="var(--d-good)" />
        <Slider label="RX antenna gain" value={gr} min={0} max={20} onChange={setGr} format={(v) => `${v} dB`} color="var(--d-good)" />
        <Slider label="System losses" value={loss} min={80} max={160} onChange={setLoss} format={(v) => `${v} dB`} color="var(--d-bad)" />
        <Slider label="Minimum needed" value={min} min={-130} max={-80} onChange={setMin} format={(v) => `${v} dBm`} color="var(--d-ink)" />
        <Readout label="Link budget" value={`${rx} dBm`} color="var(--d-signal)" />
        <Readout label="Link margin" value={`${margin} dB`} color={ok ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
