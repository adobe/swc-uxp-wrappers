# Menu Upgrade Analysis: v0.37.0 → v1.12.0

## Package scope

`@spectrum-web-components/menu` contains `Menu`, `MenuGroup`, `MenuDivider`, and `MenuItem` — four components in one package.

---

## 1. File inventory diff

### New files in v1.12.0

| File | Content | Action |
|------|---------|--------|
| `src/checkmark-overrides.css.js` | Empty | Pass-through re-export |
| `src/chevron-overrides.css.js` | Empty | Pass-through re-export |
| `src/menu-divider-overrides.css.js` | Empty | Pass-through re-export |
| `src/menu-item-overrides.css.js` | Empty | Pass-through re-export |
| `src/menu-overrides.css.js` | System token bridge — sets `--spectrum-menu-item-*` to `var(--system-menu-item-*)` | Pass-through re-export (no `inherit` — safe for UXP) |
| `src/menu-sectionHeading-overrides.css.js` | Empty | Pass-through re-export |

### Removed files
- `src/spectrum-config.js` — not exported in wrapper; no action needed
- `src/spectrum-itemLabel.css.js` — not exported in wrapper; no action needed

---

## 2. CSS changes

### `spectrum-menu.css.js`
- Completely rewritten. Old version set all `--spectrum-menu-item-*` tokens on `:host`. New version moves tokens to `menu-overrides.css.js` (system token bridge) and `spectrum-menu.css.js` contains only the remaining token definitions.
- No new UXP-incompatible patterns.

### `spectrum-menu-item.css.js`
- Complete rewrite (~17KB). Key UXP concerns:

**`display: grid` (CRITICAL)** — `display` values in UXP CSS data only include `block`, `flex`, `inline`, `inline-block`, `inline-flex`, `none`. `grid` is absent — CSS grid is **not supported in UXP**. `spectrum-menu-item.css.js` sets `display:grid` with a named grid-area template. Override required: `display: flex`.

**`@media (hover:hover)` block (HIGH)** — 13 rules wrapped in hover media query. All invisible in UXP. Unwrapped into unconditional rules.

**`:is(:active,[active])` (HIGH)** — 8 occurrences of `:host(:is(:active,[active]))`. UXP `:is()` support is partial. All expanded to separate `:host(:active)` + `:host([active])` rules.

### `spectrum-menu-divider.css.js`
**`max()` in `margin-block` (MEDIUM)** — `margin-block: var(--mod-..., max(0px, (section-height - thickness)/2))`. UXP does not support `max()` as a CSS value function. Pre-compute with `calc()` in a custom property.

### `spectrum-menu-group.css.js`
- New in v1.12 (was empty in v0.37). Adds `.spectrum-Menu-back` navigation for nested mobile menus. Uses logical properties (mapper handles) and `focus-visible` (native pseudo-class supported in UXP).

### `menu-overrides.css.js` — system token bridge
Sets `--spectrum-menu-item-*: var(--system-menu-item-*)`. No `inherit` custom-property issue — these are `var()` references, not `inherit`. Safe for UXP.

---

## 3. JS API changes

### `MenuItem.js`
- New export: `MenuItemKeydownEvent` class — JS-only, no CSS impact, flows through `export *` chain automatically.
- New `DependencyManagerController` from `@spectrum-web-components/reactive-controllers` — JS-only lazy-load controller for submenu elements.
- Mobile submenu support (`_mobileRootMenu`, `isMobileView`) — uses `closest('sp-menu[mobile-view]')` which is standard DOM API.
- Touch handling (`handleTouchSubmenuToggle`, etc.) — pointer events. UXP supports pointer events.
- `static get styles()` unchanged in structure (menu-item.css + checkmark.css + chevron.css).

### `Menu.js`, `MenuGroup.js`, `MenuDivider.js`
- No UXP-impactful JS changes.

### New SWC deps
- `@spectrum-web-components/popover` — dynamically imported inside `MenuItem.renderSubmenu()`. No wrapper needed; it's a side-effect import.
- `@spectrum-web-components/reactive-controllers` — pure JS utility, no wrapper needed.

---

## 4. Existing overrides audit

### `uxp-menu-item.css`

| Override | v1.12 status | Action |
|----------|-------------|--------|
| `display: flex; flex-direction: row` | REQUIRED — v1.12 uses `display:grid`, not supported in UXP | KEEP + add `align-items: center` |
| `border-left: ... transparent` placeholder | v1.12 uses `box-shadow`+`outline` for focus ring; no placeholder needed | REMOVE |
| `:host { min-height, padding-* }` (logical prop equivalents) | Mapper handles `min-block-size`, `padding-block-*`, `padding-inline` | REMOVE |
| `.checkmark { min-height, min-width, margin-top, margin-right }` (logical props) | Mapper handles | REMOVE |
| `::slotted([slot='icon']) { margin-right }` (logical prop) | Mapper handles `margin-inline-end` | REMOVE |
| `:host(:focus),:host([focused]) { border-left focus-color }` | v1.12 uses `box-shadow`+`outline` (UXP7.3+ supported) | REMOVE |

### `uxp-menu-group.css`

| Override | v1.12 status | Action |
|----------|-------------|--------|
| `[selects]` `padding-left` overrides | Tokens still valid; `padding-inline-start` on `::slotted()` unreliable in UXP | KEEP |
| `.header { min-width, padding-* }` | Mapper handles `min-inline-size`, `padding-block-*`, `padding-inline` | REMOVE |

### `uxp-menu.css`

| Override | v1.12 status | Action |
|----------|-------------|--------|
| `[selects]` `padding-left` overrides | Tokens still valid | KEEP + add annotation comment |

### `uxp-menu-divider.css`

| Override | v1.12 status | Action |
|----------|-------------|--------|
| `--uxp-swc-menu-divider-margin-block` custom property | Still needed — `max()` remains in v1.12 divider CSS | KEEP |
| `margin-top`/`margin-bottom` physical application | Mapper now handles `margin-block` → `margin-top`+`margin-bottom`; use `margin-block` directly | UPDATE to `margin-block` |
| `width: auto`, `height: ...` | Mapper handles `inline-size`/`block-size` | REMOVE |
| `margin-left`/`margin-right` | Mapper handles `margin-inline` | REMOVE |

---

## 5. Token renames

- `--spectrum-menu-item-focus-indicator-color` (used in old `border-left` override) — token still exists in v1.12, but the override was removed since the approach changed.
- `--spectrum-menu-item-checkmark-height/width/top-to-checkmark` — moved from `spectrum-menu-item.css.js` to `spectrum-menu.css.js` but tokens still valid.

---

## 6. Changes made

### All 4 JS wrappers
- Fixed missing spread operator: `[super.styles, styles]` → `[...super.styles, styles]`

### `packages/menu/src/uxp-menu-item.css`
- Removed 5 redundant logical-property override blocks
- Removed `border-left: transparent` placeholder
- Removed old `border-left` focus ring (replaced by SWC's native `box-shadow`+`outline`)
- Added `align-items: center` to `:host` flex rule
- Added 13 `@media (hover:hover)` unwrap rules
- Added 8 `:is(:active,[active])` expansions (16 resulting rules)

### `packages/menu/src/uxp-menu-group.css`
- Removed `.header` padding/min-width block (logical props, mapper handles)

### `packages/menu/src/uxp-menu-divider.css`
- Simplified to just the `max()` workaround using `margin-block` (mapper translates to physical)
- Removed redundant `width`, `height`, `margin-left`, `margin-right` overrides

### `packages/menu/src/uxp-menu.css`
- Added annotation comment on `[selects]` padding-left overrides

### New pass-through files (6)
- `src/checkmark-overrides.css.js`
- `src/chevron-overrides.css.js`
- `src/menu-divider-overrides.css.js`
- `src/menu-item-overrides.css.js`
- `src/menu-overrides.css.js`
- `src/menu-sectionHeading-overrides.css.js`

### `packages/menu/package.json`
- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/menu`: `0.37.0` → `1.12.0`
- `@swc-uxp-wrappers/divider`: `2.0.0` → `3.0.0`
- `@swc-uxp-wrappers/action-button`: `2.0.0` → `3.0.0`
- Added 6 new `*-overrides.css.js` exports

---

## 7. Testing notes

- **Grid layout**: With `display:flex` override, grid-area assignments have no effect. Elements appear in DOM render order. Verify icon + label + value + checkmark + chevron appear in correct visual order.
- **Hover states**: Verify background + label/icon color changes on hover.
- **Active/pressed**: Verify `:active` and `[active]` states show the down background color.
- **Focus ring**: v1.12 uses `box-shadow`+`outline` on `[focused]`. box-shadow requires UXP 7.3+. Verify focus ring renders correctly.
- **Selectable menus**: Verify `[selects]` indent (non-selected vs selected items) is applied correctly.
- **Divider spacing**: Verify divider has correct vertical margin via the calc() workaround.
