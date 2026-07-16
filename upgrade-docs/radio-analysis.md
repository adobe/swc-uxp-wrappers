# Radio / Radio-Group Upgrade Analysis: v0.37.0 → v1.12.0

## Package scope

`@spectrum-web-components/radio` contains both `Radio` and `RadioGroup` — there is no separate radio-group npm package.

---

## 1. File inventory diff

### New files in v1.12.0
| File | Action |
|------|--------|
| `src/radio-overrides.css.js` | New system-token bridge (empty in this version). Add pass-through re-export. |

### Removed files
None.

---

## 2. CSS changes

### `radio.css.js`

**New rules added (v1.12.0):**

- `text-align: start` on `#label` — **UXP concern**: `text-align: start` is unreliable in UXP. Override with `text-align: left`.
- Four rules inside `@media (hover: hover)` block — **UXP concern**: UXP never evaluates this query; the hover styles are invisible. Must be unwrapped and declared unconditionally.

**Hover rules to unwrap:**
```css
/* inside @media (hover: hover) in SWC source */
:host(:hover) #button:before { border-color: --spectrum-radio-button-border-color-hover }
:host([checked]:hover) #input + #button:before { border-color: --spectrum-radio-button-checked-border-color-hover }
:host(:hover) #label { color: --spectrum-radio-neutral-content-color-hover }
:host([emphasized][checked]:hover) #input + #button:before { border-color: --spectrum-radio-emphasized-accent-color-hover }
```

### `radio-overrides.css.js`
Empty in v1.12.0 — system token bridge placeholder. No overrides needed; pass-through export sufficient.

---

## 3. JS API changes

### `Radio.js`
- `SizedMixin(Base, { noDefaultSize: true })` — no default size is applied. UXP usage must set `size` attribute explicitly on `sp-radio` elements (e.g. `size="m"`).
- No other UXP-incompatible API changes.

### `RadioGroup.js`
- No significant UXP-relevant changes.

---

## 4. package.json changes

### New dependency
None.

### `exports` additions
- `./src/radio-overrides.css.js` — new export, pass-through added.

---

## 5. Existing overrides audit

All existing overrides in `uxp-radio.css` (v0.37.0) were **removed** as redundant:

| Override | Reason removed |
|----------|---------------|
| `:host { max-width: 100%; min-height: ... }` | `max-width` was a layout workaround; `min-block-size` is now translated by `enableLogicalProperties` mapper — no override needed |
| `#input { height: 100%; width: 100%; }` | `block-size`/`inline-size` translated by mapper |
| `#button { height/width/margin-top }` | `block-size`/`inline-size`/`margin-block-start` translated by mapper |
| `#label { margin-bottom/top/left }` | `margin-block-*`/`margin-inline-*` translated by mapper |
| `#input.focus-visible + #button:after` focus ring size hack | `.focus-visible` CSS class was removed in v1.12.0; SWC now uses native `:focus-visible` pseudo-class only. This rule is dead code. |

---

## 6. Changes made

### `packages/radio/src/Radio.js`
- Fixed missing spread operator: `[super.styles, styles]` → `[...super.styles, styles]`

### `packages/radio/src/RadioGroup.js`
- Fixed missing spread operator: `[super.styles, styles]` → `[...super.styles, styles]`

### `packages/radio/src/uxp-radio.css`
- Removed all redundant logical-property overrides (now handled by mapper)
- Removed dead `.focus-visible` focus ring hack
- Added `text-align: left` override for `#label`
- Added four `@media (hover:hover)` unwrap rules

### `packages/radio/src/uxp-radio.css.js`
- Updated build artifact to match new `uxp-radio.css`

### `packages/radio/src/radio-overrides.css.js`
- New pass-through re-export for `@swc-uxp-internal/radio/src/radio-overrides.css.js`

### `packages/radio/package.json`
- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/radio`: `0.37.0` → `1.12.0`
- `@swc-uxp-wrappers/field-group`: `2.0.0` → `3.0.0`
- `@swc-uxp-wrappers/help-text`: `2.0.0` → `3.0.0`
- Added export: `./src/radio-overrides.css.js`
