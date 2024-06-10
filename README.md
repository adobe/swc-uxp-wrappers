# Spectrum Web Components UXP Wrappers

## What is this effort?

The opensource [Spectrum Web Components(SWC)](https://github.com/adobe/spectrum-web-components) UI library (hereafter referred to as SWC) targets the modern browser as a platform, replete with support for almost all CSS properties, layout models and Web APIs conforming to the latest standards. UXP never intends to be an all-encompassing browser and thus doesn't support a considerable section of these aforementioned APIs and properties. To bridge this chasm, the UXP team has decided to supplant some of the CSS properties and layout models with other UXP-supported properties in an attempt to achieve UI parity with that of SWC on web. This wrapper is an implementation of this approach.

## What does this repository contain?

This repository contains, as the name implies, wrappers over the opensource SWC components so that these components can be used in a UXP context, utilizing CSS properties etc. that are compatible with the UXP library.

## How does this approach work?

UXP doesn't _re-create_ the entire SWC repository but rather _extends_ from the existing components and (currently) only _overrides_ the CSS styles to address the gaps between UXP and that of a modern web browser. An example to illustrate this is wherein the `display: grid` property which indicates the usage of a Grid layout is replaced with `display: flex` (Flex layout model) and other appurtenant changes in CSS styles to achieve parity with Grid layout.

### This approach allows us to

- override the css styles to make the component work properly in UXP
- lock the underlying spectrum web component version to be compatible with UXP, insulating UXP wrappers from frequent changes in the SWC library

## Supported SWC components

| Components                                                                                               | Supported SWC version              | Unsupported variants/Known issues                                         |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| [Action Bar](https://opensource.adobe.com/spectrum-web-components/components/action-bar/)                   | 0.37.0                             | [Known issues](https://www.npmjs.com/package/@swc-uxp-wrappers/action-bar#known-issues)   |
| [Action Button](https://opensource.adobe.com/spectrum-web-components/components/action-button/)             | 0.37.0                             |                                                                           |
| [Action Group](https://opensource.adobe.com/spectrum-web-components/components/action-group/)               | 0.37.0                             |                                                                           |
| [Asset](https://opensource.adobe.com/spectrum-web-components/components/asset/)                             | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/asset#known-issues        |
| [Avatar](https://opensource.adobe.com/spectrum-web-components/components/avatar/)                           | 0.37.0                             |                                                                           |
| [Banner](https://opensource.adobe.com/spectrum-web-components/components/banner/)                           | 0.37.0                             |                                                                           |
| [Button](https://opensource.adobe.com/spectrum-web-components/components/button/)                           | 0.37.0                             |                                                                           |
| [Button Group](https://opensource.adobe.com/spectrum-web-components/components/button-group/)               | 0.37.0                             |                                                                           |
| [Card](https://opensource.adobe.com/spectrum-web-components/components/card/)                               | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/card#known-issues         |
| [Checkbox](https://opensource.adobe.com/spectrum-web-components/components/checkbox/)                       | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/checkbox#known-issues     |
| [Dialog](https://opensource.adobe.com/spectrum-web-components/components/dialog/)                           | 0.37.0                             |                                                                           |
| [Divider](https://opensource.adobe.com/spectrum-web-components/components/divider/)                         | 0.37.0                             |                                                                           |
| [Field Group](https://opensource.adobe.com/spectrum-web-components/components/field-group/)                 | 0.37.0                             |                                                                           |
| [Field Label](https://opensource.adobe.com/spectrum-web-components/components/field-label/)                 | 0.37.0                             |                                                                           |
| [Help Text](https://opensource.adobe.com/spectrum-web-components/components/help-text/)                     | 0.37.0                             |                                                                           |
| [Icon](https://opensource.adobe.com/spectrum-web-components/components/icon/)                               | 0.37.0  (Wrapper is not required) |                                                                           |
| [Icons](https://opensource.adobe.com/spectrum-web-components/components/icons/)                             | 0.37.0  (Wrapper is not required) |                                                                           |
| [Icons UI](https://opensource.adobe.com/spectrum-web-components/components/icons-ui/)                       | 0.37.0  (Wrapper is not required) |                                                                           |
| [Icons Workflow](https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/)           | 0.37.0  (Wrapper is not required) |                                                                           |
| [Iconset](https://opensource.adobe.com/spectrum-web-components/components/iconset/)                         | 0.37.0  (Wrapper is not required) |                                                                           |
| [Illustrated Message](https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/) | 0.37.0                             |                                                                           |
| [Link](https://opensource.adobe.com/spectrum-web-components/components/link/)                               | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/link#known-issues         |
| [Menu](https://opensource.adobe.com/spectrum-web-components/components/menu/)                               | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/menu#known-issues         |
| [Meter](https://opensource.adobe.com/spectrum-web-components/components/meter/)                             | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/meter#known-issues        |
| [Number Field](https://opensource.adobe.com/spectrum-web-components/components/number-field/)               | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/number-field#known-issues |
| [Overlay](https://opensource.adobe.com/spectrum-web-components/components/overlay/)                         | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/overlay#known-issues      |
| [Picker Button](https://opensource.adobe.com/spectrum-web-components/components/picker-button/)             | 0.37.0                             |                                                                           |
| [Popover](https://opensource.adobe.com/spectrum-web-components/components/popover/)                         | 0.37.0                             |                                                                           |
| [Quick Actions](https://opensource.adobe.com/spectrum-web-components/components/quick-actions/)             | 0.37.0                             |                                                                           |
| [Radio](https://opensource.adobe.com/spectrum-web-components/components/radio/)                             | 0.37.0                             |                                                                           |
| [Search](https://opensource.adobe.com/spectrum-web-components/components/search/)                           | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/search#known-issues       |
| [Sidenav](https://opensource.adobe.com/spectrum-web-components/components/sidenav/)                         | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/sidenav#known-issues      |
| [Swatch](https://opensource.adobe.com/spectrum-web-components/components/swatch/)                           | 0.37.0                             |                                                                           |
| [Switch](https://opensource.adobe.com/spectrum-web-components/components/switch/)                           | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/switch#known-issues       |
| [Table](https://opensource.adobe.com/spectrum-web-components/components/table/)                             | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/table#known-issues        |
| [Tags](https://opensource.adobe.com/spectrum-web-components/components/tags/)                               | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/tags#known-issues         |
| [Texfield](https://opensource.adobe.com/spectrum-web-components/components/textfield/)                      | 0.37.0                             | https://www.npmjs.com/package/@swc-uxp-wrappers/textfield#known-issues    |
| [Toast](https://opensource.adobe.com/spectrum-web-components/components/toast/)                             | 0.37.0                             |                                                                           |
| [Tooltip](https://opensource.adobe.com/spectrum-web-components/components/tooltip/)                         | 0.37.0                             |                                                                           |

##### ⚠️ Apart from the mentioned components, following SWC components work out of the box and hence do not require a wrapper but UXP expects that these components should be compatible with the version of other components being used i.e 0.37.0 

- Icon , Icons, Icons UI, Icons Workflow, Iconset
- Base
- Bundle
- Reactive Controllers
- Shared
- Styles
- Theme

  For example you can import `theme` directly

```
yarn add @spectrum-web-components/theme/sp-theme.js
```

rather than using wrappers

```
yarn add @swc-uxp-wrappers/banner;
```

## Quickstart

For the boiler plate code, you can use the templates as

[Template for vanilla js](https://www.npmjs.com/package/@swc-uxp-wrappers/create-swc-uxp-app)

[Template for react context js](https://www.npmjs.com/package/@swc-uxp-wrappers/create-swc-uxp-react-app)

## Contributing

We'd be very grateful if you contributed to the project! Check out our [contribution guidelines](./CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](./LICENSE.txt) for more information.
