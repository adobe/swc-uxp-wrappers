## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/thumbnail` package 
<br />

-   For detailed README regarding `@spectrum-web-components/thumbnail` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/thumbnail/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/thumbnail` support in UXP through `@swc-uxp-wrappers/thumbnail` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/thumbnail
```

Import the side effectful registration of `<sp-thumbnail>` via:

```
import '@swc-uxp-wrappers/thumbnail/sp-thumbnail.js';
```

When looking to leverage the `Thumbnail` base class as a type and/or for extension purposes, do so via:

```
import { Thumbnail } from '@swc-uxp-wrappers/thumbnail';
```

<br />

## Example

---

<br />

```html
<sp-thumbnail size="500">
    <img src="https://picsum.photos/500/500" alt="Thumbnail preview" />
</sp-thumbnail>
```
