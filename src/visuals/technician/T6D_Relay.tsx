import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, Wire, Battery, Switch, Inductor, useTime } from '../kit'
import { LampDome } from '@/visuals/shared/SchematicSymbolGallery'

type P = [number, number][]

/** A relay: a small control current makes an electromagnet that closes a switch in a separate circuit. */
export function Relay() {
  const [on, setOn] = useState<'off' | 'on'>('off')
  const closed = on === 'on'
  const { t, ref } = useTime(1)

  function dots(path: P, n: number, skip: (x: number, y: number) => boolean) {
    const segs = path.slice(0, -1).map((p, i) => ({ a: p, b: path[i + 1], len: Math.hypot(path[i + 1][0] - p[0], path[i + 1][1] - p[1]) }))
    const perim = segs.reduce((s, g) => s + g.len, 0)
    return Array.from({ length: n }, (_, k) => {
      let d = (((k / n) * perim + t * 50) % perim + perim) % perim
      for (const g of segs) {
        if (d <= g.len) return { x: g.a[0] + ((g.b[0] - g.a[0]) * d) / g.len, y: g.a[1] + ((g.b[1] - g.a[1]) * d) / g.len }
        d -= g.len
      }
      return { x: 0, y: 0 }
    }).filter((p) => !skip(p.x, p.y))
  }
  const ctl: P = [[50, 70], [210, 70], [210, 230], [50, 230], [50, 70]]
  const load: P = [[590, 150], [590, 70], [360, 70], [360, 230], [590, 230], [590, 150]]
  const inSym = (x: number, y: number) =>
    (x === 50 && y > 108 && y < 192) || (y === 70 && x > 95 && x < 165) || (x === 210 && y > 105 && y < 195) ||
    (x === 590 && y > 108 && y < 192) || (y === 70 && x > 430 && x < 520) || (x === 360 && y > 110 && y < 190)

  return (
    <>
      <Diagram w={640} h={290} svgRef={ref} title={`A relay. A small control circuit energizes a coil, an electromagnet, which closes a switch in a separate circuit. Coil is ${closed ? 'energized and the lamp is on' : 'off and the lamp is off'}.`}
        caption="The coil is an electromagnet. Its small current closes a switch in a different circuit.">
        <T x={130} y={26} anchor="middle" bold size={15}>Control circuit</T>
        <T x={475} y={26} anchor="middle" bold size={15}>Load circuit</T>
        <Wire pts={ctl} color={C.muted} width={2.5} />
        <Wire pts={load} color={C.muted} width={2.5} />
        <rect x={34} y={110} width={32} height={80} fill={C.bg} />
        <Battery x={50} y={150} rot={90} len={80} color={C.voltage} />
        <rect x={92} y={52} width={76} height={36} fill={C.bg} />
        <Switch x={130} y={70} len={70} closed={closed} />
        <rect x={196} y={108} width={28} height={84} fill={C.bg} />
        <Inductor x={210} y={150} rot={90} len={80} color={closed ? C.good : C.ink} />
        <T x={240} y={150} size={13} bold color={C.muted}>coil</T>
        <rect x={574} y={110} width={32} height={80} fill={C.bg} />
        <Battery x={590} y={150} rot={90} len={80} cells={2} color={C.voltage} />
        <g transform="translate(475,62)">
          {closed && <circle cx={0} cy={-4} r={24} fill={C.resist} opacity={0.5} />}
          <rect x={-40} y={-26} width={80} height={44} fill={closed ? 'transparent' : C.bg} />
          <LampDome len={80} />
        </g>
        <rect x={344} y={112} width={32} height={76} fill={C.bg} />
        <Switch x={360} y={150} rot={90} len={70} closed={closed} color={closed ? C.good : C.ink} />
        <T x={376} y={196} size={13} bold color={C.muted}>relay contacts</T>
        <Ln x1={256} y1={118} x2={338} y2={118} color={C.power} width={2.5} dash="5 4" arrow={closed} />
        <T x={297} y={102} anchor="middle" size={12} bold color={C.power}>magnetic pull</T>
        {closed && dots(ctl, 7, inSym).map((d, k) => <circle key={`c${k}`} cx={d.x} cy={d.y} r={3.5} fill={C.current} />)}
        {closed && dots(load, 14, inSym).map((d, k) => <circle key={`l${k}`} cx={d.x} cy={d.y} r={4.5} fill={C.current} />)}
        <T x={130} y={262} anchor="middle" size={13} color={C.muted}>small current</T>
        <T x={475} y={262} anchor="middle" size={13} color={C.muted}>separate circuit</T>
      </Diagram>
      <Choice label="Control switch" value={on} onChange={setOn} options={[{ value: 'off', label: 'Control switch open' }, { value: 'on', label: 'Control switch closed' }]} />
    </>
  )
}
