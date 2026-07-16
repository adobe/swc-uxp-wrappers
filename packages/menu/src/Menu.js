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

import { Menu } from '@swc-uxp-internal/menu/src/Menu.js';

import styles from './uxp-menu.css.js';

class UxpMenu extends Menu {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [...super.styles, styles];
    }

    /**
     * UXP does not support :scope in Element.querySelectorAll() — upstream uses
     * `[...n.querySelectorAll(":scope > *")]` to expand nested elements (e.g.
     * an inner sp-menu's sp-menu-item children) when building the cached item list.
     * When :scope fails, the spread returns [] and the outer menu's childItems stays
     * empty, causing handlePointerBasedSelection to short-circuit on
     * `&& this.childItems.length` — making selects="inherit" (and any nested menu)
     * permanently unselectable.
     * Override to use Array.from(n.children) which is universally supported in UXP.
     */
    updateCachedMenuItems() {
        if (!this.menuSlot) {
            return [];
        }
        const itemsList = [];
        const slottedElements = this.menuSlot.assignedElements({ flatten: true });
        // Recursively flatten <slot> and non-<sp-menu-item> elements assigned to the menu into a single array.
        for (const [i, slottedElement] of slottedElements.entries()) {
            if (this.childItemSet.has(slottedElement)) {
                // Assign <sp-menu-item> members of the array that are in this.childItemSet to this.cachedChildItems.
                itemsList.push(slottedElement);
                continue;
            }
            const isHTMLSlotElement = slottedElement.localName === 'slot';
            // UXP does not support :scope in querySelectorAll — use Array.from(children) instead.
            // Upstream: [...slottedElement.querySelectorAll(':scope > *')]
            const flattenedChildren = isHTMLSlotElement
                ? slottedElement.assignedElements({ flatten: true })
                : Array.from(slottedElement.children);
            slottedElements.splice(i, 1, slottedElement, ...flattenedChildren);
        }

        this.cachedChildItems = [...itemsList];
        this.rovingTabindexController?.clearElementCache();

        return this.cachedChildItems;
    }

    /**
     * UXP does not support :focus-within in Element.matches() — throws
     * "SyntaxError: :focus-within is not a valid selector".
     * Override handleFocusout to wrap the matches() call in a try/catch.
     * When :focus-within throws, default to false (menu loses focus → reset).
     */
    handleFocusout() {
        let hasFocusWithin = false;
        try {
            hasFocusWithin = this.matches(':focus-within');
        } catch (_) {
            // :focus-within not supported in UXP; assume focus left the menu
        }
        if (!hasFocusWithin) {
            this.rovingTabindexController?.reset();
        }
    }
}

export { UxpMenu as Menu };
