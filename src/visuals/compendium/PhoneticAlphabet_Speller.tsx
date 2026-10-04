import { useState } from 'react'
import { C, Diagram, T } from '../kit'
import { DIGIT_WORDS, LETTER_WORDS } from './PhoneticAlphabet_Grid'

const wordFor = (ch: string) => (ch === '/' ? 'Slash' : LETTER_WORDS[ch] ?? DIGIT_WORDS[ch] ?? '')

/** Type a call sign or name and see it spelled the way you would say it. */
export function PhoneticAlphabet_Speller() {
  const [text, setText] = useState('W1AW/4')
  const chars = [...text.toUpperCase()].filter((c) => wordFor(c)).slice(0, 9)
  const spoken = chars.map(wordFor).join(' ')
  const w = 70
  return (
    <>
      <div style={{ margin: '0 0 8px' }}>
        <label style={{ display: 'flex', gap: 10, alignItems: 'center', font: '600 14px var(--font-body)', color: 'var(--d-ink)' }}>
          Try a call sign or name
          <input
            value={text}
            maxLength={9}
            spellCheck={false}
            aria-label="Text to spell phonetically"
            onChange={(e) => setText(e.target.value)}
            style={{ font: '700 16px var(--font-mono)', padding: '6px 10px', width: 170, color: 'var(--d-ink)', background: 'var(--d-fill)', border: '1.5px solid var(--d-fill-2)', borderRadius: 8, textTransform: 'uppercase' }}
          />
        </label>
      </div>
      <Diagram w={640} h={130} title={chars.length ? `Spelled phonetically: ${spoken}` : 'Type letters or digits above to see them spelled phonetically'}
        caption="Letters, digits and slash. Up to nine characters.">
        {chars.length === 0 && <T x={320} y={60} anchor="middle" size={14} color={C.muted}>Type letters or digits to spell them.</T>}
        {chars.map((c, i) => {
          const x = 10 + i * w, isDigit = /\d/.test(c)
          const col = isDigit ? C.resist : c === '/' ? C.muted : C.signal
          return (
            <g key={i}>
              <rect x={x} y={14} width={w - 4} height={100} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
              <T x={x + (w - 4) / 2} y={44} anchor="middle" bold mono size={26} color={col}>{c}</T>
              <T x={x + (w - 4) / 2} y={88} anchor="middle" bold size={12.5}>{wordFor(c)}</T>
            </g>
          )
        })}
      </Diagram>
    </>
  )
}
