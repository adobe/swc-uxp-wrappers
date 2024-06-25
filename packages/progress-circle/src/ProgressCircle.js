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

import { ProgressCircle } from '@swc-uxp-internal/progress-circle/src/ProgressCircle.js';

import styles from './uxp-progress-circle.css.js';

class UxpProgressCircle extends ProgressCircle {
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

    // removeAnimation() {
    //     if (this.animId) {
    //         cancelAnimationFrame(this.animId);
    //         if (this.fillRef) {
    //             this.fillRef.style.transform = 'none';
    //         }
    //         this.animId = null;
    //     }
    // }

    removeAnimation() {
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
    }

    animate() {
        this.startTime = null;
        this.animId = requestAnimationFrame(this.rAFCallback.bind(this));
    }

    rAFCallback(timestamp) {
        if (this.indeterminate) {
            this.fillMask1 = this.shadowRoot.querySelector('.fillMask1');
            this.fillMask2 = this.shadowRoot.querySelector('.fillMask2');
            this.fillSubMask1 = this.shadowRoot.querySelector('.fillSubMask1');
            this.fillSubMask2 = this.shadowRoot.querySelector('.fillSubMask2');
            if (!this.startTime) {
                this.startTime = timestamp;
            }

            const timeElapsed = timestamp - this.startTime;
            const progress = (timeElapsed % 1000) / 1000;
            // const progress = Math.min(timeElapsed / 360000);

            const rotation1 = 360 * progress;
            const rotation2 = rotation1 > 180 ? rotation1 - 180 : rotation1;

            if (this.fillSubMask1) {
                this.fillSubMask1.style.transform = `rotate(${rotation1}deg)`;
            }
            if (this.fillSubMask2) {
                this.fillSubMask2.style.transform = `rotate(${rotation1}deg)`;
            }

            this.animId = requestAnimationFrame(this.rAFCallback.bind(this));
        }
    }
}

export { UxpProgressCircle as ProgressCircle };
