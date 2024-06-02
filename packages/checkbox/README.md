## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/checkbox` package
<br />

-   For detailed README regarding `@spectrum-web-components/checkbox` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/checkbox/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/checkbox` support in UXP through `@swc-uxp-wrappers/checkbox` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/checkbox
```

Import the side effectful registration of `<sp-checkbox>` via:

```
import '@swc-uxp-wrappers/checkbox/sp-checkbox.js';
```

When looking to leverage the `Checkbox` base class as a type and/or for extension purposes, do so via:

```
import { Checkbox } from '@swc-uxp-wrappers/checkbox';
```

<br />

## Example

---

<br />

```html
<sp-checkbox></sp-checkbox>
```
## Known Issues
- Tab navigation is not supported
