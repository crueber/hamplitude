import { Box, C, Diagram, Ln, T } from '../kit'

/** A repeatable fault-finding routine: symptom, power, look, then half-split until one stage is left. */
export function Troubleshooting_Flow() {
  const sx = 65, sw = 250, cx = sx + sw / 2, rx = 395, rw = 225, h = 44
  const ys = [10, 74, 138, 202, 266, 330, 394]
  const mid = (i: number) => ys[i] + h / 2
  const down = (i: number) => <Ln x1={cx} y1={ys[i] + h + 1} x2={cx} y2={ys[i + 1] - 1} width={2} arrow />
  const side = (i: number, label: string) => (
    <g>
      <Ln x1={sx + sw + 1} y1={mid(i)} x2={rx - 1} y2={mid(i)} width={2} arrow />
      <T x={(sx + sw + rx) / 2} y={mid(i) - 11} anchor="middle" size={12.5} bold color={C.muted}>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={458}
      title="A troubleshooting flowchart. Define the symptom. Check for power; if none, fix that first. Look, smell and wiggle for an obvious fault and fix it. Otherwise test the middle of the signal path and decide which half holds the fault, repeating until one stage is left, then measure, repair and retest."
      caption="Change one thing at a time, and retest after every change.">
      <Box x={sx} y={ys[0]} w={sw} h={h} label="1  Define the symptom" sub="what, when, always or intermittent?" color={C.signal} />
      {down(0)}
      <Box x={sx} y={ys[1]} w={sw} h={h} label="2  Is there power?" sub="supply, fuse, switch, connectors" color={C.resist} />
      {side(1, 'No')}
      <Box x={rx} y={ys[1]} w={rw} h={h} label="Fix the power first" sub="then start again" color={C.bad} />
      {down(1)}
      <T x={cx + 8} y={(ys[1] + h + ys[2]) / 2} size={12.5} bold color={C.muted}>Yes</T>
      <Box x={sx} y={ys[2]} w={sw} h={h} label="3  Look, smell, wiggle" sub="burnt parts, loose wires, bad joints" color={C.signal} />
      {down(2)}
      <Box x={sx} y={ys[3]} w={sw} h={h} label="4  Anything obvious?" sub="a found fault is a lucky fault" color={C.resist} />
      {side(3, 'Yes')}
      <Box x={rx} y={ys[3]} w={rw} h={h} label="Fix it, then retest" sub="did the symptom go away?" color={C.good} />
      {down(3)}
      <T x={cx + 8} y={(ys[3] + h + ys[4]) / 2} size={12.5} bold color={C.muted}>No</T>
      <Box x={sx} y={ys[4]} w={sw} h={h} label="5  Test the middle" sub="split the signal path in half" color={C.signal} />
      {down(4)}
      <Box x={sx} y={ys[5]} w={sw} h={h} label="6  Signal good there?" sub="compare with what you expect" color={C.resist} />
      {side(5, 'answer')}
      <Box x={rx} y={ys[5]} w={rw} h={h} label="Yes: look after that point" sub="No: look before it" color={C.power} />
      <Ln x1={rx + rw / 2} y1={ys[5] - 1} x2={rx + rw / 2} y2={mid(4)} width={2} dash="5 4" color={C.power} />
      <Ln x1={rx + rw / 2} y1={mid(4)} x2={sx + sw + 2} y2={mid(4)} width={2} dash="5 4" color={C.power} arrow />
      <T x={rx + rw / 2 + 8} y={ys[5] - 16} size={12} bold color={C.power}>repeat on that half</T>
      {down(5)}
      <T x={cx + 8} y={(ys[5] + h + ys[6]) / 2} size={12.5} bold color={C.muted}>one stage left</T>
      <Box x={sx} y={ys[6]} w={sw} h={h} label="7  Measure, repair, retest" sub="voltages, then parts" color={C.good} />
    </Diagram>
  )
}
