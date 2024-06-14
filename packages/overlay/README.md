## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/overlay` package 
<br />

-   For detailed README regarding `@spectrum-web-components/overlay` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/overlay/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/overlay` support in UXP through `@swc-uxp-wrappers/overlay` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/overlay
```

Import the side effectful registration of `<sp-overlay>` via:

```
import '@swc-uxp-wrappers/overlay/sp-overlay.js';
```

When looking to leverage the `Overlay` base class as a type and/or for extension purposes, do so via:

```
import { Overlay } from '@swc-uxp-wrappers/overlay';
```

<br />

## Example

---

<br />

```html
<sp-overlay></sp-overlay>
```
## Known Issues
- Styling of popover and tip rendered is incorrect  when used inside overlay
- Nested overlay is not supported
- The toast dissapears when hovered on it inside overlay
- Longpress attribute does not work with keyboard press event