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

// action-menu@1.12.2 class hierarchy:
//   ExpandableElement (from picker) — all shared overlay/menu behaviour
//   ActionMenu       — extends via ObserveSlotPresence/ObserveSlotText/SizedMixin
//
// UXP patches applied:
//   1. window.matchMedia stub before super()
//   2. hasVisibleFocusInTree() → false (no :focus-visible in UXP)
//   3. hasRenderedOverlay → forced true (DependencyManagerController)
//   4. handlePointerdown debounce (UXP fires twice per click)
//   5. bindButtonKeydownListener → host instead of #button (UXP kbd focus)
//   6. handleBeforetoggle override (avoids :focus-within JS selector crash)
//   7. closeOnFocusOut no-op on overlay (prevents spurious close)
//   8. Multi-instance close (UXP has no popover auto-dismiss)
//
// Hover bg is handled entirely in CSS via #button:hover { --mod-actionbutton-* }
// (UXP supports :hover since UXP 3.0 — no JS workaround needed).

import { ActionMenu as ActionMenuUpstream } from '@swc-uxp-internal/action-menu/src/ActionMenu.js';

import styles from './uxp-action-menu.css.js';

// Registry for multi-instance mutual close
const _openInstances = new Set();

class UxpActionMenu extends ActionMenuUpstream {
    static get styles() {
        return [...super.styles, styles];
    }

    constructor() {
        // UXP: window.matchMedia missing — stub before super() which calls
        // MatchMediaController, DesktopController, etc.
        window.matchMedia = window.matchMedia || function (q) {
            return {
                matches: false, media: q, onchange: null,
                addListener() {}, removeListener() {},
                addEventListener() {}, removeEventListener() {},
                dispatchEvent() { return false; },
            };
        };
        super(...arguments);

        // Force isMobile/isTouchDevice to static stubs so controllers never fire
        this.isMobile = { matches: false };
        this.isTouchDevice = { matches: false };

        // UXP: handleBeforetoggle is assigned as an instance arrow function inside
        // Picker's constructor (this.handleBeforetoggle = (event) => {...}), so any
        // prototype method override is silently shadowed and never called.
        // Must re-assign here, after super(), to actually replace the instance fn.
        //
        // Root cause of "button stays visually selected after external close":
        // Upstream calls optionsMenu.matches(':focus-within') which throws SyntaxError
        // in UXP → the entire handler crashes → this.open is never set to false →
        // ?selected=${this.open} in the template stays true → button looks pressed.
        this.handleBeforetoggle = (event) => {
            const path0 = event.composedPath()[0];
            if (path0 !== event.target) {
                return;
            }
            if (event.newState === 'closed') {
                // UXP: skip matches(':focus-within') and matches(':focus') — both throw
                // SyntaxError. Focus restoration after close is not needed in UXP.
                if (!this.open) {
                    if (this.strategy) this.strategy.open = false;
                } else if (this.strategy?.preventNextToggle === 'no') {
                    this.open = false;
                    // UXP: sync strategy._open so next pointerdown reads the correct
                    // pointerdownState. In browsers, handleButtonFocus→close() does
                    // this, but UXP focus events don't reliably restore that path.
                    this.strategy.open = false;
                }
                // else: preventNextToggle is 'maybe' (active click sequence).
                // willPreventClose=true (set by hostUpdated) blocks the physical close;
                // no further action needed. manuallyKeepOpen() is intentionally omitted
                // — it causes an infinite loop via re-entrant beforetoggle:closed in UXP.
            }
            if (!this.open) {
                this.optionsMenu?.updateSelectedItemIndex();
                // UXP: closeDescendentOverlays() is intentionally skipped.
                // Action-menus are sibling overlays, not nested; in UXP the global
                // overlay stack causes this call to cascade-close unrelated open menus.
            }
        };
    }

    // ── UXP: :focus-visible not supported ─────────────────────────────
    hasVisibleFocusInTree() {
        return false;
    }

    // ── UXP: DependencyManagerController defers <sp-overlay> render ───
    // Force eager render so menu items are always registered/selected.
    get hasRenderedOverlay() {
        return true;
    }

    // eslint-disable-next-line no-unused-vars
    set hasRenderedOverlay(_v) { /* intentional no-op */ }

    // ── UXP: keyboard focus goes to host, not #button shadow child ────
    bindButtonKeydownListener() {
        this.addEventListener('keydown', this.handleKeydown);
    }

    firstUpdated(...args) {
        super.firstUpdated(...args);

        // ── UXP: pointerdown fires twice per click ─────────────────────
        // DesktopController sets preventNextToggle='maybe' at the start of
        // handlePointerdown and resets it to 'no' only 2 rAFs after the
        // click/pointerup cleanup. Any duplicate PD that arrives while still
        // in that window is a UXP spurious event — suppress it.
        //
        // Previous rAF-based _pdPending debounce was insufficient because UXP's
        // second pointerdown can arrive *after* the rAF fires.
        const s = this.strategy;
        if (s && typeof s.handlePointerdown === 'function') {
            const _orig = s.handlePointerdown.bind(s);
            s.handlePointerdown = (ev) => {
                if (s.preventNextToggle === 'maybe') {
                    return;
                }
                return _orig(ev);
            };
        }

        // ── UXP: closeOnFocusOut causes spurious close on menu click ──
        // sp-overlay fires focusout when focus moves to a menu item in UXP.
        // No-op the overlay's closeOnFocusOut so menu items stay reachable.
        if (this.overlayElement) {
            this.overlayElement.closeOnFocusOut = () => {};
        }
    }

    updated(changedProperties) {
        super.updated?.(changedProperties);

        if (changedProperties.has('open')) {
            // ── UXP: multi-instance mutual close ────────────────────────
            // UXP has no popover auto-dismiss so we implement it manually:
            // when this instance opens, close all other open action-menus.
            //
            // UXP fix: delay the close via rAF so this instance's overlay is fully
            // established before the other instance starts its close sequence.
            // Synchronous close caused closeDescendentOverlays() in the other
            // instance's handleBeforetoggle to cascade-close our newly-opened overlay.
            if (this.open) {
                const toClose = [..._openInstances].filter((other) => other !== this && other.open);
                if (toClose.length) {
                    requestAnimationFrame(() => {
                        toClose.forEach((other) => {
                            if (!other.open) return;
                            other.open = false;
                            if (other.strategy) other.strategy.open = false;
                        });
                    });
                }
                _openInstances.add(this);
            } else {
                _openInstances.delete(this);
            }

            // ── UXP: overlayElement may arrive late; wire closeOnFocusOut ─
            if (this.overlayElement) {
                this.overlayElement.closeOnFocusOut = () => {};
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        _openInstances.delete(this);
    }

}

export { UxpActionMenu as ActionMenu };
