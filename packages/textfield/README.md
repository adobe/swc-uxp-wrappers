## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/textfield` package 
<br />

-   For detailed README regarding `@spectrum-web-components/textfield` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/textfield/v/0.13.8)

-   Detailed specification regarding `@spectrum-web-components/textfield` support in UXP through `@swc-uxp-wrappers/textfield` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/textfield
```

Import the side effectful registration of `<sp-textfield>` via:

```
import '@swc-uxp-wrappers/textfield/sp-textfield.js';
```

When looking to leverage the `Textfield` base class as a type and/or for extension purposes, do so via:

```
import { Textfield } from '@swc-uxp-wrappers/textfield';
```

<br />

## Example

---

<br />

```html
<sp-textfield></sp-textfield>
```
