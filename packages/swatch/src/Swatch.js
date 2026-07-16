/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { Swatch } from '@swc-uxp-internal/swatch/src/Swatch.js';

import styles from './uxp-swatch.css.js';

// UXP does not support CSS Color Level 4 space-separated syntax, e.g. rgb(255 0 0 / 0.7).
// The alpha channel is silently dropped, rendering the color as fully opaque.
// Detect and convert to the legacy comma-separated rgba()/hsla() form that UXP understands.
function toUxpColor(color) {
    if (!color) return color;
    const m = color.match(
        /^(rgba?|hsla?)\(\s*([\d.]+(?:deg|rad|turn|grad)?%?)\s+([\d.]+%?)\s+([\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)$/i
    );
    if (!m) return color;
    const [, fn, a, b, c, alpha] = m;
    const base = fn.replace(/a$/i, '');
    return alpha !== undefined
        ? `${base}a(${a}, ${b}, ${c}, ${alpha})`
        : `${base}(${a}, ${b}, ${c})`;
}

class UxpSwatch extends Swatch {
    static get styles() {
        return [...super.styles, styles];
    }

    get color() {
        return super.color;
    }

    set color(value) {
        super.color = toUxpColor(value);
    }
}

export { UxpSwatch as Swatch };
