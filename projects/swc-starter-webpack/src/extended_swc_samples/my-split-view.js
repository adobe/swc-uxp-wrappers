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
import { SplitView } from '@spectrum-web-components/split-view';

class MySplitView extends SplitView {
    static styles = [
        SplitView.styles,
        css`
            ::slotted(:first-child) {
                background: linear-gradient(
                    45deg,
                    rgba(34, 193, 195, 1) 0%,
                    rgba(253, 187, 45, 1) 79%
                );
            }
            ::slotted(:nth-child(2)) {
                background: linear-gradient(
                    82deg,
                    rgba(2, 0, 36, 1) 0%,
                    rgba(31, 215, 224, 1) 59%,
                    rgba(0, 212, 255, 1) 100%
                );
            }
        `,
    ];
}

customElements.define('my-split-view', MySplitView);
