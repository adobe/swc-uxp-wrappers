## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/dialog` package 
<br />

-   For detailed README regarding `@spectrum-web-components/dialog` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/dialog/v/0.11.12)

-   Detailed specification regarding `@spectrum-web-components/dialog` support in UXP through `@swc-uxp-wrappers/dialog` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/dialog
```

Import the side effectful registration of `<sp-dialog>` via:

```
import '@swc-uxp-wrappers/dialog/sp-dialog.js';
```

When looking to leverage the `Dialog` base class as a type and/or for extension purposes, do so via:

```
import { Dialog } from '@swc-uxp-wrappers/dialog';
```

<br />

## Example

---

<br />

```html
<sp-dialog></sp-dialog>
```
