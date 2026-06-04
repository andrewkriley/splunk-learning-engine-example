# Sample data for labs

Synthetic web-style events for **Core Power User** lab exercises in this repo. They are **not** real traffic—generated for learning only.

| File | Sourcetype (recommended) | Events | Purpose |
|------|--------------------------|--------|---------|
| [web_access.log](web_access.log) | `web_access` | 650 | Main dataset: `status`, `bytes`, `sessionid`, `client_ip`, etc. |
| [legacy_web.log](legacy_web.log) | `legacy_web` | 120 | Same shape but `ip_addr` instead of `client_ip` (field-alias lab) |

Recommended **index** name: `splunk_learning_engine` (any name works if you update lab SPL).

**Time range:** events span roughly **22–29 May 2026 UTC**. After ingest, set the time picker to **All time** or that window.

---

## Quick start (upload)

Works on Splunk Enterprise and Splunk Cloud when you have permission to upload files.

1. Create an index (if needed): **Settings → Indexes → New Index**  
   - Name: `splunk_learning_engine`  
   - For labs only; use your org’s retention and access policies in production.

2. **Settings → Add Data → Upload** (or **Upload** from the home app list).

3. Upload `web_access.log`:
   - **Source type:** create new → name it `web_access`
   - **Index:** `splunk_learning_engine`
   - Complete the wizard and confirm events are searchable.

4. Repeat for `legacy_web.log` with sourcetype `legacy_web` into the same index.

5. Verify:

```spl
index=splunk_learning_engine sourcetype=web_access | head 5
index=splunk_learning_engine sourcetype=legacy_web | head 5
index=splunk_learning_engine | stats count by sourcetype
```

Lab SPL in the app uses `index=splunk_learning_engine` by default.

---

## Alternative: monitor files on disk (Enterprise)

On a Splunk Enterprise instance with filesystem access:

1. Copy both `.log` files to a directory Splunk can read, e.g.  
   `$SPLUNK_HOME/etc/apps/search/local/sampledata/`

2. **Settings → Data inputs → Files & directories → New Local File & Directory**  
   - Path: your `web_access.log`  
   - **Index:** `splunk_learning_engine`  
   - Sourcetype: `web_access`  
   - Repeat for `legacy_web.log` / `legacy_web`.

Or add to `inputs.conf` (adjust paths):

```ini
[monitor:///opt/splunk/sampledata/web_access.log]
disabled = false
index = splunk_learning_engine
sourcetype = web_access

[monitor:///opt/splunk/sampledata/legacy_web.log]
disabled = false
index = splunk_learning_engine
sourcetype = legacy_web
```

---

## Field extraction

Each line in the sample logs looks like this (fields are inside `_raw`, not separate columns yet):

```text
time="2026-05-22T18:00:55.858Z" host=web02 status=500 bytes=1970 sessionid=sess-026 client_ip=10.0.2.21 ...
```

Splunk **often auto-extracts** key=value pairs from `_raw` on upload (status, action, bytes, sessionid, method, uri, user, client_ip, etc.). You may see 25+ fields in **Select Fields** without creating any EXTRACT rules.

**Lab 4** therefore practices extracting a **new derived field**—`session_num` from `sessionid=sess-026` in _raw—that will **not** appear in Interesting Fields until you add a regex extraction.

### Step 1 — Check what you already have

Run:

```spl
index=splunk_learning_engine sourcetype=web_access
| head 5
| table status, action, bytes, sessionid, session_num
```

| Result | What to do |
|--------|------------|
| status, action, bytes, sessionid populated; **session_num empty** | Normal—continue to **Step 2** (Lab 4 Field Extractor uses session_num). |
| All columns including session_num populated | You already saved an extraction—skip Lab 4 or pick another derived field. |
| bytes or sessionid empty (rare after KV extraction) | Add EXTRACT rules in **Step 3** table below for missing fields only. |

Optional quick test (search-time only, not saved):

```spl
index=splunk_learning_engine sourcetype=web_access
| head 5
| kv pairdelim=" " kvdelim="="
| table status, bytes, sessionid
```

If `kv` fills in the columns, fields work for that search; for labs that use plain `index=... | stats count by status` without `kv`, still do **Step 3** so extractions apply automatically.

### Step 2 — One-off extraction in Search (Lab 4, no Settings)

Extract **session_num** even when **sessionid** already exists as a field:

```spl
index=splunk_learning_engine sourcetype=web_access
| rex field=_raw "sessionid=sess-(?<session_num>\d+)"
| stats count by session_num
```

If bytes or sessionid are missing in your environment (uncommon), add:

```spl
| rex field=_raw "bytes=(?<bytes>\d+)"
| rex field=_raw "sessionid=(?<sessionid>\S+)"
```

### Step 3 — Persistent field extractions

Create **search-time EXTRACT** rules only for fields **not** already in Interesting Fields.

**Lab 4 wizard target:**

| Field name | Regular expression | When needed |
|------------|-------------------|-------------|
| `session_num` | `sessionid=sess-(?<session_num>\d+)` | Lab 4 (derived field—not auto-extracted) |

**Only if missing from Select Fields after upload:**

| Field name | Regular expression |
|------------|-------------------|
| `bytes` | `bytes=(?<bytes>\d+)` |
| `sessionid` | `sessionid=(?<sessionid>\S+)` |
| `status` | `status=(?<status>\d+)` |
| `action` | `action=(?<action>\w+)` |

Per extraction, set **Apply to:** sourcetype `web_access`, type **Search-time** / EXTRACT.

Verify:

```spl
index=splunk_learning_engine sourcetype=web_access
| head 5
| table sessionid, session_num, status, bytes
```

**Field Extractor wizard (Lab 4):**

1. Confirm **session_num** is not in Select Fields (sessionid will be).
2. **Extract Fields** on an event → regex `sessionid=sess-(?<session_num>\d+)`.
3. Save scoped to sourcetype `web_access`.

### Step 4 — `legacy_web` sourcetype (field-alias lab only)

`legacy_web.log` uses `ip_addr` instead of `client_ip`. Repeat **Step 3** for `sourcetype=legacy_web` with at least:

| Field | Regular expression |
|-------|-------------------|
| `status` | `status=(?<status>\d+)` |
| `bytes` | `bytes=(?<bytes>\d+)` |
| `ip_addr` | `ip_addr=(?<ip_addr>\S+)` |

### Example reporting search

After Step 1 passes (or Step 3 is saved):

```spl
index=splunk_learning_engine sourcetype=web_access
| stats count by status
| sort - count
```

You should see counts for `200`, `404`, `500`, etc.

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| Fields work with `rex` but not in a new plain search | Extractions not saved or wrong **sourcetype**—recheck **Apply to** = `web_access`. |
| Many fields already in Select Fields after upload | Expected—Splunk parsed key=value from _raw. Lab 4 extracts **session_num** only. |
| Field Extractor says field already exists | Do not re-extract status/action/sessionid; extract **session_num** with regex instead. |
| Permission denied on Field extractions | Ask admin for `admin` or roles that allow `edit_field_extractions` (Cloud) / knowledge object edit. |
| Only some events have fields | Regex too strict; test against `_raw` from `head 1` in Field Extractor. |

---

## Regenerate files

Maintainers can recreate logs with fixed seed (same shape, new timestamps if you change the script):

```bash
npm run generate:sample-data
```

Commit updated `.log` files if you change the generator.

---

## Security

Do not forward this data to production security analytics as if it were real. Use a dev index and delete when finished if your policy requires it.
