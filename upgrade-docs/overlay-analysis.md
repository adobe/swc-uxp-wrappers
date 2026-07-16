# Overlay Upgrade Analysis: 0.37.0 → 1.12.0

## Summary

| Item | Status |
|------|--------|
| New JS files (9) | Pass-through exports added |
| Removed JS files (3) | Deleted from wrapper |
| CSS changes | Minor — z-index override retained, `:has()` and `@supports` issues documented |
| `focus-trap` dependency | Added to package.json |
| Spread operator bug | Fixed in `Overlay.js` |

---

## 1. New Files in v1.12.0

| File | Description | Action |
|------|-------------|--------|
| `src/ClickController.js` | Interaction strategy for click trigger | Pass-through |
| `src/HoverController.js` | Interaction strategy for hover trigger | Pass-through |
| `src/InteractionController.js` | Base class for all interaction strategies | Pass-through |
| `src/LongpressController.js` | Interaction strategy for longpress trigger | Pass-through |
| `src/events.js` | `BeforetoggleClosedEvent`, `BeforetoggleOpenEvent`, `OverlayStateEvent` types | Pass-through |
| `src/overlay-trigger-directive.js` | Lit directive for overlay-trigger pattern | Pass-through |
| `src/slottable-request-directive.js` | Lit directive for slottable content | Pass-through |
| `src/slottable-request-event.js` | `SlottableRequestEvent` and `removeSlottableRequest` | Pass-through |
| `src/strategies.js` | Maps trigger type strings to controller classes | Pass-through |

**Rationale:** These are all pure JS, no CSS, no UXP-incompatible APIs. All safe as pass-throughs.

---

## 2. Removed Files in v1.12.0

| File | Notes |
|------|-------|
| `src/OverlayDialog.js` | Merged into `Overlay.js` in v1.12.0 (uses popover API for modal too) |
| `src/topLayerOverTransforms.js` | Removed upstream — top-layer transform logic no longer needed |
| `src/PlaceholderController.js` | Was a custom wrapper artifact; never existed in upstream; deleted |

All three deleted from `packages/overlay/src/`. `topLayerOverTransforms.js` also removed from `package.json` exports.

---

## 3. CSS Analysis

### overlay.css

**Key changes in v1.12.0:**

| Change | UXP Impact |
|--------|-----------|
| `--swc-overlay-animation-distance` token changed: `--spectrum-picker-m-texticon-popover-offset-y` → `--spectrum-spacing-100` | Token rename — no override needed, both resolve via `var()` |
| `:host(:has(>sp-tooltip)) { --swc-overlay-animation-distance: var(--spectrum-tooltip-animation-distance) }` | **`:has()` not supported in UXP.** Tooltip overlays will use the default `--spectrum-spacing-100` animation distance instead of the shorter `--spectrum-tooltip-animation-distance`. Acceptable visual trade-off. |
| `.dialog:not([is-visible]){display:none}` (was `translate:-999em -999em`) | `display:none` is supported in UXP — improvement |
| `::slotted(*){visibility:visible!important}` added | `visibility:visible` is in UXP values — fine |
| `.modal-backdrop { z-index:999998; position:fixed; inset:0 }` added | `position:fixed` supported; `inset` handled by logical property mapper — fine |
| `@supports (overlay:auto)` block with `transition-behavior:allow-discrete` | **`@supports` not supported in UXP** (only `@media` is). This entire block is ignored. Overlay entry/exit animations won't play — expected behaviour in UXP. |
| `@supports selector(:open/..:popover-open)` blocks | Same as above — ignored in UXP. Opacity animation fallback not applied. |

**Existing override retained:**
```css
/* .dialog { z-index: 1000 } */
```
Still needed because the `@supports (not selector(:open)) and (not selector(:popover-open))` fallback that v1.12.0 uses to apply `z-index` is inside `@supports` — which UXP ignores. Without this override, `.dialog` has no `z-index` and overlays may render beneath other elements.

### overlay-trigger.css

v1.12.0 removed `:host([disabled]) ::slotted([slot=trigger]) { pointer-events:none }` — this was moved to JS. No UXP concern.

---

## 4. JS API Changes

### Overlay.js

- **`focus-trap` dynamic import** added: `await import("focus-trap")` when opening modal/page overlays. This is a webpack-bundleable package. Added as direct dependency `focus-trap@7.6.5` in `package.json`. Webpack will include it in the bundle — no UXP concern.
- **`OverlayDialog` class removed**: `Overlay.js` no longer mixes in `OverlayDialog`. Both dialog and popover rendering now use the single popover API path (`renderPopover()`). UXP concern: `display:none` replace `translate(-999em)` for hidden state — both safe in UXP.
- **Interaction strategies refactored**: `bindClickEvents`, `bindHoverEvents`, `bindLongpressEvents` moved to `ClickController`, `HoverController`, `LongpressController`. Pure JS refactor — no UXP impact.
- **`returnFocus()`** new method: replaces inline focus return logic. Uses standard DOM APIs — UXP compatible.
- **`SlottableRequestEvent`**: New mechanism for lazy slot content. Pure custom event — UXP compatible.

### OverlayTrigger.js

Dynamic `import("@spectrum-web-components/overlay/sp-overlay.js")` calls removed — overlay is now always imported statically. Bundle-friendly for UXP.

---

## 5. Package.json Changes

```diff
- "@swc-uxp-internal/overlay": "npm:@spectrum-web-components/overlay@0.37.0"
+ "@swc-uxp-internal/overlay": "npm:@spectrum-web-components/overlay@1.12.0"
- "@swc-uxp-wrappers/action-button": "2.0.0"
+ "@swc-uxp-wrappers/action-button": "3.0.0"
+ "focus-trap": "7.6.5"
```

Exports: removed `./src/topLayerOverTransforms.js`, added 9 new pass-through exports.

---

## 6. UXP CSS Checklist

- [x] `revert-layer` — not present
- [x] `:is()` — not present in new CSS
- [x] `@media (hover:hover)` — not present
- [x] `@layer` — not present
- [x] `display:contents` on `:host` — **pre-existing issue, not new in v1.12.0**. Overlay still uses `display:contents`. UXP maps to `block`. The `.dialog` is `position:fixed` so host layout impact is minimal. Existing behaviour unchanged.
- [x] `:has()` — new, ignored in UXP. Tooltip animation distance uses fallback — acceptable.
- [x] `@supports` — not supported, entire blocks ignored. Only affects CSS animations (none in UXP anyway).
- [x] Logical properties — `inset`, `padding-block`, `margin-block` all handled by mapper.
