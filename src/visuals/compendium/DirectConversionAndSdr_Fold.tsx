import { C, Diagram, Ln, T } from '../kit'

const AX = (x0: number, x1: number, kHz: number, lo: number, hi: number) => x0 + ((kHz - lo) / (hi - lo)) * (x1 - x0)

function Spike({ x, y, h, color, label }: { x: number; y: number; h: number; color: string; label?: string }) {
  return (
    <g>
      <Ln x1={x} y1={y} x2={x} y2={y - h} color={color} width={4} />
      {label && <T x={x} y={y - h - 10} anchor="middle" size={12} bold color={color}>{label}</T>}
    </g>
  )
}

/** Why a single mixer cannot tell the two sides of the local oscillator apart, and two mixers 90 degrees apart (I and Q) can. */
export function DirectConversionAndSdr_Fold() {
  const aY = 128, bY = 330
  // input axis: 14.197..14.203 MHz around LO 14.200, drawn x 30..270
  const inX = (k: number) => AX(30, 270, k, -3, 3)
  const oneX = (k: number) => AX(400, 610, k, 0, 3)
  const iqX = (k: number) => AX(380, 610, k, -3, 3)
  return (
    <Diagram w={640} h={372}
      title="Direct conversion. Two signals, 1 kHz above and 1 kHz below a 14.200 MHz local oscillator, are mixed down to baseband. A single mixer folds both onto the same 1 kHz audio tone, so you cannot tell which side each came from. Two mixers 90 degrees apart (I and Q) keep them on opposite sides, plus 1 kHz and minus 1 kHz, so software can separate them."
      caption="Local oscillator at 14.200 MHz, the same frequency as the signal. One mixer folds the two sides together; I and Q keep them apart.">
      <T x={20} y={16} bold size={14}>One mixer</T>
      <T x={500} y={16} size={12.5} color={C.muted}>audio after the mixer</T>

      <Ln x1={24} y1={aY} x2={276} y2={aY} color={C.muted} width={1.5} />
      <Ln x1={inX(0)} y1={aY} x2={inX(0)} y2={aY - 66} color={C.resist} width={2.5} dash="4 4" />
      <T x={inX(0)} y={aY - 78} anchor="middle" size={12} bold color={C.resist}>LO 14.200</T>
      <Spike x={inX(-1)} y={aY} h={52} color={C.power} label="14.199" />
      <Spike x={inX(1)} y={aY} h={52} color={C.signal} label="14.201" />
      <T x={inX(-1)} y={aY + 16} anchor="middle" size={12} color={C.muted}>−1 kHz</T>
      <T x={inX(1)} y={aY + 16} anchor="middle" size={12} color={C.muted}>+1 kHz</T>
      <Ln x1={286} y1={aY - 30} x2={378} y2={aY - 30} color={C.ink} width={2.5} arrow />
      <T x={332} y={aY - 44} anchor="middle" size={12} color={C.muted}>mixer</T>

      <Ln x1={396} y1={aY} x2={620} y2={aY} color={C.muted} width={1.5} />
      <Ln x1={oneX(1) - 4} y1={aY} x2={oneX(1) - 4} y2={aY - 52} color={C.power} width={4} />
      <Ln x1={oneX(1) + 4} y1={aY} x2={oneX(1) + 4} y2={aY - 52} color={C.signal} width={4} />
      <T x={oneX(1)} y={aY - 64} anchor="middle" size={12} bold color={C.ink}>both at 1 kHz</T>
      <T x={oneX(1)} y={aY + 16} anchor="middle" size={12} color={C.muted}>1 kHz</T>
      <T x={510} y={aY + 38} anchor="middle" size={12.5} color={C.bad} bold>which side was it? Lost.</T>

      <Ln x1={20} y1={204} x2={620} y2={204} color={C.muted} width={1} dash="3 5" />

      <T x={20} y={224} bold size={14}>Two mixers, 90° apart (I and Q)</T>
      <Ln x1={24} y1={bY} x2={276} y2={bY} color={C.muted} width={1.5} />
      <Ln x1={inX(0)} y1={bY} x2={inX(0)} y2={bY - 66} color={C.resist} width={2.5} dash="4 4" />
      <T x={inX(0)} y={bY - 78} anchor="middle" size={12} bold color={C.resist}>LO 14.200</T>
      <Spike x={inX(-1)} y={bY} h={52} color={C.power} label="14.199" />
      <Spike x={inX(1)} y={bY} h={52} color={C.signal} label="14.201" />
      <T x={inX(-1)} y={bY + 16} anchor="middle" size={12} color={C.muted}>−1 kHz</T>
      <T x={inX(1)} y={bY + 16} anchor="middle" size={12} color={C.muted}>+1 kHz</T>
      <Ln x1={286} y1={bY - 30} x2={368} y2={bY - 30} color={C.ink} width={2.5} arrow />
      <T x={327} y={bY - 44} anchor="middle" size={12} color={C.muted}>I and Q</T>

      <Ln x1={372} y1={bY} x2={620} y2={bY} color={C.muted} width={1.5} />
      <Ln x1={iqX(0)} y1={bY} x2={iqX(0)} y2={bY - 30} color={C.muted} width={1.5} />
      <T x={iqX(0)} y={bY + 16} anchor="middle" size={12} color={C.muted}>0</T>
      <Spike x={iqX(-1)} y={bY} h={52} color={C.power} />
      <Spike x={iqX(1)} y={bY} h={52} color={C.signal} />
      <T x={iqX(-1)} y={bY + 16} anchor="middle" size={12} color={C.muted}>−1 kHz</T>
      <T x={iqX(1)} y={bY + 16} anchor="middle" size={12} color={C.muted}>+1 kHz</T>
      <T x={496} y={bY - 74} anchor="middle" size={12.5} color={C.good} bold>two sides stay separate</T>
      <T x={496} y={bY - 58} anchor="middle" size={12} color={C.muted}>sign of frequency is kept</T>
    </Diagram>
  )
}
