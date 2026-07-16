## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/status-light` package
<br />

-   For detailed README regarding `@spectrum-web-components/status-light` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/status-light/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/status-light` support in UXP through `@swc-uxp-wrappers/status-light` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/status-light
```

Import the side effectful registration of `<sp-status-light>` via:

```
import '@swc-uxp-wrappers/status-light/sp-status-light.js';
```

When looking to leverage the `StatusLight` base class as a type and/or for extension purposes, do so via:

```
import { StatusLight } from '@swc-uxp-wrappers/status-light';
```

<br />

## Example

---

<br />

```html
<sp-status-light></sp-status-light>
```