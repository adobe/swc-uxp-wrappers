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

/* Must be first import: polyfills CSS global before OverlayPopover.js evaluates CSS.supports() at module top-level */
import './uxp-css-polyfill.js';
import { Overlay } from '@swc-uxp-internal/overlay/src/Overlay.js';
import { PlacementController as UxpPlacementController } from './PlacementController.js';

import styles from './uxp-overlay.css.js';

class UxpOverlay extends Overlay {
    static get styles() {
        return [...super.styles, styles];
    }

    // Use UxpPlacementController which sets layoutShift: false on autoUpdate calls
    // to prevent @floating-ui/dom from creating IntersectionObserver with negative
    // rootMargin values that UXP rejects (SyntaxError: Invalid rootMargin value)
    get placementController() {
        if (!this._uxpPlacementController) {
            this._uxpPlacementController = new UxpPlacementController(this);
        }
        return this._uxpPlacementController;
    }
}

export { UxpOverlay as Overlay };
