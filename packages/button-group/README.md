## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/button-group` package 
<br />

-   For detailed README regarding `@spectrum-web-components/button-group` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/button-group/v/0.10.8)

-   Detailed specification regarding `@spectrum-web-components/button-group` support in UXP through `@swc-uxp-wrappers/button-group` [refer this link](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=UXP&title=Support+for+Spectrum+Web+Components+in+UXP)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/button-group
```

Import the side effectful registration of `<sp-button-group>` via:

```
import '@swc-uxp-wrappers/button-group/sp-button-group.js';
```

When looking to leverage the `ButtonGroup` base class as a type and/or for extension purposes, do so via:

```
import { ButtonGroup } from '@swc-uxp-wrappers/button-group';
```

<br />

## Example

---

<br />

```html
<sp-button-group></sp-button-group>
```
