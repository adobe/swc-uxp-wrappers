# Textfield — SWC 0.37.0 → 1.12.0 Upgrade Analysis

## File Changes

### New files in 1.12.0
| File | Purpose | Wrapper action |
|------|---------|----------------|
| `textfield-overrides.css.js` | Express/S2 `--system-textfield-*` token mappings | Pass-through re-export added |
| `TruncatedValueTooltipController.js` | Shows `sp-overlay`+`sp-tooltip` when input value is visually truncated | Inherited via class extension; no wrapper needed |

### Removed files
- `spectrum-config.js` — build metadata only; no wrapper change needed.

### New upstream dependencies
- `@spectrum-web-components/overlay@1.12.0` — used by `TruncatedValueTooltipController` via dynamic import
- `@spectrum-web-components/tooltip@1.12.0` — used by `TruncatedValueTooltipController` via dynamic import

Both already available as upgraded wrappers in this workspace.

---

## CSS Analysis

### `textfield.css.js` (main CSS)
The CSS content was significantly restructured. Key UXP-relevant changes:

#### `@media (hover:hover)` — HIGH
All hover interaction styles (border-color, text-color, disabled/readonly hover states) moved inside `@media (hover:hover)` in 1.12.0. UXP does not support this media query, so all hover styles would be dead code without an override.

**Fix:** All hover rules unwrapped and added unconditionally to `uxp-textfield.css`.

#### Quiet valid/invalid padding formula change — BUG FIX
In 0.37.0 the quiet variant used the same 4-term formula as the standard variant:
```
icon-spacing-inline-start + icon-size + icon-spacing-inline-end - border-width
```
In 1.12.0 the quiet variant uses a simplified 2-term formula:
```
icon-spacing-inline-start + icon-size
```
Also, the existing `uxp-textfield.css` used `invalid` tokens for the `:host([valid])` padding — a pre-existing bug. Both issues fixed.

#### `transition: border-color` and `transition: color` on `.input` — LOW
Present in both 0.37.0 and 1.12.0. No new issue introduced. No override added (pre-existing, not causing reported issues).

### `textfield-overrides.css.js` (new)
Maps `--spectrum-textfield-*` → `--system-textfield-*` tokens for Express/Spectrum 2 theme support. Pure token remapping; no UXP-incompatible properties.

**Action:** Pass-through `export { default } from '@swc-uxp-internal/textfield/src/textfield-overrides.css.js'` added; new export entry added to `package.json`.

---

## JS Analysis

### `TruncatedValueTooltipController`
- Uses `ResizeObserver` (supported in UXP ≥ 4.x) ✅
- Dynamically imports `@spectrum-web-components/overlay/sp-overlay.js` and `@spectrum-web-components/tooltip/sp-tooltip.js`
- The dynamic import path uses the `@spectrum-web-components` namespace (not the UXP wrapper namespace). At runtime the `resolutions` field in the demo plugin pins these to 1.12.0. The overlay and tooltip UXP wrappers at 1.12.0 don't have critical CSS overrides that would be missing, so this is acceptable.
- Renders via `${this.truncatedValueTooltipController.render()}` — purely additive, does not affect existing textfield functionality.

### New `name` property
`@property({ type: String, reflect: true }) name` added. No UXP impact.

### New `tooltip-placement` attribute
`@property({ attribute: 'tooltip-placement' }) truncatedValueTooltipPlacement` added. No UXP impact.

### `handleInputElementPointerdown()` method
Added as a no-op stub. No UXP impact.

---

## Existing Override Audit

### Logical Property Cleanup

UXP's `enableLogicalProperties` mapper fully covers `padding-block-*`, `padding-inline-*`, `block-size`, `inline-size`, `inset-*`, `margin-block-*`, and `margin-inline-*`. All physical-property overrides that were mirroring these logical properties were **removed** as redundant dead weight.

| Override (removed) | Why removed |
|--------------------|-------------|
| `.input { width }` | `inline-size` fully supported by mapper |
| `.input { height }` | `block-size` fully supported by mapper |
| `.input { padding-left / padding-right }` | `padding-inline-start/end` fully supported |
| `:host([invalid]) .input { padding-right }` | `padding-inline-end` fully supported |
| `:host([valid]) .input { padding-right }` | `padding-inline-end` fully supported (was also using wrong `invalid` tokens — pre-existing bug) |
| `:host([quiet][invalid]) .input { padding-right }` | `padding-inline-end` fully supported (formula also updated from 4-term to 2-term to match 1.12.0) |
| `:host([quiet][valid]) .input { padding-right }` | `padding-inline-end` fully supported (was also using wrong `invalid` tokens — pre-existing bug) |
| `:host([invalid]) #textfield .icon { height/width/top/bottom/right }` | All logical props (block-size, inline-size, inset-*) fully supported |
| `:host([valid]) #textfield .icon { top/bottom/right }` | `inset-*` fully supported |
| `#sizer { height: auto }` | SWC 1.12.0 sets `block-size: auto` explicitly; mapper handles it; override was stale |
| `:host([grows]):not([quiet]) #textfield:after { ... }` | This selector was **removed entirely** from SWC 1.12.0 CSS; override was targeting a stale rule |
| `#textfield { min-width }` | Token `--spectrum-textfield-texticon-min-width` does not exist in 1.12.0; was a no-op |
| `#textfield { margin-left }` | `margin-inline-start` fully supported by mapper |

### Overrides Retained

| Override | Reason |
|----------|--------|
| `:host { width; display: inline-flex; flex-direction: column }` | UXP layout fix (UXP-20703/21323) — SWC uses `display: inline-grid` on `#textfield`; `:host` must also be flex column |
| `.input { padding-top / padding-bottom }` (calc formula) | **Deliberate** — SWC subtracts `border-width` once; UXP uses `border-box` sizing that subtracts it twice. The `* 2` multiplier is an intentional UXP rendering difference, not a logical-property translation |
| `:host([valid]) #textfield .icon { height / width }` | SWC 1.12.0 stopped setting `block-size`/`inline-size` for the valid icon (unlike invalid); explicit sizing required |
| `#textfield { display: inline-flex; width: 100% }` | SWC uses `display: inline-grid`; UXP needs `inline-flex` for layout compatibility (UXP-20703) |
| `:host([quiet][invalid/valid]) #textfield .icon { margin-right }` | `margin-inline-start` not applicable here (negative right margin for quiet icon overlap) |
| `:host([multiline]) #textfield { display: inline-flex }` | Same inline-grid → inline-flex fix for multiline variant |
| `:host([grows]) .input { margin-bottom }` (calc formula) | Deliberate UXP border rendering fix; matches the padding-top/bottom rationale |
| `:host([disabled]) #textfield { pointer-events: none }` | UXP does not propagate pointer-events disabling through shadow DOM the same way |
| background-color overrides (quiet/readonly states) | See section below |
| All `@media (hover:hover)` unwrapped rules | UXP does not support `hover` media query |

---

## background-color: initial — UXP Gap

SWC 1.12.0 uses `background-color: initial` for quiet, disabled-quiet, and readonly states. In browsers `initial` correctly resolves to `transparent`. In UXP, `initial` is **not a supported value** for `background-color` (only named colors, `transparent`, and `currentcolor` are accepted per `uxp-css-data.json`) — the declaration is ignored, causing quiet inputs to retain the non-quiet background color.

**Fix:** Added explicit `background-color: transparent` overrides for all affected selectors:

| Selector | State |
|----------|-------|
| `:host([quiet]) .input` | quiet default |
| `:host([quiet][disabled]) .input` | quiet disabled |
| `.input:read-only, :host([readonly]) #textfield .input` | readonly |
| `.input:read-only::placeholder, :host([readonly]) #textfield .input::placeholder` | readonly placeholder |
| `:host([quiet][disabled]:hover) .input` | quiet disabled hover (was `initial` in hover unwrap) |
| `:host([readonly]) #textfield:hover .input, ::placeholder` | readonly hover (was `initial` in hover unwrap) |

---

## Wrapper Bug Fixes Applied

- **`textfield.css.js` combiner**: `unsafeCSS(a, b)` → `unsafeCSS(a + '\n' + b)` — `unsafeCSS` only takes one argument; passing two silently dropped the UXP override styles.
- **`Textfield.js`**: `return [super.styles, styles]` → `return [...super.styles, styles]` — missing spread operator created a nested array.

---

## package.json Changes

- Version: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/textfield`: `0.37.0` → `1.12.0`
- Added `@swc-uxp-wrappers/overlay: 3.0.0` and `@swc-uxp-wrappers/tooltip: 3.0.0` (needed by `TruncatedValueTooltipController`)
- Added `"./src/textfield-overrides.css.js"` export

## Demo Plugin Changes

- `resolutions["@spectrum-web-components/textfield"]`: `0.37.0` → `1.12.0`
