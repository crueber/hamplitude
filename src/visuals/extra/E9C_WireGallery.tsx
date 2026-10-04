import { C, Diagram, Ln, T } from '../kit'

const Feed = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r={6} fill={C.fill} stroke={C.ink} strokeWidth={2} />

/** Four named wire antennas: where each is fed and how long it is. */
export function E9C_WireGallery() {
  const wy = 66 // wire height inside each panel
  const panel = (ox: number, oy: number) => ({ transform: `translate(${ox},${oy})` })
  return (
    <Diagram w={640} h={366} title="Four wire antennas. Off-center-fed dipole: fed between the center and one end. G5RV: center-fed through an open-wire line to a balun and coax. Zepp: an end-fed half-wavelength dipole. Extended double Zepp: a center-fed 1.25-wavelength dipole."
      caption="What to remember for each: where the feed goes, and how long the wire is.">
      <g {...panel(10, 8)}>
        <T x={150} y={14} anchor="middle" size={14} bold>Off-center-fed dipole</T>
        <Ln x1={20} y1={wy} x2={280} y2={wy} color={C.resist} width={5} />
        <Feed x={115} y={wy} />
        <Ln x1={115} y1={wy + 6} x2={115} y2={wy + 40} color={C.signal} width={3} />
        <T x={67} y={wy - 18} anchor="middle" size={12} color={C.muted}>short side</T>
        <T x={200} y={wy - 18} anchor="middle" size={12} color={C.muted}>long side</T>
        <T x={150} y={wy + 62} anchor="middle" size={12} color={C.good} bold>fed between center and one end</T>
        <T x={150} y={wy + 82} anchor="middle" size={12} color={C.muted}>similar impedance on several bands</T>
      </g>
      <g {...panel(330, 8)}>
        <T x={150} y={14} anchor="middle" size={14} bold>G5RV</T>
        <Ln x1={20} y1={wy - 10} x2={280} y2={wy - 10} color={C.resist} width={5} />
        <Feed x={150} y={wy - 10} />
        <Ln x1={146} y1={wy - 4} x2={146} y2={wy + 38} color={C.power} width={2.5} />
        <Ln x1={154} y1={wy - 4} x2={154} y2={wy + 38} color={C.power} width={2.5} />
        <rect x={138} y={wy + 38} width={24} height={18} rx={4} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={170} y={wy + 47} size={12} bold>balun</T>
        <Ln x1={150} y1={wy + 56} x2={150} y2={wy + 72} color={C.signal} width={3} />
        <T x={170} y={wy + 74} size={12} color={C.signal} bold>coax</T>
        <T x={134} y={wy + 14} anchor="end" size={12} color={C.power} bold>open-wire line</T>
        <T x={150} y={wy + 94} anchor="middle" size={12} color={C.muted}>center-fed through a set length of open-wire line</T>
      </g>
      <g {...panel(10, 200)}>
        <T x={150} y={14} anchor="middle" size={14} bold>Zepp</T>
        <Ln x1={20} y1={wy - 10} x2={250} y2={wy - 10} color={C.resist} width={5} />
        <Ln x1={20} y1={wy - 4} x2={20} y2={wy + 50} color={C.power} width={2.5} />
        <Ln x1={27} y1={wy - 10} x2={27} y2={wy + 50} color={C.power} width={2.5} />
        <Feed x={20} y={wy - 10} />
        <T x={36} y={wy + 40} size={12} color={C.power} bold>feeder, at the end</T>
        <T x={135} y={wy - 28} anchor="middle" size={12} color={C.muted}>½ wavelength</T>
        <Ln x1={20} y1={wy - 20} x2={250} y2={wy - 20} color={C.muted} width={1.5} arrow="both" />
        <T x={150} y={wy + 74} anchor="middle" size={12} color={C.good} bold>end-fed half-wave dipole</T>
      </g>
      <g {...panel(330, 200)}>
        <T x={150} y={14} anchor="middle" size={14} bold>Extended double Zepp</T>
        <Ln x1={20} y1={wy} x2={280} y2={wy} color={C.resist} width={5} />
        <Feed x={150} y={wy} />
        <Ln x1={150} y1={wy + 6} x2={150} y2={wy + 36} color={C.signal} width={3} />
        <Ln x1={20} y1={wy - 20} x2={280} y2={wy - 20} color={C.muted} width={1.5} arrow="both" />
        <T x={150} y={wy - 36} anchor="middle" size={12} color={C.muted}>1.25 wavelengths total</T>
        <T x={150} y={wy + 74} anchor="middle" size={12} color={C.good} bold>center-fed 1.25 λ dipole</T>
      </g>
    </Diagram>
  )
}
