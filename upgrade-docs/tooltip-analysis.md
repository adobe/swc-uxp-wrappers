# Tooltip — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| No new files | — | No new exports |

## 2. CSS Changes (`tooltip.css.js`)

- Token values normalized (whitespace removed from `var()` calls)
- Tip positioning logic unchanged structurally
- `:dir(rtl)` present for tip corner positioning — UXP does not support `:dir()`. The existing overrides use placement-based `:host([placement*=...])` selectors which are sufficient for LTR; RTL is not addressed
- No `:is()`, no `@media (hover:hover)`, no `revert-layer`, no `@layer`, no `text-align:start/end`

## 3. JS Changes (`Tooltip.js`)

- Significant refactor: `Tooltip` now uses `DependencyManagerController` to dynamically import `sp-overlay` when `selfManaged=true`
- New `selfManaged` property (`self-managed` attribute) — enables tooltip to manage its own overlay without external wrapper
- New `triggerElement` setter/getter — passes trigger through to `overlayElement`
- New `tipPadding` property
- `sp-tooltip-openable` custom element defined inline in the same file — lightweight proxy that forwards `open`/`placement` attribute changes to the host `Tooltip`
- **Dynamic `import()`** used: `import("@spectrum-web-components/overlay/sp-overlay.js")` — only when `selfManaged=true`. UXP bundler must handle dynamic imports; `selfManaged` mode may not work in UXP if dynamic import is unsupported
- Spread missing: `return [super.styles, styles]` → must fix to `[...super.styles, styles]`

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `:is()` | Not present |
| `@media (hover: hover)` | Not present |
| `revert-layer` | Not present |
| `@layer` | Not present |
| `text-align: start/end` | Not present |
| `:dir()` | Present — RTL tip positioning. Existing overrides cover LTR only. |
| Dynamic `import()` | Present — `selfManaged` mode only. Verify UXP bundler support. |
| Logical properties | Present — mapper-handled |

## 5. Existing Overrides Audit (`uxp-tooltip.css`)

Token audit against v1.12.0:
- `--spectrum-tooltip-tip-height` ✓
- `--spectrum-tooltip-neutral-tip-width` ✗ **MISSING** — token removed in v1.12.0. The override references this token in tip rotation margin calculations. Will silently resolve to nothing; the tip rotation may be off.
- `--spectrum-tooltip-tip-inline-size` ✓
- `--spectrum-tooltip-max-inline-size` ✓
- `--spectrum-tooltip-height` ✓
- `--spectrum-tooltip-spacing-inline` ✓
- `--spectrum-tooltip-icon-height/width` ✓
- `--spectrum-tooltip-icon-spacing-*` ✓
- `--spectrum-tooltip-line-height` ✓
- `--spectrum-tooltip-spacing-block-*` ✓

**Action required:** Replace `--spectrum-tooltip-neutral-tip-width` with `--spectrum-tooltip-tip-inline-size` in the tip rotation calc.

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/tooltip`: `0.37.0` → `1.12.0`
- No new exports
