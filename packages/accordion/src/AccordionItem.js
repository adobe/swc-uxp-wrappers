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

import { AccordionItem } from '@swc-uxp-internal/accordion/src/AccordionItem.js';
import { html } from '@spectrum-web-components/base';
import { when } from '@spectrum-web-components/base/src/directives.js';

import styles from './uxp-accordion-item.css.js';

class UxpAccordionItem extends AccordionItem {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [super.styles, styles];
    }

    firstUpdated() {
        this.addEventListener('keyup', this.handleKeyup);
    }

    handleKeyup(event) {
        const { code, target } = event;
        if (this !== target) {
            // Prevent the accordion from toggling if the focus is on a child element within #content
            return;
        }

        switch (code) {
            case 'Enter':
            case 'Space':
            case 'NumpadEnter':
                this.onClick();
                break;
            default:
                break;
        }
    }

    // We are making changes in render, as sp-accordion-item relies on native button as header
    // since UXP has limitation to handle icons in native button
    // apart from this font-size is not supported in PS for widgets like button/input etc due to which t-shirt sizing will not be working if we dont adopt this by replacing button whith div here
    // also text-align property is only supprted at div/span level in UXP, button widget need to be tweaked to make it work both from native and alpaca end

    render() {
        return html`
            <h3 id="heading">
                ${when(this.size, this.renderChevronIcon)}
                <div
                    id="header"
                    @click=${this.onClick}
                    tabindex=${this.disabled ? -1 : 0}
                    aria-expanded=${this.open}
                    aria-controls="content"
                    ?disabled=${this.disabled}
                >
                    ${this.label}
                </div>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `;
    }
}

export { UxpAccordionItem as AccordionItem };