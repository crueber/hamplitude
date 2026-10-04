import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Mode = 'day' | 'night'

interface Layer { id: string; y: number; h: number; col: string; day: number; night: number; alt: string; dayNote: string[]; nightNote: string[] }

// Heights are typical and approximate; the drawing is schematic (not to scale).
const LAYERS: Layer[] = [
  { id: 'F2', y: 40, h: 80, col: C.power, day: 0.28, night: 0.2, alt: 'above about 220 km', dayNote: ['Main long-distance layer'], nightNote: ['F1 and F2 merge into one', 'layer, which stays', 'ionized after dark'] },
  { id: 'F1', y: 128, h: 44, col: C.power, day: 0.14, night: 0, alt: 'about 150 to 220 km', dayNote: ['Daytime only; merges with', 'F2 after sunset'], nightNote: [] },
  { id: 'E', y: 180, h: 44, col: C.current, day: 0.2, night: 0.04, alt: 'about 90 to 150 km', dayNote: ['Bends lower HF; short skip'], nightNote: ['Nearly gone'] },
  { id: 'D', y: 232, h: 34, col: C.resist, day: 0.24, night: 0, alt: 'about 50 to 90 km', dayNote: ['Absorbs HF; worst on', 'the lowest bands'], nightNote: ['Disappears after sunset'] },
]

export function IonosphereLayers_DayNight() {
  const [mode, setMode] = useState<Mode>('day')
  const day = mode === 'day'
  const X0 = 90, X1 = 380
  return (
    <>
      <Diagram w={640} h={320}
        title={day
          ? 'Ionosphere by day: D, E, F1 and F2 layers are all present, with the D layer absorbing HF'
          : 'Ionosphere by night: the D layer disappears, the E layer nearly vanishes, and F1 and F2 merge into a single F layer'}
        caption="Schematic, not to scale; heights are typical and vary with season, latitude and the solar cycle.">
        {/* sun or moon */}
        {day ? (
          <g>
            <circle cx={38} cy={52} r={14} fill={C.resist} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <Ln key={a} x1={38 + 20 * Math.cos((a * Math.PI) / 180)} y1={52 + 20 * Math.sin((a * Math.PI) / 180)}
                x2={38 + 27 * Math.cos((a * Math.PI) / 180)} y2={52 + 27 * Math.sin((a * Math.PI) / 180)} color={C.resist} width={3} />
            ))}
            <Ln x1={52} y1={78} x2={80} y2={128} color={C.resist} width={3} arrow />
            <T x={14} y={106} size={12} color={C.muted}>UV and</T>
            <T x={14} y={122} size={12} color={C.muted}>X-rays</T>
          </g>
        ) : (
          <g>
            <circle cx={38} cy={52} r={15} fill={C.muted} />
            <circle cx={45} cy={46} r={13} fill={C.bg} />
            <T x={14} y={96} size={12} color={C.muted}>no direct</T>
            <T x={14} y={112} size={12} color={C.muted}>sunlight</T>
          </g>
        )}
        {LAYERS.map((l) => {
          const merged = !day && l.id === 'F2'
          const y = l.y
          const h = merged ? 132 : l.h
          const op = day ? l.day : l.night
          const absent = !day && (l.id === 'F1' || l.id === 'D')
          if (!day && l.id === 'F1') return null
          const note = day ? l.dayNote : l.nightNote
          const label = merged ? 'F' : l.id
          const cy = y + h / 2
          return (
            <g key={l.id}>
              <rect x={X0} y={y} width={X1 - X0} height={h} rx={8}
                fill={l.col} fillOpacity={absent ? 0 : op} stroke={l.col} strokeWidth={2} strokeDasharray="5 5" opacity={absent || (!day && l.id === 'E') ? 0.55 : 1} />
              <T x={X0 + 14} y={cy} size={17} bold color={l.col}>{label}</T>
              <T x={X0 + 56} y={cy} size={12} color={C.muted}>{merged ? 'about 150 km and up' : l.alt}</T>
              {note.length > 0 && <g>{note.map((n, i) => (
                <T key={i} x={398} y={cy + (i - (note.length - 1) / 2) * 17} size={13} bold={i === 0} color={C.ink}>{n}</T>
              ))}</g>}
            </g>
          )
        })}
        <rect x={20} y={280} width={600} height={26} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <T x={320} y={293} anchor="middle" size={13} color={C.muted}>Earth</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Time of day" value={mode} onChange={setMode}
          options={[{ value: 'day', label: 'Day' }, { value: 'night', label: 'Night' }]} />
      </div>
    </>
  )
}
