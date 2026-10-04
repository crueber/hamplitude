import { C, Capacitor, Diagram, Dot, Inductor, Lines, T, Wire } from '../kit'

const YT = 92, YB = 152, YM = 122

/** Low-pass L, Pi and T networks side by side. */
export function MatchingNetworks_Topologies() {
  const shunt = (x: number) => (
    <g>
      <Wire pts={[[x, YT], [x, YM - 22]]} />
      <Wire pts={[[x, YM + 22], [x, YB]]} />
      <Capacitor x={x} y={YM} rot={90} len={44} color={C.signal} />
      <Dot x={x} y={YT} /><Dot x={x} y={YB} />
    </g>
  )
  const panel = (ox: number, name: string, how: string, notes: string[]) => (
    <g transform={`translate(${ox},0)`}>
      <T x={100} y={26} anchor="middle" size={16} bold>{name}</T>
      <T x={100} y={48} anchor="middle" size={12.5} color={C.muted}>{how}</T>
      <Wire pts={[[6, YB], [194, YB]]} />
      <Lines x={100} y={190} lines={notes} anchor="middle" size={12.5} color={C.muted} lh={18} />
    </g>
  )
  return (
    <Diagram w={640} h={262}
      title="Three matching network shapes in their low-pass form. The L network has one series inductor and one shunt capacitor. The Pi network has a shunt capacitor at each end of a series inductor. The T network has a series inductor at each end of a shunt capacitor."
      caption="Low-pass forms shown. Swap each inductor for a capacitor and vice versa for the high-pass form.">
      {/* L */}
      {panel(10, 'L network', 'one series part, one shunt', ['Simplest. Its Q is fixed', 'by the two resistances.'])}
      <g transform="translate(10,0)">
        <Wire pts={[[6, YT], [30, YT]]} /><Inductor x={70} y={YT} len={80} label="L" color={C.signal} />
        <Wire pts={[[110, YT], [194, YT]]} />
        <g transform="translate(0,0)">{shunt(110)}</g>
      </g>
      {/* Pi */}
      {panel(225, 'Pi network', 'shunt, series, shunt', ['Q can be chosen. High Q filters', 'harmonics: amplifier outputs.'])}
      <g transform="translate(225,0)">
        <Wire pts={[[6, YT], [40, YT]]} />{shunt(40)}
        <Wire pts={[[40, YT], [65, YT]]} /><Inductor x={100} y={YT} len={70} label="L" color={C.signal} />
        <Wire pts={[[135, YT], [160, YT]]} />{shunt(160)}
        <Wire pts={[[160, YT], [194, YT]]} />
      </g>
      {/* T */}
      {panel(440, 'T network', 'series, shunt, series', ['Q can be chosen. A common', 'shape for manual tuners.'])}
      <g transform="translate(440,0)">
        <Wire pts={[[6, YT], [16, YT]]} /><Inductor x={46} y={YT} len={60} label="L" color={C.signal} />
        <Wire pts={[[76, YT], [124, YT]]} />{shunt(100)}
        <Inductor x={154} y={YT} len={60} label="L" color={C.signal} /><Wire pts={[[184, YT], [194, YT]]} />
      </g>
    </Diagram>
  )
}
