# Button Package Upgrade Analysis: v0.37.0 → v1.12.0

## Step 1a: File Inventory Diff

**Added in v1.12.0:**
- `src/button-overrides.css.js` — maps `--spectrum-button-*` tokens to `--system-button-*` for Spectrum 2 theming; already bundled inside `button.css.js` (the combiner), so it flows through `super.styles` automatically. A pass-through wrapper file was added at `packages/button/src/button-overrides.css.js` for consumers who import it directly.

**Removed in v1.12.0:**
- `src/spectrum-config.js` — internal build artifact, not exported; no wrapper change needed.

**New upstream dependency:** `@spectrum-web-components/progress-circle@1.12.0` and `@spectrum-web-components/reactive-controllers@1.12.0` — used by `PendingStateController` in Button. No separate UXP wrappers exist for these packages. The pending state feature is broken in UXP (see §JS API Changes below).

---

## Step 1b: CSS File Diffs

### button.css.js (full combined stylesheet)

**New pending state rules (UXP-breaking):**

```css
@keyframes show-progress-circle { 0%{visibility:hidden} to{visibility:visible} }
@keyframes hide-icons-label { 0%{visibility:visible} to{visibility:hidden} }
@keyframes update-pending-button-styles { to{ color/bg/border = disabled values } }

:host([pending]:not([disabled])) {
    pointer-events: none;
    animation: update-pending-button-styles 0s var(--pending-delay,1s) forwards;
}
sp-progress-circle {
    visibility: hidden;
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%);  /* UXP: translate() on block elements unreliable */
}
:host([pending]:not([disabled])) sp-progress-circle {
    animation: show-progress-circle 0s var(--pending-delay,1s) forwards;
}
:host([pending]:not([disabled])) slot[name=icon],
:host([pending]:not([disabled])) #label {
    animation: hide-icons-label 0s var(--pending-delay,1s) forwards;
}
```

UXP issues:
1. `sp-progress-circle` has no UXP wrapper — will render as unknown element
2. `transform: translate(-50%)` is unreliable on block elements in UXP
3. Animation-as-state-trigger (`animation: ... forwards`) only fires once; if `[pending]` is toggled off then on, the animation never re-fires — broken in UXP
4. `pointer-events: none` is not supported in UXP (UXP-21230)

**New hover/active rules in `@media (hover:hover)` block:**
```css
@media (hover:hover) {
    :host(:hover) { color, bg, border }
}
```
These were previously unconditional in v0.37.0. UXP does not support the hover media query — must unwrap.

**New `:is()` usage:**
```css
:host(:is(:active,[active])) { ... }
```
UXP `:is()` support is partial — must expand to two separate rules.

**`align-self: start` added to `#label`** — UXP ignores `place-self`; override with `align-self: center`.

**`text-align: start` added to `[name='icon'] + #label`** — `text-align: start` unreliable in UXP; override with `left`.

**`visibility: revert-layer` on `::slotted([slot='icon'])`** — not supported in UXP; override with `visibility: inherit`.

**`inset: 0` on `:host:after`** — still present; UXP logical property mapper covers `inset-block`/`inset-inline` but bare `inset` shorthand is not mapped. Keep the physical `top/left/bottom/right: 0` override.

**`display: contents` on `[icon-only] + #label`** — UXP maps `display: contents` to `display: block`, causing empty label to consume width on icon-only buttons. Override with `display: none`.

### spectrum-button.css.js

No new UXP-breaking patterns beyond what's already handled.

### button-base.css.js / spectrum-button-base.css.js

No new UXP-breaking patterns.

### close-button.css.js (from @spectrum-web-components/close-button@1.12.0)

- `@media (hover:hover)` wraps hover styles — **must unwrap** in `uxp-close-button.css`
- `:is(:active,[active])` — **must expand** in `uxp-close-button.css`
- `inset-block:0; inset-inline:0` on `:host:after` — logical properties handled by mapper; existing physical override (`top/left/bottom/right: 0`) is now redundant but harmless
- `[static]` attribute renamed to `[static-color]` in v1.12.0
- Icon sizes changed: s/m/l/xl now use cross200/300/400/500 (was 75/100/200/300)

### clear-button.css.js (from @spectrum-web-components/clear-button@1.12.0)

- `@media (hover:hover)` wraps hover styles — **must unwrap** in `uxp-clear-button.css`
- `:is(:active,[active])` — **must expand** in `uxp-clear-button.css`

---

## Step 1c: JS Class Diffs

### Button.js (most significant)

- **`PendingStateController`** added: unconditionally imported and instantiated in constructor; calls `this.renderButton()` to inject `<sp-progress-circle>`. No UXP wrapper for `sp-progress-circle` — renders as unknown element.
- **New properties:** `pending` (Boolean, reflects), `pendingLabel` (String), `noWrap` (Boolean)
- **`SizedMixin` signature changed:** `SizedMixin(Base, {noDefaultSize:true})` — size must be set explicitly; no default size applied
- **`staticColor` property** replaces `static` attribute (attribute name is now `static-color`)
- **`renderButton()`** now includes `<sp-progress-circle>` in output

### ButtonBase.js

- `shouldProxyClick` now accepts the click event `e` and checks `metaKey/ctrlKey/shiftKey/altKey` — keyboard-modified clicks are not proxied
- `click()` method removed from `ButtonBase`; handled differently
- `pointerdown` event listener removed from `firstUpdated`
- `handleRemoveActive` listeners removed (active state management simplified)
- `warnLinkAPIDeprecation()` stub added (no-op)
- No UXP impact

### ClearButton.js

- `SizedMixin(Base, {noDefaultSize:true})` — same change as Button
- `variant` property now controls `staticColor` internally (setting `variant="overBackground"` sets `staticColor="white"`)
- `quiet` property added (Boolean)
- No new UXP-incompatible APIs

### CloseButton.js

- `SizedMixin(Base, {noDefaultSize:true})`
- `staticColor` property (reflects `static-color` attribute) replaces `static` attribute
- `renderButton()` now includes a `<span id="label" class="visually-hidden">` wrapper — needed for accessibility label
- Icon sizes changed to cross200/300/400/500 (was 75/100/200/300)
- No new UXP-incompatible APIs

### StyledButton.js

- No changes between versions

---

## Step 1d: package.json Diff

- New dependency: `@spectrum-web-components/progress-circle@1.12.0`
- New dependency: `@spectrum-web-components/reactive-controllers@1.12.0`
- Removed devDependency: `@spectrum-css/button`
- New export: `./src/button-overrides.css.js` — added to wrapper package.json ✓
- Link API (`href`, `target`, etc.) deprecated in v1.12.0 — deprecation notice added

---

## Step 1e: Existing Override Audit

| Override in uxp-button.css | SWC v1.12.0 status | Action |
|---|---|---|
| `:host { margin-* }` | margin-* set via logical props in v1.12.0; mapper handles them | **Remove** — redundant physical overrides |
| `:host { min-height, min-width }` | Now use `min-block-size`/`min-inline-size`; mapper handles | **Remove** — redundant |
| `:host { padding-* }` | Now use `padding-block`/`padding-inline`; mapper handles | **Remove** — redundant |
| `#label { padding calc(...) }` | Still set in SWC via `padding-block-start/end`; mapper handles | **Remove** physical overrides; keep `margin: auto` and `align-self: center` |
| `#label { margin: auto }` | SWC doesn't set this | **Keep** |
| `#label { align-self: center }` | SWC v1.12.0 sets `align-self: start` | **Keep** |
| `[icon-only] + #label { display: none }` | SWC uses `display: contents` → block in UXP | **Keep** |
| `[name='icon'] + #label { text-align: left }` | SWC sets `text-align: start` | **Keep** |
| `::slotted([slot='icon']) { margin-left calc(...) }` | SWC uses `margin-inline-start`; mapper handles | **Remove** — redundant |
| `:not(slot[icon-only])::slotted { margin-right }` | SWC uses `margin-inline-end`; mapper handles | **Remove** — redundant |
| `:host:after { top/left/bottom/right: 0 }` | SWC uses `inset: 0`; bare `inset` not mapped by UXP | **Keep** |
| `::slotted([slot='icon']) { visibility: inherit }` | SWC v1.12.0 still has `visibility: revert-layer` | **Keep** |
| `:host(:hover) { ... }` | Now inside `@media (hover:hover)` in v1.12.0 | **Keep** (UXP hover media query unwrap) |
| `:host(:active), :host([active])` | Now expressed as `:is(:active,[active])` in SWC | **Keep** (UXP `:is()` expansion) |

**New overrides needed:**
- Pending state graceful degradation: disable animation triggers, hide broken `sp-progress-circle`
- `:host(:hover)` already covered

---

## Summary of Changes Made

1. **`packages/button/package.json`** — bumped `@swc-uxp-internal/button` to `1.12.0`; added `./src/StyledButton.js` and `./src/button-overrides.css.js` exports
2. **`packages/button/src/button-overrides.css.js`** — new pass-through re-export
3. **`packages/button/src/Button.js` et al.** — fixed missing `...` spread operator (pre-existing bug)
4. **`packages/button/src/uxp-button.css`** — removed redundant logical-property overrides; kept UXP-necessary overrides; added pending state graceful degradation
5. **`packages/button/src/uxp-close-button.css`** — added `@media (hover:hover)` unwrap and `:is()` expansion
6. **`packages/button/src/uxp-clear-button.css`** — added `@media (hover:hover)` unwrap and `:is()` expansion
7. **`packages/utils/package.json`** — updated all SWC deps to `1.12.0`, updated floating-ui and peer packages

---

## Known Limitations / Deferred

- **Pending state (`[pending]`)** is not supported in UXP. The UXP override applies disabled appearance immediately and suppresses the broken `sp-progress-circle` element. Consumers must not use `[pending]` attribute until a `sp-progress-circle` UXP wrapper is added.
- **Link API (`href`, `target`, etc.)** is deprecated upstream in v1.12.0 and will be removed in a future release. UXP consumers should migrate to native `<a>` with Spectrum CSS classes.
- **`noWrap` property** on Button — no UXP-specific concern identified; CSS `white-space: nowrap` is supported.
