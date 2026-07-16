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

import { Table } from '@swc-uxp-internal/table/src/Table.js';

import styles from './uxp-table.css.js';

class UxpTable extends Table {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [...super.styles, styles];
    }

    willUpdate(changedProperties) {
        if (!this.hasUpdated) {
            // UXP's querySelector does not support the :scope pseudo-class used in
            // manageSelects() to check for existing checkbox cells. When selects is
            // set in the initial HTML, both manageCheckboxes() and manageSelects()
            // would run on the first update — manageSelects() fails its duplicate
            // guard and inserts a second checkbox cell per row.
            // Fix: on the first render, run only validateSelected() + manageCheckboxes()
            // (which correctly handles all checkbox insertion). manageSelects() is
            // deferred to subsequent updates where manageCheckboxes() no longer runs.
            this.validateSelected();
            this.manageCheckboxes();
            return;
        }
        super.willUpdate(changedProperties);
    }
}

export { UxpTable as Table };
