# Button-Group Package Upgrade Analysis: v0.37.0 → v1.12.0

## Step 1a: File Inventory Diff

**Added in v1.12.0:**
- `src/button-group-overrides.css.js` — Spectrum 2 token bridge mapping `--spectrum-buttongroup-*` to `--system-button-group-*`. Already bundled inside `button-group.css.js`, so flows through `super.styles` automatically. Added as a pass-through export for consumers who import it directly.

**Removed in v1.12.0:**
- `src/spectrum-config.js` — internal build artifact, not exported; no wrapper change needed.

---

## Step 1b: CSS File Diffs

`button-group.css.js` and `spectrum-button-group.css.js` contain identical CSS in both versions (one is a pass-through of the other).

### Key CSS changes

**Token rename (BREAKING for existing overrides):**
- `--spectrum-buttongroup-spacing-horizontal` — **removed**; was used by the v0.37.0 gap workaround
- `--spectrum-buttongroup-spacing-vertical` — **removed**; was used by the v0.37.0 gap workaround
- Replaced by unified `--spectrum-buttongroup-spacing` token

**`display` and `flex-direction` via custom properties (new pattern):**
```css
/* v1.12.0 */
:host {
    --spectrum-buttongroup-display: flex;
    --spectrum-buttongroup-flex-direction: row;
    display: var(--spectrum-buttongroup-display);
    flex-direction: var(--spectrum-buttongroup-flex-direction);
}
```
UXP may not resolve `display` or `flex-direction` from custom properties. Explicit overrides added as a safety net.

**`:dir(rtl)` pseudo-class (HIGH — UXP unsupported):**
```css
/* v0.37.0 — UXP-safe attribute selector */
:host([dir=rtl][vertical]) ::slotted(sp-action-button) { --spectrum-actionbutton-label-text-align: right }

/* v1.12.0 — :dir() pseudo-class, NOT supported in UXP */
:host([vertical]:dir(rtl)) ::slotted(sp-action-button) { --spectrum-actionbutton-label-text-align: right }
```
Override added using `[dir='rtl']` attribute selector.

**`gap` still present — UXP-21294 still applies:**
```css
gap: var(--spectrum-buttongroup-spacing);
```
Gap workaround (margin-based spacing) still required. Updated tokens from the removed `...-horizontal/vertical` to unified `--spectrum-buttongroup-spacing`.

**`justify-content: normal` (new):** Resolves to `flex-start` in flex context — UXP-compatible, no override needed.

---

## Step 1c: JS Class Diffs

- `SizedMixin(u)` → `SizedMixin(u, {noDefaultSize:true})` — size must be set explicitly on the element; no default applied. No UXP impact.
- `handleSlotchange` refactored into `manageChildrenSize(slotElement)` — no UXP impact.
- `updated()` hook added for size propagation when `size` attribute changes — no UXP impact.
- Added `@query("slot")` for `slotElement` reference — no UXP impact.

---

## Step 1d: package.json Diff

- `@spectrum-web-components/button` added as explicit dep (was implicit transitive in v0.37.0)
- `@spectrum-web-components/base`: `^0.37.0` → `1.12.0`
- Removed devDep: `@spectrum-css/buttongroup`
- New export: `./src/button-group-overrides.css.js`

---

## Step 1e: Existing Overrides Audit

| Override in uxp-button-group.css (v0.37.0) | Status in v1.12.0 | Action |
|---|---|---|
| `:host(:not([vertical])) gap workaround` using `--spectrum-buttongroup-spacing-horizontal` | Token removed — override was a no-op | **Updated** to `--spectrum-buttongroup-spacing` |
| `:host([vertical]) gap workaround` using `--spectrum-buttongroup-spacing-vertical` | Token removed — override was a no-op | **Updated** to `--spectrum-buttongroup-spacing` |

---

## Changes Made

1. `packages/button-group/src/uxp-button-group.css` — updated gap workaround tokens; added explicit `display`/`flex-direction` overrides; added `:dir(rtl)` → `[dir=rtl]` fix
2. `packages/button-group/src/button-group-overrides.css.js` — new pass-through re-export
3. `packages/button-group/package.json` — bumped version to `3.0.0`; dep to `1.12.0`; added overrides export
4. Root `package.json` `resolutions` — `@spectrum-web-components/button-group` → `1.12.0`

---

## Known Limitations / Deferred

- `display: var(--spectrum-buttongroup-display)` — UXP compatibility unverified. Explicit `display: flex/inline-flex` overrides added as safety. Test in UXP Developer Tool.
