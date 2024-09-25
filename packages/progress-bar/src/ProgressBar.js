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

    /*
    rAFCallback function is responsible for creating a smooth animation in the UxpProgressBar component when the progress bar is in an "indeterminate" state. Here’s a breakdown of how it works:

    Parameter: It receives a timestamp parameter from the requestAnimationFrame API. This timestamp represents the time at which the frame is rendered and is used to calculate how much time has passed since the animation started.

    Filling Element Selection: It selects the two key elements
        1. fillRef (the moving part that represents the progress)
        2. trackRef (the stationary part that acts as the background or track for the fill)

    Start Time Initialization: The first time the function runs, it initializes this.startTime using the provided timestamp. This allows tracking how much time has passed between frames.

    Calculate Elapsed Time: It calculates the time that has passed since the animation started (timeElapsed), by subtracting this.startTime from the current timestamp.

    Control Animation Speed: A speed variable is defined, which controls how fast the animation progresses. The speed determines how far the fill element moves in a given period of time.

    New Position Calculation: It calculates the new horizontal position of the fillRef based on the time elapsed. The movement loops back when the fillRef reaches the end of the trackRef. 
                              The modulus operation (%) ensures the animation loops by calculating the remaining distance after the fill moves past the total width of the track.

    Apply Translation: It applies a CSS transform: translateX to the fillRef element, which shifts its position along the X-axis. This movement creates the effect of the fill sliding across the track.
                       The translation value is calculated as newPosition - fillWidth, meaning the fill moves leftward (starting off-screen), and as it moves forward, it will come back into view, creating a seamless animation loop.

    Recursive Loop: The function uses requestAnimationFrame recursively, which calls rAFCallback again to continue the animation on the next frame, creating a continuous, smooth animation.
    */

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

            /*
            Calculate the newPosition with overlap to prevent empty track

            1. timeElapsed * speed:

            timeElapsed: The amount of time that has passed since the animation started.
            speed: A constant value (in this case, 0.4) that controls how fast the fill element moves. A higher value makes the fill move faster, and a lower value makes it slower.
            
            By multiplying timeElapsed by speed, we get a value representing how far the fill should have moved along the track based on the elapsed time.

            2. trackWidth + fillWidth:

            trackWidth: The width of the stationary part of the progress bar, which represents the area the fill element moves across.
            fillWidth: The width of the fill element, which is the part that visually indicates progress.
            
            Adding trackWidth and fillWidth ensures that we’re accounting for the full length that the fill element needs to move before resetting (i.e., leaving and re-entering the track).

            3. % (trackWidth + fillWidth):

            The modulus operator (%) ensures that the calculated position (newPosition) loops back to 0 when the fill element reaches the end of its complete path (which is trackWidth + fillWidth).
            When the position of the fill element exceeds the total width of the track plus the fill itself, the modulus operation resets it to the beginning, allowing for a continuous looping animation.
            */

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
