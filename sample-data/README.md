# Sample data for labs

Synthetic web-style events for **Core Power User** lab exercises in this repo. They are **not** real traffic—generated for learning only.

| File | Sourcetype (recommended) | Events | Purpose |
|------|--------------------------|--------|---------|
| [web_access.log](web_access.log) | `web_access` | 650 | Main dataset: `status`, `bytes`, `sessionid`, `client_ip`, etc. |
| [legacy_web.log](legacy_web.log) | `legacy_web` | 120 | Same shape but `ip_addr` instead of `client_ip` (field-alias lab) |

Recommended **index** name: `sample` (any name works if you update lab SPL).

**Time range:** events span roughly **22–29 May 2026 UTC**. After ingest, set the time picker to **All time** or that window.

---

## Quick start (upload)

Works on Splunk Enterprise and Splunk Cloud when you have permission to upload files.

1. Create an index (if needed): **Settings → Indexes → New Index**  
   - Name: `sample`  
   - For labs only; use your org’s retention and access policies in production.

2. **Settings → Add Data → Upload** (or **Upload** from the home app list).

3. Upload `web_access.log`:
   - **Source type:** create new → name it `web_access`
   - **Index:** `sample`
   - Complete the wizard and confirm events are searchable.

4. Repeat for `legacy_web.log` with sourcetype `legacy_web` into the same index.

5. Verify:

```spl
index=sample sourcetype=web_access | head 5
index=sample sourcetype=legacy_web | head 5
index=sample | stats count by sourcetype
```

Lab SPL in the app uses `index=sample` by default.

---

## Alternative: monitor files on disk (Enterprise)

On a Splunk Enterprise instance with filesystem access:

1. Copy both `.log` files to a directory Splunk can read, e.g.  
   `$SPLUNK_HOME/etc/apps/search/local/sampledata/`

2. **Settings → Data inputs → Files & directories → New Local File & Directory**  
   - Path: your `web_access.log`  
   - Index: `sample`  
   - Sourcetype: `web_access`  
   - Repeat for `legacy_web.log` / `legacy_web`.

Or add to `inputs.conf` (adjust paths):

```ini
[monitor:///opt/splunk/sampledata/web_access.log]
disabled = false
index = sample
sourcetype = web_access

[monitor:///opt/splunk/sampledata/legacy_web.log]
disabled = false
index = sample
sourcetype = legacy_web
```

---

## Field extraction

Events use `key=value` pairs in `_raw`. Splunk often auto-extracts these on search. If `status` or `bytes` are missing:

- Run **Settings → Fields → Field extractions** and add extractions for sourcetype `web_access`, or  
- Use inline `rex` in labs (Lab 4).

Example search after ingest:

```spl
index=sample sourcetype=web_access
| stats count by status
| sort - count
```

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
