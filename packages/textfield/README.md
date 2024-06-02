## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/textfield` package 
<br />

-   For detailed README regarding `@spectrum-web-components/textfield` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/textfield/v/0.37.0)

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
## Known Issues
- Focus ring is not curved on the corners
- Grows API is not supported
- Black background appears for quiet and readonly variant in windows
- For multiline variant, text value blinks on hovering on windows
- In windows, after typing text with symbols example `abcdss, efgh@ssss` and on pressing enter results in some text value getting missed on the left side
- Tab navigation has issues with type=password

