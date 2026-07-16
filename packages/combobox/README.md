## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/combobox` package
<br />

-   For detailed README regarding `@spectrum-web-components/combobox` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/combobox/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/combobox` support in UXP through `@swc-uxp-wrappers/combobox` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/combobox
```

Import the side effectful registration of `<sp-combobox>` via:

```
import '@swc-uxp-wrappers/combobox/sp-combobox.js';
```

When looking to leverage the `Combobox` base class as a type and/or for extension purposes, do so via:

```
import { Combobox } from '@swc-uxp-wrappers/combobox';
```

<br />

## Example

---

<br />

```html
<sp-combobox></sp-combobox>
```