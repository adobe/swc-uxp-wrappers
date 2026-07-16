## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/alert-banner` package
<br />

-   For detailed README regarding `@spectrum-web-components/alert-banner` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/alert-banner/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/alert-banner` support in UXP through `@swc-uxp-wrappers/alert-banner` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/alert-banner
```

Import the side effectful registration of `<sp-alert-banner>` via:

```
import '@swc-uxp-wrappers/alert-banner/sp-alert-banner.js';
```

When looking to leverage the `AlertBanner` base class as a type and/or for extension purposes, do so via:

```
import { AlertBanner } from '@swc-uxp-wrappers/alert-banner';
```

<br />

## Example

---

<br />

```html
<sp-alert-banner></sp-alert-banner>
```