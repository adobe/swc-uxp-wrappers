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

// picker@1.12.2 class hierarchy:
//   PickerBase — all behaviour, NO static styles
//   Picker     — extends PickerBase, adds static styles + handleKeydown
//
// We extend Picker (not PickerBase) so that super.styles returns
// [pickerStyles, chevronStyles].  Extending PickerBase gives undefined for
// super.styles and crashes with "styles is not iterable" in UXP.

import { Picker as PickerUpstream, DESCRIPTION_ID } from '@swc-uxp-internal/picker/src/Picker.js';
import { html, nothing } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import styles from './picker-overrides.css.js';

class UxpPickerBase extends PickerUpstream {
    static get styles() {
        // super.styles = [pickerStyles, chevronStyles] from Picker (upstream)
        return [...super.styles, styles];
    }

    constructor() {
        // PickerBase creates a MatchMediaController in its constructor, which
        // immediately calls window.matchMedia — absent in UXP.
        // Stub it just long enough for super() to complete, then replace
        // isMobile and isTouchDevice with static {matches:false} objects so
        // the controllers are never used again (mobile/touch is irrelevant in UXP).
        window.matchMedia = window.matchMedia || function (q) {
            return {
                matches: false, media: q, onchange: null,
                addListener() {}, removeListener() {},
                addEventListener() {}, removeEventListener() {},
                dispatchEvent() { return false; },
            };
        };
        super(...arguments);
        // Disable MatchMediaController reactive subscriptions — mobile/touch
        // layout is irrelevant in UXP. Replace with static objects so the
        // polyfill above and the controllers are never queried again.
        this.isMobile = { matches: false };
        this.isTouchDevice = { matches: false };

        // UXP: upstream handleBeforetoggle uses optionsMenu.matches(':focus-within')
        // which throws SyntaxError. Re-assign after super() (it's a constructor-level
        // arrow function) using DOM containment instead of the unsupported selector.
        const _origHandleBeforetoggle = this.handleBeforetoggle;
        this.handleBeforetoggle = (event) => {
            if (event.composedPath()[0] !== event.target) return;
            if (event.newState === 'closed') {
                const active = this.shadowRoot?.activeElement ?? document.activeElement;
                const menuHasFocus = this.optionsMenu?.contains(active) ?? false;
                const btnHasFocus = active === this.button;
                const shouldRestoreFocus = menuHasFocus && !btnHasFocus;

                if (!this.open) {
                    if (this.strategy) this.strategy.open = false;
                } else if (this.strategy?.preventNextToggle === 'no') {
                    this.open = false;
                } else if (!this.strategy?.pointerdownState) {
                    this.overlayElement?.manuallyKeepOpen();
                }
                if (shouldRestoreFocus && !this.open) {
                    this.button?.focus();
                }
            }
            if (!this.open) {
                this.optionsMenu?.updateSelectedItemIndex();
                this.optionsMenu?.closeDescendentOverlays();
            }
        };
    }

    // ── Eager overlay render ───────────────────────────────────────────
    // UXP: hasRenderedOverlay defers <sp-overlay> rendering; manageSelection()
    // never runs without it. Force eager render so the selected item is shown.
    get hasRenderedOverlay() {
        return true;
    }

    // eslint-disable-next-line no-unused-vars
    set hasRenderedOverlay(_v) { /* intentional no-op */ }

    // UXP: is-keyboardFocused class triggers `background-color: key-focus` via upstream CSS,
    // but the key-focus token chain (rgba(var(...))) fails in UXP → shows wrong color.
    // We provide the focus ring via box-shadow on :host([focused]), so is-keyboardFocused
    // is not needed. Always return false to keep background transparent on focus.
    hasVisibleFocusInTree() {
        return false;
    }

    updated(changed) {
        super.updated?.(changed);
        if (changed.has('selectedItemContent')) {
            const icons = this.selectedItemContent?.icon ?? [];
            // UXP: cloneNode'd custom elements passed as raw DOM nodes to Lit's
            // ChildPart don't paint. Template-created elements (e.g. the built-in
            // invalid alert icon) do. Replace each clone synchronously (no rAF —
            // updated() fires after Lit commits DOM so parentNode is already set).
            icons.forEach((el) => {
                if (!el.parentNode) return;
                const fresh = document.createElement(el.tagName.toLowerCase());
                Array.from(el.attributes).forEach(a => fresh.setAttribute(a.name, a.value));
                el.parentNode.replaceChild(fresh, el);
                // Don't assign fresh back to source array: replaceChild sets
                // el.parentNode = null, so the next updated() skips el correctly.
                // Reassigning would cause a second unnecessary replacement.
            });
        }
    }

    _isDark() {
        return this.closest('sp-theme')?.getAttribute('color') === 'dark';
    }

    _hoverBgColor() {
        // Approximates --spectrum-alias-highlight-hover:
        //   light: rgba(0,0,0,0.07)  (--spectrum-global-color-opacity-7 = 0.07)
        //   dark:  rgba(255,255,255,0.10)  (--spectrum-alias-highlight-hover dark variant)
        // CSS custom property via style.setProperty cannot propagate into shadow DOM in UXP,
        // so the hover background is driven via JS pointerenter/leave instead of CSS var().
        return this._isDark() ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.07)';
    }

    // UXP: the shadow-DOM <div #button> never receives keyboard focus (only the host
    // and focus-helper <span> do), so keydown never fires on #button directly.
    // Override to attach to the host element instead.
    bindButtonKeydownListener() {
        this.addEventListener('keydown', this.handleKeydown);
    }

    // UXP: dark-theme gray tokens use rgba(var(--spectrum-gray-N-rgb)) which fails
    // in UXP. Apply literal rgb() values via :host(.dark-theme) CSS overrides;
    // toggle that class here and re-sync whenever the ancestor sp-theme changes.
    _syncTheme() {
        this.classList.toggle('dark-theme', this._isDark());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._themeObserver?.disconnect();
    }

    firstUpdated(...args) {
        super.firstUpdated(...args);

        // Dark theme: toggle .dark-theme class so :host(.dark-theme) CSS overrides
        // spectrum tokens with literal rgb() values. MutationObserver re-syncs on
        // live theme switches (sp-theme[color] attribute change).
        this._syncTheme();
        const spTheme = this.closest('sp-theme');
        if (spTheme) {
            this._themeObserver = new MutationObserver(() => this._syncTheme());
            this._themeObserver.observe(spTheme, { attributes: true, attributeFilter: ['color'] });
        }

        // UXP: CSS custom properties via style.setProperty silently fail — cannot
        // set hover-bg via JS custom property and have shadow DOM read it via var().
        // Drive hover background-color directly on #button via pointerenter/pointerleave.
        // CSS :hover handles border-color (rgb(144,144,144), same in both themes).
        const btn = this.shadowRoot?.querySelector('#button');
        if (btn) {
            btn.addEventListener('pointerenter', () => {
                if (!this.disabled) {
                    btn.style.backgroundColor = this._hoverBgColor();
                }
            });
            btn.addEventListener('pointerleave', () => {
                btn.style.removeProperty('background-color');
            });
        }

        // UXP: iconSlot.assignedElements() returns empty on initial render because
        // slot assignments are not ready when manageSelection() first runs.
        // itemChildren caches the empty icon array → picker face shows no icon.
        // Fix: after slots stabilise (triple rAF), clear the cache on the selected
        // item and force re-selection so the icon is re-read from the now-ready slot.
        requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => {
            if (this.value && this.selectedItem && (this.selectedItemContent?.icon?.length ?? 0) === 0) {
                const iconElems = this.selectedItem.iconSlot?.assignedElements() ?? [];
                if (iconElems.length > 0) {
                    this.selectedItem._itemChildren = undefined;
                    this._selectedItemContent = this.selectedItem.itemChildren;
                    this.requestUpdate('selectedItemContent', { icon: [], content: [] });
                }
            }
        })));

        // UXP: pointerdown fires twice per click ─────────────────────────────
        // UXP's input system fires two consecutive pointerdown events for a
        // single mouse click.  DesktopController.handlePointerdown() toggles
        // the picker on each call, so the two calls cancel each other out and
        // the menu never opens.
        //
        // Fix: wrap handlePointerdown so only the FIRST call in an interaction
        // cycle is forwarded. rAF fires after the synchronous duplicate but before
        // any new user interaction — more reliable than a click-listener, because
        // item clicks inside the overlay do not propagate to this.button.
        const s = this.strategy;
        if (s && typeof s.handlePointerdown === 'function') {
            const _orig = s.handlePointerdown.bind(s);
            let _pdPending = false;
            s.handlePointerdown = (ev) => {
                if (_pdPending) return; // second UXP pointerdown — ignore
                _pdPending = true;
                requestAnimationFrame(() => { _pdPending = false; });
                return _orig(ev);
            };
        }
    }

    // ── UXP render: <div role="button"> instead of <button> ───────────
    // UXP's native <button> has layout quirks: height collapses,
    // min-width isn't honoured, flex layout breaks.  Using a plain
    // <div role="button"> lets Spectrum CSS take full control of sizing.
    //
    // NOTE: @click and @pointerdown are intentionally OMITTED from the template.
    // picker@1.12.0's DesktopController.init() wires click/pointerdown/focus
    // via addEventListener (called from firstUpdated → bindEvents).
    // Adding them here causes double-toggle (open then immediately close).
    render() {
        // Keep tooltipEl in sync with open state (upstream pattern).
        if (this.tooltipEl) {
            this.tooltipEl.disabled = this.open;
        }
        return html`
            <span
                id="focus-helper"
                tabindex="${this.focused || this.open ? '-1' : '0'}"
                @focus=${this.handleHelperFocus}
            ></span>
            <div
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-describedby="tooltip ${DESCRIPTION_ID}"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="true"
                aria-labelledby="icon label applied-label pending-label"
                aria-disabled=${this.disabled ? 'true' : nothing}
                id="button"
                class=${ifDefined(this.labelAlignment ? `label-${this.labelAlignment}` : undefined)}
                @blur=${this.handleButtonBlur}
                @focus=${this.handleButtonFocus}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                role="button"
                tabindex="-1"
            >
                ${this.buttonContent}
            </div>
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @keydown=${this.handleKeydown}
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu}
            ${this.renderDescriptionSlot}
        `;
    }

}

export { UxpPickerBase as PickerBase };
export { UxpPickerBase as Picker };
