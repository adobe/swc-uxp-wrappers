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

import { css } from 'lit';
import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';

class MyAccordion extends Accordion {
    static styles = [
        Accordion.styles,
        css`
            :host {
                background: aquamarine;
            }
        `,
    ];
}

class MyAccordionItem extends AccordionItem {
    static styles = [
        AccordionItem.styles,
        css`
            :host {
                background: orange;
            }
        `,
    ];
}
customElements.define('my-accordion', MyAccordion);
customElements.define('my-accordion-item', MyAccordionItem);
