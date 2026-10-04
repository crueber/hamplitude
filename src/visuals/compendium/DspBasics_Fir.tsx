import { useMemo, useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, TAU } from '../kit'

const N = 200 // samples shown
const CYCLES = 5
const PERIOD = N / CYCLES

/** A moving-average FIR filter: each output is the average of the last few samples. More taps smooth more noise, but smear the wanted signal too. */
export function DspBasics_Fir() {
  const [taps, setTaps] = useState(9)
  const { clean, noisy } = useMemo(() => {
    let s = 12345
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1
    const clean = Array.from({ length: N }, (_, i) => Math.sin((TAU * i) / PERIOD))
    const noisy = clean.map((v) => v + 0.7 * rnd())
    return { clean, noisy }
  }, [])
  const h = (taps - 1) / 2
  const out = noisy.map((_, i) => {
    let a = 0, c = 0
    for (let j = i - taps + 1; j <= i; j++) if (j >= 0 && j < N) { a += noisy[j]; c++ }
    return a / c
  })
  const gain = taps === 1 ? 1 : Math.abs(Math.sin((Math.PI * taps) / PERIOD) / (taps * Math.sin(Math.PI / PERIOD)))
  const x0 = 30, x1 = 620, cy = 112, A = 62
  const X = (i: number) => x0 + ((x1 - x0) * i) / (N - 1)
  const path = (a: number[]) => a.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${(cy - A * v).toFixed(1)}`).join('')
  return (
    <>
      <Diagram w={640} h={252}
        title={`A noisy sine wave and the same wave after a ${taps}-tap moving-average filter. The filtered wave is smoother, with ${(gain * 100).toFixed(0)} percent of the original amplitude, arriving ${h} samples late.`}
        caption="Grey: noisy samples in. Teal: filtered samples out, running a little late. Longer filters remove more noise but also shave the wanted signal.">
        <path d={path(clean)} fill="none" stroke={C.fill2} strokeWidth={6} opacity={0.9} />
        <path d={path(noisy)} fill="none" stroke={C.muted} strokeWidth={1.5} />
        <path d={path(out)} fill="none" stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <T x={x0} y={238} size={12.5} color={C.muted}>time (200 samples) →</T>
        <T x={x1} y={238} anchor="end" size={12.5} color={C.muted}>wide pale line = the true signal</T>
      </Diagram>
      <Controls>
        <Slider label="Filter taps (samples averaged)" value={taps} min={1} max={25} step={2} onChange={setTaps} color="var(--d-signal)" />
        <Readout label="Noise reduced by about" value={(10 * Math.log10(taps)).toFixed(1)} unit=" dB" color="var(--d-good)" />
        <Readout label="Wanted signal left" value={(gain * 100).toFixed(0)} unit=" %" color="var(--d-power)" />
        <Readout label="Delay added" value={h} unit=" samples" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
