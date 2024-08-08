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

import { Swatch, SwatchGroup } from '@spectrum-web-components/swatch';
import { css } from 'lit';

class MySwatch extends Swatch {
    static styles = [
        Swatch.styles,
        css`
            :host {
                box-shadow: 5px 5px 5px var(--spectrum-global-color-gray-500);
            }
        `,
    ];
}

class MySwatchGroup extends SwatchGroup {
    static styles = [
        SwatchGroup.styles,
        css`
            :host {
                transform: rotate(45deg);
            }
        `,
    ];
}

customElements.define('my-swatch', MySwatch);
customElements.define('my-swatch-group', MySwatchGroup);
