## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/progress-bar` package 
<br />

-   For detailed README regarding `@spectrum-web-components/progress-bar` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/progress-bar/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/progress-bar` support in UXP through `@swc-uxp-wrappers/progress-bar` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/progress-bar
```

Import the side effectful registration of `<sp-progress-bar>` via:

```
import '@swc-uxp-wrappers/progress-bar/sp-progress-bar.js';
```

When looking to leverage the `ProgressBar` base class as a type and/or for extension purposes, do so via:

```
import { ProgressBar } from '@swc-uxp-wrappers/progress-bar';
```

<br />

## Example

---

<br />

```html
<sp-progress-bar></sp-progress-bar>
```
