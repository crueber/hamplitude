/** Print a group's syllabus line and its questions with the answer key marked *.  bun scripts/show-group.ts T5A [T5B ...] */
import { getGroup, getQuestion } from '../src/data'
for (const id of process.argv.slice(2)) {
  const info = getGroup(id)
  if (!info) { console.log(`unknown group ${id}`); continue }
  console.log(`\n===== ${id}  (${info.license}, exam subelement ${info.sub.id}: ${info.sub.title})`)
  console.log(`Syllabus: ${info.group.topics}\n`)
  for (const qid of info.group.questions) {
    const q = getQuestion(qid)!
    console.log(`${q.id}${q.refs.length ? ` [${q.refs.join(', ')}]` : ''}${q.figure ? ` (figure ${q.figure})` : ''}  ${q.q}`)
    q.choices.forEach((c, i) => console.log(`   ${i === q.answer ? '*' : ' '} ${'ABCD'[i]}. ${c}`))
  }
}
