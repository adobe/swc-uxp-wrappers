/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { PickerBase } from '@swc-uxp-internal/picker/src/Picker.js';
import { html } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import pickerStyles from '@swc-uxp-internal/picker/src/picker.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import styles from './uxp-picker.css.js';

class UxpPickerBase extends PickerBase {
    render() {
        super.render();
        return html`
            <span
                id="focus-helper"
                tabindex="${this.focused || this.open ? '-1' : '0'}"
                @focus=${this.handleHelperFocus}
            ></span>
            <span
                aria-haspopup="true"
                aria-controls=${ifDefined(this.open ? 'menu' : void 0)}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-labelledby="icon label applied-label"
                id="button"
                class="button"
                @blur=${this.handleButtonBlur}
                @pointerdown=${this.handlebuttonPointerdown}
                @focus=${this.handleButtonFocus}
                @click=${this.handleButtonClick}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                ?disabled=${this.disabled}
                tabindex="-1"
            >
                ${this.buttonContent}
            </span>
            ${this.renderMenu}
        `;
    }
}

export { UxpPickerBase as PickerBase };

class UxpPicker extends UxpPickerBase {
    constructor() {
        super(...arguments);
        this.handleKeydown = (event) => {
            const { code } = event;
            this.focused = true;
            if (code === 'ArrowUp' || code === 'ArrowDown') {
                this.toggle(true);
                return;
            }
            if (!code.startsWith('Arrow') || this.readonly) {
                return;
            }
            event.preventDefault();
            if (code === 'ArrowUp' || code === 'ArrowDown') {
                this.toggle(true);
                return;
            }
            const selectedIndex = this.selectedItem
                ? this.menuItems.indexOf(this.selectedItem)
                : -1;
            const nextOffset = !this.value || code === 'ArrowRight' ? 1 : -1;
            let nextIndex = selectedIndex + nextOffset;
            while (
                this.menuItems[nextIndex] &&
                this.menuItems[nextIndex].disabled
            ) {
                nextIndex += nextOffset;
            }
            if (
                !this.menuItems[nextIndex] ||
                this.menuItems[nextIndex].disabled
            ) {
                return;
            }
            if (!this.value || nextIndex !== selectedIndex) {
                this.setValueFromItem(this.menuItems[nextIndex]);
            }
        };
    }
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [pickerStyles, chevronStyles, styles];
    }
    get containerStyles() {
        const styles = super.containerStyles;
        if (!this.quiet) {
            styles['min-width'] = `${this.offsetWidth}px`;
        }
        return styles;
    }
}
export { UxpPicker as Picker };
