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

import { Theme } from '@swc-uxp-internal/theme/src/Theme.js';

class UxpTheme extends Theme {
    /**
     * UXP override: SWC v1.12.0 removed the <style>-element fallback from adoptStyles(),
     * leaving only shadowRoot.adoptedStyleSheets. UXP does not reliably support
     * adoptedStyleSheets on shadow roots, causing sp-theme to silently fail to inject
     * CSS tokens — making every child component render without any design token values.
     *
     * This override restores the fallback: try adoptedStyleSheets first; if that throws
     * or is unavailable, inject the CSS as <style> elements instead (UXP-compatible).
     */
    adoptStyles() {
        const styles = this.styles;
        if (
            this.shadowRoot.adoptedStyleSheets !== undefined &&
            typeof CSSStyleSheet !== 'undefined' &&
            typeof CSSStyleSheet.prototype.replaceSync !== 'undefined'
        ) {
            try {
                const sheets = [];
                for (const s of styles) sheets.push(s.styleSheet);
                this.shadowRoot.adoptedStyleSheets = sheets;
                return;
            } catch (e) {
                // fall through to <style> element approach
            }
        }
        // Fallback for UXP: inject CSS as <style> elements into the shadow root
        this.shadowRoot.querySelectorAll('style').forEach((s) => s.remove());
        styles.forEach((s) => {
            const style = document.createElement('style');
            style.textContent = s.cssText;
            this.shadowRoot.appendChild(style);
        });
    }
}

export { UxpTheme as Theme };
