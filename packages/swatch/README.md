## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/swatch` package 
<br />

-   For detailed README regarding `@spectrum-web-components/swatch` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/swatch/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/swatch` support in UXP through `@swc-uxp-wrappers/swatch` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/swatch
```

Import the side effectful registration of `<sp-swatch>` via:

```
import '@swc-uxp-wrappers/swatch/sp-swatch.js';
```

When looking to leverage the `Swatch` base class as a type and/or for extension purposes, do so via:

```
import { Swatch } from '@swc-uxp-wrappers/swatch';
```

<br />

## Example

---

<br />

```html
<sp-swatch></sp-swatch>
```
