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

/**
 * UXP wrapper for sp-field-group.
 *
 * Extends the SWC FieldGroup class and injects UXP-specific CSS overrides.
 * The overrides in uxp-field-group.css.js patch:
 *   - margin-inline-end (logical) in horizontal mode when no dir attribute is set
 *
 */
import { FieldGroup } from '@swc-uxp-internal/field-group/src/FieldGroup.js';

import styles from './uxp-field-group.css.js';

class UxpFieldGroup extends FieldGroup {
    static get styles() {
        return [...super.styles, styles];
    }
}

export { UxpFieldGroup as FieldGroup };
