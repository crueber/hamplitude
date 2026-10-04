import { C, Diagram, T } from '../kit'

const WORDS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu']

/** The standard phonetic alphabet, and a call sign spelled out. */
export function Phonetics() {
  const cw = 70, ch = 44
  return (
    <Diagram w={640} h={215} title="The standard phonetic alphabet, from Alpha to Zulu, with the call sign W5YI spelled out" caption="Spell unusual words, names and call signs with it so they're copied correctly.">
      {WORDS.map((w, i) => {
        const x = 5 + (i % 9) * cw, y = 6 + Math.floor(i / 9) * ch
        return (
          <g key={w}>
            <T x={x + 6} y={y + 14} bold size={15} color={C.signal}>{w[0]}</T>
            <T x={x + 6} y={y + 32} size={12.5}>{w}</T>
          </g>
        )
      })}
      <T x={14} y={166} bold size={14} color={C.muted}>Example</T>
      <T x={14} y={192} mono bold size={16}>W5YI</T>
      <T x={90} y={192} size={15} color={C.muted}>→</T>
      <T x={116} y={192} bold size={15} color={C.signal}>Whiskey Five Yankee India</T>
    </Diagram>
  )
}
