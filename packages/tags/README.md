## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/tags` package 
<br />

-   For detailed README regarding `@spectrum-web-components/tags` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/tags/v/0.10.1)

-   Detailed specification regarding `@spectrum-web-components/tags` support in UXP through `@swc-uxp-wrappers/tags` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/tags
```

Import the side effectful registration of `<sp-tags>` via:

```
import '@swc-uxp-wrappers/tags/sp-tags.js';
```

When looking to leverage the `Tags` base class as a type and/or for extension purposes, do so via:

```
import { Tags } from '@swc-uxp-wrappers/tags';
```

<br />

## Example

---

<br />

```html
<sp-tags></sp-tags>
```

## Known issues
- Tag shapes do not display correctly when switching the theme to 'Spectrum Express.
- Icons do not disable upon clicking the 'Disabled' checkbox.
- The tags' shape undergoes changes when unchecking the 'Medium' checkbox.
- Unchecking 'deletable' in the tags component fails to apply expected default styles to the content within the box.
- Resizing window distorts and causes avatars to disappear unexpectedly. 

