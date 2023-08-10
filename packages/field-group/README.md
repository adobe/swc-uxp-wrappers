## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/field-group` package 
<br />

-   For detailed README regarding `@spectrum-web-components/field-group` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/field-group/v/0.8.2)

-   Detailed specification regarding `@spectrum-web-components/field-group` support in UXP through `@swc-uxp-wrappers/field-group` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/field-group
```

Import the side effectful registration of `<sp-field-group>` via:

```
import '@swc-uxp-wrappers/field-group/sp-field-group.js';
```

When looking to leverage the `FieldGroup` base class as a type and/or for extension purposes, do so via:

```
import { FieldGroup } from '@swc-uxp-wrappers/field-group';
```

<br />

## Example

---

<br />

```html
<sp-field-group></sp-field-group>
```
