## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/tabs` package
<br />

-   For detailed README regarding `@spectrum-web-components/tabs` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/tabs/v/1.12.1)

-   Detailed specification regarding `@spectrum-web-components/tabs` support in UXP through `@swc-uxp-wrappers/tabs` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/tabs
```

Import the side effectful registration of `<sp-tabs>` via:

```
import '@swc-uxp-wrappers/tabs/sp-tabs.js';
import '@swc-uxp-wrappers/tabs/sp-tab.js';
import '@swc-uxp-wrappers/tabs/sp-tab-panel.js';
```

When looking to leverage the `Tabs` base class as a type and/or for extension purposes, do so via:

```
import { Tabs, Tab, TabPanel } from '@swc-uxp-wrappers/tabs';
```

<br />

## Example

---

<br />

```html
<sp-tabs selected="1">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab-panel value="1">Content 1</sp-tab-panel>
    <sp-tab-panel value="2">Content 2</sp-tab-panel>
</sp-tabs>
```