## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/action-group` package 
<br />

-   For detailed README regarding `@spectrum-web-components/action-group` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/action-group/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/action-group` support in UXP through `@swc-uxp-wrappers/action-group` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/action-group
```

Import the side effectful registration of `<sp-action-group>` via:

```
import '@swc-uxp-wrappers/action-group/sp-action-group.js';
```

When looking to leverage the `ActionGroup` base class as a type and/or for extension purposes, do so via:

```
import { ActionGroup } from '@swc-uxp-wrappers/action-group';
```

<br />

## Example

---

<br />

```html
<sp-action-group></sp-action-group>
```
