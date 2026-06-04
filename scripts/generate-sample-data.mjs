/**
 * Generates sample log files for Power User labs (reproducible seed).
 * Run: npm run generate:sample-data
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'sample-data')

/** Mulberry32 PRNG */
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s += 0x6d2b79f5
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = rng(0x5a4d504c) // "SMPL"

const HOSTS = ['web01', 'web02', 'web03', 'api-gw01']
const USERS = ['alice', 'bob', 'carol', 'dave', 'erin']
const ACTIONS = ['login', 'view', 'search', 'purchase', 'logout', 'error']
const METHODS = ['GET', 'POST', 'PUT', 'DELETE']
const URIS = [
  '/api/orders',
  '/api/login',
  '/api/search',
  '/health',
  '/static/app.js',
  '/api/cart',
  '/api/profile',
]

const STATUSES = [
  ...Array(140).fill(200),
  ...Array(25).fill(201),
  ...Array(15).fill(301),
  ...Array(30).fill(404),
  ...Array(12).fill(500),
  ...Array(8).fill(503),
]

function pick(arr) {
  return arr[Math.floor(rand() * arr.length)]
}

function pad(n, w = 3) {
  return String(n).padStart(w, '0')
}

/** ISO timestamp spread over 7 days ending 2026-05-29T18:00:00Z */
function timestampAt(eventIndex, total) {
  const endMs = Date.parse('2026-05-29T18:00:00.000Z')
  const spanMs = 7 * 24 * 60 * 60 * 1000
  const t = endMs - spanMs + (eventIndex / total) * spanMs + rand() * 60_000
  return new Date(t).toISOString()
}

function formatWebAccessLine(ts, fields) {
  const parts = [`time="${ts}"`, ...Object.entries(fields).map(([k, v]) => `${k}=${v}`)]
  return parts.join(' ')
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

mkdirSync(OUT_DIR, { recursive: true })

// --- web_access.log: sessions with multiple events ---
const webLines = []
const sessionIds = Array.from({ length: 45 }, (_, i) => `sess-${pad(i + 1)}`)

// 45 sessions × 4–9 events ≈ 300+ events; fill to 650 with singles
for (const sid of sessionIds) {
  const n = 4 + Math.floor(rand() * 6)
  const user = pick(USERS)
  const host = pick(HOSTS)
  for (let j = 0; j < n; j++) {
    const status = j === n - 1 && rand() < 0.15 ? 500 : pick(STATUSES)
    const bytes = Math.floor(200 + rand() * 12000)
    webLines.push({
      ts: null,
      fields: {
        host,
        status,
        bytes,
        sessionid: sid,
        client_ip: `10.0.${Math.floor(rand() * 5) + 1}.${Math.floor(rand() * 200) + 10}`,
        user,
        method: pick(METHODS),
        uri: pick(URIS),
        action: pick(ACTIONS),
      },
    })
  }
}

while (webLines.length < 650) {
  webLines.push({
    ts: null,
    fields: {
      host: pick(HOSTS),
      status: pick(STATUSES),
      bytes: Math.floor(100 + rand() * 8000),
      sessionid: `sess-${pad(Math.floor(rand() * 900) + 100)}`,
      client_ip: `10.0.${Math.floor(rand() * 5) + 1}.${Math.floor(rand() * 200) + 10}`,
      user: pick(USERS),
      method: pick(METHODS),
      uri: pick(URIS),
      action: pick(ACTIONS),
    },
  })
}

shuffleInPlace(webLines)
const webOut = webLines
  .map((row, i) => {
    row.ts = timestampAt(i, webLines.length)
    return formatWebAccessLine(row.ts, row.fields)
  })
  .join('\n')

writeFileSync(join(OUT_DIR, 'web_access.log'), webOut + '\n', 'utf8')

// --- legacy_web.log: ip_addr instead of client_ip (field alias lab) ---
const legacyLines = []
for (let i = 0; i < 120; i++) {
  const ts = timestampAt(i, 120)
  const status = pick(STATUSES)
  legacyLines.push(
    formatWebAccessLine(ts, {
      host: pick(HOSTS),
      status,
      bytes: Math.floor(100 + rand() * 5000),
      sessionid: pick(sessionIds),
      ip_addr: `192.168.${Math.floor(rand() * 10)}.${Math.floor(rand() * 250) + 1}`,
      user: pick(USERS),
      method: pick(METHODS),
      uri: pick(URIS),
      action: pick(ACTIONS),
    }),
  )
}

writeFileSync(join(OUT_DIR, 'legacy_web.log'), legacyLines.join('\n') + '\n', 'utf8')

// --- manifest for docs ---
const manifest = {
  generatedAt: new Date().toISOString(),
  recommendedIndex: 'splunk_learning_engine',
  files: [
    {
      file: 'web_access.log',
      sourcetype: 'web_access',
      eventCount: webLines.length,
      fields: [
        'host',
        'status',
        'bytes',
        'sessionid',
        'client_ip',
        'user',
        'method',
        'uri',
        'action',
      ],
    },
    {
      file: 'legacy_web.log',
      sourcetype: 'legacy_web',
      eventCount: legacyLines.length,
      fields: [
        'host',
        'status',
        'bytes',
        'sessionid',
        'ip_addr',
        'user',
        'method',
        'uri',
        'action',
      ],
      note: 'Uses ip_addr instead of client_ip for field-alias exercises.',
    },
  ],
  timeRangeHint: 'Events span roughly 22–29 May 2026 UTC. Use All time or that window after ingest.',
}

writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')

console.log(`Wrote ${webLines.length} events to sample-data/web_access.log`)
console.log(`Wrote ${legacyLines.length} events to sample-data/legacy_web.log`)
console.log('Wrote sample-data/manifest.json')
