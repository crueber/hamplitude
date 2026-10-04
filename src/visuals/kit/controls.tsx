import type { ReactNode } from 'react'

/** Labelled range slider. Styled in diagrams.css. */
export function Slider({
  label, value, min, max, step = 1, onChange, format, color,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format?: (v: number) => string
  color?: string
}) {
  return (
    <label className="ctl-slider" style={{ ...(color ? { '--ctl': color } : {}), '--pct': `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties}>
      <span className="ctl-top">
        <span className="ctl-label">{label}</span>
        <output className="ctl-value">{format ? format(value) : value}</output>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  )
}

/** Row of mutually exclusive options. */
export function Choice<T extends string | number>({
  options, value, onChange, label,
}: {
  options: { value: T; label: ReactNode }[]
  value: T
  onChange: (v: T) => void
  label?: string
}) {
  return (
    <div className="ctl-choice" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={String(o.value)} type="button" role="radio" aria-checked={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** Big live number with a label — for results that change as sliders move. */
export function Readout({ label, value, unit, color }: { label: string; value: ReactNode; unit?: string; color?: string }) {
  return (
    <div className="ctl-readout" style={color ? ({ '--ctl': color } as React.CSSProperties) : undefined}>
      <span className="ctl-readout-label">{label}</span>
      <span className="ctl-readout-value">
        {value}
        {unit && <small>{unit}</small>}
      </span>
    </div>
  )
}

/** Wrapper that lays out controls under/next to an interactive diagram. */
export function Controls({ children }: { children: ReactNode }) {
  return <div className="ctl-panel">{children}</div>
}
