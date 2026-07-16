/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* UXP does not support the :scope pseudo-class in querySelector().
   SWC shared@1.12.0 changed ObserveSlotPresence to use
   this.querySelector(`:scope > ${selector}`) — this always returns null in UXP,
   causing hasButtons / hasFooter / hasHero to stay false and their slots to never render.
   We re-implement ObserveSlotPresence using the plain selector (no :scope >) which
   works correctly in UXP. Logic is otherwise identical to the upstream implementation. */

import { MutationController } from '@lit-labs/observers/mutation-controller.js';

const slotContentIsPresent = Symbol('slotContentIsPresent');

export function ObserveSlotPresence(constructor, lightDomSelector) {
    const lightDomSelectors = Array.isArray(lightDomSelector)
        ? lightDomSelector
        : [lightDomSelector];

    class SlotPresenceObservingElement extends constructor {
        constructor(...args) {
            super(...args);

            this[slotContentIsPresent] = new Map();

            this.managePresenceObservedSlot = () => {
                let changes = false;
                lightDomSelectors.forEach((selector) => {
                    // UXP fix: use plain selector instead of ':scope > ' + selector
                    // because UXP does not support :scope in querySelector().
                    const nextValue = !!this.querySelector(selector);
                    const previousValue =
                        this[slotContentIsPresent].get(selector) || false;
                    changes = changes || previousValue !== nextValue;
                    this[slotContentIsPresent].set(selector, nextValue);
                });
                if (changes) {
                    this.updateComplete.then(() => {
                        this.requestUpdate();
                    });
                }
            };

            new MutationController(this, {
                config: { childList: true, subtree: true },
                callback: () => {
                    this.managePresenceObservedSlot();
                },
            });

            this.managePresenceObservedSlot();
        }

        get slotContentIsPresent() {
            if (lightDomSelectors.length === 1) {
                return this[slotContentIsPresent].get(lightDomSelectors[0]) || false;
            } else {
                throw new Error(
                    'Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.'
                );
            }
        }

        getSlotContentPresence(selector) {
            if (this[slotContentIsPresent].has(selector)) {
                return this[slotContentIsPresent].get(selector) || false;
            }
            throw new Error(
                `The provided selector \`${selector}\` is not being observed.`
            );
        }
    }

    return SlotPresenceObservingElement;
}
