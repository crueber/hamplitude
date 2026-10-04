import { C, Capacitor, Diagram, Inductor, Ln, T, useTime } from '../kit'

/** A capacitor stores energy in an electric field; an inductor stores it in a magnetic field. */
export function Storage() {
  const { t, ref } = useTime(1)
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(t * 1.6))
  const bumps = Array(5).fill('a12,20 0 0 1 24,0').join(' ')
  return (
    <Diagram w={640} h={308} svgRef={ref}
      title="A capacitor stores energy in an electric field between two plates; its unit is the farad. An inductor stores energy in the magnetic field around a coil; its unit is the henry."
      caption="Red arrows: electric field. Blue loops: magnetic field.">
      {/* capacitor */}
      <Capacitor x={160} y={44} len={90} label="C" color={C.ink} />
      <Ln x1={96} y1={120} x2={224} y2={120} color={C.ink} width={6} />
      <Ln x1={96} y1={190} x2={224} y2={190} color={C.ink} width={6} />
      {[116, 146, 176, 206].map((x) => (
        <g key={x} opacity={pulse}>
          <Ln x1={x} y1={130} x2={x} y2={177} color={C.voltage} width={3} arrow />
        </g>
      ))}
      {[110, 150, 190].map((x) => <T key={x} x={x + 6} y={104} anchor="middle" bold size={16} color={C.voltage}>+</T>)}
      {[110, 150, 190].map((x) => <T key={x} x={x + 6} y={208} anchor="middle" bold size={18} color={C.muted}>−</T>)}
      <T x={160} y={242} anchor="middle" bold size={17}>Capacitance (C)</T>
      <T x={160} y={265} anchor="middle" size={14}>stores energy in an</T>
      <T x={160} y={283} anchor="middle" size={14} bold color={C.voltage}>electric field</T>
      <T x={290} y={150} anchor="end" size={15} bold color={C.ink}>farad</T>
      <T x={290} y={170} anchor="end" size={20} bold color={C.ink}>F</T>

      {/* inductor */}
      <Inductor x={480} y={44} len={90} label="L" color={C.ink} />
      <g opacity={pulse} fill="none" stroke={C.current} strokeWidth={3} strokeLinecap="round">
        <path d="M552,158 C552,92 408,92 408,158" />
        <path d="M552,158 C552,224 408,224 408,158" />
        <Ln x1={498} y1={108.5} x2={462} y2={108.5} color={C.current} width={3} arrow />
        <Ln x1={498} y1={207.5} x2={462} y2={207.5} color={C.current} width={3} arrow />
      </g>
      <path d={`M420,158 ${bumps}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <T x={480} y={242} anchor="middle" bold size={17}>Inductance (L)</T>
      <T x={480} y={265} anchor="middle" size={14}>stores energy in a</T>
      <T x={480} y={283} anchor="middle" size={14} bold color={C.current}>magnetic field</T>
      <T x={620} y={150} anchor="end" size={15} bold color={C.ink}>henry</T>
      <T x={620} y={170} anchor="end" size={20} bold color={C.ink}>H</T>
    </Diagram>
  )
}
