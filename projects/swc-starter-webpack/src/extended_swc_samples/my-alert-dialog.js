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

import { AlertDialog } from '@spectrum-web-components/alert-dialog';
import { css } from 'lit';

class MyAlertDialog extends AlertDialog {
    static styles = [
        ...AlertDialog.styles,
        css`
            :host {
                border: 2px solid var(--spectrum-accent-color-900);
                border-radius: var(--spectrum-corner-radius-100);
            }
        `,
    ];
}

customElements.define('my-alert-dialog', MyAlertDialog);
