# Action-Group Package Upgrade Analysis: v0.37.0 → v1.12.0

## Step 1a: File Inventory Diff

**Added in v1.12.0:**
- `src/action-group-overrides.css.js` — Spectrum 2 token bridge mapping `--system-action-group-*` compact spacing tokens. Must be added to wrapper `ActionGroup.js` styles array and exported from `package.json`.

**Removed in v1.12.0:**
- `src/spectrum-config.js` — internal build artifact, not exported; no wrapper change needed.

---

## Step 1b: CSS File Diffs

### action-group.css.js

**`@media (hover:hover)` added (HIGH — UXP concern):**
```css
/* v1.12.0 — slotted hover z-index inside media query */
@media (hover:hover) {
    :host([compact]:not([quiet])) ::slotted(:hover) { z-index: 2; }
}
```
Override added: unconditional `::slotted(:hover) { z-index: 2 }` on the compact non-quiet host.

**`:dir(rtl)` pseudo-class added (MEDIUM):**
```css
:host([compact]:not([quiet],[vertical]):dir(rtl)) { ... }
```
UXP uses `[dir=rtl]` attribute selectors. The existing wrapper already used `[dir='ltr']` attribute selectors for gap workarounds — consistent with the correct UXP pattern.

**System tokens renamed:**
`--system-spectrum-actiongroup-*` → `--system-action-group-*`. Moved into the new overrides file; no direct impact on `uxp-action-group.css`.

---

## Step 1c: JS Class Diffs

- `_buttonSelector` expanded: `"sp-action-button"` → `"sp-action-button, sp-action-menu"` — no wrapper change.
- `SizedMixin(u)` → `SizedMixin(u, {noDefaultSize:true})` — size must be set explicitly.
- `static` property → `staticColor` with `attribute:'static-color'` — `manageChildren` propagates `staticColor` now.
- `shadowRootOptions.delegatesFocus = true` added — shadow root now delegates focus; RovingTabindexController also sets `hostDelegatesFocus:true`.
- `handleActionButtonChange` added — prevents double-firing of `change` events from child buttons.

---

## Step 1d: package.json Diff

- `@swc-uxp-internal/action-group`: `0.37.0` → `1.12.0`
- `@swc-uxp-wrappers/action-button`: `2.0.0` → `3.0.0`
- New export: `./src/action-group-overrides.css.js`

---

## Step 1e: Existing Overrides Audit

| Override | Status | Action |
|---|---|---|
| `:host([dir='ltr']:not([vertical]):not([compact])) ::slotted { margin-right }` | Gap workaround — `gap` still not supported in UXP flex (UXP-20869). Token valid. | **Kept** |
| `:host([vertical]:not([compact])) ::slotted { margin-bottom }` | Gap workaround. Token valid. | **Kept** |
| `:host { min-width, padding-left, padding-right }` | **Stale** — action-button tokens applied to action-group host. Action-group CSS never sets these on `:host`. | **Removed** |
| Compact border-radius rules (last-child, tabindex-based) | Replace `border-start/end-*-radius` logical props. Tokens valid in v1.12.0. | **Kept** |
| Compact margin rules (tabindex-based) | Replace `margin-block/inline` logical props. Tokens valid in v1.12.0. Tabindex-based selection still works with `RovingTabindexController`. | **Kept** |

---

## Changes Made

1. `packages/action-group/src/ActionGroup.js` — fixed spread operator; added `overridesStyles` import and inclusion in styles array
2. `packages/action-group/src/action-group-overrides.css.js` — new pass-through re-export
3. `packages/action-group/src/uxp-action-group.css` — removed stale `:host { min-width, padding-left, padding-right }` block; added `::slotted(:hover) { z-index: 2 }` override (media query unwrap)
4. `packages/action-group/package.json` — version `3.0.0`, dep `1.12.0`, updated `action-button` dep to `3.0.0`, added overrides export
5. Root `package.json` resolutions — `action-group` → `1.12.0`

## Known Limitations / Deferred

- Compact `[tabindex='0']`-based border-radius selectors: with `delegatesFocus:true` in v1.12.0, focus/tabindex management changed. These selectors should be tested in UXP Developer Tool to confirm the compact grouped-button border radius still renders correctly.
