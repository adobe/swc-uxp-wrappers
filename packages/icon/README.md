## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/icon` package
<br />

-   For detailed README regarding `@spectrum-web-components/icon` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/icon/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/icon` support in UXP through `@swc-uxp-wrappers/icon` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/icon
```

Import the side effectful registration of `<sp-icon>` via:

```
import '@swc-uxp-wrappers/icon/sp-icon.js';
```

When looking to leverage the `Icon` base class as a type and/or for extension purposes, do so via:

```
import { Icon } from '@swc-uxp-wrappers/icon';
```

<br />

## Example

---

<br />

```html
<sp-icon></sp-icon>
```
