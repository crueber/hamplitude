import { C, Diagram, T, Transistor } from '../kit'

/** Where the signal goes in and comes out for the three ways of wiring one transistor (or tube). */
export function Configs() {
  const cols = [
    { x: 110, name: 'Common emitter', tube: 'common cathode', inP: 'base', outP: 'collector', common: 'emitter', phase: 'inverted', zin: 'medium', note: 'voltage gain' },
    { x: 320, name: 'Common collector', tube: 'cathode follower', inP: 'base', outP: 'emitter', common: 'collector', phase: 'in phase', zin: 'high', note: 'emitter follower' },
    { x: 530, name: 'Common base', tube: 'grounded grid', inP: 'emitter', outP: 'collector', common: 'base', phase: 'in phase', zin: 'LOW', note: 'grounded grid' },
  ]
  return (
    <Diagram w={640} h={300} title="Three amplifier configurations. Common emitter: input at base, output at collector, output inverted. Common collector or emitter follower: input at base, output at emitter, in phase. Common base or grounded grid: input at emitter, output at collector, in phase, low input impedance."
      caption="Name the leg that is shared by input and output. That is the 'common' one.">
      {cols.map((c) => {
        const pos = (part: string) => (part === 'base' ? [c.x - 30, 110] : part === 'collector' ? [c.x + 14, 70] : [c.x + 14, 150])
        const [ix, iy] = pos(c.inP)
        const [ox, oy] = pos(c.outP)
        return (
          <g key={c.name}>
            <T x={c.x} y={18} anchor="middle" bold size={14}>{c.name}</T>
            <T x={c.x} y={36} anchor="middle" size={12} color={C.muted}>{c.tube} (tube)</T>
            <Transistor x={c.x} y={110} kind="npn" />
            <circle cx={ix} cy={iy} r={6} fill={C.signal} />
            <circle cx={ox} cy={oy} r={6} fill={C.power} />
            <T x={ix + (c.inP === 'base' ? -10 : 14)} y={iy + (c.inP === 'base' ? -16 : 4)} anchor={c.inP === 'base' ? 'end' : 'start'} size={13} bold color={C.signal}>in</T>
            <T x={ox + 14} y={oy + 4} size={13} bold color={C.power}>out</T>
            <T x={c.x} y={196} anchor="middle" size={13} color={C.muted}>common: <tspan fontWeight={700} fill={C.ink}>{c.common}</tspan></T>
            <rect x={c.x - 96} y={214} width={192} height={74} rx={10} fill={C.fill} />
            <T x={c.x} y={232} anchor="middle" size={13}>output <tspan fontWeight={700}>{c.phase}</tspan></T>
            <T x={c.x} y={252} anchor="middle" size={13}>input impedance <tspan fontWeight={700} fill={c.zin === 'LOW' ? C.bad : C.ink}>{c.zin}</tspan></T>
            <T x={c.x} y={272} anchor="middle" size={13} color={C.muted}>{c.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
