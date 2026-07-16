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

import { html } from '@spectrum-web-components/base';
import { Coachmark } from '@swc-uxp-internal/coachmark/src/Coachmark.js';

import styles from './uxp-coachmark.css.js';

/**
 * UXP wrapper for sp-coachmark (SWC v1.12.x).
 *
 * UXP limitations addressed:
 *
 * 1. Custom elements inside shadow DOM render at 0x0.
 *    sp-button elements in Lit templates are invisible; we create them imperatively.
 *
 * 2. slot[name=actions] is never populated.
 *    UXP does not distribute light-DOM children into named shadow slots.
 *    We build a native three-dot dropdown from the sp-menu-item light-DOM children.
 *
 * renderSteps, renderActionMenu, and renderButtons are overridden to suppress
 * upstream Lit rendering that would duplicate or conflict with our injected elements.
 */

// sp-theme[color] attribute is the most reliable dark-mode signal in UXP.
// rgba(var(--rgb)) token chains are not supported in UXP — we read -rgb tokens
// directly and construct rgb() values.
function _uxpIsDark() {
    try {
        const theme = document.querySelector('sp-theme');
        if (theme) {
            const color = theme.getAttribute('color');
            if (color === 'light' || color === 'lightest') return false;
            if (color === 'dark'  || color === 'darkest')  return true;
        }
        return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches);
    } catch (_) { return false; }
}

function _toRgb(value) { return value ? `rgb(${value})` : null; }

function _removeEl(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

// Props that require nav-bar rebuild vs. those that also require action-button rebuild.
const _NAV_PROPS = ['primaryCTA', 'secondaryCTA', 'currentStep', 'totalSteps'];
const _CTA_PROPS = ['primaryCTA', 'secondaryCTA'];

class UxpCoachmark extends Coachmark {
    constructor() {
        super();
        // renderSteps and renderActionMenu are instance arrow functions assigned in
        // the parent constructor. Override them here (after super()) to suppress the
        // upstream step counter and action-menu slot — we inject both imperatively.
        this.renderSteps = () => html``;
        this.renderActionMenu = () => html``;
    }

    static get styles() {
        return [...super.styles, styles];
    }

    get _root() { return this.shadowRoot || this.renderRoot; }

    _injectNativeNavButtons() {
        try {
            if (this._uxpNavBar) return;
            const { primaryCTA, secondaryCTA, currentStep, totalSteps } = this;
            if (!primaryCTA && !secondaryCTA) return;
            const root = this._root;
            const footer = root && root.querySelector('.footer');
            if (!footer) return;

            const bar = document.createElement('div');
            bar.setAttribute('data-uxp-nav-bar', '');

            const stepsEl = document.createElement('span');
            stepsEl.setAttribute('role', 'status');
            stepsEl.setAttribute('aria-live', 'polite');
            if (currentStep != null && totalSteps > 1) {
                stepsEl.textContent = `${currentStep} of ${totalSteps}`;
            }
            bar.appendChild(stepsEl);

            const makeNavBtn = (variant, text, eventName) => {
                const b = document.createElement('sp-button');
                b.setAttribute('treatment', 'outline');
                b.setAttribute('variant', variant);
                b.setAttribute('size', 's');
                b.textContent = text;
                b.addEventListener('click', () => {
                    this.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }));
                });
                return b;
            };

            const secBtn = secondaryCTA ? makeNavBtn('secondary', secondaryCTA, 'secondary') : null;
            if (secBtn) {
                secBtn.setAttribute('data-uxp-sec-btn', '');
                bar.appendChild(secBtn);
            }
            const priBtn = primaryCTA ? makeNavBtn('primary', primaryCTA, 'primary') : null;
            if (priBtn) bar.appendChild(priBtn);

            footer.appendChild(bar);
            this._uxpNavBar = bar;

            // --mod-button-background-color-hover set as CSS property causes a permanent
            // hover background in UXP (@media(hover:hover) + :hover is always true).
            // Apply hover background via JS mouseenter/mouseleave instead.
            // _uxpNavHoverBg is kept current by _injectColorStyles (called on every theme
            // change), so hover handlers always reflect the active theme without recreating
            // the sp-button elements.
            const labelFix =
                '#label{padding-top:0;padding-bottom:0;margin:0;align-self:center;' +
                'line-height:calc(var(--mod-button-height,var(--spectrum-button-height,24px))' +
                ' - 2 * var(--mod-button-border-width,var(--spectrum-button-border-width,2px)))}';

            [secBtn, priBtn].forEach((btn) => {
                if (!btn) return;
                btn.addEventListener('mouseenter', () => {
                    btn.style.setProperty('--mod-button-background-color-hover', this._uxpNavHoverBg || '');
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.removeProperty('--mod-button-background-color-hover');
                });
                const attach = () => {
                    try {
                        const sr = btn.shadowRoot;
                        if (sr && !sr.querySelector('#uxp-coachmark-btn-fix')) {
                            const s = document.createElement('style');
                            s.id = 'uxp-coachmark-btn-fix';
                            s.textContent = labelFix;
                            sr.appendChild(s);
                        }
                    } catch (_) {}
                };
                btn.updateComplete ? btn.updateComplete.then(attach) : requestAnimationFrame(attach);
            });
        } catch (_) {}
    }

    _injectNativeActionButton() {
        try {
            if (this._uxpActionBtn) return;
            // Upstream only renders the action menu when BOTH CTAs are set.
            if (!this.primaryCTA || !this.secondaryCTA) return;
            const root = this._root;
            if (!root) return;

            // .static-item is where we append btnWrap; bail early if it's not in the DOM yet.
            const staticItem = root.querySelector('.static-item');
            if (!staticItem) return;

            const actionMenu = this.querySelector('[slot="actions"]');
            const menuItems = actionMenu
                ? Array.from(actionMenu.querySelectorAll('sp-menu-item'))
                : [];
            if (!menuItems.length) return;

            const isDark = _uxpIsDark();
            // Single getComputedStyle call — all token reads share the same CSSStyleDeclaration.
            const cs  = getComputedStyle(document.documentElement);
            const tok = (t, dk, lt) => _toRgb(cs.getPropertyValue(t).trim()) || (isDark ? dk : lt);
            // Dropdown bg: Spectrum 2 layer-2 bg = gray-50 (white) in light, gray-100 in dark.
            const menuBg     = isDark
                ? tok('--spectrum-gray-100-rgb', 'rgb(50,50,50)',   '')
                : tok('--spectrum-gray-50-rgb',  '',   'rgb(255,255,255)');
            const menuText   = tok('--spectrum-gray-800-rgb', 'rgb(235,235,235)', 'rgb(34,34,34)');
            const menuBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
            const btnHover   = tok('--spectrum-gray-200-rgb', 'rgb(63,63,63)', 'rgb(230,230,230)');
            // --spectrum-menu-item-background-color-hover = transparent-white/black-200
            const itemHover  = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

            let open = false;

            const btn = document.createElement('div');
            btn.setAttribute('role', 'button');
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('data-uxp-native-btn', '');
            btn.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"' +
                ' viewBox="0 0 18 18" style="display:block;pointer-events:none">' +
                '<circle cx="3.5"  cy="9" r="1.5" fill="currentColor"/>' +
                '<circle cx="9"    cy="9" r="1.5" fill="currentColor"/>' +
                '<circle cx="14.5" cy="9" r="1.5" fill="currentColor"/>' +
                '</svg>';

            // 4-state model mirrors sp-action-button Spectrum tokens:
            //   hover        → gray-200
            //   open         → gray-700 (neutral-background-color-selected-default)
            //   open + hover → gray-800 (neutral-background-color-selected-hover)
            // When open the fill inverts the dot color for contrast.
            const btnActiveBg      = tok('--spectrum-gray-700-rgb', 'rgb(209,209,209)', 'rgb(70,70,70)');
            const btnActiveHoverBg = tok('--spectrum-gray-800-rgb', 'rgb(235,235,235)', 'rgb(34,34,34)');
            const dotColorDefault  = isDark ? 'rgb(255,255,255)' : 'rgb(34,34,34)';
            const dotColorOpen     = isDark ? 'rgb(34,34,34)'    : 'rgb(255,255,255)';
            btn.style.color = dotColorDefault;
            const btnRadius = this._uxpBtnRadius || '8px';

            let isHovering = false;
            const _updateBtnBg = () => {
                if (open && isHovering) {
                    btn.style.backgroundColor = btnActiveHoverBg;
                    btn.style.color = dotColorOpen;
                } else if (open) {
                    btn.style.backgroundColor = btnActiveBg;
                    btn.style.color = dotColorOpen;
                } else if (isHovering) {
                    btn.style.backgroundColor = btnHover;
                    btn.style.color = dotColorDefault;
                } else {
                    btn.style.backgroundColor = '';
                    btn.style.borderRadius = '';
                    btn.style.color = dotColorDefault;
                    return;
                }
                btn.style.borderRadius = btnRadius;
            };
            btn.addEventListener('mouseenter', () => { isHovering = true;  _updateBtnBg(); });
            btn.addEventListener('mouseleave', () => { isHovering = false; _updateBtnBg(); });

            const dropdown = document.createElement('div');
            dropdown.setAttribute('data-uxp-native-dropdown', '');
            dropdown.style.cssText = [
                'display:none', 'position:absolute', 'right:0', 'top:100%',
                'margin-top:4px', 'min-width:140px', 'z-index:2000',
                'background-color:' + menuBg,
                'border:1px solid ' + menuBorder,
                'border-radius:8px', 'padding:4px 0',
                'color:' + menuText,
            ].join(';');

            const itemEls = [];
            menuItems.forEach((item) => {
                const li = document.createElement('div');
                li.setAttribute('role', 'button');
                li.setAttribute('tabindex', '0');
                li.textContent = (item.textContent || '').trim();
                li.addEventListener('mouseenter', () => { li.style.backgroundColor = itemHover; });
                li.addEventListener('mouseleave', () => { li.style.backgroundColor = ''; });
                li.addEventListener('click', () => {
                    try { item.click(); } catch (_) {}
                    closeDropdown();
                });
                dropdown.appendChild(li);
                itemEls.push(li);
            });

            const btnWrap = document.createElement('div');
            btnWrap.setAttribute('data-uxp-action-wrap', '');
            btnWrap.style.cssText = 'position:relative;display:inline-flex;';
            btnWrap.appendChild(btn);
            btnWrap.appendChild(dropdown);

            // Transparent overlay: reliable outside-click detection across shadow DOM
            // boundaries. A full-page div intercepts clicks; dropdown sits above it
            // (z-index 2000 > 1000). Use 'click' not 'mousedown' — mousedown removes
            // the overlay before btn.click fires, causing immediate re-open.
            let overlay = null;

            const openDropdown = () => {
                open = true;
                dropdown.style.display = 'block';
                btnWrap.style.zIndex = '2001';
                _updateBtnBg();
                overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000;background:transparent;';
                overlay.addEventListener('click', () => { closeDropdown(); });

                // UXP: the overlay intercepts all hover events for elements beneath it.
                // Track hover state via mousemove + getBoundingClientRect instead.
                // Rects are lazy-initialized on first mousemove — reading them at openDropdown()
                // time returns zeros because the dropdown transitions from display:none and the
                // browser hasn't laid out the newly visible element yet.
                let btnRect = null;
                let itemRects = null;
                overlay.addEventListener('mousemove', (e) => {
                    try {
                        if (!btnRect) {
                            btnRect   = btn.getBoundingClientRect();
                            itemRects = itemEls.map((li) => li.getBoundingClientRect());
                        }
                        const cx = e.clientX, cy = e.clientY;
                        const overBtn = cx >= btnRect.left && cx <= btnRect.right && cy >= btnRect.top && cy <= btnRect.bottom;
                        if (overBtn !== isHovering) { isHovering = overBtn; _updateBtnBg(); }
                        itemEls.forEach((li, i) => {
                            const ir = itemRects[i];
                            li.style.backgroundColor =
                                (cx >= ir.left && cx <= ir.right && cy >= ir.top && cy <= ir.bottom)
                                    ? itemHover : '';
                        });
                    } catch (_) {}
                });
                document.body.appendChild(overlay);
            };

            const closeDropdown = () => {
                open = false;
                dropdown.style.display = 'none';
                btnWrap.style.zIndex = '';
                _updateBtnBg();
                _removeEl(overlay);
                overlay = null;
            };

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (open) closeDropdown(); else openDropdown();
            });

            this._uxpCloseDropdown = closeDropdown;
            staticItem.appendChild(btnWrap);
            this._uxpActionBtn = btnWrap;
        } catch (_) {}
    }

    _removeActionBtn() {
        if (this._uxpCloseDropdown) {
            this._uxpCloseDropdown();
            this._uxpCloseDropdown = null;
        }
        _removeEl(this._uxpActionBtn);
        this._uxpActionBtn = null;
    }

    _registerThemeObs() {
        if (this._uxpThemeObs) {
            // Re-observe after reconnect (disconnectedCallback only disconnects, doesn't null).
            const spTheme = document.querySelector('sp-theme');
            if (spTheme) this._uxpThemeObs.observe(spTheme, { attributes: true, attributeFilter: ['color'] });
        }
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.hasUpdated) {
            // Re-register after reconnect: firstUpdated does not fire again on reconnect,
            // and disconnectedCallback already cleared the button refs and observer.
            this._registerThemeObs();
            clearTimeout(this._uxpConnectTimer);
            this._uxpConnectTimer = setTimeout(() => {
                // Re-sync colors in case theme changed while disconnected
                // (the MutationObserver was paused during disconnect).
                this._injectColorStyles(this._root);
                this._injectNativeActionButton();
                this._injectNativeNavButtons();
            }, 0);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this._uxpConnectTimer);
        this._removeActionBtn();
        _removeEl(this._uxpNavBar);
        this._uxpNavBar = null;
        if (this._uxpThemeObs) {
            // Disconnect (not destroy) — connectedCallback re-observes the same instance.
            this._uxpThemeObs.disconnect();
        }
    }

    // renderButtons is a prototype method (not an instance arrow function),
    // so a standard override works. Return empty to suppress the upstream
    // sp-button-group — we inject nav buttons imperatively instead.
    renderButtons() {
        return html``;
    }

    updated(changedProperties) {
        super.updated && super.updated(changedProperties);
        if (_NAV_PROPS.some((p) => changedProperties.has(p))) {
            _removeEl(this._uxpNavBar);
            this._uxpNavBar = null;
            this._injectNativeNavButtons();
        }
        if (_CTA_PROPS.some((p) => changedProperties.has(p))) {
            this._removeActionBtn();
            this._injectNativeActionButton();
        }
    }

    _injectColorStyles(root) {
        if (!root) return;
        const isDark = _uxpIsDark();
        // Read all tokens from a single getComputedStyle call — avoids repeated style
        // recalculation overhead in UXP from calling getComputedStyle() per token.
        const cs  = getComputedStyle(document.documentElement);
        const tok = (t, dk, lt) => _toRgb(cs.getPropertyValue(t).trim()) || (isDark ? dk : lt);

        // sp-button border-color tokens use rgba(var(--rgb)) which is invalid in UXP.
        // Override via --mod-button-border-color-* which cascade into the button shadow DOM.
        const secBorder      = tok('--spectrum-gray-300-rgb', 'rgb(84,84,84)',    'rgb(213,213,213)');
        const secBorderHover = tok('--spectrum-gray-400-rgb', 'rgb(112,112,112)', 'rgb(177,177,177)');
        const priBorder      = tok('--spectrum-gray-800-rgb', 'rgb(235,235,235)', 'rgb(34,34,34)');
        const priBorderHover = tok('--spectrum-gray-700-rgb', 'rgb(209,209,209)', 'rgb(70,70,70)');
        const btnText        = isDark ? 'rgb(255,255,255)' : 'rgb(34,34,34)';
        const stepColor      = tok('--spectrum-gray-600-rgb', 'rgb(178,178,178)', 'rgb(109,109,109)');

        // Store nav-button hover bg as a live instance property so hover handlers
        // always read the current theme value without recreating sp-button elements.
        // The empty-string fallbacks are intentionally in the opposite-theme branch
        // that is never reached given the outer isDark split — not a bug.
        this._uxpNavHoverBg = isDark
            ? tok('--spectrum-gray-100-rgb', 'rgb(50,50,50)',   '')
            : tok('--spectrum-gray-200-rgb', '',   'rgb(230,230,230)');

        // Reuse the existing style element when available — updating textContent avoids
        // removing + re-appending the node, which would trigger a full shadow-root
        // style recalculation in UXP on every theme change.
        let s = root.querySelector('#uxp-cm-fix');
        if (!s) { s = document.createElement('style'); s.id = 'uxp-cm-fix'; root.appendChild(s); }
        s.textContent =
            ':host{' +
                'display:flex!important;flex-direction:column!important;' +
                'overflow:visible!important;' +
                '--uxp-cm-font-size:var(--spectrum-font-size-100,14px);' +
                '--uxp-cm-btn-size:var(--spectrum-component-height-75,24px);' +
                '--uxp-cm-step-color:' + stepColor + ';' +
            '}' +
            '.footer{display:flex!important;flex-direction:column!important;}' +
            '[data-uxp-nav-bar]{display:flex;flex-direction:row;align-items:center;width:100%;padding:8px 12px;box-sizing:border-box;}' +
            '[data-uxp-nav-bar]>span{flex:1;font-size:var(--uxp-cm-font-size);color:var(--uxp-cm-step-color);}' +
            '[data-uxp-sec-btn]{margin-right:8px;}' +
            // Content color is the same for both buttons; set on the shared treatment selector.
            '[data-uxp-nav-bar] sp-button[treatment="outline"]{' +
                '--mod-button-content-color-default:' + btnText + ';' +
                '--mod-button-content-color-hover:'   + btnText + ';' +
                '--mod-button-content-color-down:'    + btnText + ';' +
                '--mod-button-content-color-focus:'   + btnText + ';' +
            '}' +
            '[data-uxp-nav-bar] sp-button[treatment="outline"][variant="secondary"]{' +
                '--mod-button-border-color-default:' + secBorder      + ';' +
                '--mod-button-border-color-hover:'   + secBorderHover + ';' +
                '--mod-button-border-color-down:'    + secBorderHover + ';' +
                '--mod-button-border-color-focus:'   + secBorder      + ';' +
            '}' +
            '[data-uxp-nav-bar] sp-button[treatment="outline"][variant="primary"]{' +
                '--mod-button-border-color-default:' + priBorder      + ';' +
                '--mod-button-border-color-hover:'   + priBorderHover + ';' +
                '--mod-button-border-color-down:'    + priBorderHover + ';' +
                '--mod-button-border-color-focus:'   + priBorder      + ';' +
            '}' +
            // border-radius applied via JS hover only — a static border-radius on a
            // transparent div creates a visible box in UXP due to background-clip.
            // transition is not in uxp-css-data.json (silent no-op in UXP); kept for
            // standard-browser demo aesthetics — gracefully ignored in UXP.
            '[data-uxp-native-btn]{width:var(--uxp-cm-btn-size);height:var(--uxp-cm-btn-size);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background-color 0.15s;/* UXP: no-op */}' +
            '[data-uxp-native-dropdown]>div{padding:6px 12px;margin:0 4px;cursor:pointer;font-size:var(--uxp-cm-font-size);white-space:nowrap;color:inherit;border-radius:6px;}';
    }

    firstUpdated(changedProperties) {
        super.firstUpdated && super.firstUpdated(changedProperties);
        try {
            const root = this._root;
            if (root) this._injectColorStyles(root);

            // Cache border-radius once — it does not change between themes.
            // MUST-5: getComputedStyle(el).getPropertyValue('--custom-prop') returns the raw
            // declared value (e.g. "var(--mod-popover-corner-radius)"), NOT the resolved pixel
            // value. Using that string as an inline style would be a var() in a JS inline style.
            // Instead, read the RESOLVED regular property borderRadius from the host element —
            // getComputedStyle resolves all var() chains for non-custom properties, returning
            // the concrete pixel value (e.g. "8px") that is safe to assign as an inline style.
            // If the cascade hasn't settled yet and borderRadius returns "", fall back to 8px
            // (the Spectrum 2 --system-coach-mark-popover-corner-radius spec value).
            const resolvedRadius = getComputedStyle(this).borderRadius;
            this._uxpBtnRadius = (resolvedRadius && resolvedRadius.split(' ')[0]) || '8px';

            // Register theme observer. Re-inject all theme-dependent colors when
            // sp-theme[color] changes. disconnectedCallback disconnects (but preserves)
            // the observer; connectedCallback re-observes via _registerThemeObs().
            if (!this._uxpThemeObs) {
                const spTheme = document.querySelector('sp-theme');
                if (spTheme) {
                    this._uxpThemeObs = new MutationObserver(() => {
                        try {
                            // Updates #uxp-cm-fix CSS and _uxpNavHoverBg; sp-button elements kept.
                            this._injectColorStyles(this._root);
                            // Action button uses JS-closure colors — must recreate on theme change.
                            this._removeActionBtn();
                            this._injectNativeActionButton();
                        } catch (_) {}
                    });
                    this._uxpThemeObs.observe(spTheme, { attributes: true, attributeFilter: ['color'] });
                }
            }
        } catch (_) {}

        this.updateComplete.then(() => {
            this._injectNativeActionButton();
            this._injectNativeNavButtons();
        });
    }
}

export { UxpCoachmark as Coachmark };
