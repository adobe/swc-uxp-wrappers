# Badge — New Package Analysis: v1.12.0

## 1. Package Overview

New wrapper package — no prior version in `swc-uxp-wrappers`. Wraps `@spectrum-web-components/badge@1.12.0`.

## 2. File Inventory

| File | Description |
|---|---|
| `src/Badge.js` | UXP wrapper extending SWC `Badge` |
| `src/index.js` | Re-exports `Badge` |
| `src/uxp-badge.css` | UXP overrides (currently empty) |
| `src/badge-overrides.css.js` | Pass-through — overrides not bundled in `badge.css.js` |
| `sp-badge.js` | `customElements.define('sp-badge', Badge)` |
| `package.json` | New package at `v1.0.0` |

## 3. CSS Analysis (`badge.css.js`)

### Logical properties
Uses `min-block-size`, `inline-size`, `block-size`, `padding-block-*`, `padding-inline-*` extensively on `:host`, `.label`, and `::slotted([slot=icon])`. All translated by the `enableLogicalProperties` mapper — no physical overrides needed.

### Icon sizing
`::slotted([slot=icon])` sets dimensions via `inline-size`/`block-size` (mapper-handled). Icon `sp-icon` SVG size depends on `--spectrum-icon-size` being set from the badge context. Badge's own `:host` rules set `--spectrum-icon-size` per size variant. Pending UXP verification of whether `MutationObserver`-driven slot rendering and `::slotted()` logical props work correctly — overrides held back until confirmed.

### `badge-overrides.css.js`
Empty — no `--system-*` tokens. Added as pass-through export for API parity.

## 4. JS Analysis (`Badge.js` / `Badge.base.js`)

- `BadgeBase extends SizedMixin(..., { noDefaultSize: true })` — no default size applied; explicit `size` attribute required for size-variant tokens.
- `hasIcon` driven by `ObserveSlotPresence` — conditionally renders `<slot name="icon">`. Pending UXP verification of `MutationObserver` cycle reliability.
- No UXP-incompatible APIs identified.

## 5. UXP CSS Checklist

| Check | Result |
|---|---|
| `visibility: revert-layer` | Not present |
| `@media (hover: hover)` | Not present — badge is non-interactive |
| `:is()` pseudo-class | Not present |
| `:dir()` pseudo-class | Not present |
| `max()`/`min()`/`clamp()` as values | Not present |
| `--custom-prop: inherit` on `:host` | Not present |
| Logical properties | Present — handled by mapper |

## 6. Known Pending Issues

- **Icon visibility**: Icons not rendering in UXP — root cause under investigation. Two hypotheses: (a) `ObserveSlotPresence` + Lit re-render cycle unreliable in UXP causing `<slot name="icon">` to never enter shadow DOM; (b) `::slotted()` logical property mapper not applying across shadow root boundaries. Overrides held back pending user verification.

## 7. package.json

- `version`: `1.0.0` (new package)
- `@swc-uxp-internal/badge`: `npm:@spectrum-web-components/badge@1.12.0`
