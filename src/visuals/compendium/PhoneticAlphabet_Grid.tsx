import { C, Diagram, T } from '../kit'

export const LETTER_WORDS: Record<string, string> = {
  A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India',
  J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo',
  S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu',
}
export const DIGIT_WORDS: Record<string, string> = {
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner',
}

/** The ITU phonetic alphabet (letters and digits) as a grid. */
export function PhoneticAlphabet_Grid() {
  const letters = Object.entries(LETTER_WORDS)
  const cw = 106, ch = 46, cols = 6
  return (
    <Diagram w={640} h={352} title="The ITU phonetic alphabet: Alfa, Bravo, Charlie through Zulu, and the digits Zero to Niner"
      caption="ITU spellings, with the ham habit of saying “Niner”. Many operators say “Alpha” and “Juliet”.">
      {letters.map(([l, w], i) => {
        const x = 5 + (i % cols) * cw, y = 6 + Math.floor(i / cols) * ch
        return (
          <g key={l}>
            <rect x={x} y={y} width={cw - 6} height={ch - 6} rx={8} fill={C.fill} />
            <T x={x + 9} y={y + 20} bold mono size={18} color={C.signal}>{l}</T>
            <T x={x + 28} y={y + 20} size={12.5} bold>{w}</T>
          </g>
        )
      })}
      <T x={8} y={248} size={13} bold color={C.muted}>DIGITS</T>
      {Object.entries(DIGIT_WORDS).map(([d, w], i) => {
        const x = 5 + (i % 5) * 126, y = 264 + Math.floor(i / 5) * 40
        return (
          <g key={d}>
            <rect x={x} y={y} width={120} height={34} rx={8} fill={C.fill} />
            <T x={x + 12} y={y + 17} bold mono size={18} color={C.resist}>{d}</T>
            <T x={x + 34} y={y + 17} size={13} bold>{w}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
