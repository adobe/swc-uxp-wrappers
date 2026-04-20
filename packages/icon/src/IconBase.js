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
 * UXP wrapper for IconBase (used as the base class for all sp-icon-* elements).
 *
 * Injects physical height/width overrides so icons render correctly in UXP,
 * where logical properties (inline-size/block-size) are not supported.
 */
import { IconBase } from '@swc-uxp-internal/icon/src/IconBase.js';

import styles from './uxp-icon.css.js';

class UxpIconBase extends IconBase {
    static get styles() {
        return [...super.styles, styles];
    }
}

export { UxpIconBase as IconBase };
