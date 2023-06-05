## Description

This is UXP wrapper for `@spectrum-web-components/tooltip` package

### Usage

```
yarn add @swc-uxp-wrappers/tooltip
```

Import the side effectful registration of `<sp-tooltip>` via:

```
import '@swc-uxp-wrappers/tooltip/sp-tooltip.js';
```

When looking to leverage the `Tooltip` base class as a type and/or for extension purposes, do so via:

```
import { Tooltip } from '@swc-uxp-wrappers/tooltip';
```

## Example

```html
<sp-tooltip></sp-tooltip>
```
