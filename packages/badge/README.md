## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/badge` package 
<br />

-   For detailed README regarding `@spectrum-web-components/badge` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/badge/v/1.12.2)

-   Detailed specification regarding `@spectrum-web-components/badge` support in UXP through `@swc-uxp-wrappers/badge` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/badge
```

Import the side effectful registration of `<sp-badge>` via:

```
import '@swc-uxp-wrappers/badge/sp-badge.js';
```

When looking to leverage the `Badge` base class as a type and/or for extension purposes, do so via:

```
import { Badge } from '@swc-uxp-wrappers/badge';
```

<br />

## Example

---

<br />

```html
<sp-badge variant="informative">Informative</sp-badge>
```

## Known Issues

---

<br />

### 2-line label cap not enforced

Upstream SWC applies `.label slot { max-height: calc(line-height × font-size × 2) }` to cap badge labels at two lines. Because the UXP wrapper adopts text nodes directly into a `.label` div (no `<slot>` element), this rule never matches and the badge grows to fit text of any length.

**Root cause:** UXP ShadyDOM renders light-DOM children after all shadow-DOM content, so a slotted icon would appear to the right of the label. The adopt pattern is necessary to fix icon ordering, but eliminates the `<slot>` element that the upstream cap relies on.
