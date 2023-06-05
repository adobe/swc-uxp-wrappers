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
import { ActionBar } from '@spectrum-web-components/action-bar';
import { Popover } from '@spectrum-web-components/popover';
import { Tooltip } from '@spectrum-web-components/tooltip';
import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuGroup,
} from '@spectrum-web-components/menu';
import { PickerButton } from '@spectrum-web-components/picker-button';
import { HelpText } from '@spectrum-web-components/help-text';
import { Textfield } from '@spectrum-web-components/textfield';
import { Dialog } from '@spectrum-web-components/dialog';
import { ButtonGroup } from '@spectrum-web-components/button-group';

import { css } from 'lit';

class MyBanner extends Banner {
    static styles = [
        Banner.styles,
        css`
            :host([type='info']) {
                background: aquamarine;
                color: black;
                font-style: italic;
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
                background-color: beige;
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
                font-style: italic;
            }
        `,
    ];
}

class MyAvatar extends Avatar {
    static styles = [
        Avatar.styles,
        css`
            :host([size='700']) {
                --spectrum-avatar-border-radius: 0px;
            }
        `,
    ];
}

class MyFieldLabel extends FieldLabel {
    static styles = [
        FieldLabel.styles,
        css`
            :host([class='my-field-label']) {
                font-style: italic;
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
                font-family: system-ui;
                font-style: italic;
                background-color: chartreuse;
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
            #box {
                transform: rotate(45deg);
            }
        `,
    ];
}

class MyActionGroup extends ActionGroup {
    static styles = [
        ActionGroup.styles,
        css`
            :host([class='my-action-group']) {
                background-color: antiquewhite;
            }
        `,
    ];
}

class MyActionBar extends ActionBar {
    static styles = [
        ActionBar.styles,
        css`
            :host([open]) {
                background-color: antiquewhite;
            }
        `,
    ];
}

class MyPopover extends Popover {
    static styles = [
        Popover.styles,
        css`
            :host([class='my-popover']) {
                background-color: beige;
            }
        `,
    ];
}

class MyTooltip extends Tooltip {
    static styles = [
        Tooltip.styles,
        css`
            :host([class='my-tooltip']) {
                color: yellow;
                font-style: italic;
            }
        `,
    ];
}

class MyPickerButton extends PickerButton {
    static styles = [
        PickerButton.styles,
        css`
            sp-icon-chevron200 {
                transform: rotate(45deg);
            }
        `,
    ];
}

class MyMenu extends Menu {
    static styles = [
        Menu.styles,
        css`
            :host([class='my-menu']) {
                background-color: antiquewhite;
            }
        `,
    ];
}

class MyMenuItem extends MenuItem {
    static styles = [
        MenuItem.styles,
        css`
            :host([class='my-menu-item']) {
                background-color: antiquewhite;
            }
            :host([dir='ltr']) slot[name='icon'] + #label {
                font-style: italic;
            }
        `,
    ];
}

class MyMenuDivider extends MenuDivider {
    static styles = [
        MenuDivider.styles,
        css`
            :host([class='my-menu-divider']) {
                background-color: yellow;
            }
        `,
    ];
}

class MyMenuGroup extends MenuGroup {
    static styles = [
        MenuGroup.styles,
        css`
            .header {
                font-size: larger;
                background-color: aquamarine;
            }
        `,
    ];
}

class MyHelpText extends HelpText {
    static styles = [
        HelpText.styles,
        css`
            :host([variant='neutral']) .text {
                background-color: darkcyan;
                color: whitesmoke;
                font-style: italic;
                padding: 10px;
            }
        `,
    ];
}

class MyTextfield extends Textfield {
    static styles = [
        Textfield.styles,
        css`
            .input {
                background-color: darkcyan;
                color: antiquewhite;
            }
        `,
    ];
}

class MyDialog extends Dialog {
    static styles = [
        Dialog.styles,
        css`
            :host {
                background-color: green;
            }
        `,
    ];
}

class MyButtonGroup extends ButtonGroup {
    static styles = [
        ButtonGroup.styles,
        css`
            :host {
                background-color: green;
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
customElements.define('my-action-bar', MyActionBar);
customElements.define('my-popover', MyPopover);
customElements.define('my-tooltip', MyTooltip);
customElements.define('my-menu', MyMenu);
customElements.define('my-menu-item', MyMenuItem);
customElements.define('my-menu-divider', MyMenuDivider);
customElements.define('my-menu-group', MyMenuGroup);
customElements.define('my-picker-button', MyPickerButton);
customElements.define('my-help-text', MyHelpText);
customElements.define('my-textfield', MyTextfield);
customElements.define('my-dialog', MyDialog);
customElements.define('my-button-group', MyButtonGroup);
