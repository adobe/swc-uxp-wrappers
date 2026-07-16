# Thumbnail — New Package Analysis: v1.12.0

## 1. File Inventory

| File | Description |
|---|---|
| `src/Thumbnail.js` | Main component class |
| `src/thumbnail.css.js` | Combined component CSS |
| `src/spectrum-thumbnail.css.js` | Spectrum-level CSS (same content as thumbnail.css.js minus overrides) |
| `src/thumbnail-overrides.css.js` | System token bridge: `--spectrum-thumbnail-border-radius: var(--system-thumbnail-border-radius)` |
| `src/index.js` | Re-exports Thumbnail |
| `sp-thumbnail.js` | Custom element registration |

## 2. CSS Analysis (`thumbnail.css.js`)

- Fully logical-property based (`inline-size`, `block-size`, `inset-block-*`, `inset-inline-*`) — all mapper-handled
- No `:is()`, no `@media (hover:hover)`, no `revert-layer`, no `@layer`, no `:dir()`, no `text-align:start/end`
- `::slotted(:not(img)) { display: none }` — hides non-image slotted content
- `::slotted(*) { max-block-size: 100%; max-inline-size: 100% }` — logical, mapper-handled
- `inset-block: 0; inset-inline: 0` on `.background` — mapper-handled

## 3. JS Analysis (`Thumbnail.js`)

- Extends `SpectrumElement` directly
- Imports `@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js` as a style dependency — wrapper must ensure this package is accessible (it's a peer dep in SWC)
- Size system uses explicit string values `["50","75","100","200","300","400","500","600","700","800","900","1000"]` — not the standard `SizedMixin` s/m/l system
- `static get styles() { return [b, h] }` where `b` = opacity-checkerboard styles, `h` = thumbnail.css.js — wrapper must spread: `[...super.styles, styles]`
- Properties: `cover` (Boolean), `layer` (Boolean), `size` (String), `background` (String)
- No dynamic import, no UXP-incompatible APIs

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `:is()` | Not present |
| `@media (hover: hover)` | Not present |
| `revert-layer` | Not present |
| `@layer` | Not present |
| `text-align: start/end` | Not present |
| `:dir()` | Not present |
| Logical properties | Present — mapper-handled |
| `display: contents` | Not present |

## 5. Wrapper Files Required

| File | Notes |
|---|---|
| `src/Thumbnail.js` | UXP wrapper extending SWC Thumbnail; fix spread |
| `src/index.js` | Re-export |
| `src/uxp-thumbnail.css` | Empty initially — no UXP overrides needed |
| `src/uxp-thumbnail.css.js` | Build artifact |
| `src/thumbnail.css.js` | CSS combiner |
| `src/thumbnail-overrides.css.js` | Pass-through export |
| `sp-thumbnail.js` | Custom element registration |
| `package.json` | New package at v1.0.0 |

## 6. package.json Shape

```json
{
  "name": "@swc-uxp-wrappers/thumbnail",
  "version": "1.0.0",
  "dependencies": {
    "@swc-uxp-internal/thumbnail": "npm:@spectrum-web-components/thumbnail@1.12.0"
  },
  "exports": {
    ".": "./src/index.js",
    "./package.json": "./package.json",
    "./src/Thumbnail.js": "./src/Thumbnail.js",
    "./sp-thumbnail.js": "./sp-thumbnail.js",
    "./src/thumbnail-overrides.css.js": "./src/thumbnail-overrides.css.js",
    "./src/thumbnail.css.js": "./src/thumbnail.css.js"
  }
}
```
