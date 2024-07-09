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
// import { html } from '@spectrum-web-components/base';
// import { when } from "@spectrum-web-components/base/src/directives.js";

import styles from './uxp-accordion-item.css.js';

class UxpAccordionItem extends AccordionItem {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [super.styles, styles];
    }

    // render() {
    //     super.render();
    //     return html`
    //             <h3 id="heading">
    //                 ${when(this.size, this.renderChevronIcon)}
    //                 <span
    //                     id="header"
    //                     @click=${this.onClick}
    //                     aria-expanded=${this.open}
    //                     aria-controls="content"
    //                     ?disabled=${this.disabled}
    //                 >
    //                     ${this.label}
    //                 </span>
    //             </h3>
    //             <div id="content" role="region" aria-labelledby="header">
    //                 <slot></slot>
    //             </div>
    //         `;
    //   }
}

export { UxpAccordionItem as AccordionItem };