import type { DomainMeta, Question, QuestionStatsMap } from '../types'
import {
  MASTERY_CORRECT_THRESHOLD,
  MASTERED_PRACTICE_WEIGHT,
} from '../types'

/** Deterministic PRNG (mulberry32) for reproducible exam shuffles given a seed string */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSeed(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function shuffleInPlace<T>(arr: T[], rand: () => number): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

/**
 * Largest-remainder allocation of `total` items across domains by blueprint %.
 */
export function examDomainQuotas(
  total: number,
  domains: DomainMeta[],
): Map<string, number> {
  const exact = domains.map((d) => ({
    id: d.id,
    raw: (total * d.examWeightPercent) / 100,
  }))
  const floors = exact.map((e) => Math.floor(e.raw))
  let assigned = floors.reduce((a, b) => a + b, 0)
  const remainder = exact.map((e, i) => ({
    i,
    frac: e.raw - floors[i],
  }))
  remainder.sort((a, b) => b.frac - a.frac)
  const quotas = [...floors]
  let r = 0
  while (assigned < total) {
    quotas[remainder[r % remainder.length].i]++
    assigned++
    r++
  }
  return new Map(domains.map((d, i) => [d.id, quotas[i]]))
}

export function selectExamQuestions(
  pool: Question[],
  total: number,
  domains: DomainMeta[],
  seed = 'default',
): Question[] {
  const quotas = examDomainQuotas(total, domains)
  const byDomain = new Map<string, Question[]>()
  for (const d of domains) {
    byDomain.set(d.id, [])
  }
  for (const q of pool) {
    byDomain.get(q.domainId)?.push(q)
  }

  const rand = mulberry32(hashSeed(seed))
  const picked: Question[] = []

  for (const d of domains) {
    const bucket = [...(byDomain.get(d.id) ?? [])]
    shuffleInPlace(bucket, rand)
    const n = quotas.get(d.id) ?? 0
    picked.push(...bucket.slice(0, n))
  }

  if (picked.length < total) {
    const spare = pool.filter((q) => !picked.includes(q))
    shuffleInPlace(spare, rand)
    for (const q of spare) {
      if (picked.length >= total) break
      picked.push(q)
    }
  }

  shuffleInPlace(picked, rand)
  return picked.slice(0, total)
}

export function practiceWeight(
  question: Question,
  stats: QuestionStatsMap,
): number {
  const c = stats[question.id]?.correctCount ?? 0
  if (c >= MASTERY_CORRECT_THRESHOLD) return MASTERED_PRACTICE_WEIGHT
  return (MASTERY_CORRECT_THRESHOLD - c) * 4 + 1
}

function weightedPick<T>(items: T[], weights: number[], rand: () => number): T {
  const total = weights.reduce((a, b) => a + b, 0)
  let r = rand() * total
  for (let i = 0; i < items.length; i++) {
    r -= weights[i]
    if (r <= 0) return items[i]
  }
  return items[items.length - 1]
}

/**
 * Build a practice session: unique questions, weighted toward low mastery.
 */
export function buildPracticeSession(
  pool: Question[],
  stats: QuestionStatsMap,
  size: number,
  seed = `${Date.now()}`,
): Question[] {
  const rand = mulberry32(hashSeed(seed))
  const remaining = [...pool]
  const out: Question[] = []

  while (out.length < size && remaining.length > 0) {
    const weights = remaining.map((q) => practiceWeight(q, stats))
    const choice = weightedPick(remaining, weights, rand)
    out.push(choice)
    const idx = remaining.indexOf(choice)
    remaining.splice(idx, 1)
  }

  return out
}
