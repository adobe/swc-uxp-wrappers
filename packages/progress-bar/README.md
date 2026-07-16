## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/progress-bar` package (v1.12.2)
<br />

-   For detailed README regarding `@spectrum-web-components/progress-bar` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/progress-bar/v/1.12.2)

-   Detailed specification regarding `@spectrum-web-components/progress-bar` support in UXP through `@swc-uxp-wrappers/progress-bar` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/progress-bar
```

Import the side effectful registration of `<sp-progress-bar>` via:

```
import '@swc-uxp-wrappers/progress-bar/sp-progress-bar.js';
```

When looking to leverage the `ProgressBar` base class as a type and/or for extension purposes, do so via:

```
import { ProgressBar } from '@swc-uxp-wrappers/progress-bar';
```

<br />

## Example

---

<br />

```html
<!-- determinate -->
<sp-progress-bar label="Loading" progress="72"></sp-progress-bar>

<!-- indeterminate -->
<sp-progress-bar label="Processing" indeterminate></sp-progress-bar>

<!-- side label -->
<sp-progress-bar label="Uploading" progress="50" side-label></sp-progress-bar>

<!-- static white (on colored background) -->
<sp-progress-bar label="Saving" progress="33" static-color="white"></sp-progress-bar>
```

## Known Issues

-   **Indeterminate mode shows no animation**: UXP does not support CSS `@keyframes` animations. The indeterminate fill is rendered as a static bar (70%) with no movement. The fill-size token chain (`--spectrum-progressbar-fill-size-indeterminate → --system-progress-bar-fill-size-indeterminate`) does not resolve at child element level in UXP shadow DOM; the wrapper overrides it directly with the known value (`70%`).

-   **RTL not supported**: `:dir(rtl)` pseudo-class is not available in UXP. In RTL layouts the fill always grows from the left edge instead of the right.

-   **`over-background` attribute deprecated**: Use `static-color="white"` instead. The `over-background` setter in v1.12.2 automatically converts to `static-color="white"` and removes the attribute.

-   **Forced colors / High Contrast mode not adapted**: `@media (forced-colors: active)` is not supported in UXP; track and fill colors will not adapt in Windows High Contrast mode.
