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

import { MenuItem } from '@swc-uxp-internal/menu/src/MenuItem.js';

import styles from './uxp-menu-item.css.js';

class UxpMenuItem extends MenuItem {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [...super.styles, styles];
    }

    /**
     * UXP does not support :focus-within in Element.matches().
     * Upstream MenuItem.willUpdate() calls this.matches(':focus-within') when a
     * submenu closes — throws SyntaxError in UXP.  Override to guard it.
     * Replicates upstream logic exactly, wrapping only the matches() call.
     */
    willUpdate(changed) {
        // Upstream calls super.updated() (not super.willUpdate()) — preserve that.
        super.updated(changed);
        if (changed.has('open') && !this.open && this.hasSubmenu && !this._closedViaPointer) {
            let hasFocusWithin = false;
            try {
                hasFocusWithin = this.matches(':focus-within');
            } catch (_) {
                // :focus-within not supported in UXP
            }
            if (hasFocusWithin) this.focus();
        }
    }
}

export { UxpMenuItem as MenuItem };
