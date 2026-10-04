import { Box, C, Diagram, Ln, T } from '../kit'

/** What is inside a microcontroller: a CPU, memory and a clock, plus peripherals that connect it to the outside world. */
export function Microcontrollers_Anatomy() {
  const left = [
    { y: 50, label: 'CPU', sub: 'runs the program step by step', col: C.power },
    { y: 112, label: 'Flash memory', sub: 'holds the program; kept when off', col: C.power },
    { y: 174, label: 'RAM', sub: 'working variables; lost when off', col: C.power },
    { y: 236, label: 'Clock', sub: 'sets the speed, in MHz', col: C.power },
  ]
  const right = [
    { y: 50, label: 'Digital pins (GPIO)', sub: 'read a paddle, switch a relay driver' },
    { y: 112, label: 'Analog input (ADC)', sub: 'read a voltage: a knob, a sensor' },
    { y: 174, label: 'Timers and PWM', sub: 'time dits, make tones, dim, drive' },
    { y: 236, label: 'Serial: UART, I²C, SPI', sub: 'talk to radios, GPS, displays' },
  ]
  return (
    <Diagram w={640} h={334} title="Inside a microcontroller: a CPU, flash memory for the program, RAM for variables and a clock, joined by an internal bus to peripherals: digital pins, an analog-to-digital converter, timers and PWM, and serial ports."
      caption="Everything on one chip: a tiny computer whose pins connect it to the real world.">
      <rect x={10} y={10} width={620} height={316} rx={14} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
      <T x={26} y={30} size={14} bold>One chip: the microcontroller</T>
      {left.map((b) => <g key={b.label}><Box x={30} y={b.y} w={200} h={52} label={b.label} sub={b.sub} color={b.col} size={14} /><Ln x1={230} y1={b.y + 26} x2={262} y2={b.y + 26} color={C.muted} width={2} /></g>)}
      <Ln x1={262} y1={76} x2={262} y2={262} color={C.muted} width={5} />
      <T x={262} y={304} anchor="middle" size={12} color={C.muted}>internal bus</T>
      {right.map((b) => <g key={b.label}><Ln x1={262} y1={b.y + 26} x2={292} y2={b.y + 26} color={C.muted} width={2} /><Box x={292} y={b.y} w={318} h={52} label={b.label} sub={b.sub} color={C.signal} size={14} /></g>)}
    </Diagram>
  )
}
