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

    if (tabName === 'sp-number-field') {
        const spNumberFieldSizes = `
            const sizes = document.getElementById('number-field-sizes');
            sizes.addEventListener("change", () => {
                document.querySelector('#dynamic-api-test').setAttribute('size', sizes.value); 
            });
        `;
        eval(spNumberFieldSizes);

        const spNumberFieldDisabled = `
            document.querySelector('#disabled').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const numberField = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        numberField.setAttribute("disabled", "disabled");
                    } else {
                        numberField.removeAttribute("disabled");
                    }
                });
        `;
        eval(spNumberFieldDisabled);

        const spNumberFieldQuiet = `
            document.querySelector('#quiet').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const numberField = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        numberField.setAttribute("quiet", "quiet");
                    } else {
                        numberField.removeAttribute("quiet");
                    }
                });
        `;
        eval(spNumberFieldQuiet);

        const spNumberFieldIntermediate = `
            document.querySelector('#indeterminate').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const numberField = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        numberField.setAttribute("indeterminate", "indeterminate");
                    } else {
                        numberField.removeAttribute("indeterminate");
                    }
                });
        `;
        eval(spNumberFieldIntermediate);

        const spNumberFieldHideStepper = `
            document.querySelector('#hide-stepper').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const numberField = document.querySelector('#dynamic-api-test');
                    if (checked) {
                        numberField.setAttribute("hide-stepper", "hide-stepper");
                    } else {
                        numberField.removeAttribute("hide-stepper");
                    }
                });
        `;
        eval(spNumberFieldHideStepper);
    }

    if (tabName === 'sp-underlay') {
        const showModalDialogButtonClick = `
            const launchModalDialog = document.getElementById('launchModalDialog');
            launchModalDialog.addEventListener("click", () => {
                const modalDialog = document.getElementById('modalDialog');
                modalDialog.showModal({
                    size: {
                        width: 600,
                        height: 400
                    },
                    titleVisibility: "hide"
                });
            });
            `;

        eval(showModalDialogButtonClick);

        const showFullscreenDialog = `
            const buttonFullscreen = document.getElementById('button-fullscreen');
            buttonFullscreen.addEventListener("click", () => {
                const underlayFullscreen = document.getElementById('underlay-fullscreen');
                underlayFullscreen.open = true;
            });
            `;
        eval(showFullscreenDialog);

        const closeFullscreenDialog = `
            const closeFullscreenDialog = document.getElementById('closeFullscreenDialog');
            closeFullscreenDialog.addEventListener("click", () => {
                const underlayFullscreen = document.getElementById('underlay-fullscreen');
                underlayFullscreen.open = false;
            });
            `;

        eval(closeFullscreenDialog);

        const showAlertErrorDialog = `
        const buttonAlertError = document.getElementById('button-alertError');
        buttonAlertError.addEventListener("click", () => {
            const underlayAlertError = document.getElementById('underlay-alertError');
            underlayAlertError.open = true;
        });
        `;
        eval(showAlertErrorDialog);

        const closeAlertErrorDialog = `
            const closeAlertErrorDialog = document.getElementById('closeAlertErrorDialog');
            closeAlertErrorDialog.addEventListener("click", () => {
                const underlayAlertError = document.getElementById('underlay-alertError');
                underlayAlertError.open = false;
            });
            `;

        eval(closeAlertErrorDialog);

        const showConfirmationDialog = `
        const buttonConfirmation = document.getElementById('button-confirmation');
        buttonConfirmation.addEventListener("click", () => {
            const underlayConfirmation = document.getElementById('underlay-confirmation');
            underlayConfirmation.open = true;
        });
        `;
        eval(showConfirmationDialog);

        const closeConfirmationDialog = `
            const closeConfirmationDialog = document.getElementById('closeConfirmationDialog');
            closeConfirmationDialog.addEventListener("click", () => {
                const underlayConfirmation = document.getElementById('underlay-confirmation');
                underlayConfirmation.open = false;
            });
            `;

        eval(closeConfirmationDialog);

        const showHeroDialog = `
        const buttonHero = document.getElementById('button-hero');
        buttonHero.addEventListener("click", () => {
            const underlayHero = document.getElementById('underlay-hero');
            underlayHero.open = true;
        });
        `;
        eval(showHeroDialog);

        document
            .getElementById('hero')
            .addEventListener('close', function (event) {
                const underlayHero = document.getElementById('underlay-hero');
                underlayHero.open = false;
            });

        const showDismissableDialog = `
        const buttonDismissable = document.getElementById('button-dismissable');
        buttonDismissable.addEventListener("click", () => {
            const underlayDismissable = document.getElementById('underlay-dismissable');
            underlayDismissable.open = true;
        });
        `;
        eval(showDismissableDialog);

        document
            .getElementById('dismissable')
            .addEventListener('close', function (event) {
                const underlayDismissable = document.getElementById(
                    'underlay-dismissable'
                );
                underlayDismissable.open = false;
            });

        const showCloseEventDialog = `
        const buttonCloseEvent = document.getElementById('button-closeEvent');
        buttonCloseEvent.addEventListener("click", () => {
            const underlayCloseEvent = document.getElementById('underlay-closeEvent');
            underlayCloseEvent.open = true;
        });
        `;
        eval(showCloseEventDialog);

        const closeCloseEventDialog = `
            const closeEventButton = document.getElementById('closeEventButton');
            closeEventButton.addEventListener("click", () => {
                const underlayCloseEvent = document.getElementById('underlay-closeEvent');
                underlayCloseEvent.open = false;
            });
            `;

        eval(closeCloseEventDialog);

        const showCustomtDialog = `
         const buttonCustomDialog = document.getElementById('button-customDialog');
         buttonCustomDialog.addEventListener("click", () => {
             const underlayCustomDialog = document.getElementById('underlay-customDialog');
             underlayCustomDialog.open = true;
         });
         `;
        eval(showCustomtDialog);

        const closeCustomtDialog = `
             const closeCustomDialogButton = document.getElementById('closeCustomDialogButton');
             closeCustomDialogButton.addEventListener("click", () => {
                 const underlayCustomDialog = document.getElementById('underlay-customDialog');
                 underlayCustomDialog.open = false;
             });
             `;

        eval(closeCustomtDialog);

        const showScrollableContentDialog = `
        const buttonScrollableContent = document.getElementById('button-scrollable-content');
        buttonScrollableContent.addEventListener("click", () => {
            const underlayScrollableContent = document.getElementById('underlay-scrollable-content');
            underlayScrollableContent.open = true;
        });
        `;
        eval(showScrollableContentDialog);

        document
            .getElementById('scrollable-content')
            .addEventListener('close', function (event) {
                const underlayScrollableContent = document.getElementById(
                    'underlay-scrollable-content'
                );
                underlayScrollableContent.open = false;
            });

        const showFormContentDialog = `
         const buttonFormContent = document.getElementById('button-form-content');
         buttonFormContent.addEventListener("click", () => {
             const underlayFormContent = document.getElementById('underlay-form-content');
             underlayFormContent.open = true;
         });
         `;
        eval(showFormContentDialog);

        document
            .getElementById('form-content')
            .addEventListener('close', function (event) {
                const underlayFormContent = document.getElementById(
                    'underlay-form-content'
                );
                underlayFormContent.open = false;
            });
    }

    if (tabName === 'sp-dialog') {
        const showAlertErrorDialog = `
            const closeAlertErrorDialogButton = document.getElementById('closeAlertErrorDialog');
            closeAlertErrorDialogButton.addEventListener("click", () => {
                closeAlertErrorDialogButton.dispatchEvent(new Event('close', { bubbles: true, composed: true }));

            });
            `;

        eval(showAlertErrorDialog);
    }

    if (tabName === 'sp-accordion') {
        const spAccordionSizes = `
            const sizes = document.getElementById('accordion-sizes');
            sizes.addEventListener("change", () => {
                document.querySelectorAll('#dynamic-api-test').forEach(element => {
                    element.setAttribute('size', sizes.value);
                });
            });
        `;
        eval(spAccordionSizes);

        const spCheckboxDisabled = `
            document.querySelector('#disabled').addEventListener('change', (evt) => {
                    const checked = evt.target.checked;
                    const accordionItem = document.querySelector('#dynamic-disabled-api-test');
                    if (checked) {
                        accordionItem.setAttribute("disabled", "disabled");
                    } else {
                        accordionItem.removeAttribute("disabled");
                    }
                });
        `;
        eval(spCheckboxDisabled);
    }
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
                    control?._nodeName !== 'sp-theme' &&
                    control?._nodeName?.startsWith('sp-')
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
