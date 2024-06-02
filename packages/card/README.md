## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/card` package 
<br />

-   For detailed README regarding `@spectrum-web-components/card` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/card/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/card` support in UXP through `@swc-uxp-wrappers/card` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/card
```

Import the side effectful registration of `<sp-card>` via:

```
import '@swc-uxp-wrappers/card/sp-card.js';
```

When looking to leverage the `Card` base class as a type and/or for extension purposes, do so via:

```
import { Card } from '@swc-uxp-wrappers/card';
```

<br />

## Example

---

<br />

```html
<sp-card></sp-card>
```
## Known Issues
- `Actions` variant is not supported
