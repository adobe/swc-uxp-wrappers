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

    if (tabName === 'sp-swatch') {
        const eventListener1 = `
            const swatch = document.getElementById("swatch-group-single-select");
            swatch.addEventListener("change", () => {
                swatch.nextElementSibling.textContent = 'Selected: ' + JSON.stringify(swatch.selected);
            });
        `;
        eval(eventListener1);

        const eventListener2 = `
            const swatch = document.getElementById("swatch-group-gradient-select");
            swatch.addEventListener("change", () => {
                swatch.nextElementSibling.textContent = 'Selected: ' + JSON.stringify(swatch.selected);
            });
        `;
        eval(eventListener2);
    }

    if (tabName === 'sp-menu') {
        const eventListener1 = `
            const menu = document.getElementById('inherit-menu');
            menu.addEventListener("change", () => {
                menu.previousElementSibling.textContent = menu.value;
            });
        `;
        eval(eventListener1);
    }

    if (tabName === 'sp-table') {
        const sortHandler = `
            const sortableTable = document.getElementById('sortable-table');
            const sortableBody = document.getElementById('sortable-body');
            if (sortableTable) {
                sortableTable.addEventListener('sorted', function(e) {
                    const sortDirection = e.detail.sortDirection;
                    const sortKey = e.detail.sortKey;
                    const headCells = Array.from(sortableTable.querySelectorAll('sp-table-head-cell[sortable]'));
                    const colIndex = headCells.findIndex(function(cell) {
                        return cell.getAttribute('sort-key') === sortKey;
                    });
                    if (colIndex < 0) return;
                    headCells.forEach(function(cell) {
                        if (cell.getAttribute('sort-key') !== sortKey) {
                            cell.removeAttribute('sort-direction');
                        }
                    });
                    const rows = Array.from(sortableBody.querySelectorAll('sp-table-row'));
                    rows.sort(function(a, b) {
                        const aCells = a.querySelectorAll('sp-table-cell');
                        const bCells = b.querySelectorAll('sp-table-cell');
                        const aText = aCells[colIndex] ? aCells[colIndex].textContent.trim() : '';
                        const bText = bCells[colIndex] ? bCells[colIndex].textContent.trim() : '';
                        const cmp = aText.localeCompare(bText);
                        return sortDirection === 'asc' ? cmp : -cmp;
                    });
                    rows.forEach(function(row) { sortableBody.appendChild(row); });
                });
            }
        `;
        eval(sortHandler);
    }

    if (tabName === 'sp-checkbox') {
        const spCheckboxSizes = `
            const sizes = document.getElementById('checkbox-sizes');
            sizes.addEventListener("change", () => {
                document.querySelector('#dynamic-api-test').setAttribute('size', sizes.value); 
            });
        `;
        eval(spCheckboxSizes);

        const spCheckboxDisabled = `
            document.querySelector('#disabled').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const checkbox = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        checkbox.setAttribute("disabled", "disabled");
                    } else {
                        checkbox.removeAttribute("disabled");
                    }
                });
        `;
        eval(spCheckboxDisabled);

        const spCheckboxEmphasized = `
            document.querySelector('#emphasized').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const checkbox = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        checkbox.setAttribute("emphasized", "emphasized");
                    } else {
                        checkbox.removeAttribute("emphasized");
                    }
                });
        `;
        eval(spCheckboxEmphasized);

        const spCheckboxInvalid = `
            document.querySelector('#invalid').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const checkbox = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        checkbox.setAttribute("invalid", "invalid");
                    } else {
                        checkbox.removeAttribute("invalid");
                    }
                });
        `;
        eval(spCheckboxInvalid);

        const spCheckboxIntermediate = `
            document.querySelector('#indeterminate').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const checkbox = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        checkbox.setAttribute("indeterminate", "indeterminate");
                    } else {
                        checkbox.removeAttribute("indeterminate");
                    }
                });
        `;
        eval(spCheckboxIntermediate);

        const spCheckboxReadonly = `
            document.querySelector('#readonly').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const checkbox = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        checkbox.setAttribute("readonly", "readonly");
                    } else {
                        checkbox.removeAttribute("readonly");
                    }
                });
        `;
        eval(spCheckboxReadonly);
    }

    if (tabName === 'sp-dropzone') {
        (function () {
            var dz       = document.getElementById('dropzone-interactive');
            var stateEl  = document.getElementById('dz-dragged-state');
            var eventEl  = document.getElementById('dz-last-event');
            var fileEl   = document.getElementById('dz-dropped-filename');
            var selectEl = document.getElementById('dz-file-select-label');
            var effectEl = document.getElementById('dz-current-drop-effect');
            var acceptEl = document.getElementById('dz-current-accept-filter');
            if (!dz) return;

            var effectGroup = document.getElementById('dz-drop-effect-group');
            if (effectGroup) {
                effectGroup.addEventListener('change', function () {
                    var val = effectGroup.selected;
                    if (val) { dz.dropEffect = val; effectEl.textContent = val; }
                });
            }

            var acceptGroup = document.getElementById('dz-accept-filter-group');
            if (acceptGroup) {
                acceptGroup.addEventListener('change', function () {
                    var val = acceptGroup.selected;
                    var map = { all: '', image: 'image/*', text: 'text/*' };
                    dz.accept = map[val] !== undefined ? map[val] : '';
                    acceptEl.textContent = val;
                });
            }

            var rejectCheck = document.getElementById('dz-reject-all-check');
            dz.addEventListener('sp-dropzone-should-accept', function (e) {
                eventEl.textContent = 'sp-dropzone-should-accept';
                if (rejectCheck && rejectCheck.checked) { e.preventDefault(); }
            });

            var updateDragState = function () {
                stateEl.textContent = dz.hasAttribute('dragged') ? 'true' : 'false';
            };
            var obs = new MutationObserver(updateDragState);
            obs.observe(dz, { attributes: true, attributeFilter: ['dragged'] });
            dz.addEventListener('sp-dropzone-dragover',  function () { eventEl.textContent = 'sp-dropzone-dragover';  updateDragState(); });
            dz.addEventListener('sp-dropzone-dragleave', function () { eventEl.textContent = 'sp-dropzone-dragleave'; updateDragState(); });

            dz.addEventListener('sp-dropzone-drop', function (e) {
                updateDragState();
                var files    = e.detail.files;
                var source   = e.detail.source;
                var rejected = e.detail.rejected;
                eventEl.textContent = 'sp-dropzone-drop';
                if (rejected) {
                    fileEl.textContent = 'Rejected by accept filter';
                    fileEl.style.color = 'rgb(211,21,16)';
                } else if (!files || files.length === 0) {
                    fileEl.textContent = '(no files)';
                    fileEl.style.color = '';
                } else {
                    var names = files.map(function (f) { return f.name || f.nativePath || '(unknown)'; }).join(', ');
                    fileEl.textContent = '[' + source + '] ' + names;
                    fileEl.style.color = '';
                }
            });

            if (selectEl) {
                selectEl.addEventListener('click', function () { dz.openFilePicker({ multiple: true }); });
            }
        }());
    }

    if (tabName === 'sp-overlay') {
        const placementListener = `
            document.getElementById("placementselection").addEventListener("change", () => {
                document.querySelectorAll(".overlay").forEach((overlay) => {
                    overlay.placement = document.getElementById("placementselection").value;
                  });
            });
            `;
        eval(placementListener);

        const offsetListener = `
            document.getElementById("offsetvalue").addEventListener("input", () => {
                document.querySelectorAll(".overlay").forEach((overlay) => {
                    overlay.offset = document.getElementById("offsetvalue").value;
                });
            });
            `;

        eval(offsetListener);
    }

    if (tabName === 'sp-picker') {
        // Change-icons button: rotates icon sets across sp-menu-items
        var iconSets = [
            ['sp-icon-save-floppy',  'sp-icon-stopwatch',  'sp-icon-user-activity'],
            ['sp-icon-edit',         'sp-icon-magnify',    'sp-icon-star'],
            ['sp-icon-delete',       'sp-icon-add-circle', 'sp-icon-more'],
        ];
        var iconSetIndex = 0;
        var changeIconsBtn = document.getElementById('btn-change-icons');
        var dynPicker      = document.getElementById('picker-dyn-icons');
        if (changeIconsBtn && dynPicker) {
            changeIconsBtn.addEventListener('click', function () {
                iconSetIndex = (iconSetIndex + 1) % iconSets.length;
                var currentValue = dynPicker.value;
                var items = dynPicker.querySelectorAll('sp-menu-item');
                items.forEach(function (item, i) {
                    var old = item.querySelector('[slot="icon"]');
                    if (old) old.remove();
                    var icon = document.createElement(iconSets[iconSetIndex][i]);
                    icon.setAttribute('slot', 'icon');
                    icon.setAttribute('size', 's');
                    item.prepend(icon);
                    if (typeof item.breakItemChildrenCache === 'function') {
                        item.breakItemChildrenCache();
                    }
                });
                dynPicker.value = '';
                requestAnimationFrame(function () { dynPicker.value = currentValue; });
            });
        }

        // Interactive controls
        var interactivePickers = [
            document.getElementById('picker-interactive'),
            document.getElementById('picker-icons-only'),
            document.getElementById('picker-icons-none'),
        ].filter(Boolean);

        var valueDisplay = document.getElementById('picker-selected-value');
        if (interactivePickers[0] && valueDisplay) {
            interactivePickers[0].addEventListener('change', function (e) {
                valueDisplay.textContent = e.target.value;
            });
        }

        var sizeGroup = document.getElementById('picker-size-group');
        if (sizeGroup) {
            // sp-radio-group exposes .selected, not .value
            sizeGroup.addEventListener('change', function () {
                interactivePickers.forEach(function (p) { p.setAttribute('size', sizeGroup.selected); });
            });
        }

        function togglePickerAttr(checkboxId, attr) {
            var cb = document.getElementById(checkboxId);
            if (!cb) return;
            cb.addEventListener('change', function () {
                interactivePickers.forEach(function (p) {
                    if (cb.checked) p.setAttribute(attr, '');
                    else p.removeAttribute(attr);
                });
            });
        }

        togglePickerAttr('picker-toggle-quiet',    'quiet');
        togglePickerAttr('picker-toggle-disabled', 'disabled');
        togglePickerAttr('picker-toggle-invalid',  'invalid');
        togglePickerAttr('picker-toggle-readonly', 'readonly');
    }

    if (tabName === 'sp-breadcrumbs') {
        var el = document.getElementById('breadcrumbs-event-demo');
        var output = document.getElementById('breadcrumbs-event-output');
        if (el && output) {
            el.addEventListener('change', function (e) {
                output.textContent = 'change event: value = "' + (e.detail && e.detail.value) + '"';
            });
        }
    }

    if (tabName === 'sp-progress-circle') {
        const eventListener = `
            const circle = document.getElementById('interactive-circle');
            const slider = document.getElementById('progress-slider');
            const label = document.getElementById('progress-value');
            if (slider && circle && label) {
                slider.addEventListener('input', function() {
                    const val = Math.round(Number(this.value));
                    circle.progress = val;
                    label.textContent = val + '%';
                });
            }
            const s2Indeterminate = document.getElementById('indeterminate-s2');
            if (s2Indeterminate) {
                s2Indeterminate.progress = null;
            }
        `;
        eval(eventListener);
    }
}

function handleThemeSystem(selectObject) {
    var value = selectObject.value;
    document.querySelector('#theme-block').setAttribute('system', value);
}

function handleThemeColor(selectObject) {
    var value = selectObject.value;
    document.querySelector('#theme-block').setAttribute('color', value);
}

function handleThemeScale(selectObject) {
    var value = selectObject.value;
    document.querySelector('#theme-block').setAttribute('scale', value);
}

// logging events
function logEvent(evt) {
    const eventType = evt.type;
    const filterElement = document.querySelector(`#chk${eventType}`);
    if (!filterElement.checked) return;
    const logs = document.querySelector('#logs');
    let key = evt.key === ' ' ? 'Space' : evt.key;

    let evtText =
        `EVENT=${evt.type} CONTROL=${evt.currentTarget.tagName.toLowerCase()}` +
        `${
            evt.currentTarget.value !== undefined
                ? ` VALUE=${evt.currentTarget.value}`
                : ''
        }` +
        `${
            evt.target.checked !== undefined
                ? ` CHECKED=${evt.target.checked}`
                : ''
        }` +
        `${
            evt.target.selectedIndex !== undefined
                ? ` SELECTED=${evt.target.selectedIndex}`
                : ''
        }` +
        `${key !== undefined ? ` KEY=${key}` : ''}` +
        `${evt.charCode !== undefined ? ` CHAR=${evt.charCode}` : ''}` +
        `<br>`;

    logs.innerHTML += evtText;
}

function toggleEventListenerToSpControls(toggle = 'add') {
    ['click', 'focus', 'blur', 'input', 'change', 'keydown', 'keyup'].forEach(
        (evtName) => {
            Array.from(document.querySelectorAll('*')).forEach((control) => {
                if (
                    control._nodeName !== 'sp-theme' &&
                    control._nodeName.startsWith('sp-')
                ) {
                    if (toggle === 'add') {
                        control.addEventListener(evtName, logEvent);
                    } else if (toggle === 'remove') {
                        control.removeEventListener(evtName, logEvent);
                    }
                }
            });
        }
    );
}

function mainControl() {
    document
        .querySelector('#toggleConsole')
        .addEventListener('change', (evt) => {
            const selected = evt.target.selected;
            if (selected) {
                toggleEventListenerToSpControls('add');
            } else {
                toggleEventListenerToSpControls('remove');
            }
        });

    document.querySelector('#clearConsole').addEventListener('click', () => {
        var logs = document.getElementById('logs');
        logs.innerText = '';
    });
}

function reset() {
    const toggleConsole = document.getElementById('toggleConsole');
    const changeEvent = new Event('change', { bubbles: true });
    toggleConsole.removeAttribute('selected');
    toggleConsole.dispatchEvent(changeEvent);
}
