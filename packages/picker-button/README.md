## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/picker-button` package 
<br />

-   For detailed README regarding `@spectrum-web-components/picker-button` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/picker-button/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/picker-button` support in UXP through `@swc-uxp-wrappers/picker-button` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/picker-button
```

Import the side effectful registration of `<sp-picker-button>` via:

```
import '@swc-uxp-wrappers/picker-button/sp-picker-button.js';
```

When looking to leverage the `PickerButton` base class as a type and/or for extension purposes, do so via:

```
import { PickerButton } from '@swc-uxp-wrappers/picker-button';
```

<br />

## Example

---

<br />

```html
<sp-picker-button></sp-picker-button>
```
