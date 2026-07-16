# Divider — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| Added | `src/divider-overrides.css.js` | Pass-through export added to wrapper |
| Removed | — | None |

## 2. CSS Changes (`divider.css.js`)

### Logical properties
- **Old:** Used physical `height`/`width` for divider thickness and length.
- **New:** Uses `inline-size`/`block-size` via `--mod-divider-thickness` tokens. Translated by `enableLogicalProperties` mapper.

### `divider-overrides.css.js`
Contains `--system-divider-background-color` tokens — **already bundled** inside `divider.css.js`. No need to add to the styles chain explicitly; flows through `super.styles`.

### `static-color` attribute
Previously `static="white"`, now `static-color="white"` — no wrapper change needed (HTML attribute, not CSS).

## 3. JS Changes (`Divider.js`)

- No functional changes.
- Fixed missing `...` spread operator: `[super.styles, styles]` → `[...super.styles, styles]`.

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `visibility: revert-layer` | Not present |
| `@media (hover: hover)` | Not present |
| `:is()` pseudo-class | Not present |
| `:dir()` pseudo-class | Not present |
| Logical properties | Present — handled by mapper |
| `--system-*` tokens | Bundled in main CSS, flows via `super.styles` |

## 5. Existing Overrides Audit

| Old override | Status |
|---|---|
| `:host { height/width }` — physical fallback for `block-size`/`inline-size` | **Removed** — redundant; mapper handles logical properties |
| `:host([vertical]) { width/height }` — physical fallback | **Removed** — same reason |

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/divider`: `0.37.0` → `1.12.0`
- Added export: `./src/divider-overrides.css.js`
