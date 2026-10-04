/**
 * Parses the official NCVEC question pool PDFs (data-src/*.pdf) into JSON.
 * Run: bun scripts/parse-pools.ts
 *
 * The pools are released into the public domain by the NCVEC Question Pool Committee.
 * Every answer key in the output comes verbatim from those documents.
 */
import { $ } from "bun";
import { mkdirSync, writeFileSync } from "node:fs";

interface PoolSource {
  license: "technician" | "general" | "extra";
  letter: "T" | "G" | "E";
  file: string;
  name: string;
  element: number;
  valid: { from: string; to: string };
  exam: { questions: number; toPass: number };
  release: string;
}

const SOURCES: PoolSource[] = [
  {
    license: "technician",
    letter: "T",
    file: "data-src/technician-2026-2030.pdf",
    name: "Technician",
    element: 2,
    valid: { from: "2026-07-01", to: "2030-06-30" },
    exam: { questions: 35, toPass: 26 },
    release: "NCVEC 2026-2030 Technician pool, revised Feb 19 2026",
  },
  {
    license: "general",
    letter: "G",
    file: "data-src/general-2023-2027.pdf",
    name: "General",
    element: 3,
    valid: { from: "2023-07-01", to: "2027-06-30" },
    exam: { questions: 35, toPass: 26 },
    release: "NCVEC 2023-2027 General pool, 6th errata Feb 4 2026",
  },
  {
    license: "extra",
    letter: "E",
    file: "data-src/extra-2024-2028.pdf",
    name: "Extra",
    element: 4,
    valid: { from: "2024-07-01", to: "2028-06-30" },
    exam: { questions: 50, toPass: 37 },
    release: "NCVEC 2024-2028 Extra pool, 4th errata Feb 4 2026",
  },
];

interface Question {
  id: string;
  group: string;
  answer: number; // index into choices
  refs: string[]; // FCC rule citations, e.g. "97.301"
  q: string;
  choices: string[];
  figure?: string; // e.g. "T-1", "G7-1", "E5-1"
}

interface Group {
  id: string;
  topics: string;
  questions: string[];
}

interface Subelement {
  id: string;
  title: string;
  examQuestions: number;
  groups: Group[];
}

const clean = (s: string) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();

async function parse(src: PoolSource) {
  const text = await $`pdftotext -layout ${src.file} -`.text();
  const lines = text.replace(/\f/g, "\n").split("\n");
  const L = src.letter;

  // ---- syllabus: subelements and group topic lines ------------------------
  const subHead = new RegExp(
    `^\\s*SUBELEMENT\\s+(${L}\\d)\\s*[-–—]\\s*(.+?)\\s*\\[(\\d+)\\s+Exam Questions?`,
    "i",
  );
  const groupHead = new RegExp(`^\\s*(${L}\\d[A-Z])\\s*(?:[-–—]\\s*)?(\\S.*)$`);
  const qHead = new RegExp(`^\\s*(${L}\\d[A-Z]\\d{2})\\s*\\(([A-D])\\)\\s*(?:\\[([^\\]]*)\\])?`);

  const subelements = new Map<string, Subelement>();
  const groupTopics = new Map<string, string>();

  let currentSub: Subelement | null = null;
  let lastGroup: string | null = null;
  let firstQuestionLine = lines.findIndex((l) => qHead.test(l));
  for (let i = 0; i < firstQuestionLine; i++) {
    const line = lines[i];
    const sm = line.match(subHead);
    if (sm) {
      const id = sm[1];
      if (!subelements.has(id) || sm[2].length > subelements.get(id)!.title.length)
        subelements.set(id, {
          id,
          title: clean(sm[2]).replace(/\s*[-–—]\s*$/, ""),
          examQuestions: Number(sm[3]),
          groups: [],
        });
      currentSub = subelements.get(id)!;
      lastGroup = null;
      continue;
    }
    const gm = line.match(groupHead);
    if (gm && currentSub && gm[1].startsWith(currentSub.id)) {
      lastGroup = gm[1];
      groupTopics.set(lastGroup, clean(gm[2]));
      continue;
    }
    // continuation of a wrapped topic line
    if (lastGroup && line.trim() && !/^\s*SUBELEMENT/i.test(line)) {
      groupTopics.set(lastGroup, clean(groupTopics.get(lastGroup)! + " " + line));
    } else if (!line.trim()) {
      lastGroup = null;
    }
  }

  // ---- questions ----------------------------------------------------------
  const questions: Question[] = [];
  let i = firstQuestionLine;
  while (i < lines.length) {
    const m = lines[i].match(qHead);
    if (!m) {
      i++;
      continue;
    }
    const id = m[1];
    const answerLetter = m[2];
    const refs = (m[3] ?? "")
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);
    i++;
    const body: string[] = [];
    while (i < lines.length && !/^\s*~~\s*$/.test(lines[i]) && !qHead.test(lines[i])) {
      if (lines[i].trim()) body.push(lines[i].trim());
      i++;
    }
    // split body into question stem + choices A-D
    const stemParts: string[] = [];
    const choices: string[] = [];
    for (const l of body) {
      const cm = l.match(/^([A-D])\.\s*(.*)$/);
      if (cm && cm[1].charCodeAt(0) - 65 === choices.length) choices.push(cm[2]);
      else if (choices.length > 0) choices[choices.length - 1] += " " + l;
      else stemParts.push(l);
    }
    const q = clean(stemParts.join(" "));
    const fm = q.match(/figure\s+([TGE]\d*-\d+)/i);
    questions.push({
      id,
      group: id.slice(0, 3),
      answer: answerLetter.charCodeAt(0) - 65,
      refs,
      q,
      choices: choices.map(clean),
      ...(fm ? { figure: fm[1].toUpperCase() } : {}),
    });
  }

  // ---- group questions into the syllabus structure ------------------------
  for (const qn of questions) {
    const subId = qn.id.slice(0, 2);
    const sub = subelements.get(subId);
    if (!sub) throw new Error(`${src.license}: no subelement ${subId} for ${qn.id}`);
    let g = sub.groups.find((x) => x.id === qn.group);
    if (!g) {
      g = { id: qn.group, topics: groupTopics.get(qn.group) ?? "", questions: [] };
      sub.groups.push(g);
    }
    g.questions.push(qn.id);
  }

  // ---- validation ----------------------------------------------------------
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const qn of questions) {
    if (seen.has(qn.id)) problems.push(`duplicate ${qn.id}`);
    seen.add(qn.id);
    if (qn.choices.length !== 4) problems.push(`${qn.id}: ${qn.choices.length} choices`);
    if (qn.answer < 0 || qn.answer > 3) problems.push(`${qn.id}: bad answer`);
    if (!qn.q) problems.push(`${qn.id}: empty question`);
    if (qn.choices.some((c) => !c)) problems.push(`${qn.id}: empty choice`);
  }
  for (const sub of subelements.values()) {
    if (sub.groups.length === 0) problems.push(`subelement ${sub.id} has no groups`);
    for (const g of sub.groups) if (!g.topics) problems.push(`group ${g.id} missing topics`);
  }
  if (problems.length) throw new Error(`${src.license} validation failed:\n  ${problems.join("\n  ")}`);

  const subs = [...subelements.values()].sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
  // ids are like T0..T9 — put 0 last to match the published ordering
  subs.sort((a, b) => ((+a.id.slice(1) || 10) - (+b.id.slice(1) || 10)));
  for (const s of subs) s.groups.sort((a, b) => a.id.localeCompare(b.id));

  return {
    license: src.license,
    letter: src.letter,
    name: src.name,
    element: src.element,
    release: src.release,
    valid: src.valid,
    exam: src.exam,
    subelements: subs,
    questions,
  };
}

mkdirSync("src/data/pools", { recursive: true });
for (const src of SOURCES) {
  const pool = await parse(src);
  writeFileSync(`src/data/pools/${src.license}.json`, JSON.stringify(pool, null, 1) + "\n");
  const groups = pool.subelements.reduce((n, s) => n + s.groups.length, 0);
  const figs = pool.questions.filter((q) => q.figure).length;
  console.log(
    `${src.name.padEnd(10)} ${String(pool.questions.length).padStart(4)} questions  ${String(groups).padStart(3)} groups  ${pool.subelements.length} subelements  ${figs} figure questions`,
  );
}
