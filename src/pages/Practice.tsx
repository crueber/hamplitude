import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getGroup, isLicense } from '@/data'
import { getGroupContent } from '@/content'
import { groupSession, reviewSession } from '@/lib/sessions'
import { Quiz } from '@/components/Quiz'
import { ExamRunner } from '@/components/ExamRunner'

export function GroupPractice() {
  const { license, group } = useParams()
  const [run, setRun] = useState(0)
  const info = group ? getGroup(group) : undefined
  if (!isLicense(license) || !info || info.license !== license) return <Navigate to="/" replace />
  return (
    <GroupQuiz key={`${group}:${run}`} license={license} group={group!} title={getGroupContent(group!)?.title ?? group!} onRestart={() => setRun((n) => n + 1)} />
  )
}

function GroupQuiz({ license, group, title, onRestart }: { license: 'technician' | 'general' | 'extra'; group: string; title: string; onRestart: () => void }) {
  const [qs] = useState(() => groupSession(group))
  return <Quiz license={license} questions={qs} backTo={`/${license}/${group}`} backLabel="Back to lesson" title={`${group} · ${title}`} onRestart={onRestart} extraAction={{ to: `/${license}`, label: 'All lessons' }} />
}

export function Review() {
  const { license } = useParams()
  const [run, setRun] = useState(0)
  if (!isLicense(license)) return <Navigate to="/" replace />
  return <ReviewQuiz key={`${license}:${run}`} license={license} onRestart={() => setRun((n) => n + 1)} />
}

function ReviewQuiz({ license, onRestart }: { license: 'technician' | 'general' | 'extra'; onRestart: () => void }) {
  const [qs] = useState(() => reviewSession(license))
  return <Quiz license={license} questions={qs} backTo={`/${license}`} backLabel="All lessons" title="Daily review" onRestart={onRestart} />
}

export function ExamPage() {
  const { license } = useParams()
  if (!isLicense(license)) return <Navigate to="/" replace />
  return <ExamRunner key={license} license={license} />
}
