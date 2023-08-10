## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/radio` package 
<br />

-   For detailed README regarding `@spectrum-web-components/radio` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/radio/v/0.10.0)

-   Detailed specification regarding `@spectrum-web-components/radio` support in UXP through `@swc-uxp-wrappers/radio` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/radio
```

Import the side effectful registration of `<sp-radio>` via:

```
import '@swc-uxp-wrappers/radio/sp-radio.js';
```

When looking to leverage the `Radio` base class as a type and/or for extension purposes, do so via:

```
import { Radio } from '@swc-uxp-wrappers/radio';
```

<br />

## Example

---

<br />

```html
<sp-radio></sp-radio>
```
