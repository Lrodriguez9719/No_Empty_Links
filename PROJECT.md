# No Empty Links: WP Link Auditor

A Chrome and Firefox browser extension that scans the current webpage for "empty" links — anchor tags with missing, empty, or `#` href values — and highlights them visually so WordPress developers can catch them before launch.

## Problem
WordPress themes and Elementor templates often ship with placeholder `<a href="#">` buttons. These are easy to miss during QA and can reach production unfixed.

## Tech Stack
- Manifest V3 (Chrome + Firefox compatible)
- `webextension-polyfill` for cross-browser `browser.*` API support
- Vanilla JavaScript, HTML, CSS — no build tools required

## Empty Link Definition
An element is flagged as a empty link if:
1. It is an `<a>` tag and its `href` is missing, empty (`""`), or exactly `"#"`
2. It has the class `.elementor-button` but is **not** an `<a>` tag (e.g., a `<div>` used as a button without a wrapping anchor)

> **Note:** The scanner flags all matching DOM elements, including those hidden or off-screen. This is intentional — hidden empty links are still empty links. A future option to filter by visibility may be added.

## Scope
**In scope:**
- DOM scan of the currently active tab
- Elementor button detection (`.elementor-button`)
- Manual scan trigger via popup
- Visual highlights (red outline + red background)
- "Clear Highlights" without page reload
- Chrome and Firefox support

**Out of scope:**
- HTTP 404 / broken URL checking (no network requests)
- Auto-scan on page load
- Other page builders (Divi, Beaver Builder, etc.) — future roadmap
- Plain `<button>` elements not related to Elementor

## File Structure
no_empty_links/
├── PROJECT.md ← this file (AI context document)
├── README.md ← public-facing GitHub readme
├── manifest.json ← extension manifest (MV3)
├── content.js ← DOM scanning logic + injected styles
├── popup.html ← extension popup UI
├── popup.js ← popup button logic
├── popup.css ← popup styles
├── browser-polyfill.min.js ← webextension-polyfill (from Mozilla)
└── icons/
├── icon16.png
├── icon48.png
└── icon128.png


## Roadmap
- [x] Phase 0: PROJECT.md
- [x] Phase 1: manifest.json
- [x] Phase 2: content.js (scanning logic + inline styles)
- [x] Phase 3: popup.html + popup.js + popup.css
- [x] Phase 4: Icons (16, 48, 128px)
- [x] Phase 5: browser-polyfill.min.js (downloaded)
- [x] Phase 6: Tested in Chrome — working
- [ ] Phase 7: Tested in Firefox
- [ ] Phase 8: Publish to Chrome Web Store
- [ ] Phase 9: Publish to Firefox Add-ons

## Future Ideas
- Option to skip hidden/off-screen elements (visibility filter toggle)
- Test and check support for other page builders (Divi, Beaver Builder, WPBakery)
- Export empty links list to CSV
- Count badge on the extension toolbar icon
- Auto-highlight on page load (optional toggle in settings)