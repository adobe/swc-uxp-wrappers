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

import { BreadcrumbItem } from '@swc-uxp-internal/breadcrumbs/src/BreadcrumbItem.js';

import styles from './uxp-breadcrumb-item.css.js';

// Evaluated at module load — before any module in the dependency tree can install
// a window.matchMedia stub (the action-menu module does this in its constructor).
// In UXP: window.matchMedia is not a native function → _isUXP = true.
// DO NOT move this check inside a method or lifecycle hook.
const _isUXP = typeof window.matchMedia !== 'function';

class UxpBreadcrumbItem extends BreadcrumbItem {
    static get styles() {
        return [...super.styles, styles];
    }

    // UXP: :focus-visible in element.matches() throws SyntaxError — SpectrumMixin
    // (inherited via LikeAnchor → Focusable → SpectrumMixin) calls
    // this.matches(':focus-visible') on focus events. Return false to prevent the crash.
    // — remove when UXP supports :focus-visible in Element.matches()
    hasVisibleFocusInTree() {
        return _isUXP ? false : super.hasVisibleFocusInTree();
    }

    // UXP: <a href="..."> in shadow DOM triggers navigation at DOM-insertion time,
    // not only on click. Suppress href on the shadow <a> to prevent auto-navigation,
    // then handle click manually via the UXP shell API.
    // — remove when UXP stops auto-navigating on shadow-DOM anchor hrefs.
    get href() {
        return _isUXP ? undefined : super.href;
    }

    set href(value) {
        super.href = value;
    }

    handleClick(e) {
        if (_isUXP) {
            e?.preventDefault();
            if (!this.isLastOfType) {
                const href = super.href; // read stored value, bypassing our undefined getter
                // Open via UXP shell API; window.require bypasses webpack's module resolver.
                if (href) {
                    try { window.require('uxp')?.shell?.openExternal?.(href); } catch (_) {}
                }
                if (this.value) this.announceSelected(this.value);
            }
            return;
        }
        super.handleClick(e);
    }

    // UXP: :host(:last-of-type) is not supported in UXP's shadow DOM CSS engine.
    // The upstream uses :host(:not(.is-menu):last-of-type) to apply bold font-weight
    // and color to the current-page item. Reflect isLastOfType as an HTML attribute
    // so our CSS can use :host([is-last-of-type]) instead.
    // — remove when UXP supports :last-of-type in :host() selectors.
    set isLastOfType(value) {
        super.isLastOfType = value;
        this.toggleAttribute('is-last-of-type', value);
    }

    get isLastOfType() {
        return super.isLastOfType;
    }
}

export { UxpBreadcrumbItem as BreadcrumbItem };
