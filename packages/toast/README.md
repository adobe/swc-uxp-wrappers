## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/toast` package 
<br />

-   For detailed README regarding `@spectrum-web-components/toast` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/toast/v/0.11.9)

-   Detailed specification regarding `@spectrum-web-components/toast` support in UXP through `@swc-uxp-wrappers/toast` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/toast
```

Import the side effectful registration of `<sp-toast>` via:

```
import '@swc-uxp-wrappers/toast/sp-toast.js';
```

When looking to leverage the `Toast` base class as a type and/or for extension purposes, do so via:

```
import { Toast } from '@swc-uxp-wrappers/toast';
```

<br />

## Example

---

<br />

```html
<sp-toast></sp-toast>
```

## Known issues
- Tab focus does not reach the 'Crossmark' on all toasts when using 'Shift + Tab'.