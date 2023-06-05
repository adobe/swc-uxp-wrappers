## Description

This is UXP wrapper for `@spectrum-web-components/dialog` package

### Usage

```
yarn add @swc-uxp-wrappers/dialog
```

Import the side effectful registration of `<sp-dialog>` via:

```
import '@swc-uxp-wrappers/dialog/sp-dialog.js';
```

When looking to leverage the `Dialog` base class as a type and/or for extension purposes, do so via:

```
import { Dialog } from '@swc-uxp-wrappers/dialog';
```

## Example

```html
<sp-dialog></sp-dialog>
```
