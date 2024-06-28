## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/popover` package 
<br />

-   For detailed README regarding `@spectrum-web-components/popover` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/popover/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/popover` support in UXP through `@swc-uxp-wrappers/popover` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/popover
```

Import the side effectful registration of `<sp-popover>` via:

```
import '@swc-uxp-wrappers/popover/sp-popover.js';
```

When looking to leverage the `Popover` base class as a type and/or for extension purposes, do so via:

```
import { Popover } from '@swc-uxp-wrappers/popover';
```

<br />

## Example

---

<br />

```html
<sp-popover></sp-popover>
```
