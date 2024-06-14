## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/tags` package 
<br />

-   For detailed README regarding `@spectrum-web-components/tags` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/tags/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/tags` support in UXP through `@swc-uxp-wrappers/tags` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/tags
```

Import the side effectful registration of `<sp-tags>` via:

```
import '@swc-uxp-wrappers/tags/sp-tags.js';
```

When looking to leverage the `Tags` base class as a type and/or for extension purposes, do so via:

```
import { Tags } from '@swc-uxp-wrappers/tags';
```

<br />

## Example

---

<br />

```html
<sp-tags></sp-tags>
```
## Known Issues
- Avatar do not get greyscaled with disabled attribute