# Alert Dialog — UXP Wrapper Analysis (SWC 1.12.0)

## Package: `@spectrum-web-components/alert-dialog@1.12.0`

New component — no prior wrapper existed.

---

## 1. File Inventory

| File | Purpose | Wrapper action |
|---|---|---|
| `src/AlertDialog.js` | Main component class | Wrapped (`UxpAlertDialog extends AlertDialog`) |
| `src/index.js` | Re-exports | New pass-through |
| `sp-alert-dialog.js` | `customElements.define` | New, uses UXP wrapper class |
| `src/alert-dialog.css.js` | Component CSS | CSS combiner (SWC + UXP overrides) |
| `src/alert-dialog-overrides.css.js` | Divider color token overrides | Pass-through re-export |
| `src/spectrum-alert-dialog.css.js` | Spectrum CSS (subset of alert-dialog.css) | Not exported; internal to SWC |

---

## 2. CSS Analysis

### UXP Issues Found

| Rule | Issue | Override |
|---|---|---|
| `.grid { display: grid }` | `grid` not in UXP `display` values | `display: flex; flex-direction: column` |
| `.header { align-items: baseline }` | `baseline` not in UXP `align-items` values | `align-items: flex-start` |

### UXP Checklist

| Check | Result |
|---|---|
| `visibility: revert-layer` | Not present ✓ |
| `:is()` pseudo-class | Not present ✓ |
| `@media (hover: hover)` | Not present ✓ |
| `@layer` | Not present ✓ |
| `text-align: start/end` | Not present ✓ |
| `place-self` | Not present ✓ |
| `--custom-prop: inherit` on `:host` | Not present ✓ |
| Logical properties | Present — all covered by UXP `enableLogicalProperties` mapper ✓ |
| `display: flex` on `:host` | Supported ✓ |
| `justify-content: space-between` | Supported ✓ |
| `overflow-y: auto` | Supported ✓ |

---

## 3. JS Analysis

- **`AlertDialog`** extends `SpectrumElement` via `FocusVisiblePolyfillMixin`
- Uses `ResizeController` from `@lit-labs/observers` — aliased in utils ✓
- No dynamic `import()`, no UXP-incompatible APIs
- Exports `alertDialogVariants` constant — re-exported from wrapper

---

## 4. Dependencies

| Dependency | Version | UXP wrapper |
|---|---|---|
| `@spectrum-web-components/base` | 1.12.0 | Aliased in utils ✓ |
| `@spectrum-web-components/button` | 1.12.0 | `packages/button` ✓ |
| `@spectrum-web-components/button-group` | 1.12.0 | `packages/button-group` ✓ |
| `@spectrum-web-components/divider` | 1.12.0 | `packages/divider` ✓ |
| `@spectrum-web-components/icons-workflow` | 1.12.0 | Aliased in utils ✓ |
| `@spectrum-web-components/shared` | 1.12.0 | Aliased in utils ✓ |
| `@lit-labs/observers` | 2.0.2 | Aliased in utils ✓ |

`@swc-uxp-internal/alert-dialog` alias added to `packages/utils/package.json`.

---

## 5. Wrapper Files Created

```
packages/alert-dialog/
  src/
    AlertDialog.js                  ← UxpAlertDialog extends AlertDialog
    index.js                        ← re-exports
    uxp-alert-dialog.css            ← 2 overrides: display:grid → flex col, align-items:baseline → flex-start
    uxp-alert-dialog.css.js         ← build artifact (yarn build)
    alert-dialog.css.js             ← CSS combiner (SWC + UXP)
    alert-dialog-overrides.css.js   ← pass-through re-export
  sp-alert-dialog.js                ← customElements.define
  package.json
```
