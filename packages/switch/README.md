## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/switch` package 
<br />

-   For detailed README regarding `@spectrum-web-components/switch` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/switch/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/switch` support in UXP through `@swc-uxp-wrappers/switch` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/switch
```

Import the side effectful registration of `<sp-switch>` via:

```
import '@swc-uxp-wrappers/switch/sp-switch.js';
```

When looking to leverage the `Switch` base class as a type and/or for extension purposes, do so via:

```
import { Switch } from '@swc-uxp-wrappers/switch';
```

<br />

## Example

---

<br />

```html
<sp-switch></sp-switch>
```

## Known Issues

-   Tab navigation does not work
-   Line break is seen when switch is used for `scale=large`
