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

/**
 * UXP wrapper for sp-button-group.
 *
 * Extends the SWC ButtonGroup class and injects margin-based gap overrides
 * because UXP does not support CSS 'gap' in flex containers reliably.
 *
 *   - SizedMixin now receives { noDefaultSize: true } as second argument.
 *     This means ButtonGroup no longer has an implicit default size of 'm'.
 *     In UXP usage, always set the [size] attribute explicitly on sp-button-group.
 *
 * We are combining our styles to make all super class styles available
 * along with the transitive dependent classes styles.
 */
import { ButtonGroup } from '@swc-uxp-internal/button-group/src/ButtonGroup.js';

import styles from './uxp-button-group.css.js';

class UxpButtonGroup extends ButtonGroup {
    static get styles() {
        return [...super.styles, styles];
    }
}

export { UxpButtonGroup as ButtonGroup };
