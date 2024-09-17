## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/picker` package 
<br />

-   For detailed README regarding `@spectrum-web-components/picker` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/picker/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/picker` support in UXP through `@swc-uxp-wrappers/picker` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/picker
```

Import the side effectful registration of `<sp-picker>` via:

```
import '@swc-uxp-wrappers/picker/sp-picker.js';
```

When looking to leverage the `Picker` base class as a type and/or for extension purposes, do so via:

```
import { Picker } from '@swc-uxp-wrappers/picker';
```

<br />

## Example

---

<br />

```html
<sp-picker></sp-picker>
```
