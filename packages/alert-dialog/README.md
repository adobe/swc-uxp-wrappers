## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/alert-dialog` package
<br />

-   For detailed README regarding `@spectrum-web-components/alert-dialog` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/alert-dialog/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/alert-dialog` support in UXP through `@swc-uxp-wrappers/alert-dialog` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/alert-dialog
```

Import the side effectful registration of `<sp-alert-dialog>` via:

```
import '@swc-uxp-wrappers/alert-dialog/sp-alert-dialog.js';
```

When looking to leverage the `AlertDialog` base class as a type and/or for extension purposes, do so via:

```
import { AlertDialog } from '@swc-uxp-wrappers/alert-dialog';
```

<br />

## Example

---

<br />

```html
<sp-alert-dialog></sp-alert-dialog>
```