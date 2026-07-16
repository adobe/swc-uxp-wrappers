## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/progress-circle` package (v1.12.2)
<br />

-   For detailed README regarding `@spectrum-web-components/progress-circle` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/progress-circle/v/1.12.2)

-   Detailed specification regarding `@spectrum-web-components/progress-circle` support in UXP through `@swc-uxp-wrappers/progress-circle` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/progress-circle
```

Import the side effectful registration of `<sp-progress-circle>` via:

```
import '@swc-uxp-wrappers/progress-circle/sp-progress-circle.js';
```

When looking to leverage the `ProgressCircle` base class as a type and/or for extension purposes, do so via:

```
import { ProgressCircle } from '@swc-uxp-wrappers/progress-circle';
```

<br />

## Example

---

<br />

```html
<!-- determinate -->
<sp-progress-circle label="Loading" progress="72"></sp-progress-circle>

<!-- indeterminate -->
<sp-progress-circle label="Processing" indeterminate></sp-progress-circle>

<!-- static white (on colored background) -->
<sp-progress-circle label="Saving" progress="33" static-color="white"></sp-progress-circle>
```

## Known Issues

-   **SVG-based rendering (UXP only)**: The upstream component renders progress using CSS `overflow: hidden` + rotation transforms to reveal a fill arc. UXP does not correctly clip rotated children with `overflow: hidden`, so this wrapper replaces the entire rendering with an SVG `<circle>` (track) and `<path>` (fill arc) using explicit arc commands. Visual output matches the upstream, but the internal DOM structure differs from Chrome.

-   **`stroke-dasharray` / `stroke-dashoffset` not supported in UXP**: The standard SVG progress arc technique (dasharray + dashoffset) does not work in UXP's SVG renderer. This wrapper uses explicit SVG arc path commands (`A`) instead, which are supported.

-   **Indeterminate animation differs from upstream**: The upstream animation uses three synchronized `@keyframes` on `.fills` / `.fillSubMask1` / `.fillSubMask2` to produce a growing-and-shrinking spinning arc. Those elements no longer exist because this wrapper replaces the entire render with an SVG. A simplified `@keyframes uxp-circle-spin` (plain 360° rotation of the SVG) is provided as an approximation and runs in Chrome. UXP does not support `@keyframes` / `animation` properties, so the circle renders as a static 25% arc in UXP.

-   **`indeterminate` attribute deprecated in Spectrum 2**: The upstream component emits a deprecation warning when `indeterminate` is used (`window.__swc.DEBUG` mode). The Spectrum 2 preferred approach is to set `progress = null` **programmatically** — omitting the HTML attribute is not sufficient because `progress` defaults to `0`. Both forms produce the same result in this wrapper: a 25% arc with a spin animation in Chrome, and a static 25% arc in UXP.

-   **`--mod-progress-circle-size` / `--mod-progress-circle-thickness` overrides not reflected in SVG geometry**: The SVG arc radius and stroke-width are computed from the `size` attribute (`s`=16px/2px, `m`=32px/3px, `l`=64px/4px). If the size or thickness is customized via mod tokens, the host element will resize correctly (CSS token cascade) but the SVG arc geometry will remain based on the standard attribute values.

-   **Forced colors / High Contrast mode not adapted**: `@media (forced-colors: active)` is not supported in UXP; track and fill colors will not adapt in Windows High Contrast mode.
