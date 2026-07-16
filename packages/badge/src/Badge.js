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

import { Badge } from '@swc-uxp-internal/badge/src/Badge.js';
import { html } from '@spectrum-web-components/base';

import styles from './uxp-badge.css.js';

// Matches light-DOM nodes that belong to the default (text) slot:
// plain text nodes and elements not assigned to a named slot.
const _isDefaultSlotNode = (n) =>
    n.nodeType === Node.TEXT_NODE ||
    (n.nodeType === Node.ELEMENT_NODE && !n.getAttribute('slot'));

class UxpBadge extends Badge {
    static get styles() {
        return [...super.styles, styles];
    }

    // Override required: ObserveSlotPresence monitors a named <slot name="icon">
    // which does not exist in our render() — it would always return false.
    // We derive hasIcon from the DOM directly instead.
    get hasIcon() {
        return !!(
            this.querySelector('[slot="icon"]') ||
            (this.shadowRoot && this.shadowRoot.querySelector('.uxp-icon-host > *'))
        );
    }

    // After _adoptText() the text nodes live in shadow .label, not light DOM.
    get slotHasContent() {
        const label = this.shadowRoot && this.shadowRoot.querySelector('.label');
        if (label && label.childNodes.length > 0) {
            return label.textContent.trim().length > 0;
        }
        return Array.from(this.childNodes)
            .filter(_isDefaultSlotNode)
            .some((n) => (n.textContent || '').trim().length > 0);
    }

    // No-op setter: ObserveSlotText decorates slotHasContent with @property and
    // assigns to it on slotchange. Without this override the assignment triggers
    // requestUpdate() on every _adoptText() call, causing an infinite loop.
    set slotHasContent(_v) {}

    // UXP ShadyDOM flat-tree: light DOM children always render AFTER shadow DOM,
    // so a slotted icon appears to the right of the label. We bypass this by
    // adopting both icon and text into shadow DOM containers directly.
    render() {
        return html`
            <span class="uxp-icon-host"></span>
            <div class="label"></div>
        `;
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        this._adoptIcon();
        this._adoptText();
        this._syncIconState();
    }

    _adoptIcon() {
        const lightIcon = this.querySelector('[slot="icon"]');
        if (!this.shadowRoot) return;
        const host = this.shadowRoot.querySelector('.uxp-icon-host');
        if (!host || !lightIcon) return;
        // this.querySelector is light-DOM only: once the icon is adopted into
        // shadow DOM, subsequent calls return null and exit above.
        // replaceChildren handles icon swaps without accumulating stale siblings.
        host.replaceChildren(lightIcon);
    }

    _adoptText() {
        const label = this.shadowRoot && this.shadowRoot.querySelector('.label');
        if (!label || label.childNodes.length > 0) return;
        for (const node of Array.from(this.childNodes).filter(_isDefaultSlotNode)) {
            label.appendChild(node);
        }
    }

    _syncIconState() {
        const host = this.shadowRoot && this.shadowRoot.querySelector('.uxp-icon-host');
        const icon = host ? host.firstElementChild : null;
        this.toggleAttribute('icon-only', !!icon && !this.slotHasContent);
        if (!icon) return;
        // sp-icon-* scales by size attribute; sync it from the badge size.
        const badgeSize = this.getAttribute('size') || 'm';
        if (icon.getAttribute('size') !== badgeSize) {
            icon.setAttribute('size', badgeSize);
        }
    }
}

export { UxpBadge as Badge };
