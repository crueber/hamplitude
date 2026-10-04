import { useState } from 'react'
import { Antenna, C, Choice, Diagram, Ln, T } from '../kit'

/** Power lost in a feed line turns into heat. Foam dielectric loses less per foot. (Sizes are illustrative.) */
export function LineLoss() {
  const [foam, setFoam] = useState(false)
  const loss = foam ? 0.15 : 0.35
  const inW = 22
  const outW = inW * (1 - loss)
  const heat = foam ? 1 : 3
  return (
    <>
      <Diagram w={640} h={236} title={`Power from the transmitter travels down the coax. Some is lost and turns into heat, ${foam ? 'less with foam dielectric' : 'more with solid dielectric'}, so less reaches the antenna.`}
        caption="Lost power doesn't vanish: it warms the cable. Sizes are illustrative.">
        <rect x={10} y={92} width={104} height={64} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={62} y={124} anchor="middle" bold size={13}>Transmitter</T>
        <rect x={160} y={98} width={300} height={52} rx={26} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <T x={310} y={124} anchor="middle" size={13} bold color={C.muted}>{foam ? 'foam coax' : 'solid coax'}</T>
        <Ln x1={118} y1={124} x2={158} y2={124} color={C.power} width={inW} />
        <Ln x1={462} y1={124} x2={558} y2={124} color={C.power} width={outW} />
        <Antenna x={560} y={150} />
        <T x={560} y={176} anchor="middle" bold size={13}>Antenna</T>
        {Array.from({ length: heat }).map((_, i) => {
          const x = 310 + (i - (heat - 1) / 2) * 56
          return <path key={i} d={`M${x},92 q-8,-10 0,-20 t0,-20`} fill="none" stroke={C.resist} strokeWidth={3} strokeLinecap="round" />
        })}
        <T x={310} y={30} anchor="middle" bold size={13} color={C.resist}>{foam ? 'little heat' : 'more heat'}</T>
        <T x={140} y={196} anchor="middle" size={13} bold color={C.power}>full power in</T>
        <T x={480} y={196} anchor="middle" size={13} bold color={C.power}>{foam ? 'more reaches the antenna' : 'less reaches the antenna'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Cable" value={foam ? 'foam' : 'solid'} onChange={(v) => setFoam(v === 'foam')} options={[{ value: 'solid', label: 'Solid dielectric' }, { value: 'foam', label: 'Foam dielectric' }]} />
      </div>
    </>
  )
}
