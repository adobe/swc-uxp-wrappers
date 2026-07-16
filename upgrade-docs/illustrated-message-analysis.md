# Illustrated Message — Upgrade Analysis: v0.37.0 → v1.12.0

## 1. File Inventory

| Change | File | Action |
|---|---|---|
| Added | `src/illustratedmessage-overrides.css.js` | Pass-through export added to wrapper |
| Removed | — | None |

## 2. CSS Changes (`illustrated-message.css.js`)

- Minor layout token updates; no structural changes affecting UXP compatibility.
- No new UXP-incompatible CSS patterns introduced.
- `illustratedmessage-overrides.css.js` is empty — **not bundled** in main CSS. Added as pass-through export for API parity.

## 3. JS Changes (`IllustratedMessage.js`)

- No functional changes.
- Fixed missing `...` spread: `[super.styles, styles]` → `[...super.styles, styles]`.

## 4. UXP CSS Checklist

| Check | Result |
|---|---|
| `visibility: revert-layer` | Not present |
| `@media (hover: hover)` | Not present |
| `:is()` | Not present |
| `:dir()` | Not present |
| Logical properties | Present — handled by mapper |

## 5. Existing Overrides Audit

`uxp-illustrated-message.css` was already empty — nothing to audit.

## 6. package.json Changes

- `version`: `2.0.0` → `3.0.0`
- `@swc-uxp-internal/illustrated-message`: `0.37.0` → `1.12.0`
- Added export: `./src/illustratedmessage-overrides.css.js`
