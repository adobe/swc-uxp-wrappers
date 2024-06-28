## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/table` package 
<br />

-   For detailed README regarding `@spectrum-web-components/table` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/table/v/0.1.7)

-   Detailed specification regarding `@spectrum-web-components/table` support in UXP through `@swc-uxp-wrappers/table` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/table
```

Import the side effectful registration of `<sp-table>` via:

```
import '@swc-uxp-wrappers/table/sp-table.js';
```

When looking to leverage the `Table` base class as a type and/or for extension purposes, do so via:

```
import { Table } from '@swc-uxp-wrappers/table';
```

<br />

## Example

---

<br />

```html
<sp-table></sp-table>
```
