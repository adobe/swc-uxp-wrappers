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

import { ProgressCircle as ProgressCircleUpstream } from '@swc-uxp-internal/progress-circle/src/ProgressCircle.js';
import { html, svg } from '@spectrum-web-components/base';
import styles from './uxp-progress-circle.css.js';

// Compute an SVG arc path string (stroke, no fill) from 12 o'clock, clockwise.
// Returns '' when pct ≤ 0 so the fill element can be omitted entirely.
function arcPath(cx, cy, r, pct) {
    if (pct <= 0) return '';
    if (pct >= 100) {
        // A single arc cannot span exactly 360°; draw two 180° semicircles.
        return (
            `M ${cx} ${cy - r}` +
            ` A ${r} ${r} 0 1 1 ${cx} ${cy + r}` +
            ` A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
        );
    }
    const start = -Math.PI / 2; // 12 o'clock
    const end = start + (pct / 100) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = pct > 50 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

class UxpProgressCircle extends ProgressCircleUpstream {
    static get styles() {
        return [...super.styles, styles];
    }

    // [UXP] The upstream rendering uses overflow:hidden + CSS rotation masks to clip a fill
    // arc — this technique does not work in UXP. stroke-dasharray/dashoffset (the typical SVG
    // progress trick) is also not supported in UXP SVG. Override render() to use explicit SVG
    // arc path commands, which are supported by UXP's basic SVG implementation.
    render() {
        const s = this.size;
        const size = s === 's' ? 16 : s === 'l' ? 64 : 32;
        const thickness = s === 's' ? 2 : s === 'l' ? 4 : 3;
        const r = (size - thickness) / 2;
        const half = size / 2;

        // `indeterminate` attribute: the Spectrum 1 / legacy way (deprecated in S2 via debug warning).
        // `progress == null`: the Spectrum 2 preferred way — must be set programmatically since
        // the property defaults to 0; omitting the HTML attribute alone is not sufficient.
        const isIndeterminate = this.indeterminate || this.progress == null;
        const pct = isIndeterminate
            ? 25
            : Math.max(0, Math.min(100, this.progress));

        const fill = arcPath(half, half, r, pct);

        // Use svg tagged template so all child elements are created in the SVG namespace.
        // Lit's html tag creates dynamic child elements in the HTML namespace, which causes
        // SVG presentation attributes (stroke-width, d, etc.) to be silently ignored.
        // - Stroke colors: .uxp-track / .uxp-fill CSS classes (uxp-progress-circle.css),
        //   including :host([static-color=white]) overrides.
        // - Spin animation: 'uxp-indeterminate' class on the SVG triggers @keyframes in CSS.
        return html`${svg`
            <svg
                aria-hidden="true"
                class="${isIndeterminate ? 'uxp-indeterminate' : ''}"
                style="display:block;width:${size}px;height:${size}px;overflow:visible;"
            >
                <circle
                    class="uxp-track"
                    cx="${half}"
                    cy="${half}"
                    r="${r}"
                    fill="none"
                    stroke-width="${thickness}"
                ></circle>
                ${fill
                    ? svg`<path
                        class="uxp-fill"
                        d="${fill}"
                        fill="none"
                        stroke-width="${thickness}"
                    ></path>`
                    : svg``}
            </svg>
        `}`;
    }
}

export { UxpProgressCircle as ProgressCircle };
