import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Mode = 'off' | 'fast' | 'slow'
const SECONDS = 6
const N = 300
const X0 = 70, X1 = 620
const IN_Y0 = 26, IN_Y1 = 108
const OUT_Y0 = 156, OUT_Y1 = 238
const LEVEL_MAX = 60

// input: a weak signal, a strong burst from 1.2 s to 2.2 s, then weak again (illustrative dB above the noise)
const input = (t: number) => (t >= 1.2 && t < 2.2 ? 55 : 20)

function simulate(mode: Mode) {
  const dt = SECONDS / N
  const attack = 400   // dB per second: AGC reacts in a few milliseconds
  const decay = mode === 'fast' ? 220 : 16
  const thr = 10
  let ctl = 20
  const out: number[] = []
  for (let i = 0; i <= N; i++) {
    const t = i * dt
    const v = input(t)
    if (mode === 'off') {
      out.push(v)
      continue
    }
    ctl = v > ctl ? Math.min(v, ctl + attack * dt) : Math.max(v, ctl - decay * dt)
    const gr = Math.max(0, ctl - thr) * 0.9
    out.push(Math.max(0, v - gr))
  }
  return out
}

const px = (i: number) => X0 + (i / N) * (X1 - X0)
const path = (vals: number[], y0: number, y1: number) =>
  vals.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)},${(y1 - (Math.min(v, LEVEL_MAX) / LEVEL_MAX) * (y1 - y0)).toFixed(1)}`).join('')

/** AGC response: a strong burst arrives on top of a weak signal; compare AGC off, fast and slow decay. */
export function AgcAndNoiseReduction_Agc() {
  const [mode, setMode] = useState<Mode>('slow')
  const inVals = Array.from({ length: N + 1 }, (_, i) => input((i * SECONDS) / N))
  const outVals = simulate(mode)
  const loud = OUT_Y1 - (40 / LEVEL_MAX) * (OUT_Y1 - OUT_Y0)
  const note: Record<Mode, string> = {
    off: 'No AGC: the burst blasts the speaker.',
    fast: 'Fast decay: the weak signal returns right after the burst.',
    slow: 'Slow decay: the weak signal stays quiet for about two seconds.',
  }
  return (
    <>
      <Diagram w={640} h={298}
        title={`Automatic gain control. A weak signal is interrupted by a strong burst. With AGC ${mode === 'off' ? 'off the speaker output follows the input and the burst is far too loud' : mode === 'fast' ? 'on with fast decay the output stays level and the weak signal returns almost immediately after the burst' : 'on with slow decay the output stays level but the weak signal stays quiet for about two seconds after the burst'}.`}
        caption="Illustrative model, not a measurement. Levels are relative; the burst is about 35 dB stronger than the weak signal.">
        <T x={X0} y={10} bold size={13} color={C.muted}>Signal arriving at the antenna</T>
        <rect x={X0} y={IN_Y0} width={X1 - X0} height={IN_Y1 - IN_Y0} fill={C.fill} stroke={C.muted} strokeOpacity={0.4} rx={6} />
        <path d={path(inVals, IN_Y0 + 4, IN_Y1)} fill="none" stroke={C.muted} strokeWidth={3} strokeLinejoin="round" />
        <T x={X0 - 8} y={IN_Y0 + 14} anchor="end" size={12} color={C.muted}>strong</T>
        <T x={X0 - 8} y={IN_Y1 - 22} anchor="end" size={12} color={C.muted}>weak</T>

        <T x={X0} y={OUT_Y0 - 16} bold size={13} color={C.signal}>Loudness in the speaker</T>
        <rect x={X0} y={OUT_Y0} width={X1 - X0} height={OUT_Y1 - OUT_Y0} fill={C.fill} stroke={C.muted} strokeOpacity={0.4} rx={6} />
        <rect x={X0} y={OUT_Y0} width={X1 - X0} height={loud - OUT_Y0} fill={C.bad} fillOpacity={0.1} />
        <T x={X1 - 6} y={OUT_Y0 + 14} anchor="end" size={12} bold color={C.bad}>too loud</T>
        <path d={path(outVals, OUT_Y0, OUT_Y1)} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={X0 - 8} y={OUT_Y1 - 12} anchor="end" size={12} color={C.muted}>quiet</T>

        <Ln x1={X0} y1={OUT_Y1 + 10} x2={X1} y2={OUT_Y1 + 10} color={C.muted} width={1.5} arrow />
        <T x={X1} y={OUT_Y1 + 26} anchor="end" size={12} color={C.muted}>time, about 6 seconds</T>
        <T x={px(2.2 * (N / SECONDS)) + 8} y={IN_Y0 + 14} anchor="start" size={12} bold color={C.muted}>strong burst</T>
        <T x={X0} y={OUT_Y1 + 48} size={13} bold color={C.ink}>{note[mode]}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="AGC" value={mode} onChange={setMode}
          options={[{ value: 'off', label: 'AGC off' }, { value: 'fast', label: 'AGC fast' }, { value: 'slow', label: 'AGC slow' }]} />
      </div>
    </>
  )
}
