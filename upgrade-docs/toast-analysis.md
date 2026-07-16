# Toast — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

### Files present in v0.37.0 only (removed)
| File | Notes |
|------|-------|
| `src/spectrum-config.js` | Internal build artifact, never exported. No wrapper change needed. |
| `LICENSE` | Removed from published tarball in v1.12.0 (license field in package.json remains). |

### Files present in v1.12.0 only (added)
| File | Notes |
|------|-------|
| `src/toast-overrides.css.js` | New file. Maps `--spectrum-toast-background-color-default` and `--spectrum-toast-divider-color` to `--system-toast-*` tokens for Spectrum 2 theming. Its content is **already inlined** at the end of `toast.css.js` (see CSS section), so it is not a separate stylesheet that needs to be injected — consumers importing `./src/toast-overrides.css.js` directly get the same two rules. A pass-through wrapper file will be needed at `packages/toast/src/toast-overrides.css.js`. |

### Unchanged file set (both versions)
`src/Toast.js`, `src/index.js`, `src/toast.css.js`, `src/spectrum-toast.css.js`, `sp-toast.js`, `sp-toast.d.ts`, `sp-toast.dev.js`, `custom-elements.json`

### New upstream dependency
`@spectrum-web-components/shared@1.12.0` — already used by `FocusVisiblePolyfillMixin`. No new UXP wrapper needed.

---

## 2. CSS Changes (per file, flag UXP concerns)

### 2.1 `src/spectrum-toast.css.js`

**Removed in v1.12.0:**
- All `--highcontrast-toast-*` variable references on color/background of `:host`, `:host([variant=*])`, and `.closeButton.focus-visible:not(:active)`. High-contrast now relies on `@media (forced-colors:active)` only.
- Duplicated `.closeButton.focus-visible:not(:active)` blocks for each variant (polyfill class duplicates) — these are gone.
- `:host` — removed `--spectrum-toast-divider-color:var(--spectrum-transparent-white-300)` from token block (divider color is now set by the system token override in `toast.css.js`).
- `:host` — removed `--system-spectrum-toast-background-color-default` reference (renamed to `--system-toast-background-color-default` in `toast.css.js`).

**Added in v1.12.0:**
- `:host { overflow-wrap: anywhere; }` — new. UXP supports `overflow-wrap`, no issue.
- `.body ::slotted([slot=action]:dir(rtl))` — replaces the old `:host([dir=rtl]) .body ::slotted([slot=action])` pattern. The `:dir()` functional pseudo-class is **not supported in UXP**. The existing UXP override using `margin-right` is direction-agnostic and covers the LTR case; RTL will need its own physical override if RTL is required.
- `.body ::slotted([slot=action]) { margin-inline-start: auto; }` — replaces old `:host([dir=ltr]) .body ::slotted([slot=action]) { margin-left: auto }`. `margin-inline-start` is a logical property. UXP has a logical property mapper but coverage is not guaranteed for `margin-inline-start` on `::slotted` elements. Keep the `margin-right` override in the UXP stylesheet as-is (it covers `margin-inline-end`); consider also adding `margin-left: auto` for `margin-inline-start` replacement.

**CSS UXP concerns in `spectrum-toast.css.js`:**
- `text-align: start` on `.content` — **UXP concern**: `text-align: start` is not reliably handled by UXP. Existing UXP stylesheet does not override this. Override with `text-align: left`.
- `:dir(rtl)` pseudo — not supported in UXP (see above).

**Structural change:** Variant background/color selectors were simplified from 3-part (base + two .focus-visible polyfill duplicates + :focus-visible) to 2-part (base combined with :focus-visible via comma selector). No UXP impact.

---

### 2.2 `src/toast.css.js`

This is the full combined stylesheet that includes spectrum-toast.css and the component's own rules. It is the stylesheet loaded by `Toast.styles`.

**Removed vs v0.37.0:**
- `--highcontrast-toast-*` references on all variant color/background rules (same as spectrum-toast.css.js above).
- `:host { --system-spectrum-toast-background-color-default: ... }` — renamed.

**Added / changed in v1.12.0:**
- `:host { --spectrum-toast-background-color-default: var(--system-toast-background-color-default); --spectrum-toast-divider-color: var(--system-toast-divider-color); }` — new system token bridge. This replaces the `--system-spectrum-toast-background-color-default` bridge from v0.37.0. No UXP impact.
- `:host { --spectrum-overlay-animation-distance: var(--spectrum-spacing-100); }` — changed from hardcoded `6px` to a token reference. No UXP impact.
- `:host([variant=error]), :host([variant=warning])` — **new rule** applying `negative` background color. Previously only `negative` was styled; `error` and `warning` were deprecated but the CSS did not map them. Now they get background color from the negative token. The existing UXP stylesheet does not cover `[variant=error]` or `[variant=warning]` — this is acceptable since these variants are deprecated, but worth noting.
- `:host([variant=negative]), :host([variant=warning])` with `:focus-visible` — new comma-group includes `warning` alongside `negative` for the close button focus color. No UXP impact.

**UXP concerns in `toast.css.js`:**
- `text-align: start` on `.content` — same as above; needs `text-align: left` override.
- `:dir(rtl)` — not supported; same note as above.
- `overflow-wrap: anywhere` — supported in modern UXP; no issue.
- `transition: ... visibility 0s linear ...` plus `visibility: hidden/visible` — this animation pattern was already present in v0.37.0 and is handled by UXP. No change needed.

---

### 2.3 `src/toast-overrides.css.js` (new file, v1.12.0 only)

Content:
```css
:host {
    --spectrum-toast-background-color-default: var(--system-toast-background-color-default);
    --spectrum-toast-divider-color: var(--system-toast-divider-color);
}
```

This is a pure custom-property bridge (Spectrum 2 system token mapping). No UXP-incompatible patterns. A pass-through wrapper at `packages/toast/src/toast-overrides.css.js` is needed for consumers who import this export directly.

---

## 3. JS Changes

### 3.1 `src/Toast.js` — API differences

| Change | v0.37.0 | v1.12.0 | UXP Impact |
|--------|---------|---------|-----------|
| **`iconLabel` property added** | Not present | `@property({type:String, attribute:'icon-label'})` | None — additive |
| **`renderIcon(variant)` signature** | `renderIcon(variant)` | `renderIcon(variant, label)` | None — internal |
| **`renderIcon` — `warning` variant** | Falls through to `negative`/`error` case (combined in switch) | Gets its own `case 'warning'` returning `<sp-icon-alert label=…>` | None — renders same icon |
| **`sp-close-button` attribute** | `static="white"` | `static-color="white"` | **Breaking change** — the attribute name changed from `static` to `static-color` on `sp-close-button`. The UXP wrapper for `sp-close-button` (from `@swc-uxp-wrappers/button`) must also support the `static-color` attribute. This flows from the button package upgrade. |
| **Import order** | `FocusVisiblePolyfillMixin` imported after icon imports | `FocusVisiblePolyfillMixin` imported before icon imports | None |
| **`timeout` setter null check** | `typeof t !== null` (always true — bug) | `t !== null` (correct check) | None — bug fix |

### 3.2 `src/index.js` / `src/index.d.ts`

No changes to exports. `src/index.d.ts` gained a copyright header in v1.12.0 only.

### 3.3 Key JS UXP concern: `static-color="white"` attribute

In v0.37.0 the close button was rendered as:
```html
<sp-close-button static="white">
```
In v1.12.0:
```html
<sp-close-button static-color="white">
```

The UXP wrapper for `sp-close-button` (part of `@swc-uxp-wrappers/button`) must recognise the `static-color` attribute. This is guaranteed if the button package upgrade has been applied. **Confirm the button wrapper upgrade is in sync.**

---

## 4. UXP CSS Checklist

| Pattern | Present in v1.12.0? | File(s) | UXP Safe? | Action Required |
|---------|--------------------|---------|-----------|----|
| `visibility: revert-layer` | No | — | N/A | None |
| `:is()` selector | No | — | N/A | None |
| `@media (hover: hover)` | No | — | N/A | None |
| `@layer` | No | — | N/A | None |
| `--custom-prop: inherit` | No | — | N/A | None |
| `revert-layer` (any) | No | — | N/A | None |
| `text-align: start` | **Yes** | `spectrum-toast.css.js`, `toast.css.js` (`.content`) | **No** | Add `text-align: left` to `.content` override |
| `text-align: end` | No | — | N/A | None |
| `align-content` | No | — | N/A | None |
| `display: contents` | No | — | N/A | None |
| `:dir()` pseudo | **Yes** | `spectrum-toast.css.js`, `toast.css.js` (`.body ::slotted([slot=action]:dir(rtl))`) | **No** | Not supported; existing physical overrides cover LTR; RTL not a UXP requirement |
| `overflow-wrap: anywhere` | **Yes** | `spectrum-toast.css.js`, `toast.css.js` | Yes (modern UXP) | None |
| `margin-inline-start: auto` on slotted | **Yes** | `spectrum-toast.css.js`, `toast.css.js` | Partial | Add `margin-left: auto` to `.body ::slotted([slot=action])` override |
| `@media (forced-colors:active)` | Yes | both CSS files | Yes — UXP ignores unknown @media | None |
| `transition` on `visibility` | Yes | `toast.css.js` | Yes | None |

---

## 5. Existing Overrides Audit

The current UXP overlay lives in `packages/toast/src/uxp-toast.css` (compiled to `uxp-toast.css.js`). Each override is assessed against v1.12.0 below.

### 5.1 `--uxp-swc-toast-button-border-left-*` custom properties + `.body + .buttons` border

```css
:host {
    --uxp-swc-toast-button-border-left-width: 1px;
    --uxp-swc-toast-button-border-left-style: solid;
}
.body + .buttons {
    border-left-style: var(--uxp-swc-toast-button-border-left-style);
    border-left-width: var(--uxp-swc-toast-button-border-left-width);
    padding-left: var(--mod-toast-spacing-close-button, var(--spectrum-toast-spacing-close-button));
}
```

**Status: Still needed.** v1.12.0 uses `border-inline-start-style: solid; border-inline-start-width: 1px` (logical properties). UXP does not fully map `border-inline-start-*` to physical properties on all elements. This override translating to `border-left-*` is still required. The CSS variables are internal to the override and can stay.

---

### 5.2 `:host { padding-left: … }`

```css
:host {
    padding-left: var(--mod-toast-spacing-start-edge-to-text-and-icon, var(--spectrum-toast-spacing-start-edge-to-text-and-icon));
}
```

**Status: Still needed.** v1.12.0 uses `padding-inline-start` for this value, same token chain. The physical `padding-left` override is still necessary for UXP.

---

### 5.3 `.body { padding-bottom / padding-top }`

```css
.body {
    padding-bottom: var(--mod-toast-spacing-block-end, var(--spectrum-toast-spacing-block-end));
    padding-top: var(--mod-toast-spacing-block-start, var(--spectrum-toast-spacing-block-start));
}
```

**Status: Still needed.** v1.12.0 uses `padding-block-start` / `padding-block-end` (logical). Physical overrides still required.

---

### 5.4 `.buttons { border-left-color / margin-bottom / margin-top / padding-right }`

```css
.buttons {
    border-left-color: var(--mod-toast-divider-color, var(--spectrum-toast-divider-color));
    margin-bottom: var(--mod-toast-spacing-bottom-edge-to-divider, var(--spectrum-toast-spacing-bottom-edge-to-divider));
    margin-top: var(--mod-toast-spacing-top-edge-to-divider, var(--spectrum-toast-spacing-top-edge-to-divider));
    padding-right: var(--mod-toast-spacing-close-button, var(--spectrum-toast-spacing-close-button));
}
```

**Status: Still needed.** v1.12.0 still uses `border-inline-start-color`, `margin-block-start`, `margin-block-end`, `padding-inline-end` (all logical). Physical overrides are still required.

**Note on token change:** In v1.12.0, `--spectrum-toast-divider-color` is now bridged to `--system-toast-divider-color` (via the new `toast-overrides.css.js` rules, which are inlined in `toast.css.js`). The `var(--mod-toast-divider-color, var(--spectrum-toast-divider-color))` chain in the UXP override still resolves correctly through this bridge — no change needed in the override.

---

### 5.5 `.type { margin-top / margin-right / margin-left }`

```css
.type {
    margin-top: var(--mod-toast-spacing-top-edge-to-icon, var(--spectrum-toast-spacing-top-edge-to-icon));
    margin-right: var(--mod-toast-spacing-icon-to-text, var(--spectrum-toast-spacing-icon-to-text));
    margin-left: 0px;
}
```

**Status: Still needed.** v1.12.0 uses `margin-block-start`, `margin-inline-end`, `margin-inline-start: 0` for the same values. Physical overrides still required.

---

### 5.6 `.content { padding-bottom / padding-top / padding-right / padding-left }`

```css
.content {
    padding-bottom: calc(…);
    padding-top: calc(…);
    padding-right: var(--mod-toast-spacing-text-to-action-button-horizontal, …);
    padding-left: 0;
}
```

**Status: Still needed.** v1.12.0 uses `padding-block-start`, `padding-block-end`, `padding-inline-end`, `padding-inline-start: 0` — all logical. Physical overrides still required.

---

### 5.7 `.body ::slotted([slot='action']) { margin-right }`

```css
.body ::slotted([slot='action']) {
    margin-right: var(--mod-toast-spacing-text-and-action-button-to-divider, …);
}
```

**Status: Still needed but incomplete.** v1.12.0 adds `margin-inline-start: auto` to this selector (for automatic left-push). The existing override covers `margin-inline-end` → `margin-right`. **New action needed:** add `margin-left: auto` to override `margin-inline-start: auto`.

---

### 5.8 Missing override for `text-align: start` on `.content`

**Status: New override needed.** v1.12.0 sets `text-align: start` on `.content`. `text-align: start` is not reliably mapped by UXP. Add:

```css
.content {
    text-align: left;
}
```

---

### 5.9 `src/toast.css.js` (wrapper combiner)

Current implementation:
```js
const combinedToastStyles = unsafeCSS(
    swcToastStyles.toString(),
    uxpToastStyles.toString()
);
```

`unsafeCSS` takes a single string argument; passing two arguments is incorrect — only the first argument is used. This is a pre-existing bug in the v0.37.0 wrapper. The UXP styles from `uxp-toast.css.js` are **not actually being combined** here; they are injected via the `Toast` class `super.styles` chain instead (from `src/Toast.js`). This file appears to be a vestigial export that consumers of `./src/toast.css.js` directly would encounter. **This bug pre-dates the upgrade and should be fixed separately**, but no new action is required just for the v1.12.0 upgrade.

---

## 6. package.json Changes

| Field | v0.37.0 | v1.12.0 | Notes |
|-------|---------|---------|-------|
| `version` | `0.37.0` | `1.12.0` | — |
| `repository.directory` | `packages/toast` | `1st-gen/packages/toast` | Repo restructured |
| `dependencies` | `@swc/base/button/icon/icons-workflow@^0.37.0` | same at `1.12.0` (exact, not range) + `@swc/shared@1.12.0` | Added `shared` dep |
| `devDependencies` | `@spectrum-css/toast@^9.1.0` | Removed from published package | Build-only; no wrapper impact |
| `exports` | No `toast-overrides.css.js` entry | `"./src/toast-overrides.css.js": "./src/toast-overrides.css.js"` added | Wrapper must add a matching export |
| `exports` | `./src/toast.css.js` path | Same path present | Unchanged |
| `main`/`module` | `"./src/index.js"` (with `./`) | `"./src/index.js"` (without `./` for `main`) | Cosmetic; no impact |
| `keywords` | Basic lit-element keywords | Expanded with spectrum/adobe keywords | Cosmetic |
| `publishConfig` | Present | Moved to end of file | Cosmetic |
| `gitHead` | Present | Removed | Cosmetic |

### Required wrapper `package.json` changes

1. **Update dependency:** `"@swc-uxp-internal/toast": "npm:@spectrum-web-components/toast@0.37.0"` → `"npm:@spectrum-web-components/toast@1.12.0"`
2. **Add export:** `"./src/toast-overrides.css.js": "./src/toast-overrides.css.js"` to `exports`
3. **Add `@swc-uxp-wrappers/shared`** (or `@swc-uxp-internal/shared`) to `dependencies` if needed by the wrapper (currently the wrapper does not directly reference shared — the base class handles it, so this may not be needed).

---

## Summary of Required Wrapper Changes

| Priority | File | Change |
|----------|------|--------|
| Required | `package.json` | Bump `@swc-uxp-internal/toast` to `1.12.0`; add `./src/toast-overrides.css.js` export |
| Required | `src/uxp-toast.css` + `src/uxp-toast.css.js` | Add `text-align: left` to `.content` block |
| Required | `src/uxp-toast.css` + `src/uxp-toast.css.js` | Add `margin-left: auto` to `.body ::slotted([slot='action'])` block |
| Required | `src/toast-overrides.css.js` | Create pass-through wrapper file that re-exports from `@swc-uxp-internal/toast/src/toast-overrides.css.js` (or mirrors the two-rule CSS directly) |
| Verify | — | Confirm `@swc-uxp-wrappers/button` upgrade is applied so `sp-close-button` accepts `static-color="white"` |
| Pre-existing bug | `src/toast.css.js` | `unsafeCSS()` called with two arguments — only first is used; UXP overlay styles are not actually merged here |
