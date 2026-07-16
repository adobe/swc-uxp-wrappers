# `@swc-uxp-wrappers/action-menu`

UXP wrapper for [`@spectrum-web-components/action-menu`](https://opensource.adobe.com/spectrum-web-components/components/action-menu/) (SWC v1.12.2).

Extends the upstream component with JavaScript and CSS patches that make it work correctly in the Adobe UXP plugin runtime (Photoshop, Illustrator, etc.), where several Web APIs and CSS features are unavailable or behave differently from a standard browser.

---

## Installation

```sh
npm install @swc-uxp-wrappers/action-menu
# or
yarn add @swc-uxp-wrappers/action-menu
```

Peer dependency: `@swc-uxp-wrappers/utils` must be loaded before any SWC component.

---

## Usage

```sh
yarn add @swc-uxp-wrappers/action-menu
```

Import the side effectful registration of `<sp-action-menu>` via:

```js
import '@swc-uxp-wrappers/action-menu/sp-action-menu.js';
```

When looking to leverage the `ActionMenu` base class as a type and/or for extension purposes, do so via:

```js
import { ActionMenu } from '@swc-uxp-wrappers/action-menu';
```

---

## Example

```html
<sp-action-menu label="More actions">
    <sp-menu-item>Deselect</sp-menu-item>
    <sp-menu-item>Select Inverse</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Save Selection</sp-menu-item>
    <sp-menu-item disabled>Make Work Path</sp-menu-item>
</sp-action-menu>
```

Full API: [Spectrum Web Components — Action Menu](https://opensource.adobe.com/spectrum-web-components/components/action-menu/)

---

## UXP patches applied

| # | Patch | Reason |
|---|-------|--------|
| 1 | `window.matchMedia` stub | UXP does not expose `window.matchMedia` in older versions; stubbed before `super()` so `MatchMediaController` initializes safely |
| 2 | `hasVisibleFocusInTree() → false` | Prevents the `focus` event from setting `[focused]`; the upstream `:focus-visible`-gated focus-ring rule is already inert in UXP. Keyboard handlers still set `[focused]` on any keydown — see Known Issues. |
| 3 | `hasRenderedOverlay` forced `true` | `DependencyManagerController` defers overlay render; forcing eager render ensures menu items register on first open |
| 4 | `handlePointerdown` debounce | UXP fires `pointerdown` twice per click; second event is suppressed while `preventNextToggle === 'maybe'` |
| 5 | `bindButtonKeydownListener` on host | Keyboard focus lands on the host element in UXP, not on the internal `#button` shadow child |
| 6 | `handleBeforetoggle` override | Upstream handler calls `:focus-within` / `:focus` selectors that throw `SyntaxError` in UXP |
| 7 | `closeOnFocusOut` no-op | UXP fires `focusout` when focus moves to a menu item, causing spurious overlay close |
| 8 | `_openInstances` mutual close | UXP has no native popover auto-dismiss; only one menu can be open at a time (implemented manually) |
| 9 | CSS: hover state overrides | `sp-action-button`'s hover styles are wrapped in `@media(hover:hover)` — when `matchMedia` is stubbed that query never fires. The action-menu CSS sets `--mod-actionbutton-*` tokens on `#button:hover` from the parent shadow scope, bypassing the media-query guard. |
| 10 | CSS: active state overrides | `sp-action-button`'s Spectrum CSS uses `:is(:active, [active])` for the pressed state; UXP does not support `:is()`. Expanded, `:is()`-free selectors are used instead. |
| 11 | CSS: LTR icon margin unconditional | `action-menu.css` uses `::slotted([slot="icon"]:dir(ltr))` for icon edge alignment; UXP does not support `:dir()`. The LTR margin is applied unconditionally. |

---

## Known Issues

### Focus ring not shown for keyboard navigation

UXP does not support the `:focus-visible` CSS pseudo-class, so the upstream focus-ring rule (a `::after` pseudo-element gated on `:focus-visible`) never matches. The button still receives keyboard focus and responds to Enter/Space/arrow keys; only the visual indicator is absent.

**Workaround:** The component sets the `[focused]` attribute on the first keydown while focused (not on Tab-arrival). Apply a custom focus style targeting it:

```css
sp-action-menu[focused] {
    outline: 2px solid var(--spectrum-blue-800);
    border-radius: 4px;
}
```

### Mutual close is scoped to the JS module

When multiple `sp-action-menu` instances are on screen, opening one automatically closes the others. This mutual-close registry is a module-level `Set` — instances loaded in separate JS module scopes (e.g. different UXP panel entrypoints) will not close each other.

### `selects="multiple"` not supported

Only `selects="single"` has been validated in UXP. The `selects="multiple"` variant is not tested and may not behave correctly.

### LTR text direction only

UXP does not support the `:dir()` CSS pseudo-class. Icon margin adjustments are applied unconditionally for LTR layout. RTL (`dir="rtl"`) is not supported.

### `slot="tooltip"` requires `self-managed`

In UXP, tooltips must carry the `self-managed` attribute to handle their own show/hide lifecycle. Without it the tooltip may remain permanently visible or fail to appear.

```html
<!-- Correct -->
<sp-tooltip slot="tooltip" self-managed placement="bottom">Label</sp-tooltip>
```

---

## Licensing

Apache-2.0 — see [LICENSE](./LICENSE.txt).
