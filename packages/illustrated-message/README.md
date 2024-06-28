## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/illustrated-message` package 
<br />

-   For detailed README regarding `@spectrum-web-components/illustrated-message` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/illustrated-message/v/0.9.8)

-   Detailed specification regarding `@spectrum-web-components/illustrated-message` support in UXP through `@swc-uxp-wrappers/illustrated-message` [refer this link](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=UXP&title=Support+for+Spectrum+Web+Components+in+UXP)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/illustrated-message
```

Import the side effectful registration of `<sp-illustrated-message>` via:

```
import '@swc-uxp-wrappers/illustrated-message/sp-illustrated-message.js';
```

When looking to leverage the `IllustratedMessage` base class as a type and/or for extension purposes, do so via:

```
import { IllustratedMessage } from '@swc-uxp-wrappers/illustrated-message';
```

<br />

## Example

---

<br />

```html
<sp-illustrated-message></sp-illustrated-message>
```
