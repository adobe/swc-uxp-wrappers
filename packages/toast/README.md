## Description

This is UXP wrapper for `@spectrum-web-components/toast` package

### Usage

```
yarn add @swc-uxp-wrappers/toast
```

Import the side effectful registration of `<sp-toast>` via:

```
import '@swc-uxp-wrappers/toast/sp-toast.js';
```

When looking to leverage the `Toast` base class as a type and/or for extension purposes, do so via:

```
import { Toast } from '@swc-uxp-wrappers/toast';
```

## Example

```html
<sp-toast></sp-toast>
```
