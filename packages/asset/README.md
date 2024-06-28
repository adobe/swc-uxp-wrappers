## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/asset` package 
<br />

-   For detailed README regarding `@spectrum-web-components/asset` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/asset/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/asset` support in UXP through `@swc-uxp-wrappers/asset` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/asset
```

Import the side effectful registration of `<sp-asset>` via:

```
import '@swc-uxp-wrappers/asset/sp-asset.js';
```

When looking to leverage the `Asset` base class as a type and/or for extension purposes, do so via:

```
import { Asset } from '@swc-uxp-wrappers/asset';
```

<br />

## Example

---

<br />

```html
<sp-asset></sp-asset>
```
## Known Issues
- For variant file or folder, one needs to explicitly set height and/or width in the plugin

