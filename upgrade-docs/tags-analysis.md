# Tags — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| Added | `src/tag-overrides.css.js` | Pass-through export needed |
| Added | `src/tags-overrides.css.js` | Pass-through export needed |

## 2. CSS Changes

### `tag.css.js`
- Token values normalized (whitespace in `var()` calls removed — functionally identical)
- New tokens added: `--spectrum-tag-background-color-selected`, `--spectrum-tag-background-color-selected-hover/active/focus` — the selected state now uses neutral background tokens instead of white text only
- **`:is(:active,[active])` present** — 6 occurrences:
  - `:host(:is(:active,[active]))`
  - `:host([selected]:is(:active,[active]))`
  - `:host([invalid]:is(:active,[active]))`
  - `:host([invalid][selected]:is(:active,[active]))`
  - `:host([emphasized]:is(:active,[active]))`
  - `:host([invalid]):hover .clear-button,:host([invalid]:is(:active,[active])) .clear-button`
  All use `:is(:active,[active])` — must be expanded to two separate rules each in `uxp-tag.css`
- No `@media (hover:hover)`, no `revert-layer`, no `:dir()`, no `text-align:start/end`

### `tags.css.js`
- Major token rename: `--spectrum-taggroup-tag-gap-x/y` (old) → `--spectrum-tag-group-item-margin-block/inline` (new)
- `::slotted(*)` now uses `margin-block` / `margin-inline` (logical, mapper-handled) instead of the old `margin` shorthand with `calc()`
- Clean — no UXP issues

### New overrides CSS files
- `tag-overrides.css.js` and `tags-overrides.css.js` — pass-through exports only, not bundled in main CSS

## 3. JS Changes

### `Tag.js`
- Now uses `SizedMixin(Base, {validSizes:["s","m","l"], noDefaultSize:true})` — size attribute must be set explicitly
- Spread missing: `return [super.styles, styles]` → must fix to `[...super.styles, styles]`
- No new UXP-incompatible APIs

### `Tags.js`
- Spread missing: `return [super.styles, styles]` → must fix to `[...super.styles, styles]`
- Uses `RovingTabindexController` and `FocusVisiblePolyfillMixin` — no UXP concerns

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `:is()` | **PRESENT** — 6 rules in `tag.css.js` use `:is(:active,[active])` — must expand in `uxp-tag.css` |
| `@media (hover: hover)` | Not present |
| `revert-layer` | Not present |
| `@layer` | Not present |
| `text-align: start/end` | Not present |
| `:dir()` | Not present |
| Logical properties | Present — mapper-handled |

## 5. Existing Overrides Audit (`uxp-tag.css`)

All tokens referenced in the existing `uxp-tag.css` are confirmed present in v1.12.0:
- `--spectrum-tag-height` ✓
- `--spectrum-tag-spacing-inline-start` ✓
- `--spectrum-tag-border-width` ✓
- `--spectrum-tag-label-spacing-inline-end` ✓
- `--spectrum-tag-label-spacing-block` ✓
- `--spectrum-tag-icon-size` ✓
- `--spectrum-tag-icon-spacing-block-*` ✓
- `--spectrum-tag-avatar-spacing-*` ✓
- `--spectrum-tag-clear-button-spacing-*` ✓

All existing overrides remain valid. Additionally need to add `:is()` expansions.

**`uxp-tags.css`** — `display: inline-block` override (UXP-22533) — still needed; no change.

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/tags`: `0.37.0` → `1.12.0`
- `@swc-uxp-wrappers/button`: `2.0.0` → `3.0.0`
- Add exports: `./src/tag-overrides.css.js`, `./src/tags-overrides.css.js`
