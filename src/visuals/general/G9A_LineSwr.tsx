import { useState } from 'react'
import { C, Box, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** SWR at the antenna vs at the radio: loss hides it, a tuner hides it, neither removes it. */
export function G9A_LineSwr() {
  const [swrL, setSwrL] = useState(5)
  const [loss, setLoss] = useState(3)
  const [tuner, setTuner] = useState(false)
  const gL = (swrL - 1) / (swrL + 1)
  const gIn = gL * Math.pow(10, -loss / 10) // round trip: 2 x loss dB in power, so amplitude /10^(loss/10)
  const swrIn = (1 + gIn) / (1 - gIn)
  const W = 640, H = 230, ly = 118
  const lx0 = tuner ? 250 : 130
  return (
    <>
      <Diagram w={W} h={H} title={`Load SWR ${fmt(swrL, 2)} to 1 on a line with ${fmt(loss, 2)} dB loss reads ${fmt(swrIn, 3)} to 1 at the line input. ${tuner ? 'A tuner makes the radio see 1 to 1 but the line SWR is unchanged' : ''}`}
        caption="Loss makes the input SWR look better than the antenna's. A tuner makes the radio happy but cannot change the SWR on the line.">
        <Box x={12} y={ly - 34} w={92} h={68} label="Radio" color={C.ink} />
        {tuner && <Box x={126} y={ly - 34} w={100} h={68} label="Tuner" sub="1:1 at radio" color={C.power} />}
        {tuner && <Ln x1={104} y1={ly} x2={126} y2={ly} color={C.ink} width={4} />}
        <Ln x1={tuner ? 226 : 104} y1={ly} x2={506} y2={ly} color={C.ink} width={5} />
        <Box x={506} y={ly - 34} w={122} h={68} label="Antenna" color={C.resist} />
        <T x={(lx0 + 506) / 2} y={ly - 22} anchor="middle" size={13} color={C.muted}>feed line, {fmt(loss, 2)} dB loss</T>
        <T x={lx0 + 8} y={ly + 40} size={13} color={C.muted}>SWR at line input</T>
        <T x={lx0 + 8} y={ly + 62} size={18} bold color={C.power}>{fmt(swrIn, 3)} : 1</T>
        <T x={494} y={ly + 40} anchor="end" size={13} color={C.muted}>SWR at antenna end</T>
        <T x={494} y={ly + 62} anchor="end" size={18} bold color={C.bad}>{fmt(swrL, 3)} : 1</T>
        {tuner && <T x={176} y={ly + 54} anchor="middle" size={13} bold color={C.good}>radio sees 1:1</T>}
        <T x={320} y={26} anchor="middle" size={14} bold color={C.ink}>A mismatch at the antenna end bounces power along the whole line</T>
      </Diagram>
      <Controls>
        <Slider label="SWR at the antenna" value={swrL} min={1} max={10} step={0.1} onChange={setSwrL} format={(v) => `${fmt(v, 2)} : 1`} color="var(--d-bad)" />
        <Slider label="Line loss" value={loss} min={0} max={6} step={0.1} onChange={setLoss} format={(v) => `${fmt(v, 2)} dB`} color="var(--d-resist)" />
        <Readout label="SWR measured at line input" value={`${fmt(swrIn, 3)} : 1`} color="var(--d-power)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Matching network at the radio" value={tuner ? 'on' : 'off'} onChange={(v) => setTuner(v === 'on')} options={[{ value: 'off', label: 'No tuner' }, { value: 'on', label: 'Tuner at transmitter end' }]} />
      </div>
    </>
  )
}
