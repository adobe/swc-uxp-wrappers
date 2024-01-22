## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/sidenav` package 
<br />

-   For detailed README regarding `@spectrum-web-components/sidenav` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/sidenav/v/0.13.7)

-   Detailed specification regarding `@spectrum-web-components/sidenav` support in UXP through `@swc-uxp-wrappers/sidenav` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/sidenav
```

Import the side effectful registration of `<sp-sidenav>` via:

```
import '@swc-uxp-wrappers/sidenav/sp-sidenav.js';
```

When looking to leverage the `Sidenav` base class as a type and/or for extension purposes, do so via:

```
import { Sidenav } from '@swc-uxp-wrappers/sidenav';
```

<br />

## Example

---

<br />

```html
<sp-sidenav></sp-sidenav>
```

## Known issues
- Manage Tab Index attribute is not working.

