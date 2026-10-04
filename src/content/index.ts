/**
 * Content registry. Everything is discovered by glob, so authoring a lesson never
 * requires editing shared code. Per group (e.g. T5A):
 *
 *   src/content/<license>/T5A.mdx    lesson body (lazy-loaded)
 *   src/content/<license>/T5A.json   { title, blurb, why: { "<QID>": Why } }  (eager)
 */
import type { ComponentType } from 'react'

export interface Why {
  /** The concept behind the answer, 1–2 short sentences (aim for <= 30 words). */
  why: string
  /** Optional: the classic wrong-answer trap, one short sentence. */
  trap?: string
  /** Optional: id of the lesson concept card that teaches this (its anchor). */
  concept?: string
}

export interface GroupContent {
  /** Short human title, e.g. "Voltage, current & resistance" */
  title: string
  /** One sentence: what you'll be able to explain after this lesson */
  blurb: string
  why: Record<string, Why>
}

const lessonLoaders = import.meta.glob<{ default: ComponentType }>('./*/*.mdx')
const contentModules = import.meta.glob<GroupContent>('./*/*.json', { eager: true, import: 'default' })

const idFromPath = (p: string) => p.split('/').pop()!.replace(/\.(json|mdx)$/, '')

const lessons = new Map(Object.entries(lessonLoaders).map(([p, l]) => [idFromPath(p), l]))
const contents = new Map(Object.entries(contentModules).map(([p, c]) => [idFromPath(p), c]))

export const hasLesson = (groupId: string) => lessons.has(groupId)
export const loadLesson = (groupId: string) => lessons.get(groupId)?.()
export const getGroupContent = (groupId: string) => contents.get(groupId)
export const getWhy = (groupId: string, qid: string): Why | undefined => contents.get(groupId)?.why?.[qid]
