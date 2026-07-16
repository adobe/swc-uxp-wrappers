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

import { PlacementController } from '@swc-uxp-internal/overlay/src/PlacementController.js';
import { autoUpdate } from '@floating-ui/dom';
import { isWebKit } from '@spectrum-web-components/shared';

/**
 * UXP override of PlacementController.
 *
 * In v1.12.0 the upstream placeOverlay split into two autoUpdate calls.
 * The second call (`cleanupElementResize`) omits `layoutShift: false`, so
 * @floating-ui/dom defaults to layoutShift: true and invokes IntersectionObserver
 * with a computed negative rootMargin (e.g. "-100px -200px -300px -400px").
 * UXP rejects negative rootMargin values with "SyntaxError: Invalid rootMargin value".
 *
 * Fix: override placeOverlay to add `layoutShift: false` to the second autoUpdate call.
 * All other logic is identical to the upstream TypeScript source.
 */
class UxpPlacementController extends PlacementController {
    async placeOverlay(
        target = this.target,
        options = this.options
    ) {
        this.cleanup?.();
        this.cleanup = undefined;

        this.target = target;
        this.options = options;
        if (!target || !options) {
            return;
        }

        const cleanupAncestorResize = autoUpdate(
            options.trigger,
            target,
            this.closeForAncestorUpdate,
            {
                ancestorResize: false,
                elementResize: false,
                layoutShift: false,
            }
        );

        // layoutShift: false added — upstream omits this, causing autoUpdate to create
        // an IntersectionObserver with negative rootMargin that UXP rejects.
        const cleanupElementResize = autoUpdate(
            options.trigger,
            target,
            this.updatePlacement,
            {
                ancestorScroll: false,
                layoutShift: false,
            }
        );

        const visualViewport = window.visualViewport;
        let visualViewportRafId = 0;
        let visualViewportPlacementCancelled = false;
        const onVisualViewportChange = () => {
            if (visualViewportPlacementCancelled || visualViewportRafId) {
                return;
            }
            visualViewportRafId = requestAnimationFrame(() => {
                visualViewportRafId = 0;
                if (visualViewportPlacementCancelled) {
                    return;
                }
                this.updatePlacement();
            });
        };
        if (visualViewport && isWebKit()) {
            visualViewport.addEventListener('resize', onVisualViewportChange, { passive: true });
            visualViewport.addEventListener('scroll', onVisualViewportChange, { passive: true });
        }

        this.cleanup = () => {
            this.placementGeneration += 1;
            visualViewportPlacementCancelled = true;
            this.host.elements?.forEach((element) => {
                element.addEventListener(
                    'sp-closed',
                    () => {
                        const placement = this.originalPlacements.get(element);
                        if (placement) {
                            element.setAttribute('placement', placement);
                        }
                        this.originalPlacements.delete(element);
                    },
                    { once: true }
                );
            });
            cleanupAncestorResize();
            cleanupElementResize();
            if (visualViewport && isWebKit()) {
                visualViewport.removeEventListener('resize', onVisualViewportChange);
                visualViewport.removeEventListener('scroll', onVisualViewportChange);
                if (visualViewportRafId) {
                    cancelAnimationFrame(visualViewportRafId);
                    visualViewportRafId = 0;
                }
            }
        };
    }
}

export { UxpPlacementController as PlacementController };
export * from '@swc-uxp-internal/overlay/src/PlacementController.js';
