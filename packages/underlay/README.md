## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/underlay` package 
<br />

-   For detailed README regarding `@spectrum-web-components/underlay` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/underlay/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/underlay` support in UXP through `@swc-uxp-wrappers/underlay` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/underlay
```

Import the side effectful registration of `<sp-underlay>` via:

```
import '@swc-uxp-wrappers/underlay/sp-underlay.js';
```

When looking to leverage the `Underlay` base class as a type and/or for extension purposes, do so via:

```
import { Underlay } from '@swc-uxp-wrappers/underlay';
```

<br />

## Example

---

<br />

```html
<sp-underlay></sp-underlay>
```
