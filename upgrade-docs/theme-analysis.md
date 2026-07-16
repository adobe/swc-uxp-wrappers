# Theme — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

### Added in v1.12.0

| File | Description |
|------|-------------|
| `src/theme-interfaces.js` | New — exports `SYSTEM_VARIANT_VALUES`, `SCALE_VALUES`, `COLOR_VALUES` constants. Replaces the inline arrays inside `Theme.js`. New `system` values include `spectrum-two`; scale and color gain `*-spectrum-two` variants. |
| `src/themes-core-tokens.js` | New — re-exports all `*-core-tokens.js` loaders (Spectrum 1 base). Registers global/alias tokens separately from the per-color/scale overrides. |
| `src/theme-core-tokens.css.js` | New — global+alias design tokens for the base `theme` kind (Spectrum 1). Registered via `themes-core-tokens.js`. |
| `src/theme-dark-core-tokens.css.js` | New — dark-color-specific core tokens (Spectrum 1). |
| `src/theme-light-core-tokens.css.js` | New — light-color-specific core tokens (Spectrum 1). |
| `src/theme-darkest-core-tokens.css.js` | New — darkest-color core tokens (Spectrum 1). |
| `src/theme-lightest-core-tokens.css.js` | New — lightest-color core tokens (Spectrum 1). |
| `src/scale-large-core-tokens.css.js` | New — large-scale-specific core tokens (Spectrum 1). |
| `src/scale-medium-core-tokens.css.js` | New — medium-scale-specific core tokens (Spectrum 1). |
| `src/spectrum-two/` (entire directory) | New — full Spectrum 2 theme system. Contains `core.js`, `core-tokens.js`, `themes.js`, `themes-core-tokens.js`, and all corresponding `theme.css.js`, `theme-dark/light.css.js`, `scale-large/medium.css.js` plus their `-core-tokens` equivalents. |
| `src/express/core-tokens.js` | New — separate core-tokens registrar for Express theme. |
| `src/express/theme-core-tokens.css.js` | New — Express base theme core tokens. |
| `src/express/theme-dark-core-tokens.css.js` | New — Express dark-color core tokens. |
| `src/express/theme-light-core-tokens.css.js` | New — Express light-color core tokens. |
| `src/express/scale-large-core-tokens.css.js` | New — Express large-scale core tokens. |
| `src/express/scale-medium-core-tokens.css.js` | New — Express medium-scale core tokens. |
| `src/express/themes-core-tokens.js` | New — re-exports all Express core-token loaders. |
| Top-level `*-core-tokens.js` / `express/*-core-tokens.js` / `spectrum-two/*-core-tokens.js` entry-points | New public convenience entrypoints (mirroring the `src/` structure). |

### Removed in v1.12.0

| File | Notes |
|------|-------|
| `src/express/theme-darkest.css.js` | Express darkest color removed (Express only supports light/dark in v1.12.0). |
| `src/express/theme-lightest.css.js` | Express lightest color removed. |
| `express/theme-darkest.js` | Top-level entrypoint removed with the CSS file above. |
| `express/theme-lightest.js` | Top-level entrypoint removed. |
| `test/` directory | Test files no longer shipped in the tarball. |
| `stories/` directory | Storybook stories no longer shipped. |

### Renamed / Structural

- The `theme` registration kind was renamed from `"theme"` to `"system"`. Old: `Theme.registerThemeFragment("express","theme",css)`. New: `Theme.registerThemeFragment("express","system",css)`. This is a breaking internal API change.
- The `theme` attribute on `<sp-theme>` was renamed to `system`. Old: `<sp-theme theme="express">`. New: `<sp-theme system="express">` (or `system="spectrum-two"`).

---

## 2. CSS Changes

### `theme.css.js` (base Spectrum 1 combined tokens)

**+973 tokens added / −524 removed / ~922 value-changed.**

The massive churn is structural: v0.37.0 stored all Spectrum token aliases (global, alias, component) in a single flat `:host,:root{}` block. v1.12.0 separates global aliases into `theme-core-tokens.css.js` and keeps only component-level system tokens here. Net effect: the file still covers `:host,:root` but no longer holds `--spectrum-global-*` dimension/color tokens (those moved to the `-core-tokens` files).

Notable substantive changes:
- **Color format normalization**: many `hsla()`/`rgba()` values replaced with 8-digit hex (`#rrggbbaa`). E.g., `rgba(50,50,50,.9)` → `#323232e6`. Functionally identical; UXP handles both.
- **`color-scheme` property removed** from `theme.css.js`. It is now set directly in `theme-dark.css.js` / `theme-light.css.js` per-color file (e.g., `color-scheme:dark`). This is a behavioral change — color-scheme is now applied when the color fragment loads, not at theme registration time.
- **New `--system-infield-button-border-color: inherit`** and **`--system-picker-button-border-color: inherit`** — see UXP Checklist §4.
- Removed deprecated `--system-spectrum-*` prefixed tokens (e.g., `--system-spectrum-button-border-color-down`). These are replaced by `--system-button-*` tokens.

**UXP concern**: The two new `--custom-prop: inherit` occurrences (`--system-infield-button-border-color` and `--system-picker-button-border-color`) use CSS `inherit` as a token value. UXP's CSS engine resolves `inherit` against the shadow root boundary, which may not propagate as expected. If infield-button or picker borders appear incorrect, a UXP override setting these to explicit values may be needed.

### `theme-core-tokens.css.js` (NEW)

Contains the ~600 global/alias design tokens previously embedded in `theme.css.js`. No UXP-incompatible patterns except the same two `inherit` values noted above.

### `theme-dark.css.js`

**+36 tokens / −4 removed / ~70 changed.**

- Removed: `--spectrum-well-background-color`, `--spectrum-scrollbar-mac-*-track-background-color` (scrollbar tokens removed from Spectrum 1).
- Added: `--spectrum-icon-color-yellow-primary-default`, `--spectrum-assetlist-*` tokens, `--spectrum-calendar-day-background-color-selected-hover`.
- Value format normalization (`hsla` → `#rrggbbaa`).
- **Added `color-scheme:dark`** — now sets color-scheme in this file.
- Clean: no UXP-incompatible patterns.

### `theme-darkest.css.js`

**+37 tokens / −4 removed / ~69 changed.**

Same pattern as `theme-dark.css.js`. Added `color-scheme:dark`. Color format normalization. No UXP issues.

### `theme-light.css.js`

**+37 tokens / −4 removed / ~69 changed.**

Added `color-scheme:light`. Color format normalization. No UXP issues.

### `theme-lightest.css.js`

**+37 tokens / −0 removed / ~69 changed.**

Same as theme-light. No UXP issues.

### `scale-large.css.js`

**+112 tokens / −21 removed / ~77 changed.**

- Removed legacy `--spectrum-global-dimension-*` tokens (moved to `scale-large-core-tokens.css.js`).
- Added new icon-size tokens (`--spectrum-cross-icon-size-*`, `--spectrum-arrow-icon-size-*`) and layout helpers.
- Removed deprecated component-specific spacing tokens (`--spectrum-field-label-top-margin-small`, `--spectrum-edge-to-visual-only-300`, `--spectrum-sidenav-heading-top-margin`).
- Value-changed tokens are mostly whitespace-only (`var(\n  --foo\n)` → `var(--foo)`); functionally identical.
- Clean: no UXP-incompatible patterns.

### `scale-medium.css.js`

**+115 tokens / −21 removed / ~75 changed.**

Same structure as `scale-large.css.js`. One substantive change: `--spectrum-side-navigation-item-to-header` changed from `16px` to `24px`. Clean.

### `typography.css.js`

**+3 tokens / −11 removed / ~11 changed.**

- Removed `@media (forced-colors: active)` blocks that set `--highcontrast-*` font-color tokens. The high-contrast variables still exist as custom properties but are no longer conditionally set via media query. This removes forced-colors support from the typography stylesheet. **UXP does not support `@media (forced-colors: active)` so this removal is a neutral-to-positive UXP change.**
- Added `--spectrum-detail-font-size`, `--spectrum-code-font-size`, `--spectrum-body-font-size` as direct custom properties.
- Removed `--spectrum-font-size`, `--spectrum-code-font-family`, `--spectrum-font-family-he` (Hebrew font stack token removed).
- Typography class rules (`.spectrum-Heading`, `.spectrum-Body`, etc.) gain `--spectrum-heading-sans-serif-font-family` references.
- No UXP issues.

### `express/theme.css.js`

**+971 tokens / −528 removed / ~925 changed.**

Same large restructuring as `theme.css.js` — component system tokens renamed from `--system-spectrum-*` to `--system-*`. Color format normalization. Two `inherit` values present (same as base theme). See UXP concern under `theme.css.js`.

### `express/theme-dark.css.js`

**+56 tokens / −4 removed / ~62 changed.**

Added Express-specific icon/asset/calendar color tokens. Color normalization. Added `color-scheme:dark`. Clean.

### `express/theme-light.css.js`

**+56 tokens / −4 removed / ~62 changed.**

Added `color-scheme:light`. Clean.

### `express/scale-large.css.js`

**+111 tokens / −19 removed / ~81 changed.**

Removed deprecated tokens, added icon-size tokens. Whitespace normalization in var() calls. Clean.

### `express/scale-medium.css.js`

**+114 tokens / −20 removed / ~82 changed.**

Same pattern as express/scale-large. Clean.

### Spectrum 2 CSS files (all new)

All files under `src/spectrum-two/` are entirely new and contain Spectrum 2 design tokens:

- `spectrum-two/theme.css.js` — ~800+ global animation, spacing, color, typography tokens.
- `spectrum-two/theme-dark.css.js` / `theme-light.css.js` — color-scheme-specific tokens.
- `spectrum-two/scale-large.css.js` / `scale-medium.css.js` — scale-specific tokens.
- `spectrum-two/theme-core-tokens.css.js` — contains `--system-infield-button-border-color: inherit` (same UXP concern as Spectrum 1).
- `-core-tokens` variants — separate files for global alias tokens.

UXP check on all spectrum-two files: no `:is()`, `@layer`, `@media (hover:hover)`, `revert-layer`, or `text-align: start/end` patterns found. Only the `--custom-prop: inherit` pattern (same two properties as Spectrum 1).

---

## 3. JS Changes

### `Theme.js` — Major Refactor

| Aspect | v0.37.0 | v1.12.0 |
|--------|---------|---------|
| Theme attribute | `theme` (`spectrum` / `express`) | `system` (`spectrum` / `express` / `spectrum-two`) |
| `observedAttributes` | `color`, `scale`, `theme`, `lang`, `dir` | `color`, `scale`, `system`, `lang` (`dir` removed) |
| `adoptStyles()` | Full fallback: tries `adoptedStyleSheets`; falls back to `<style>` elements if `ShadyCSS` or native not available | **Only** uses `adoptedStyleSheets`. No `<style>` element fallback. No ShadyCSS support. |
| `requestUpdate()` | Delegates to `ShadyCSS.styleElement()` if ShadyCSS present, else `shouldAdoptStyles()` | Always calls `shouldAdoptStyles()` directly. |
| `connectedCallback()` | Walks DOM to find inherited `dir`, sets `dir` attribute | Only calls `shouldAdoptStyles()` and adds to `instances`. **`dir` propagation removed.** |
| `dir` property | Present (getter/setter + `trackedChildren`) | **Removed entirely.** |
| Context | `sp-language-context` event | `sp-language-context` + new `sp-system-context` event for `system` propagation. |
| `sp-query-theme` event | Handled (provided `color`, `scale`, `lang`, `theme`) | **Removed.** Child components no longer query the theme via this event. |
| Version | No version fields | Exports `Theme.VERSION` and `Theme.CORE_VERSION` from `@spectrum-web-components/base/src/version.js`. |
| `registerThemeFragment` kind | `"theme"` for the base color-neutral styles | `"system"` for the same styles. |

**Critical UXP Impact — `adoptStyles()` removal of `<style>` fallback:**

v1.12.0's `adoptStyles()` is now:
```js
adoptStyles() {
    const e = this.styles, t = [];
    for (const s of e) t.push(s.styleSheet);
    this.shadowRoot.adoptedStyleSheets = t;
}
```

The `<style>` element path and ShadyCSS path are gone. UXP does not reliably support `shadowRoot.adoptedStyleSheets`, so this **breaks CSS token injection in UXP** unless overridden.

**The existing `UxpTheme` wrapper in `packages/theme/src/Theme.js` correctly addresses this** by overriding `adoptStyles()` to try `adoptedStyleSheets` first and fall back to `<style>` injection. This override was written specifically for this v1.12.0 change and is the correct fix.

### `theme-interfaces.js` (new)

Exports three constant arrays:
- `SYSTEM_VARIANT_VALUES = ["spectrum","express","spectrum-two"]`
- `SCALE_VALUES = ["medium","large","medium-express","large-express","medium-spectrum-two","large-spectrum-two"]`
- `COLOR_VALUES = ["light","lightest","dark","darkest","light-express",...,"light-spectrum-two","lightest-spectrum-two","dark-spectrum-two","darkest-spectrum-two"]`

No UXP concerns.

### `core.js` / `express/core.js`

Registration kind changed: `registerThemeFragment(name, "theme", css)` → `registerThemeFragment(name, "system", css)`. This is internal to the package — the `themes.js` / `core.js` entrypoints call this automatically.

### `themes.js` / `express/themes.js` / `spectrum-two/themes.js`

Import structure unchanged (still barrel-imports all color/scale fragment files). A new `themes-core-tokens.js` is the companion file that loads the `-core-tokens` CSS fragments.

### `index.js`

Unchanged — still exports `{ Theme }` from `./Theme.js`.

---

## 4. UXP CSS Checklist

| Pattern | Check | Result | Notes |
|---------|-------|--------|-------|
| `visibility: revert-layer` | All CSS files (Spectrum 1 + 2 + Express) | **CLEAN** | Not present in any file. |
| `:is()` selector | All CSS files | **CLEAN** | Not present in any file. |
| `@media (hover: hover)` | All CSS files | **CLEAN** | Not present. |
| `@layer` | All CSS files | **CLEAN** | Not used anywhere. |
| `--custom-prop: inherit` | All CSS files | **NEEDS REVIEW** | `--system-infield-button-border-color: inherit` and `--system-picker-button-border-color: inherit` present in `theme.css.js`, `theme-core-tokens.css.js`, `express/theme.css.js`, `spectrum-two/theme-core-tokens.css.js`, `spectrum-two/theme.css.js`. |
| `revert-layer` (as any value) | All CSS files | **CLEAN** | Not present. |
| `text-align: start` / `text-align: end` | All CSS files | **CLEAN** | Not present. |
| `@media (forced-colors: active)` | All CSS files | **CLEAN** (removed) | Was present in OLD `typography.css.js`; completely removed in v1.12.0. |
| `adoptedStyleSheets` only in `adoptStyles()` | `Theme.js` | **BREAKING (fixed by wrapper)** | v1.12.0 removes `<style>` fallback. The `UxpTheme` override in `packages/theme/src/Theme.js` restores the fallback. |
| `color-scheme` property | `theme-dark/light/darkest/lightest.css.js` | **LOW RISK** | `color-scheme: dark/light` added per-color-fragment. UXP may ignore this; it should be harmless. |

### `--custom-prop: inherit` — Detailed Assessment

The two properties are:
```css
--system-infield-button-border-color: inherit;
--system-picker-button-border-color: inherit;
```

These are set on `:host,:root` in the base theme token file. The intent is for the infield button and picker button border colors to inherit from their containing element's border color. In standard browser CSS, `inherit` on a custom property causes the property to take the computed value of the same custom property from the parent element's scope. In UXP's CSS engine, this behavior may differ at shadow root boundaries.

**Risk level: LOW-MEDIUM.** These tokens affect `sp-combobox` and `sp-picker` components' infield button border rendering. If borders look wrong in those components under UXP, add explicit overrides in a UXP CSS file:
```css
:host, :root {
    --system-infield-button-border-color: var(--spectrum-gray-400);
    --system-picker-button-border-color: var(--spectrum-gray-400);
}
```

---

## 5. Existing Overrides Audit

The existing wrapper at `/Users/gogupta/Documents/workspace/SWC-Upgrade/swc-uxp-wrappers/packages/theme/` contains the following files:

### `packages/theme/package.json`

```json
{
  "name": "@swc-uxp-wrappers/theme",
  "version": "1.0.0",
  "dependencies": {
    "@swc-uxp-internal/theme": "npm:@spectrum-web-components/theme@1.12.0"
  },
  "exports": {
    ".": "./src/index.js",
    "./package.json": "./package.json",
    "./src/Theme.js": "./src/Theme.js",
    "./sp-theme.js": "./sp-theme.js",
    "./src/themes.js": "./src/themes.js",
    "./src/spectrum-two/themes.js": "./src/spectrum-two/themes.js"
  }
}
```

The dependency already targets `v1.12.0`. The exports cover the primary consumer use-cases: `Theme` class, the `sp-theme` custom-element registration, Spectrum 1 themes, and Spectrum 2 themes.

**Missing exports** that may be needed by consumers:
- `./src/themes-core-tokens.js` — needed if consumers want to load the separate core-token fragments.
- `./src/spectrum-two/themes-core-tokens.js` — same for Spectrum 2.
- No `./express/*` exports — acceptable if Express is not a target for UXP.

### `packages/theme/src/Theme.js`

The `UxpTheme` class correctly overrides `adoptStyles()` to restore the `<style>` element fallback removed in v1.12.0. The implementation is correct and complete:

1. Tests `shadowRoot.adoptedStyleSheets !== undefined` and `CSSStyleSheet.prototype.replaceSync` before attempting CSSOM approach.
2. Wraps the `adoptedStyleSheets` assignment in try/catch.
3. Falls back to removing all existing `<style>` elements and re-injecting via `document.createElement('style')` + `style.textContent = s.cssText`.

**Potential issue**: The fallback reads `s.cssText` from each style object. In v1.12.0 the style objects come from Lit's `css` tagged template. Verify that `s.cssText` is populated (not just `s.styleSheet`). In Lit, `CSSResult` objects have both `cssText` (a string) and `styleSheet` (a `CSSStyleSheet`). The implementation is correct — `cssText` is always available.

### `packages/theme/src/index.js`

```js
export { Theme } from './Theme.js';
```

Correct — re-exports the overridden `UxpTheme` as `Theme`. Consumers importing from `@swc-uxp-wrappers/theme` get the UXP-compatible class.

### `packages/theme/src/themes.js`

```js
export * from '@swc-uxp-internal/theme/src/themes.js';
```

Pass-through to the upstream Spectrum 1 theme fragment loader. The fragments call `Theme.registerThemeFragment()` which uses the shared static `themeFragmentsByKind` Map — since `UxpTheme extends Theme`, registrations made here apply to all `UxpTheme` instances. **Correct.**

### `packages/theme/src/spectrum-two/themes.js`

```js
export * from '@swc-uxp-internal/theme/src/spectrum-two/themes.js';
```

Pass-through for Spectrum 2. **Correct.**

### `packages/theme/sp-theme.js`

```js
import { Theme } from './src/Theme.js';
customElements.define('sp-theme', Theme);
```

Registers the UXP-patched `Theme` class as `sp-theme`. **Correct.**

### No `uxp-theme.css` file exists

There is no `packages/theme/src/uxp-theme.css` or equivalent override file. Given the `--custom-prop: inherit` findings above, a CSS override file is not strictly required but should be considered if testing reveals broken infield-button or picker borders.

---

## 6. package.json Changes

### Exports changes (old → new)

**Added export paths (new in v1.12.0):**

```
./core-tokens.js
./scale-large-core-tokens.js
./scale-medium-core-tokens.js
./theme-dark-core-tokens.js
./theme-darkest-core-tokens.js
./theme-light-core-tokens.js
./theme-lightest-core-tokens.js
./express/scale-large-core-tokens.js
./express/scale-medium-core-tokens.js
./express/theme-dark-core-tokens.js
./express/theme-darkest-core-tokens.js
./express/theme-light-core-tokens.js
./express/theme-lightest-core-tokens.js
./spectrum-two/scale-large.js
./spectrum-two/scale-large-core-tokens.js
./spectrum-two/scale-medium.js
./spectrum-two/scale-medium-core-tokens.js
./spectrum-two/theme-dark.js
./spectrum-two/theme-dark-core-tokens.js
./spectrum-two/theme-darkest.js
./spectrum-two/theme-darkest-core-tokens.js
./spectrum-two/theme-light.js
./spectrum-two/theme-light-core-tokens.js
./spectrum-two/theme-lightest.js
./spectrum-two/theme-lightest-core-tokens.js
./src/theme-interfaces.js
./src/themes-core-tokens.js
./src/spectrum-two/core.js
./src/spectrum-two/core-tokens.js
./src/spectrum-two/themes.js
./src/spectrum-two/themes-core-tokens.js
./src/spectrum-two/scale-large.css.js
./src/spectrum-two/scale-large-core-tokens.css.js
./src/spectrum-two/scale-medium.css.js
./src/spectrum-two/scale-medium-core-tokens.css.js
./src/spectrum-two/theme.css.js
./src/spectrum-two/theme-core-tokens.css.js
./src/spectrum-two/theme-dark.css.js
./src/spectrum-two/theme-dark-core-tokens.css.js
./src/spectrum-two/theme-light.css.js
./src/spectrum-two/theme-light-core-tokens.css.js
./src/scale-large-core-tokens.css.js
./src/scale-medium-core-tokens.css.js
./src/theme-core-tokens.css.js
./src/theme-dark-core-tokens.css.js
./src/theme-light-core-tokens.css.js
./src/theme-darkest-core-tokens.css.js
./src/theme-lightest-core-tokens.css.js
./src/express/core-tokens.js
./src/express/themes-core-tokens.js
./src/express/scale-large-core-tokens.css.js
./src/express/scale-medium-core-tokens.css.js
./src/express/theme-core-tokens.css.js
./src/express/theme-dark-core-tokens.css.js
./src/express/theme-light-core-tokens.css.js
```

**Removed export paths:**

```
./src/theme-darkest.css.js         (removed from express subdirectory only)
./src/express/theme-darkest.css.js  (Express darkest color removed)
./src/express/theme-lightest.css.js (Express lightest color removed)
./express/theme-darkest.js
./express/theme-lightest.js
```

**Note:** The top-level `./src/theme-darkest.css.js` and `./src/theme-lightest.css.js` are **retained** for Spectrum 1. Only the Express variants of darkest/lightest were removed.

### Dependency changes

| | v0.37.0 | v1.12.0 |
|-|---------|---------|
| `@spectrum-web-components/base` | `^0.37.0` | `^1.12.0` |
| `@spectrum-web-components/shared` | `^0.37.0` | removed |
| `lit` | (via base) | (via base) |

The removal of `@spectrum-web-components/shared` dependency is consistent with the removal of ShadyCSS and `dir`-propagation code from `Theme.js` which was the main consumer of shared utilities.

---

## Summary & Action Items

| Priority | Item |
|----------|------|
| **Done** | `adoptStyles()` UXP override in `packages/theme/src/Theme.js` — correctly restores `<style>` element fallback. |
| **Done** | `sp-theme.js` registers `UxpTheme` (not upstream `Theme`). |
| **Done** | `themes.js` and `spectrum-two/themes.js` pass-through files in place. |
| **Verify** | Test that `s.cssText` is non-empty for all style objects returned by `this.styles` in UXP environment. |
| **Consider** | Add `./src/themes-core-tokens.js` and `./src/spectrum-two/themes-core-tokens.js` exports to `packages/theme/package.json` if consumers need to load core-token fragments separately. |
| **Monitor** | `--system-infield-button-border-color: inherit` and `--system-picker-button-border-color: inherit` — test picker/combobox border rendering in UXP. Add overrides if needed. |
| **No action** | Spectrum 2 CSS files are UXP-clean (no `:is()`, `@layer`, `hover:hover`, `revert-layer`, `text-align:start/end`). |
| **No action** | `@media (forced-colors:active)` was present in v0.37.0 `typography.css.js` and is removed in v1.12.0 — a positive change for UXP. |
| **No action** | `theme` → `system` attribute rename is handled transparently by the static fragment registration; consumers using `<sp-theme system="express">` work as expected. |
