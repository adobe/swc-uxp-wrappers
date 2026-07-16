# Field Group — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| Added | `src/field-group-overrides.css.js` | Pass-through export needed |

## 2. CSS Changes (`field-group.css.js`)

### Token rename (breaking)
- `--spectrum-fieldgroup-margin` now resolves from `--system-field-group-margin` (was a hardcoded `--spectrum-spacing-300` fallback in old version via direct token)
- `--spectrum-fieldgroup-readonly-delimiter` now resolves from `--system-field-group-readonly-delimiter`

### Selector rewrite for horizontal spacing
Old:
```css
:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),
:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)) { margin: 0 0 0 var(--spectrum-fieldgroup-margin) }
:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),
:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)) { margin: 0 var(--spectrum-fieldgroup-margin) 0 0 }
```
New:
```css
:host([horizontal]) slot:not([name])::slotted(:not(:last-child)),
:host(:not([vertical])) slot:not([name])::slotted(:not(:last-child)) { margin: 0 var(--spectrum-fieldgroup-margin) 0 0 }
:host([horizontal]:dir(rtl)) slot:not([name])::slotted(:not(:last-child)),
:host(:not([vertical]):dir(rtl)) slot:not([name])::slotted(:not(:last-child)) { margin: 0 0 0 var(--spectrum-fieldgroup-margin) }
```

**UXP concern:** `:dir(rtl)` used in new CSS — UXP does not support `:dir()`. The old wrapper used explicit `[dir=ltr]`/`[dir=rtl]` attribute selectors which worked. The new SWC CSS uses `:dir(rtl)` which UXP ignores. Result: RTL margin direction will always use the LTR values. The existing `uxp-field-group.css` was empty so no override existed — needs one if RTL is required.

## 3. JS Changes (`FieldGroup.js`)

- Now uses `ManageHelpText` mixin — renders help text via `this.renderHelpText(this.invalid)`. No UXP concerns.
- Spread missing: `return [super.styles, styles]` → must fix to `[...super.styles, styles]`

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `:is()` | Not present |
| `@media (hover: hover)` | Not present |
| `revert-layer` | Not present |
| `@layer` | Not present |
| `text-align: start/end` | Not present |
| `:dir()` | **PRESENT** — RTL margin direction. UXP ignores `:dir()`. LTR spacing works; RTL will use wrong margin side. |
| CSS `gap` | Not present (uses margin-based spacing) |
| Logical properties | Present — mapper-handled |

## 5. Existing Overrides Audit

`uxp-field-group.css` was empty — nothing to audit.

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/field-group`: `0.37.0` → `1.12.0`
- `@swc-uxp-wrappers/help-text`: `2.0.0` → `3.0.0`
- Add export: `./src/field-group-overrides.css.js`
