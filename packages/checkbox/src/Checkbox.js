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

import { Checkbox } from '@swc-uxp-internal/checkbox/src/Checkbox.js';

import styles from './uxp-checkbox.css.js';

class UxpCheckbox extends Checkbox {
    static get styles() {
        return [...super.styles, styles];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        // UXP does not reliably propagate CSS custom property changes (driven by the
        // size attribute on :host) down to shadow children like #label.  This means
        // margin-inline-start on #label keeps its stale computed value after a size
        // change, causing the label text to wrap until a hover/repaint forces a
        // re-evaluation.  Force a layout flush on #label whenever size changes.
        if (changedProperties.has('size')) {
            const label = this.shadowRoot && this.shadowRoot.querySelector('#label');
            if (label) {
                label.style.display = 'none';
                // Reading offsetWidth flushes layout; the next rAF restores display.
                // eslint-disable-next-line no-unused-expressions
                label.offsetWidth;
                requestAnimationFrame(() => {
                    label.style.display = '';
                });
            }
        }
    }
}

export { UxpCheckbox as Checkbox };
