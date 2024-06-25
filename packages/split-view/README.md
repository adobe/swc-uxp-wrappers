## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/split-view` package 
<br />

-   For detailed README regarding `@spectrum-web-components/split-view` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/split-view/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/split-view` support in UXP through `@swc-uxp-wrappers/split-view` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/split-view
```

Import the side effectful registration of `<sp-split-view>` via:

```
import '@swc-uxp-wrappers/split-view/sp-split-view.js';
```

When looking to leverage the `SplitView` base class as a type and/or for extension purposes, do so via:

```
import { SplitView } from '@swc-uxp-wrappers/split-view';
```

<br />

## Example

---

<br />

```html
<sp-split-view></sp-split-view>
```
