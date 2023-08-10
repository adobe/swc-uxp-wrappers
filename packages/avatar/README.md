## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/avatar` package 
<br />

-   For detailed README regarding `@spectrum-web-components/avatar` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/avatar/v/0.10.3)

-   Detailed specification regarding `@spectrum-web-components/avatar` support in UXP through `@swc-uxp-wrappers/avatar` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/avatar
```

Import the side effectful registration of `<sp-avatar>` via:

```
import '@swc-uxp-wrappers/avatar/sp-avatar.js';
```

When looking to leverage the `Avatar` base class as a type and/or for extension purposes, do so via:

```
import { Avatar } from '@swc-uxp-wrappers/avatar';
```

<br />

## Example

---

<br />

```html
<sp-avatar></sp-avatar>
```
