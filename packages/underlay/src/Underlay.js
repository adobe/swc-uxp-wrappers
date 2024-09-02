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

import { Underlay } from '@swc-uxp-internal/underlay/src/Underlay.js';

import styles from './uxp-underlay.css.js';

class UxpUnderlay extends Underlay {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [super.styles, styles];
    }

    constructor() {
        super(...arguments);
        // Add event listener for Escape key
        this.addEventListener('keydown', this.handleEscape);
    }

    handleEscape(event) {
        if (event.key === 'Escape') {
            console.log('handleEscape');
            this.open = false;
        }
    }
}

export { UxpUnderlay as Underlay };
