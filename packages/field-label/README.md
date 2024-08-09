## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/field-label` package 
<br />

-   For detailed README regarding `@spectrum-web-components/field-label` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/field-label/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/field-label` support in UXP through `@swc-uxp-wrappers/field-label` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/field-label
```

Import the side effectful registration of `<sp-field-label>` via:

```
import '@swc-uxp-wrappers/field-label/sp-field-label.js';
```

When looking to leverage the `FieldLabel` base class as a type and/or for extension purposes, do so via:

```
import { FieldLabel } from '@swc-uxp-wrappers/field-label';
```

<br />

## Example

---

<br />

```html
<sp-field-label></sp-field-label>
```
