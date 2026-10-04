import type { ReactNode } from 'react'
import { C } from './util'
import { T } from './Diagram'

/**
 * US-style schematic symbols. Each is drawn horizontally, centred on (x, y), with
 * terminals at (x - len/2, y) and (x + len/2, y). `rot` rotates about the centre
 * (90 = vertical, terminals top/bottom).
 *
 *   <Resistor x={200} y={100} label="R1" value="100 Ω" />
 */
export interface SymbolProps {
  x: number
  y: number
  rot?: number
  /** terminal-to-terminal length */
  len?: number
  label?: string
  value?: string
  /** where the label sits relative to the symbol (before rotation it is above/below) */
  labelPos?: 'above' | 'below'
  color?: string
  /** draw a stronger accent (e.g. highlight the part a question asks about) */
  glow?: boolean
}

interface FrameProps extends SymbolProps {
  children: ReactNode
  /** body half-width: leads are drawn from ±len/2 to ±body */
  body: number
  bodyH?: number
}

function Frame({ x, y, rot = 0, len = 60, label, value, labelPos = 'above', color = C.ink, glow, children, body, bodyH = 14 }: FrameProps) {
  const half = len / 2
  const ly = labelPos === 'above' ? -(bodyH + 12) : bodyH + 14
  // keep labels upright even when the symbol is rotated
  const rad = (-rot * Math.PI) / 180
  const lx0 = 0
  const lx = lx0 * Math.cos(rad) - ly * Math.sin(rad)
  const lyy = lx0 * Math.sin(rad) + ly * Math.cos(rad)
  return (
    <g transform={`translate(${x},${y})`}>
      <g transform={`rotate(${rot})`} stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {glow && <rect x={-half - 4} y={-bodyH - 6} width={len + 8} height={bodyH * 2 + 12} rx={8} fill={C.signal} opacity={0.12} stroke="none" />}
        <line x1={-half} y1={0} x2={-body} y2={0} />
        <line x1={body} y1={0} x2={half} y2={0} />
        {children}
      </g>
      {(label || value) && (
        <g transform={`translate(${lx},${lyy})`}>
          {label && (
            <T x={0} y={value ? -8 : 0} anchor="middle" bold size={13} color={color}>
              {label}
            </T>
          )}
          {value && (
            <T x={0} y={label ? 8 : 0} anchor="middle" size={12} color={C.muted} mono>
              {value}
            </T>
          )}
        </g>
      )}
    </g>
  )
}

export function Resistor(p: SymbolProps) {
  const pts = '-20,0 -16,-9 -8,9 0,-9 8,9 16,-9 20,0'
  return (
    <Frame {...p} body={20} bodyH={10}>
      <polyline points={pts} />
    </Frame>
  )
}

export function VariableResistor(p: SymbolProps) {
  return (
    <Frame {...p} body={20} bodyH={18}>
      <polyline points="-20,0 -16,-9 -8,9 0,-9 8,9 16,-9 20,0" />
      <line x1={-14} y1={16} x2={14} y2={-16} markerEnd="url(#hx-arrow)" />
    </Frame>
  )
}

export function Capacitor(p: SymbolProps) {
  return (
    <Frame {...p} body={4} bodyH={16}>
      <line x1={-4} y1={-16} x2={-4} y2={16} />
      <line x1={4} y1={-16} x2={4} y2={16} />
    </Frame>
  )
}

/** Electrolytic: curved negative plate, + marker on the straight plate. */
export function PolarizedCapacitor(p: SymbolProps) {
  return (
    <Frame {...p} body={5} bodyH={16}>
      <line x1={-5} y1={-16} x2={-5} y2={16} />
      <path d="M7,-16 Q1,0 7,16" />
      <text x={-17} y={-9} fontSize={13} fontWeight={700} fill={p.color ?? C.ink} stroke="none">+</text>
    </Frame>
  )
}

export function Inductor(p: SymbolProps) {
  return (
    <Frame {...p} body={20} bodyH={12}>
      <path d="M-20,0 a5,6 0 0 1 10,0 a5,6 0 0 1 10,0 a5,6 0 0 1 10,0 a5,6 0 0 1 10,0" transform="translate(0,0)" />
    </Frame>
  )
}

/** Cell/battery: long line = +, short line = −. `cells` adds more plates. */
export function Battery(p: SymbolProps & { cells?: number }) {
  const n = p.cells ?? 1
  const gap = 8
  const total = n * 2 * gap
  const start = -total / 2 + gap / 2
  return (
    <Frame {...p} body={total / 2} bodyH={16}>
      {Array.from({ length: n }).map((_, i) => {
        const x0 = start + i * 2 * gap
        return (
          <g key={i}>
            <line x1={x0} y1={-14} x2={x0} y2={14} />
            <line x1={x0 + gap} y1={-8} x2={x0 + gap} y2={8} strokeWidth={4} />
          </g>
        )
      })}
    </Frame>
  )
}

export function Switch(p: SymbolProps & { closed?: boolean }) {
  return (
    <Frame {...p} body={18} bodyH={16}>
      <circle cx={-18} cy={0} r={2.5} fill={p.color ?? C.ink} />
      <circle cx={18} cy={0} r={2.5} fill={p.color ?? C.ink} />
      {p.closed ? <line x1={-18} y1={0} x2={18} y2={0} /> : <line x1={-18} y1={0} x2={14} y2={-14} />}
    </Frame>
  )
}

export function Fuse(p: SymbolProps) {
  return (
    <Frame {...p} body={18} bodyH={10}>
      <rect x={-18} y={-7} width={36} height={14} rx={3} />
      <path d="M-18,0 C-9,-9 -4,9 0,0 S9,-9 18,0" />
    </Frame>
  )
}

export function Diode(p: SymbolProps) {
  return (
    <Frame {...p} body={9} bodyH={14}>
      <polygon points="-9,-12 -9,12 9,0" fill={p.color ?? C.ink} fillOpacity={0.15} />
      <line x1={9} y1={-12} x2={9} y2={12} />
    </Frame>
  )
}

export function LED(p: SymbolProps) {
  return (
    <Frame {...p} body={9} bodyH={22}>
      <polygon points="-9,-12 -9,12 9,0" fill={p.color ?? C.ink} fillOpacity={0.15} />
      <line x1={9} y1={-12} x2={9} y2={12} />
      <line x1={0} y1={-14} x2={8} y2={-24} markerEnd="url(#hx-arrow)" />
      <line x1={7} y1={-11} x2={15} y2={-21} markerEnd="url(#hx-arrow)" />
    </Frame>
  )
}

export function Lamp(p: SymbolProps) {
  return (
    <Frame {...p} body={14} bodyH={16}>
      <circle cx={0} cy={0} r={14} />
      <line x1={-10} y1={-10} x2={10} y2={10} />
      <line x1={-10} y1={10} x2={10} y2={-10} />
    </Frame>
  )
}

/** Generic source: circle with + / − (DC) or ~ (AC). */
export function Source(p: SymbolProps & { ac?: boolean }) {
  return (
    <Frame {...p} body={16} bodyH={18}>
      <circle cx={0} cy={0} r={16} />
      {p.ac ? <path d="M-9,0 q4.5,-9 9,0 t9,0" /> : (
        <>
          <text x={-11} y={5} fontSize={14} fontWeight={700} fill={p.color ?? C.ink} stroke="none">+</text>
          <text x={3} y={5} fontSize={14} fontWeight={700} fill={p.color ?? C.ink} stroke="none">−</text>
        </>
      )}
    </Frame>
  )
}

/** Panel meter: circle with a letter (V, A, Ω). */
export function Meter({ letter, ...p }: SymbolProps & { letter: string }) {
  return (
    <Frame {...p} body={16} bodyH={18}>
      <circle cx={0} cy={0} r={16} />
      <text x={0} y={1} fontSize={16} fontWeight={700} textAnchor="middle" dominantBaseline="central" fill={p.color ?? C.ink} stroke="none">
        {letter}
      </text>
    </Frame>
  )
}

export function Speaker(p: SymbolProps) {
  return (
    <Frame {...p} body={8} bodyH={18}>
      <rect x={-8} y={-8} width={8} height={16} />
      <polygon points="0,-8 12,-16 12,16 0,8" />
    </Frame>
  )
}

/** NPN/PNP bipolar transistor. Terminals: base on the left, collector top-right, emitter bottom-right. Not rotatable via len. */
export function Transistor({ x, y, kind = 'npn', label, color = C.ink, parts = false }: { x: number; y: number; kind?: 'npn' | 'pnp'; label?: string; color?: string; parts?: boolean }) {
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={6} cy={0} r={26} strokeWidth={1.6} opacity={0.6} />
      <line x1={-30} y1={0} x2={-6} y2={0} />
      <line x1={-6} y1={-16} x2={-6} y2={16} strokeWidth={3.5} />
      <line x1={-6} y1={-8} x2={14} y2={-26} />
      <line x1={14} y1={-26} x2={14} y2={-40} />
      <line x1={-6} y1={8} x2={14} y2={26} />
      <line x1={14} y1={26} x2={14} y2={40} />
      {kind === 'npn' ? (
        <polygon points="14,26 5,24 10,16" fill={color} />
      ) : (
        <polygon points="-6,8 3,10 -2,18" fill={color} transform="translate(0,0)" />
      )}
      {parts && (
        <g stroke="none" fill={C.muted} fontSize={12} fontWeight={700} fontFamily="var(--font-body)">
          <text x={-44} y={-6}>B</text>
          <text x={20} y={-34}>C</text>
          <text x={20} y={42}>E</text>
        </g>
      )}
      {label && (
        <text x={42} y={4} stroke="none" fill={color} fontSize={13} fontWeight={700} fontFamily="var(--font-body)">
          {label}
        </text>
      )}
    </g>
  )
}

export function Ground({ x, y, color = C.ink }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <line x1={0} y1={0} x2={0} y2={8} />
      <line x1={-12} y1={8} x2={12} y2={8} />
      <line x1={-7} y1={14} x2={7} y2={14} />
      <line x1={-2.5} y1={20} x2={2.5} y2={20} />
    </g>
  )
}

export function Antenna({ x, y, color = C.ink }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={2.2} strokeLinecap="round" fill="none">
      <line x1={0} y1={0} x2={0} y2={-26} />
      <polyline points="-14,-40 0,-26 14,-40" />
    </g>
  )
}

/** Two coupled inductors with core lines. */
export function Transformer({ x, y, label, color = C.ink }: { x: number; y: number; label?: string; color?: string }) {
  const coil = 'M0,-30 a7,7.5 0 0 1 0,15 a7,7.5 0 0 1 0,15 a7,7.5 0 0 1 0,15 a7,7.5 0 0 1 0,15'
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={2.2} strokeLinecap="round" fill="none">
      <path d={coil} transform="translate(-9,0)" />
      <path d={coil} transform="translate(9,0) scale(-1,1)" />
      <line x1={-2} y1={-30} x2={-2} y2={30} />
      <line x1={2} y1={-30} x2={2} y2={30} />
      {label && (
        <text x={0} y={-42} stroke="none" fill={color} fontSize={13} fontWeight={700} textAnchor="middle" fontFamily="var(--font-body)">
          {label}
        </text>
      )}
    </g>
  )
}

/** Junction dot where wires connect. */
export function Dot({ x, y, color = C.ink }: { x: number; y: number; color?: string }) {
  return <circle cx={x} cy={y} r={3.5} fill={color} />
}

/** A wire as a polyline through points. */
export function Wire({ pts, color = C.ink, width = 2.2, dash }: { pts: [number, number][]; color?: string; width?: number; dash?: string }) {
  return (
    <polyline
      points={pts.map((p) => p.join(',')).join(' ')}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}
