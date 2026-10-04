import type { ReactNode, SVGProps } from 'react'
import { C } from './util'

interface DiagramProps {
  /** viewBox width/height. Pick a size that suits the content; the SVG scales to the column. */
  w?: number
  h?: number
  /** Accessible description of what the diagram shows (screen readers + tooltips). */
  title: string
  /** Short caption shown under the diagram. */
  caption?: ReactNode
  /** Cap the rendered width (px) for small diagrams. */
  maxWidth?: number
  children: ReactNode
  svgRef?: React.Ref<SVGSVGElement>
}

/** Themed SVG frame. All diagram drawing goes inside this. */
export function Diagram({ w = 640, h = 300, title, caption, maxWidth, children, svgRef }: DiagramProps) {
  return (
    <figure className="diagram" style={maxWidth ? { maxWidth } : undefined}>
      <svg ref={svgRef} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <defs>
          <marker id="hx-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 z" fill="context-stroke" />
          </marker>
          <marker id="hx-dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
            <circle cx="5" cy="5" r="4" fill="context-stroke" />
          </marker>
        </defs>
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

type TProps = Omit<SVGProps<SVGTextElement>, 'fontSize' | 'fontWeight'> & {
  size?: number
  bold?: boolean
  mono?: boolean
  color?: string
  /** shorthand for textAnchor */
  anchor?: 'start' | 'middle' | 'end'
}

/** Text with the diagram font/colour tokens. Use \n-free strings; for multi-line use <Lines>. */
export function T({ size = 14, bold, mono, color = C.ink, anchor, children, style, ...rest }: TProps) {
  return (
    <text
      textAnchor={anchor}
      fontSize={size}
      fontWeight={bold ? 700 : 500}
      fill={color}
      style={{ fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)', ...style }}
      dominantBaseline="central"
      {...rest}
    >
      {children}
    </text>
  )
}

/** Stacked lines of text. */
export function Lines({ x, y, lines, lh = 18, ...rest }: Omit<TProps, 'children'> & { x: number; y: number; lines: ReactNode[]; lh?: number }) {
  return (
    <>
      {lines.map((l, i) => (
        <T key={i} x={x} y={y + i * lh} {...rest}>
          {l}
        </T>
      ))}
    </>
  )
}

type LineProps = SVGProps<SVGLineElement> & { color?: string; width?: number; dash?: string; arrow?: boolean | 'both' }

/** A line, optionally with arrowheads. */
export function Ln({ color = C.ink, width = 2, dash, arrow, ...rest }: LineProps) {
  return (
    <line
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
      markerEnd={arrow ? 'url(#hx-arrow)' : undefined}
      markerStart={arrow === 'both' ? 'url(#hx-arrow)' : undefined}
      {...rest}
    />
  )
}

/** A rounded labelled box. */
export function Box({
  x, y, w, h, label, sub, color = C.ink, fill = C.fill, r = 10, size = 14, dash,
}: {
  x: number; y: number; w: number; h: number; label?: ReactNode; sub?: ReactNode
  color?: string; fill?: string; r?: number; size?: number; dash?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={color} strokeWidth={2} strokeDasharray={dash} />
      {label != null && (
        <T x={x + w / 2} y={y + h / 2 - (sub ? 8 : 0)} anchor="middle" bold size={size}>
          {label}
        </T>
      )}
      {sub != null && (
        <T x={x + w / 2} y={y + h / 2 + 12} anchor="middle" size={size - 2} color={C.muted}>
          {sub}
        </T>
      )}
    </g>
  )
}
