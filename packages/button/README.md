## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/button` package
<br />

-   For detailed README regarding `@spectrum-web-components/button` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/button/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/button` support in UXP through `@swc-uxp-wrappers/button` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/button
```

Import the side effectful registration of `<sp-button>` via:

```
import '@swc-uxp-wrappers/button/sp-button.js';
```

When looking to leverage the `Button` base class as a type and/or for extension purposes, do so via:

```
import { Button } from '@swc-uxp-wrappers/button';
```

<br />

## Example

---

<br />

```html
<sp-button></sp-button>
```

## Known Limitations

---

<br />

### `pending` variant not supported

The `pending` attribute/variant is **not supported** in UXP.

SWC's pending state relies on two mechanisms that are unavailable in UXP:

- **`sp-progress-circle`** — the loading spinner injected by SWC's `PendingStateController` has no UXP wrapper and cannot render.
- **Animation-as-state-trigger** — SWC uses a `0s forwards` CSS animation to coordinate the pending transition; CSS animations are not supported in UXP.

The UXP wrapper applies the disabled visual appearance immediately when `pending` is set and hides the broken `sp-progress-circle` element, but **no spinner or loading indicator will be shown**.

```html
<!-- Not supported in UXP — button will look disabled, no spinner -->
<sp-button pending>Save</sp-button>
```
