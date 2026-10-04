import { useRef, useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T } from '../kit'

const CODE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--',
  N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.',
}

interface Seg { on: boolean; units: number; char?: string }

/** Turns text into a timing strip: dit = 1 unit, dah = 3, gap inside a letter = 1, between letters = 3, between words = 7. */
function toSegments(text: string): Seg[] {
  const segs: Seg[] = []
  const words = text.toUpperCase().split(/\s+/).filter(Boolean)
  words.forEach((w, wi) => {
    if (wi) segs.push({ on: false, units: 7 })
    const letters = [...w].filter((c) => CODE[c])
    letters.forEach((ch, li) => {
      if (li) segs.push({ on: false, units: 3 })
      ;[...CODE[ch]].forEach((el, ei) => {
        if (ei) segs.push({ on: false, units: 1 })
        segs.push({ on: true, units: el === '.' ? 1 : 3, char: ei === 0 ? ch : undefined })
      })
    })
  })
  return segs
}

/** Type a message, see its Morse timing, and hear it at the chosen speed. */
export function MorseAlphabet_Player() {
  const [text, setText] = useState('CQ DX')
  const [wpm, setWpm] = useState(15)
  const [playing, setPlaying] = useState(false)
  const ctx = useRef<AudioContext | null>(null)
  const segs = toSegments(text.slice(0, 40))
  const total = segs.reduce((n, s) => n + s.units, 0)
  const unit = 1.2 / wpm // seconds per unit: the standard "PARIS" timing
  const W = 640, H = 150, pad = 20
  const scale = total ? Math.min((W - pad * 2) / total, 24) : 1
  let x = pad

  function play() {
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx.current ??= new AC()
      const a = ctx.current
      const osc = a.createOscillator(), gain = a.createGain()
      osc.frequency.value = 600
      osc.connect(gain).connect(a.destination)
      gain.gain.value = 0
      let t = a.currentTime + 0.05
      for (const s of segs) {
        if (s.on) { gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(0.25, t + 0.005); gain.gain.setValueAtTime(0.25, t + s.units * unit - 0.005); gain.gain.linearRampToValueAtTime(0, t + s.units * unit) }
        t += s.units * unit
      }
      osc.start(); osc.stop(t + 0.05)
      setPlaying(true)
      setTimeout(() => setPlaying(false), (t - a.currentTime) * 1000)
    } catch { /* audio unavailable: the visual still works */ }
  }

  return (
    <>
      <Diagram w={W} h={H} title={`Morse timing for "${text}": ${total} units long`}
        caption="Filled bars are the tone; gaps are silence. Every length is a multiple of one dit.">
        {segs.map((s, i) => {
          const w = s.units * scale
          const el = <g key={i}>
            {s.on && (() => { const r = Math.max(1.5, Math.min(11, scale / 2 - 1)); return <rect x={x} y={71 - r} width={Math.max(w - 2, 1)} height={r * 2} rx={r} fill={s.units === 1 ? C.signal : C.power} /> })()}
            {s.char && <T x={x} y={34} size={13} bold color={C.ink}>{s.char}</T>}
          </g>
          x += w
          return el
        })}
        {!segs.length && <T x={W / 2} y={70} anchor="middle" size={14} color={C.muted}>Type some letters or numbers</T>}
        <T x={pad} y={118} size={12.5} color={C.signal} bold>● dit = 1</T>
        <T x={110} y={118} size={12.5} color={C.power} bold>▬ dah = 3</T>
        <T x={210} y={118} size={12.5} color={C.muted}>gap in letter = 1 · between letters = 3 · between words = 7</T>
      </Diagram>
      <Controls>
        <label className="ctl-slider" style={{ '--ctl': 'var(--d-signal)' } as React.CSSProperties}>
          <span className="ctl-top"><span className="ctl-label">Message</span></span>
          <input type="text" value={text} maxLength={40} onChange={(e) => setText(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--line-strong)', background: 'var(--surface)', color: 'var(--ink)', font: 'inherit' }} aria-label="Message to send in Morse" />
        </label>
        <Slider label="Speed" value={wpm} min={5} max={30} onChange={setWpm} format={(v) => `${v} WPM`} color="var(--d-signal)" />
        <Readout label={`One dit lasts (1.2 ÷ ${wpm})`} value={Math.round(unit * 1000)} unit="ms" color="var(--d-power)" />
        <button className="btn btn-primary" onClick={play} disabled={playing || !segs.length}>{playing ? 'Sending…' : '▶ Play it'}</button>
      </Controls>
    </>
  )
}
