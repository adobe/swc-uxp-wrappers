## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/menu` package 
<br />

-   For detailed README regarding `@spectrum-web-components/menu` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/menu/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/menu` support in UXP through `@swc-uxp-wrappers/menu` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/menu
```

Import the side effectful registration of `<sp-menu>` via:

```
import '@swc-uxp-wrappers/menu/sp-menu.js';
```

When looking to leverage the `Menu` base class as a type and/or for extension purposes, do so via:

```
import { Menu } from '@swc-uxp-wrappers/menu';
```

<br />

## Example

---

<br />

```html
<sp-menu></sp-menu>
```

## Known Issues
- Multi select variant does not work
- Submenu is not supported
- Performance issue observed when one clicks multiple times on a menu item
