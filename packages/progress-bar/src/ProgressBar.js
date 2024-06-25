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
        // Combine the superclass styles with the UxpProgressBar styles.
        return [super.styles, styles];
    }

    // connectedCallback() {
    //     super.connectedCallback();
    //     this.fillRef = this.shadowRoot.querySelector('.fill');
    //     this.trackRef = this.shadowRoot.querySelector('.track');
    //     if (this.indeterminate) {
    //         this.animate();
    //     }
    // }

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

            this.startTime = this.startTime || timestamp;
            const timeElapsed = timestamp - this.startTime;

            // Adjust the initial progressValue to start with a smoother animation
            const progressValue = Math.min(timeElapsed / 1000); // Limit to 1 to ensure smooth start
            let newPosition = progressValue * (trackWidth + fillWidth); // Start from the beginning

            // Reset position and startTime to repeat the movement
            if (newPosition >= trackWidth + fillWidth) {
                newPosition = 0;
                this.startTime = null;
            }

            if (fillElement) {
                fillElement.style.transform = `translateX(${newPosition}px)`;
            }

            this.animId = requestAnimationFrame(this.rAFCallback.bind(this));
        }
    }
}

export { UxpProgressBar as ProgressBar };
