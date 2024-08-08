## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/banner` package 
<br />

-   For detailed README regarding `@spectrum-web-components/banner` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/banner/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/banner` support in UXP through `@swc-uxp-wrappers/banner` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/banner
```

Import the side effectful registration of `<sp-banner>` via:

```
import '@swc-uxp-wrappers/banner/sp-banner.js';
```

When looking to leverage the `Banner` base class as a type and/or for extension purposes, do so via:

```
import { Banner } from '@swc-uxp-wrappers/banner';
```

<br />

## Example

---

<br />

```html
<sp-banner></sp-banner>
```
