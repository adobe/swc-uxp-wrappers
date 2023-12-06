## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/meter` package 
<br />

-   For detailed README regarding `@spectrum-web-components/meter` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/meter/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/meter` support in UXP through `@swc-uxp-wrappers/meter` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/meter
```

Import the side effectful registration of `<sp-meter>` via:

```
import '@swc-uxp-wrappers/meter/sp-meter.js';
```

When looking to leverage the `Meter` base class as a type and/or for extension purposes, do so via:

```
import { Meter } from '@swc-uxp-wrappers/meter';
```

<br />

## Example

---

<br />

```html
<sp-meter></sp-meter>
```
