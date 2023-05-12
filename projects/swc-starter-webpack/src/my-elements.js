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

import { Banner } from '@spectrum-web-components/banner';
import { Divider } from '@spectrum-web-components/divider';
import { IllustratedMessage } from '@spectrum-web-components/illustrated-message';
import { Link } from '@spectrum-web-components/link';
import { Avatar } from '@spectrum-web-components/avatar';
import { FieldLabel } from '@spectrum-web-components/field-label';
import { Button } from '@spectrum-web-components/button';
import { ActionButton } from '@spectrum-web-components/action-button';
import { ActionGroup } from '@spectrum-web-components/action-group';
import { Card } from '@spectrum-web-components/card';
import { Checkbox } from '@spectrum-web-components/checkbox';

import { css } from 'lit';

class MyBanner extends Banner {
    static styles = [
        Banner.styles,
        css`
            :host([type='info']) {
                background-color: rgb(103, 58, 183);
            }
        `,
    ];
}

class MyDivider extends Divider {
    static styles = [
        Divider.styles,
        css`
            :host([class='my-divider']) {
                background-color: rgb(103, 58, 183);
            }
        `,
    ];
}

class MyIllustratedMessage extends IllustratedMessage {
    static styles = [
        IllustratedMessage.styles,
        css`
            :host([class='my-illustrated-message']) {
                background-color: rgb(103, 58, 183);
            }
        `,
    ];
}

class MyLink extends Link {
    static styles = [
        Link.styles,
        css`
            :host([class='my-link']) {
                font-size: 20px;
            }
        `,
    ];
}

class MyAvatar extends Avatar {
    static styles = [
        Avatar.styles,
        css`
            :host([class='my-avatar']) {
                background-color: rgb(103, 58, 183);
            }
        `,
    ];
}

class MyFieldLabel extends FieldLabel {
    static styles = [
        FieldLabel.styles,
        css`
            :host([class='my-field-label']) {
                background-color: beige;
            }
        `,
    ];
}

class MyButton extends Button {
    static styles = [
        Button.styles,
        css`
            :host([class='my-button']) {
                font-size: 20px;
            }
        `,
    ];
}

class MyActionButton extends ActionButton {
    static styles = [
        ActionButton.styles,
        css`
            :host([class='my-action-button']) {
                font-size: 20px;
            }
        `,
    ];
}

class MyCard extends Card {
    static styles = [
        Card.styles,
        css`
            :host([class='my-card']) {
                font-size: 30px;
            }
        `,
    ];
}

class MyCheckbox extends Checkbox {
    static styles = [
        Checkbox.styles,
        css`
            :host {
                background-color: beige;
            }
        `,
    ];
}

class MyActionGroup extends ActionGroup {
    static styles = [
        ActionGroup.styles,
        css`
            :host([class='my-action-group']) {
                font-size: 20px;
            }
        `,
    ];
}

customElements.define('my-banner', MyBanner);
customElements.define('my-action-group', MyActionGroup);
customElements.define('my-checkbox', MyCheckbox);
customElements.define('my-card', MyCard);
customElements.define('my-action-button', MyActionButton);
customElements.define('my-button', MyButton);
customElements.define('my-field-label', MyFieldLabel);
customElements.define('my-avatar', MyAvatar);
customElements.define('my-divider', MyDivider);
customElements.define('my-illustrated-message', MyIllustratedMessage);
customElements.define('my-link', MyLink);
