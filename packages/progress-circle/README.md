## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/progress-circle` package 
<br />

-   For detailed README regarding `@spectrum-web-components/progress-circle` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/progress-circle/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/progress-circle` support in UXP through `@swc-uxp-wrappers/progress-circle` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/progress-circle
```

Import the side effectful registration of `<sp-progress-circle>` via:

```
import '@swc-uxp-wrappers/progress-circle/sp-progress-circle.js';
```

When looking to leverage the `ProgressCircle` base class as a type and/or for extension purposes, do so via:

```
import { ProgressCircle } from '@swc-uxp-wrappers/progress-circle';
```

<br />

## Example

---

<br />

```html
<sp-progress-circle></sp-progress-circle>
```
