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

// import our stylesheets
import './styles.css';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

import '@spectrum-web-components/banner/sp-banner.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/avatar/sp-avatar.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/toast/sp-toast.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/tags/sp-tags.js';
import '@spectrum-web-components/tags/sp-tag.js';
import '@spectrum-web-components/field-group/sp-field-group.js';

import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-row.js';

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import '@spectrum-web-components/icons/sp-icons-large.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow75.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-abc.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-actions.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add-circle.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-display-advert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add-to.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add-to-selection.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';

// Importing custom elements (my-*) extended from the respective Spectrum Web Components
import './extended_swc_samples/my-banner.js';
import './extended_swc_samples/my-divider.js';
import './extended_swc_samples/my-avatar.js';
import './extended_swc_samples/my-illustrated-message.js';
import './extended_swc_samples/my-checkbox.js';
import './extended_swc_samples/my-button.js';
import './extended_swc_samples/my-action-button.js';
import './extended_swc_samples/my-action-group.js';
import './extended_swc_samples/my-field-label.js';
import './extended_swc_samples/my-link.js';
import './extended_swc_samples/my-card.js';
import './extended_swc_samples/my-popover.js';
import './extended_swc_samples/my-tooltip.js';
import './extended_swc_samples/my-action-bar.js';
import './extended_swc_samples/my-menu.js';
import './extended_swc_samples/my-menu-item.js';
import './extended_swc_samples/my-menu-divider.js';
import './extended_swc_samples/my-menu-group.js';
import './extended_swc_samples/my-picker-button.js';
import './extended_swc_samples/my-help-text.js';
import './extended_swc_samples/my-textfield.js';
import './extended_swc_samples/my-dialog.js';
import './extended_swc_samples/my-button-group.js';
import './extended_swc_samples/my-toast.js';
import './extended_swc_samples/my-switch.js';
import './extended_swc_samples/my-radio.js';
import './extended_swc_samples/my-radio-group.js';
import './extended_swc_samples/my-field-group.js';
import './extended_swc_samples/my-tags.js';
import './extended_swc_samples/my-sidenav.js';
