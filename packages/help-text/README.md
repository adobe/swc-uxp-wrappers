## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/help-text` package 
<br />

-   For detailed README regarding `@spectrum-web-components/help-text` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/help-text/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/help-text` support in UXP through `@swc-uxp-wrappers/help-text` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/help-text
```

Import the side effectful registration of `<sp-help-text>` via:

```
import '@swc-uxp-wrappers/help-text/sp-help-text.js';
```

When looking to leverage the `HelpText` base class as a type and/or for extension purposes, do so via:

```
import { HelpText } from '@swc-uxp-wrappers/help-text';
```

<br />

## Example

---

<br />

```html
<sp-help-text></sp-help-text>
```
