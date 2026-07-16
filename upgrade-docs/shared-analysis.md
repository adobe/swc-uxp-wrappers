# Shared Package — New UXP Wrapper: @swc-uxp-wrappers/shared

## Why this package exists

`@spectrum-web-components/shared@1.12.0` changed `focusable-selectors.js` to include
`:not([inert])` on every selector segment and added elements unsupported in UXP
(`details>summary:first-of-type`, `details`, `audio[controls]`, `video[controls]`).

The resulting `userFocusableSelector` string is passed to `element.matches()` and
`element.querySelector()` throughout SWC (overlay, tooltip, popover, focusable).
UXP's selector engine throws `SyntaxError: Failed to execute 'matches' on 'Element':
... is not a valid selector` crashing overlay/focus management on open.

## Selector change (upstream)

**v0.37.0** (`focusable-selectors.js`):
```js
const focusables = ["button", "[focusable]", "[href]", "input", "label", "select", "textarea", "[tabindex]"];
const notTabIndex = ':not([tabindex="-1"])';
// → "button:not([tabindex="-1"]), input:not([tabindex="-1"]), ..."
```

**v1.12.0** (`focusable-selectors.js`):
```js
const focusables = [
    "input:not([inert])", "select:not([inert])", ...,
    "details>summary:first-of-type:not([inert])", "details:not([inert])", ...
];
// → "input:not([inert]):not([tabindex="-1"]), ..."  ← UXP rejects :not([inert])
```

## UXP incompatibilities removed

| Removed | Reason |
|---|---|
| `:not([inert])` on all segments | UXP does not support the `inert` attribute in selectors |
| `audio[controls]` | Media elements do not exist in UXP |
| `video[controls]` | Media elements do not exist in UXP |
| `details>summary:first-of-type` | `details`/`summary` elements do not exist in UXP |
| `details` | Does not exist in UXP |

## Package structure

```
packages/shared/
  src/
    focusable-selectors.js   ← UXP-safe override (only changed file)
    index.js                 ← re-exports all; routes focusable-selectors to local override
    *.js                     ← pass-throughs to @swc-uxp-internal/shared
  package.json
```

## Alias change (packages/utils/src/aliases.js)

```diff
- '@spectrum-web-components/shared': '@swc-uxp-internal/shared',
+ '@spectrum-web-components/shared': '@swc-uxp-wrappers/shared',
```

This ensures every SWC component that imports from `@spectrum-web-components/shared`
(overlay, tooltip, popover, focusable, etc.) gets the UXP-safe `userFocusableSelector`
automatically — no per-component changes needed.
