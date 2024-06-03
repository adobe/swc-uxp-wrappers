## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/tooltip` package 
<br />

-   For detailed README regarding `@spectrum-web-components/tooltip` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/tooltip/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/tooltip` support in UXP through `@swc-uxp-wrappers/tooltip` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/tooltip
```

Import the side effectful registration of `<sp-tooltip>` via:

```
import '@swc-uxp-wrappers/tooltip/sp-tooltip.js';
```

When looking to leverage the `Tooltip` base class as a type and/or for extension purposes, do so via:

```
import { Tooltip } from '@swc-uxp-wrappers/tooltip';
```

<br />

## Example

---

<br />

```html
<sp-tooltip></sp-tooltip>
```

