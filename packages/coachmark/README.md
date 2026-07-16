## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/coachmark` package (v1.12.2).
<br />

-   For detailed README regarding `@spectrum-web-components/coachmark` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/coachmark)

-   Detailed specification regarding `@spectrum-web-components/coachmark` support in UXP through `@swc-uxp-wrappers/coachmark` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/coachmark
```

Import the side effectful registration of `<sp-coachmark>` via:

```
import '@swc-uxp-wrappers/coachmark/sp-coachmark.js';
```

Import the side effectful registration of `<sp-coach-indicator>` via:

```
import '@swc-uxp-wrappers/coachmark/sp-coach-indicator.js';
```

When looking to leverage the `Coachmark` base class as a type and/or for extension purposes, do so via:

```
import { Coachmark } from '@swc-uxp-wrappers/coachmark';
```

<br />

## Example

---

<br />

Basic coachmark with navigation buttons:

```html
<sp-coachmark open primary-cta="Next" secondary-cta="Skip tour">
    <div slot="title">Coachmark title</div>
    <div slot="content">
        This is a coachmark message that explains a feature of the application.
    </div>
</sp-coachmark>
```

With step counter:

```html
<sp-coachmark
    open
    primary-cta="Next"
    secondary-cta="Previous"
    current-step="2"
    total-steps="5"
>
    <div slot="title">Step 2 of 5</div>
    <div slot="content">Navigation step counter shown on the left side of the footer.</div>
</sp-coachmark>
```

With action menu (three-dot button):

```html
<sp-coachmark open primary-cta="Got it" secondary-cta="Skip">
    <div slot="title">Coachmark with actions</div>
    <div slot="content">Click the ••• button to see the action menu.</div>
    <div slot="actions">
        <sp-menu-item>Restart tour</sp-menu-item>
        <sp-menu-item>Skip all tips</sp-menu-item>
    </div>
</sp-coachmark>
```

Coach indicator:

```html
<sp-coach-indicator></sp-coach-indicator>
<sp-coach-indicator static-color="white"></sp-coach-indicator>
<sp-coach-indicator quiet></sp-coach-indicator>
```

## UXP Behavior

---

<br />

The following UXP limitations are transparently handled by this wrapper — no changes to markup are required:

-   **Navigation buttons** (`primary-cta`, `secondary-cta`) are created imperatively as native `sp-button` elements. Lit-template-rendered `sp-button` elements are not visible in UXP shadow DOM.

-   **Action menu** (`slot="actions"`) is rendered as a native three-dot dropdown built from the `sp-menu-item` light-DOM children. UXP does not distribute light-DOM children into named shadow slots, so the upstream `sp-action-menu` slot is replaced by a native `div`-based dropdown.

-   **Hover styles** on navigation buttons and the three-dot button are applied via `mouseenter`/`mouseleave`. In UXP, `@media(hover:hover)` is always true, which causes CSS `:hover` rules to apply permanently.

## Known Issues

-   `sp-coach-indicator` renders as static concentric rings — the pulsing animation does not work because UXP does not support CSS `animation` or `@keyframes`. The component will animate automatically once UXP adds animation support; no markup changes are required.
-   Keyboard focus on the injected nav buttons and the three-dot action button works via `tabindex`. However, tab traversal order within the shadow DOM may differ from the upstream SWC behavior, and arrow-key navigation within the button group is not supported.
-   The `slot="asset"` image will not load if the `src` points to an external URL — UXP restricts network access to the plugin's allowed domains. Use a local asset path instead.
