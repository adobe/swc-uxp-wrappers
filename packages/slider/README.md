## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/slider` package 
<br />

-   For detailed README regarding `@spectrum-web-components/slider` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/slider/v/0.37.0)

-   Detailed specification regarding `@spectrum-web-components/slider` support in UXP through `@swc-uxp-wrappers/slider` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/slider
```

Import the side effectful registration of `<sp-slider>` via:

```
import '@swc-uxp-wrappers/slider/sp-slider.js';
```

When looking to leverage the `Slider` base class as a type and/or for extension purposes, do so via:

```
import { Slider } from '@swc-uxp-wrappers/slider';
```

<br />

## Example

---

<br />

```html
<sp-slider></sp-slider>
```
