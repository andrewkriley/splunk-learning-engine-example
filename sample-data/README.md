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

Splunk **might** show `status`, `bytes`, `host`, etc. in the left **Interesting Fields** panel after ingest—but after a plain **Upload**, they often **do not** appear until you extract them. Labs assume those fields exist for `sourcetype=web_access`.

### Step 1 — Check whether you need to do anything

Run:

```spl
index=splunk_learning_engine sourcetype=web_access
| head 5
| table _time, host, status, bytes, sessionid, client_ip
```

| Result | What to do |
|--------|------------|
| Columns `status`, `bytes`, etc. have values | **Stop here**—skip to the [stats example](#example-reporting-search) below. |
| Columns are empty or missing from the field picker | Continue to **Step 2** or **Step 3**. |

Optional quick test (search-time only, not saved):

```spl
index=splunk_learning_engine sourcetype=web_access
| head 5
| kv pairdelim=" " kvdelim="="
| table status, bytes, sessionid
```

If `kv` fills in the columns, fields work for that search; for labs that use plain `index=... | stats count by status` without `kv`, still do **Step 3** so extractions apply automatically.

### Step 2 — One-off extraction in Search (Lab 4, no Settings)

Use when you only need fields **in the current search** (good for learning `rex`, not required for every lab if you complete Step 3).

```spl
index=splunk_learning_engine sourcetype=web_access
| rex field=_raw "status=(?<status>\d+)"
| rex field=_raw "bytes=(?<bytes>\d+)"
| rex field=_raw "sessionid=(?<sessionid>\S+)"
| stats count by status
```

Repeat or add more `rex` lines for `host`, `user`, `method`, etc. as needed.

### Step 3 — Persistent field extractions (recommended for all labs)

Create **search-time field extractions** scoped to `sourcetype=web_access` so `status`, `bytes`, and `sessionid` exist without adding `rex` to every search.

**Splunk Enterprise or Splunk Cloud** (wording may vary slightly by version):

1. Open **Settings** (gear) → **Knowledge** → **Field extractions** (or **Fields** → **Field extractions**).
2. Click **New field extraction** (or **Add new**).
3. For each field below, create one extraction (or create the three marked **required for labs** first).

| Field name | Regular expression (copy as-is) | Required for labs |
|------------|----------------------------------|-------------------|
| `status` | `status=(?<status>\d+)` | Yes |
| `bytes` | `bytes=(?<bytes>\d+)` | Yes |
| `sessionid` | `sessionid=(?<sessionid>\S+)` | Yes |
| `host` | `host=(?<host>\S+)` | Helpful |
| `client_ip` | `client_ip=(?<client_ip>\S+)` | Helpful |
| `user` | `user=(?<user>\S+)` | Helpful |
| `method` | `method=(?<method>\S+)` | Helpful |
| `uri` | `uri=(?<uri>\S+)` | Helpful |
| `action` | `action=(?<action>\S+)` | Helpful |

Per extraction, set:

- **Apply to:** `sourcetype` = `web_access` (same index you used on upload).
- **Type / method:** **Regular expression** (or **Inline** / **EXTRACT**—not a transform that runs at index time unless you intend that).
- **Search app context:** the app where you run labs (often **Search & Reporting** or your dev app).

4. **Save** each extraction.

5. Open a **new** search (important—avoids cached field lists):

```spl
index=splunk_learning_engine sourcetype=web_access
| head 5
| table status, bytes, sessionid
```

6. Confirm values appear. Then run the reporting search below.

**Using the Field Extractor wizard (alternative):**

1. Run `index=splunk_learning_engine sourcetype=web_access | head 20`.
2. Expand one event → **Event Actions** → **Extract Fields** (or **All Fields** → **Extract new fields**).
3. Select the sample value for `status` (e.g. `500`) and choose **Regular expression**; Splunk suggests a pattern—ensure it looks like `status=(?<status>\d+)`.
4. Save, scope to **sourcetype `web_access`**, repeat for `bytes` and `sessionid`.

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
| `status` empty but regex test matches in Field Extractor | Open a **new** search tab; confirm time range includes **22–29 May 2026** or **All time**. |
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
