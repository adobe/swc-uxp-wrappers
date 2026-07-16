# Link — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| Added | `src/link-overrides.css.js` | Pass-through export added to wrapper |
| Removed | — | None |

## 2. CSS Changes (`link.css.js`)

### `@media (hover: hover)` wrapping — HIGH priority (CRITICAL)
In v1.12.0 the compiler moved a large block into `@media (hover: hover)`. This block contains not just hover states but also **the primary color assignments for `static-color` variants**:
```css
@media (hover: hover) {
    a:hover { --mod-link-text-color: ... }
    :host([quiet]) a:hover { text-decoration: underline }
    :host([static-color=white]) a { --mod-link-text-color: var(--spectrum-white); ... }  ← colour rule!
    :host([static-color=black]) a { --mod-link-text-color: var(--spectrum-black); ... }  ← colour rule!
}
```
Since UXP never evaluates `@media (hover: hover)`, every link falls back to the default accent color regardless of variant. **All four rules unwrapped unconditionally in `uxp-link.css`.**

### `text-decoration-skip: objects`
Not supported in UXP — overridden with `text-decoration-skip: none`.

### `link-overrides.css.js`
Empty — **not bundled** in `link.css.js`. Added as pass-through export for API parity.

## 3. JS Changes (`Link.js`)

- No functional changes.
- Fixed missing `...` spread: `[super.styles, styles]` → `[...super.styles, styles]`.

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `@media (hover: hover)` | **Present** — **fixed** by unwrapping hover rules unconditionally in `uxp-link.css` |
| `visibility: revert-layer` | Not present |
| `:is()` | Not present |
| `:dir()` | Not present |
| Logical properties | Present — handled by mapper |

## 5. Existing Overrides Audit

`uxp-link.css` was previously empty. Added:

### Variant color token fix (compound selector UXP bug)
SWC v1.12.0 uses `:host([attr]) a { --mod-link-text-color: ... }` to assign color tokens on the inner `<a>` element. UXP does not reliably apply CSS custom properties set via compound `:host([attr]) child` selectors — the custom property never reaches the child. Fix: move all variant color token assignments to `:host([attr])` so they cascade to `<a>` via CSS custom property inheritance.

Affected variants:
- `:host([variant=secondary])` — secondary/neutral colors
- `:host([static-color=white])` — white static color
- `:host([static-color=black])` — black static color

### Hover state fix
- Replaced `a:hover { --mod-link-text-color: ... }` with `:host(:hover) a { color: ... }` — inner-element `:hover` pseudo-class is less reliable in UXP; also the `color` property directly is used since token inheritance now flows from `:host`.
- Replaced `:host([quiet]) a:hover` with `:host([quiet]:hover) a`.
- Both were also unwrapped from `@media (hover: hover)`.

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/link`: `0.37.0` → `1.12.0`
- Added export: `./src/link-overrides.css.js`
