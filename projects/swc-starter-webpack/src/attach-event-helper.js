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

function attachEvents(tabName) {
    if (tabName === 'sp-radio-group') {
        const eventListener1 = `
            const radiogroup1 = document.getElementById("radiogroup1");
            radiogroup1.addEventListener("change", function() {
                radiogroup1.invalid = radiogroup1.selected === 'fourth';
            });
        `;
        eval(eventListener1);

        const eventListener2 = `
        const radiogroup2 = document.getElementById("radiogroup2");
            radiogroup2.addEventListener("change", function() {
                const helpText = radiogroup2.querySelector("[slot='help-text']");
                const isInvalid = this.selected === 'fourth';
                helpText.icon = isInvalid;
                helpText.textContent = isInvalid ? 'You can not like ice cream.' : 'Everyone likes ice cream.';
                helpText.variant = isInvalid ? 'negative' : 'neutral';
            });
        `;

        eval(eventListener2);

        const eventListener3 = `
            const radiogroup3 = document.getElementById("radiogroup3");
            radiogroup3.addEventListener("change", function() {
                radiogroup3.invalid = radiogroup3.selected === 'fourth';
            });
        `;
        eval(eventListener3);
    }
}
