# No Empty Links: WP Link Auditor

A Chrome and Firefox browser extension for WordPress developers that scans the current page for **empty links** — buttons and anchors with missing, empty, or `#` href values — and highlights them instantly.

---

## The Problem

WordPress themes and Elementor templates ship with placeholder buttons like:

```html
<a href="#">Contact Us</a>
```

These are easy to miss during QA and end up in production, creating a bad user experience. This extension makes them impossible to ignore.

---

## Features

- 🔴 **Visual highlight** — flags empty links with a red outline and red background
- 🔢 **Counter** — shows how many empty links were found in the popup
- 🧹 **Clear highlights** — removes all highlights without reloading the page
- ⚡ **Manual trigger** — only scans when you click "Scan Page", never runs automatically
- 🔌 **Elementor-aware** — also detects `.elementor-button` elements not wrapped in an anchor
- 🌐 **Cross-browser** — works in Chrome and Firefox (Manifest V3 + webextension-polyfill)

---

## Empty Link Definition

An element is flagged if:
1. It is an `<a>` tag with a missing, empty (`""`), or `#` href
2. It has the class `.elementor-button` but is not an `<a>` tag

---

## Installation (Developer Mode)

This extension is not yet published to the Chrome Web Store. To install it manually:

### Chrome
1. Download or clone this repository
2. Go to `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder

### Firefox
1. Download or clone this repository
2. Go to `about:debugging`
3. Click **This Firefox** → **Load Temporary Add-on**
4. Select the `manifest.json` file inside the project folder

---

## Usage

1. Navigate to any webpage
2. Click the **No Empty Links** icon in your browser toolbar
3. Click **Scan Page**
4. Empty links are highlighted in red on the page and counted in the popup
5. Click **Clear Highlights** to remove all highlights

---

## Store Submission Instructions

1. Go to the root project folder
2. Remove .md files
3. Execute this command from the terminal `zip -r empty-links.zip . -x "*.git*`

---

## Tech Stack

- Manifest V3
- Vanilla JavaScript, HTML, CSS
- [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) for cross-browser compatibility
- No build tools, no dependencies, no frameworks

---

## Roadmap

- [ ] Publish to Chrome Web Store & Firefox Add-ons
- [ ] Visibility filter (option to skip hidden elements)
- [ ] Test support for Divi, Beaver Builder, WPBakery
- [ ] Export empty links to CSV
- [ ] Toolbar icon badge with live count

---

## License

MIT — free to use, modify, and distribute.
