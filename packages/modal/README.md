## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/modal` package 
<br />

-   For detailed README regarding `@spectrum-web-components/modal` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/modal/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/modal` support in UXP through `@swc-uxp-wrappers/modal` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/modal
```

Import the side effectful registration of `<sp-modal>` via:

```
import '@swc-uxp-wrappers/modal/sp-modal.js';
```

When looking to leverage the `Modal` base class as a type and/or for extension purposes, do so via:

```
import { Modal } from '@swc-uxp-wrappers/modal';
```

<br />

## Example

---

<br />

```html
<sp-modal></sp-modal>
```
