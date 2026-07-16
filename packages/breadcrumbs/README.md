# `@swc-uxp-wrappers/breadcrumbs`

UXP wrapper for [`@spectrum-web-components/breadcrumbs`](https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/) (SWC v1.12.2).

---

## Installation

```sh
npm install @swc-uxp-wrappers/breadcrumbs
# or
yarn add @swc-uxp-wrappers/breadcrumbs
```

Peer dependency: `@swc-uxp-wrappers/utils` must be loaded before any SWC component.

---

## Usage

```js
import '@swc-uxp-wrappers/breadcrumbs/sp-breadcrumbs.js';
// sp-breadcrumb-item is registered automatically
```

When looking to leverage the base classes for type or extension purposes:

```js
import { Breadcrumbs } from '@swc-uxp-wrappers/breadcrumbs/src/Breadcrumbs.js';
import { BreadcrumbItem } from '@swc-uxp-wrappers/breadcrumbs/src/BreadcrumbItem.js';
```

---

## Example

```html
<sp-breadcrumbs label="Navigation">
    <sp-breadcrumb-item value="home" href="https://example.com">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="section">Section</sp-breadcrumb-item>
    <sp-breadcrumb-item value="current">Current Page</sp-breadcrumb-item>
</sp-breadcrumbs>
```

Full API: [Spectrum Web Components — Breadcrumbs](https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/)

---

## Known Issues

### Focus ring not shown for keyboard navigation

UXP throws a `SyntaxError` when `:focus-visible` is used in `element.matches()`, so the wrapper disables the upstream focus-ring logic entirely. Items still receive keyboard focus and respond to Enter/arrow keys, but the visual indicator is absent.

**Workaround:** Apply a custom focus style on the shadow host:

```css
sp-breadcrumb-item:focus {
    outline: 2px solid var(--spectrum-blue-800);
    border-radius: 4px;
}
```

### Overflow is count-based, not pixel-based

In UXP, container width cannot be measured from inside the shadow DOM, so the overflow menu activates by item count rather than available pixel space. Items beyond `max-visible-items` (default `4`) are hidden regardless of the actual container width.

Set `max-visible-items` explicitly to control the threshold.

### Overflow menu not re-evaluated on resize

`ResizeObserver` may not fire reliably in all UXP environments. The overflow state is calculated once on initial render and is not updated if the panel is resized after that.

### `href` navigation — use the `change` event

In UXP, `href` on a shadow-DOM `<a>` triggers navigation at DOM-insertion time rather than on click. The wrapper suppresses `href` internally and handles navigation via the UXP shell API (`openExternal`).

Listen to the `change` event on `<sp-breadcrumbs>` for navigation:

```js
breadcrumbs.addEventListener('change', (e) => {
    navigateTo(e.detail.value);
});
```

The `href` attribute still works normally in standard browsers.

### `value` attribute required for `change` events

Always set a non-empty `value` attribute on every `<sp-breadcrumb-item>`. Visible items only dispatch `change` when `value` is present; overflow items without `value` fall back to a DOM index string, which is rarely useful.

### LTR text direction only

RTL layouts have not been validated in UXP.

---

## Licensing

Apache-2.0 — see [LICENSE](./LICENSE.txt).
