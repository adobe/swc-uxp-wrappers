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

import { Tags, Tag } from '@spectrum-web-components/tags';
import { css } from 'lit';

class MyTags extends Tags {
    static styles = [
        Tags.styles,
        css`
            :host {
                border-bottom: 3px solid black;
            }
            ::slotted(*) {
                font-style: italic;
            }
        `,
    ];
}

class MyTag extends Tag {
    static styles = [
        Tag.styles,
        css`
            :host {
                background-color: mediumaquamarine;
            }
        `,
    ];
}

customElements.define('my-tags', MyTags);
customElements.define('my-tag', MyTag);
