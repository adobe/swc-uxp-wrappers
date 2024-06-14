/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/** This file handles aliasing of spectrum-web-components to corresponding swc-uxp-wrappers
 *  also we have handled few aliasing for transitive dependencies (menu and table components)
 *  integrator have to import these aliases list in the bundler/package manager and pass on to aliasing module.
 */
export const aliases = {
    '@spectrum-web-components/banner': '@swc-uxp-wrappers/banner',
    '@spectrum-web-components/divider': '@swc-uxp-wrappers/divider',
    '@spectrum-web-components/illustrated-message':
        '@swc-uxp-wrappers/illustrated-message',
    '@spectrum-web-components/link': '@swc-uxp-wrappers/link',
    '@spectrum-web-components/avatar': '@swc-uxp-wrappers/avatar',
    '@spectrum-web-components/field-label': '@swc-uxp-wrappers/field-label',
    '@spectrum-web-components/card': '@swc-uxp-wrappers/card',
    '@spectrum-web-components/button': '@swc-uxp-wrappers/button',
    '@spectrum-web-components/action-button': '@swc-uxp-wrappers/action-button',
    '@spectrum-web-components/checkbox': '@swc-uxp-wrappers/checkbox',
    '@spectrum-web-components/action-group': '@swc-uxp-wrappers/action-group',
    '@spectrum-web-components/action-bar': '@swc-uxp-wrappers/action-bar',
    '@spectrum-web-components/popover': '@swc-uxp-wrappers/popover',
    '@spectrum-web-components/tooltip': '@swc-uxp-wrappers/tooltip',
    '@spectrum-web-components/picker-button': '@swc-uxp-wrappers/picker-button',
    '@spectrum-web-components/menu': '@swc-uxp-wrappers/menu',
    '@spectrum-web-components/table': '@swc-uxp-wrappers/table',
    '@spectrum-web-components/textfield': '@swc-uxp-wrappers/textfield',
    '@spectrum-web-components/help-text': '@swc-uxp-wrappers/help-text',
    '@spectrum-web-components/dialog': '@swc-uxp-wrappers/dialog',
    '@spectrum-web-components/button-group': '@swc-uxp-wrappers/button-group',
    '@spectrum-web-components/toast': '@swc-uxp-wrappers/toast',
    '@spectrum-web-components/field-group': '@swc-uxp-wrappers/field-group',
    '@spectrum-web-components/switch': '@swc-uxp-wrappers/switch',
    '@spectrum-web-components/radio': '@swc-uxp-wrappers/radio',
    '@spectrum-web-components/number-field': '@swc-uxp-wrappers/number-field',
    '@spectrum-web-components/search': '@swc-uxp-wrappers/search',
    '@spectrum-web-components/tags': '@swc-uxp-wrappers/tags',
    '@spectrum-web-components/asset': '@swc-uxp-wrappers/asset',
    '@spectrum-web-components/quick-actions': '@swc-uxp-wrappers/quick-actions',
    '@spectrum-web-components/meter': '@swc-uxp-wrappers/meter',
    '@spectrum-web-components/sidenav': '@swc-uxp-wrappers/sidenav',
    '@spectrum-web-components/swatch': '@swc-uxp-wrappers/swatch',
    '@spectrum-web-components/overlay': '@swc-uxp-wrappers/overlay',
    '../sp-menu.dev.js': '@swc-uxp-wrappers/menu/sp-menu.js',
    '../sp-menu.js': '@swc-uxp-wrappers/menu/sp-menu.js',
};
