## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/divider` package 
<br />

-   For detailed README regarding `@spectrum-web-components/divider` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/divider/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/divider` support in UXP through `@swc-uxp-wrappers/divider` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/divider
```

Import the side effectful registration of `<sp-divider>` via:

```
import '@swc-uxp-wrappers/divider/sp-divider.js';
```

When looking to leverage the `Divider` base class as a type and/or for extension purposes, do so via:

```
import { Divider } from '@swc-uxp-wrappers/divider';
```

<br />

## Example

---

<br />

```html
<sp-divider></sp-divider>
```
