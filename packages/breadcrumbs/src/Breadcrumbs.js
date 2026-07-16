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

import { Breadcrumbs } from '@swc-uxp-internal/breadcrumbs/src/Breadcrumbs.js';

import styles from './uxp-breadcrumbs.css.js';

// Evaluated at module load time — before any ActionMenu is instantiated and before
// the matchMedia stub (window.matchMedia = window.matchMedia || stub) is installed.
// In UXP: window.matchMedia is not a native function → _isUXP = true.
// In Chrome/browser: window.matchMedia is native → _isUXP = false.
// DO NOT move this check inside a method — by then the stub may already be installed.
const _isUXP = typeof window.matchMedia !== 'function';

class UxpBreadcrumbs extends Breadcrumbs {
    static get styles() {
        return [...super.styles, styles];
    }

    // UXP: :focus-visible in element.matches() throws SyntaxError.
    // — remove when UXP supports :focus-visible in Element.matches()
    hasVisibleFocusInTree() {
        return _isUXP ? false : super.hasVisibleFocusInTree();
    }

    // UXP: The action-menu's value binding (`value="${last item}"`) is re-applied by
    // Lit synchronously in UXP before the change event fires, so super.handleMenuChange
    // always reads e.target.value as the last item's value — never the clicked/keyed item.
    // Capture-phase click and keydown listeners (set up in updated()) store the item's
    // index in _uxpMenuClickIdx before the change event fires, so this override can
    // dispatch the correct value via announceChange.
    // href navigation for overflow items is handled in the click listener via
    // window.require('uxp').shell.openExternal().
    // — remove when UXP action-menu correctly reports the selected item in change events.
    handleMenuChange(e) {
        if (_isUXP && this._uxpMenuClickIdx !== undefined) {
            e.stopPropagation();
            const el = this.breadcrumbsElements?.[this._uxpMenuClickIdx];
            const value = el?.value || this._uxpMenuClickIdx.toString();
            this._uxpMenuClickIdx = undefined;
            this.announceChange(value);
            return;
        }
        super.handleMenuChange(e);
    }

    // UXP: Remove the custom icon from light DOM BEFORE Lit builds the shadow DOM.
    // Any change to the icon's slot attribute after the shadow DOM exists fires a
    // slotchange on the icon slot, which cascades via action-menu's ObserveSlotPresence
    // → action-menu requestUpdate → breadcrumbs default slot items lose layout.
    // willUpdate() fires before the shadow DOM is committed, so removal here triggers
    // no icon-slot slotchange, eliminating the cascade entirely.
    // If willUpdate fires before children are parsed, updated() handles it as a fallback.
    // — remove when UXP supports 3-level slot redistribution without layout side-effects.
    willUpdate(changedProperties) {
        super.willUpdate?.(changedProperties);
        if (!_isUXP || this._uxpIconSearched) return;
        const iconEl = this.querySelector('[slot="icon"]');
        if (!iconEl) return; // children not yet parsed — fall through to updated()
        this._uxpIconSearched = true;
        this._uxpIconEl = iconEl.cloneNode(true);
        iconEl.remove();
    }

    // UXP: action-menu doesn't exist at firstUpdated — it's only rendered by Lit when
    // visibleItems < items.length, which is set by adjustOverflow() in slotChangeHandler.
    // So we inject the icon and set up the click listener in updated(), which runs after
    // every Lit re-render.
    updated(changedProperties) {
        super.updated?.(changedProperties);
        if (!_isUXP) return;

        // Fallback: willUpdate ran before children were parsed — handle icon now.
        // Clone before removing (matches willUpdate path; avoids live DOM reference).
        if (!this._uxpIconSearched) {
            this._uxpIconSearched = true;
            const iconEl = this.querySelector('[slot="icon"]');
            if (iconEl) {
                this._uxpIconEl = iconEl.cloneNode(true);
                iconEl.remove();
            }
        }

        const actionMenu = this.shadowRoot?.querySelector('sp-action-menu');
        if (!actionMenu) return;

        if (this._uxpIconEl) {
            // Use a DOM presence check instead of a boolean flag so the icon survives
            // hasMenu false→true transitions (action-menu is destroyed and recreated).
            // UXP: inject the icon as fallback content in the breadcrumbs shadow icon slot.
            // UXP supports 2-level fallback redistribution (shadow slot fallback →
            // action-menu icon slot) even when 3-level assigned-element redistribution fails.
            const iconSlot = this.shadowRoot?.querySelector('slot[name="icon"]');
            if (iconSlot && !iconSlot.querySelector('[data-uxp-icon-clone]')) {
                const folderIcon = iconSlot.querySelector('.icon');
                if (folderIcon) folderIcon.style.display = 'none';
                const iconClone = this._uxpIconEl.cloneNode(true);
                iconClone.removeAttribute('slot');
                iconClone.style.display = '';
                iconClone.setAttribute('data-uxp-icon-clone', '');
                iconSlot.appendChild(iconClone);
            }
        }

        if (!actionMenu._uxpClickCapture) {
            actionMenu._uxpClickCapture = true;
            // UXP: capture phase runs before the change event fires.
            // Stores the clicked/keyed item's index so handleMenuChange dispatches
            // the correct value (Lit rebinds action-menu value to last item before change fires).
            const captureItem = (ev) => {
                const path = ev.composedPath?.() ?? [];
                const item = path.find(
                    (el) => el?.tagName?.toLowerCase?.() === 'sp-menu-item'
                );
                if (!item) return;
                const allItems = [...(actionMenu.querySelectorAll?.('sp-menu-item') ?? [])];
                const idx = allItems.indexOf(item);
                if (idx >= 0) {
                    this._uxpMenuClickIdx = idx;
                    if (ev.type === 'click') {
                        const el = this.breadcrumbsElements?.[idx];
                        const href = el?.getAttribute?.('href');
                        if (href) {
                            try {
                                window.require('uxp')?.shell?.openExternal?.(href);
                            } catch (_) {}
                        }
                    }
                }
            };
            actionMenu.addEventListener('click', captureItem, true);
            // UXP: keyboard Enter/Space activates selection without a click event.
            actionMenu.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') captureItem(ev);
            }, true);
        }
    }

    // UXP: offsetWidth / clientWidth are 0 immediately after updateComplete because
    // UXP defers layout past the Lit microtask boundary. Wait one rAF so layout
    // measurements are valid before calculating overflow.
    // Pending-call pattern: if a slotchange arrives while this handler is awaiting,
    // it is re-queued (not silently dropped) to keep overflow state consistent.
    // — remove when UXP completes layout synchronously within the microtask.
    async slotChangeHandler() {
        if (!_isUXP) {
            return super.slotChangeHandler?.();
        }
        if (this._uxpSlotChangeBusy) {
            this._uxpSlotChangePending = true;
            return;
        }
        this._uxpSlotChangeBusy = true;
        try {
            if (this.breadcrumbsElements.length === 0) {
                this.items = [];
                this.visibleItems = 0;
                return;
            }
            await Promise.all(this.breadcrumbsElements.map((el) => el.updateComplete));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            // calculateBreadcrumbItemsWidth() sets el.offsetWidth on each item.
            // In UXP these measurements return 0, so the results are unused by
            // adjustOverflow() (which is count-based). Called for upstream API
            // consistency and to ensure items array is initialized.
            this.calculateBreadcrumbItemsWidth();
            this.visibleItems = 0;
            this.adjustOverflow();
        } finally {
            this._uxpSlotChangeBusy = false;
            if (this._uxpSlotChangePending) {
                this._uxpSlotChangePending = false;
                this.slotChangeHandler();
            }
        }
    }

    // UXP: list.clientWidth is not available (always 0) because UXP does not
    // propagate the host element's width to the inner shadow <ul>. Fall back to
    // count-based overflow using maxVisibleItems.
    //
    // UXP: href on sp-menu-item triggers immediate navigation at overlay-render
    // time (when the overflow menu opens), before any user interaction. Strip href
    // from items so sp-menu-item elements have no href. Navigation is handled via
    // the capture-phase click listener in updated().
    // — remove when UXP propagates host width to inner shadow <ul> and stops
    //   auto-navigating on overlay-rendered sp-menu-item hrefs.
    adjustOverflow() {
        if (_isUXP) {
            const n = this.breadcrumbsElements?.length ?? 0;
            if (n === 0) return;
            const limit = Math.max(this.maxVisibleItems, 1);
            const newItems = this.breadcrumbsElements.map((el, i) => {
                // UXP: el.innerText returns '' for display:none elements (used to
                // hide overflow items). Use textContent which is unaffected by CSS
                // display so labels are readable even for previously-hidden items
                // (e.g. on slotchange after initial overflow, or maxVisibleItems change).
                const label = el.textContent?.trim() ?? '';
                return {
                    label,
                    value: el.value || i.toString(),
                    offsetWidth: 0,
                    href: undefined, // UXP: strip href — prevent auto-navigation in sp-menu-item
                    isVisible: i >= n - limit,
                };
            });
            newItems.forEach((item, i) => {
                const el = this.breadcrumbsElements[i];
                if (!el) return;
                // UXP: toggleAttribute('hidden') keeps the semantic hidden state in sync
                // with upstream APIs. style.display is also set because the `hidden`
                // attribute's UA-stylesheet rule (display:none) may not apply reliably
                // in UXP's shadow DOM rendering pipeline.
                el.toggleAttribute('hidden', !item.isVisible);
                el.style.display = item.isVisible ? '' : 'none';
            });
            const newVisibleItems = newItems.filter((item) => item.isVisible).length;
            this.items = newItems;
            if (newVisibleItems !== this.visibleItems) this.visibleItems = newVisibleItems;
            return;
        }
        super.adjustOverflow();
    }
}

export { UxpBreadcrumbs as Breadcrumbs };
