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

import { Button } from '@swc-uxp-internal/button/src/Button.js';

import styles from './uxp-button.css.js';

class UxpButton extends Button {
    static get styles() {
        return [super.styles, styles];
    }

    firstUpdated(changed) {
        super.firstUpdated(changed);
        this.addEventListener('keyup', this._onKeyUp);
    }

    _onKeyUp(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.click();
        }
    }

}

export { UxpButton as Button };
