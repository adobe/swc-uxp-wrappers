# Help Text — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| Added | `src/help-text-overrides.css.js` | Pass-through export added to wrapper |
| Removed | — | None |

## 2. CSS Changes (`help-text.css.js`)

### Layout changes
- `.icon` now uses `margin-inline-end` (was no explicit margin in old CSS — gap was via other means), `padding-block-start`/`padding-block-end` for vertical spacing. All logical — mapper-handled.
- `.text` now uses `padding-block-start`/`padding-block-end`. Logical — mapper-handled.
- `:host` now uses `min-block-size`. Mapper-handled.

### Token changes
- `--spectrum-helptext-*` tokens largely unchanged.
- New `--spectrum-help-text-top-to-workflow-icon-{size}` tokens added for per-size icon vertical spacing.

### `help-text-overrides.css.js`
Contains `--system-helptext-*` tokens — **already bundled** in `help-text.css.js`. Flows via `super.styles`.

## 3. JS Changes (`HelpText.js`)

- No functional changes.
- Fixed missing `...` spread: `[super.styles, styles]` → `[...super.styles, styles]`.

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `@media (hover: hover)` | Not present |
| `:is()` | Not present |
| Logical properties | Present — handled by mapper |
| `--system-*` tokens | Bundled in main CSS |

## 5. Existing Overrides Audit

| Old override | Status |
|---|---|
| `.icon { margin-right/margin-top/margin-bottom }` (UXP-21328) | **Removed** — were physical replacements for `margin-inline-end`/`padding-block-*`; v1.12.0 uses logical props directly, mapper handles them |
| `.text { padding-top/padding-bottom }` (UXP-21328) | **Removed** — same reason |

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/help-text`: `0.37.0` → `1.12.0`
- Added export: `./src/help-text-overrides.css.js`
