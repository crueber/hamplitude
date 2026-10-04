import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Trap dipole: a parallel LC trap blocks its own frequency (short antenna on the high band) and acts like a coil on the low band. */
export function G9D_Trap() {
  const [band, setBand] = useState<'high' | 'low'>('high')
  const hi = band === 'high'
  const cx = 320, y = 105, inner = 85, outer = 90, tw = 36
  const trapL = [cx - inner - tw, cx - inner], trapR = [cx + inner, cx + inner + tw]
  const act = hi ? C.voltage : C.voltage
  const dim = C.muted
  return (
    <>
      <Diagram w={640} h={240} title={`Trap dipole on the ${hi ? 'higher' : 'lower'} band: ${hi ? 'the traps block the signal, so only the inner sections radiate and the antenna is short' : 'the traps pass the signal and act as loading coils, so the whole wire radiates and the antenna is long'}`}
        caption="A trap is a parallel coil and capacitor tuned to the higher band. It isolates the outer wire there, so one antenna resonates on two bands.">
        <Ln x1={trapL[0] - outer} y1={y} x2={trapL[0]} y2={y} color={hi ? dim : act} width={hi ? 4 : 6} dash={hi ? '6 6' : undefined} />
        <Ln x1={trapR[1]} y1={y} x2={trapR[1] + outer} y2={y} color={hi ? dim : act} width={hi ? 4 : 6} dash={hi ? '6 6' : undefined} />
        <Ln x1={trapL[1]} y1={y} x2={trapR[0]} y2={y} color={act} width={6} />
        {[trapL, trapR].map((t, i) => (
          <g key={i}>
            <rect x={t[0]} y={y - 18} width={tw} height={36} rx={6} fill={C.fill} stroke={hi ? C.bad : C.power} strokeWidth={2.5} />
            <T x={(t[0] + t[1]) / 2} y={y} anchor="middle" size={12} bold color={hi ? C.bad : C.power}>L ‖ C</T>
            <T x={(t[0] + t[1]) / 2} y={y + 32} anchor="middle" size={12} bold color={hi ? C.bad : C.power}>trap</T>
          </g>
        ))}
        <circle cx={cx} cy={y} r={6} fill={C.ink} />
        <T x={cx} y={y - 24} anchor="middle" size={13} bold>feed</T>
        <T x={trapL[0] - outer / 2} y={y - 22} anchor="middle" size={13} bold color={hi ? dim : act}>{hi ? 'cut off' : 'in use'}</T>
        <T x={trapR[1] + outer / 2} y={y - 22} anchor="middle" size={13} bold color={hi ? dim : act}>{hi ? 'cut off' : 'in use'}</T>
        <T x={cx} y={175} anchor="middle" size={15} bold color={hi ? C.bad : C.power}>{hi ? 'High band: trap blocks, only the inner wire radiates' : 'Low band: trap acts as a coil, the whole wire radiates'}</T>
        <T x={cx} y={205} anchor="middle" size={13} color={C.muted}>{hi ? 'short antenna for the higher frequency' : 'long antenna for the lower frequency'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Operating band" value={band} onChange={setBand} options={[{ value: 'high', label: 'Higher band' }, { value: 'low', label: 'Lower band' }]} />
      </div>
    </>
  )
}
