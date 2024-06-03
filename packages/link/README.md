## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/link` package 
<br />

-   For detailed README regarding `@spectrum-web-components/link` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/link/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/link` support in UXP through `@swc-uxp-wrappers/link` [refer this link](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=UXP&title=Support+for+Spectrum+Web+Components+in+UXP)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/link
```

Import the side effectful registration of `<sp-link>` via:

```
import '@swc-uxp-wrappers/link/sp-link.js';
```

When looking to leverage the `Link` base class as a type and/or for extension purposes, do so via:

```
import { Link } from '@swc-uxp-wrappers/link';
```

<br />

## Example

---

<br />

```html
<sp-link></sp-link>
```
## Known Issues
- The double underline does not appear on hyperlinks on tabbing in Windows.
