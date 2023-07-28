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

import {
    SideNav,
    SideNavItem,
    SideNavHeading,
} from '@spectrum-web-components/sidenav';
import { css } from 'lit';

class MySideNav extends SideNav {
    static styles = [
        SideNav.styles,
        css`
            :host {
                background-color: aquamarine;
            }
        `,
    ];
}

class MySideNavItem extends SideNavItem {
    static styles = [
        SideNavItem.styles,
        css`
            :host {
                border-bottom: 1px solid black;
            }
        `,
    ];
}

class MySideNavHeading extends SideNavHeading {
    static styles = [
        SideNavHeading.styles,
        css`
            :host {
                background-color: lightcoral;
            }
        `,
    ];
}

customElements.define('my-sidenav', MySideNav);
customElements.define('my-sidenav-item', MySideNavItem);
customElements.define('my-sidenav-heading', MySideNavHeading);
