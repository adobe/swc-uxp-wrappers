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

import { ProgressBar } from '@swc-uxp-internal/progress-bar/src/ProgressBar.js';

import styles from './uxp-progress-bar.css.js';

class UxpProgressBar extends ProgressBar {
    static get styles() {
        // We are combining our styles to make all super class styles available along with the transitive dependent classes styles.
        return [super.styles, styles];
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeAnimation();
    }

    updated(changes) {
        super.updated(changes);
        if (changes.has('indeterminate')) {
            if (this.indeterminate) {
                this.animate();
            } else {
                this.removeAnimation();
            }
        }
    }

    removeAnimation() {
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            if (this.fillRef) {
                this.fillRef.style.transform = 'none';
            }
            this.animId = null;
        }
    }

    animate() {
        this.animId = requestAnimationFrame(this.rAFCallback.bind(this));
    }

    rAFCallback(timestamp) {
        if (this.indeterminate) {
            this.fillRef = this.shadowRoot.querySelector('.fill');
            this.trackRef = this.shadowRoot.querySelector('.track');
            const fillElement = this.fillRef;
            const trackElement = this.trackRef;
            const trackWidth = trackElement?.clientWidth || 0;
            const fillWidth = fillElement?.clientWidth || 0;

            // Initialize start time if not already set
            if (!this.startTime) {
                this.startTime = timestamp;
            }

            const timeElapsed = timestamp - this.startTime;

            // Control the speed of the animation
            const speed = 0.4;

            // Calculate the new position with overlap to prevent empty track
            let newPosition = (timeElapsed * speed) % (trackWidth + fillWidth);

            // Apply the translation, and ensure fill is never fully off-screen
            if (fillElement) {
                fillElement.style.transform = `translateX(${
                    newPosition - fillWidth
                }px)`; // Shift the start position back by the fillWidth
            }

            // Continue the animation loop
            this.animId = requestAnimationFrame(this.rAFCallback.bind(this));
        }
    }
}

export { UxpProgressBar as ProgressBar };
