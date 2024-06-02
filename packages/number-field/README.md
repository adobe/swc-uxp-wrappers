## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/number-field` package 
<br />

-   For detailed README regarding `@spectrum-web-components/number-field` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/number-field/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/number-field` support in UXP through `@swc-uxp-wrappers/number-field` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/number-field
```

Import the side effectful registration of `<sp-number-field>` via:

```
import '@swc-uxp-wrappers/number-field/sp-number-field.js';
```

When looking to leverage the `NumberField` base class as a type and/or for extension purposes, do so via:

```
import { NumberField } from '@swc-uxp-wrappers/number-field';
```

<br />

## Example

---

<br />

```html
<sp-number-field></sp-number-field>
```

## Known Issues
- Quiet and Readonly variant has black background for Windows
- Stepper icons are trimmed with quiet variant
- Text is not vertically aligned for `size=large`
- On inserting an alphabet in the number field, the cursor moves from the defined place.