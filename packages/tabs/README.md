## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/tabs` package 
<br />

-   For detailed README regarding `@spectrum-web-components/tabs` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/tabs/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/tabs` support in UXP through `@swc-uxp-wrappers/tabs` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/tabs
```

Import the side effectful registration of `<sp-tabs>` via:

```
import '@swc-uxp-wrappers/tabs/sp-tabs.js';
```

When looking to leverage the `Tabs` base class as a type and/or for extension purposes, do so via:

```
import { Tabs } from '@swc-uxp-wrappers/tabs';
```

<br />

## Example

---

<br />

```html
<sp-tabs></sp-tabs>
```
