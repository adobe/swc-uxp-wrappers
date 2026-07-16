/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * UXP-safe override of @spectrum-web-components/shared/src/focusable-selectors.js
 *
 * Upstream v1.12.0 added :not([inert]) to every selector segment and included
 * elements unsupported in UXP (details, summary, audio, video). UXP's selector
 * engine throws "SyntaxError: Invalid selector" when element.matches() or
 * element.querySelector() is called with any of these, crashing overlay focus
 * management on open.
 *
 * Changes from upstream:
 *   - Removed :not([inert]) from all segments (UXP does not support the inert attribute)
 *   - Removed audio[controls], video[controls] (media elements not present in UXP)
 *   - Removed details>summary:first-of-type and details (not present in UXP)
 */

const focusables = [
    'input',
    'select',
    'textarea',
    'a[href]',
    'button',
    'label',
    '[tabindex]',
    '[contenteditable]:not([contenteditable="false"])',
    '[focusable]:not([focusable="false"])',
];

const notTabIndex = ':not([tabindex="-1"])';

export const userFocusableSelector =
    focusables.join(`${notTabIndex}, `) + notTabIndex;

export const focusableSelector = focusables.join(', ');
