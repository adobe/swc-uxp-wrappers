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
import { html } from '@spectrum-web-components/base';
import uxpStyles from './uxp-progress-circle.css.js';

class UxpProgressCircle extends ProgressCircle {
    static get styles() {
        return [super.styles, uxpStyles];
    }

    constructor() {
        super();
        this.animationFrameId = null;
        this.value = 0;
    }

    get fillStrokeColor() {
        if (this.static === 'white') {
            return 'var(--spectrum-progress-circle-fill-border-color-over-background)';
        } else {
            return 'var(--spectrum-progress-circle-fill-border-color)';
        }
    }

    get trackStrokeColor() {
        if (this.static === 'white') {
            return 'var(--spectrum-progress-circle-track-border-color-over-background)';
        } else {
            return 'var(--spectrum-progress-circle-track-border-color)';
        }
    }

    get viewBoxSize() {
        switch (this.size) {
            case 'l':
                return 64;
            case 's':
                return 16;
            case 'm':
            default:
                return 32;
        }
    }

    get strokeWidth() {
        switch (this.size) {
            case 'l':
                return '4px';
            case 's':
                return '2px';
            case 'm':
            default:
                return '3px';
        }
    }

    get translateBy() {
        const strokeWidthValue = parseFloat(this.strokeWidth);
        return strokeWidthValue / 2;
    }

    get radius() {
        const strokeWidthValue = parseFloat(this.strokeWidth);
        return this.viewBoxSize / 2 - strokeWidthValue / 2;
    }

    /*
    The sigmoidFactory(k) function is used to generate a customized sigmoid function that can ease transitions, like animations, in a smooth and non-linear manner. 
    It's an S-shaped curve, typically used to model gradual transitions. 
    It's often used in animations because it starts slowly, accelerates, and then slows down as it approaches the end. 
    This smooth progression makes the animation look more natural compared to linear interpolation.

    The mathematical expression for a sigmoid function is:
    S(t)= 1/(1+e^(−k(2t−1)))

    t is a value between 0 and 1, representing progress through the animation.
    k controls the steepness of the curve. A larger k results in a steeper curve (faster transition).
    The expression (2t−1) shifts the input so that the sigmoid is centered around 0 (when t = 0.5).
​
    By using different k values (as seen in getArcAngles), we can fine-tune the start and end speeds of the animation.

    For example:
    A larger k makes the transition faster in the middle but slower at the beginning and end, which creates a smoother easing effect.
    A smaller k would result in a more gradual curve throughout the transition, creating a more uniform easing.

    In the getArcAngles method, different values of k are used for the start and finish angles of the SVG arc to create a visually smooth and appealing animation.
    */

    sigmoidFactory(k) {
        const correction = 0.5 / (1 / (1 + Math.exp(-k)) - 0.5);
        return (t) => {
            t = this.clamp(t, 0, 1);
            return (
                correction * (1 / (1 + Math.exp(-k * (2 * t - 1))) - 0.5) + 0.5
            );
        };
    }

    /*
    Ensures that the input t stays between 0 and 1, as sigmoid functions are generally defined for values within this range.
    */

    clamp(val, lower, upper) {
        return Math.max(Math.min(val, upper), lower);
    }

    /*
    getSvgArc method generates the d attribute for an SVG path element that represents an arc of a circle.
    */
    getSvgArc(radius, startAngleDegrees, finishAngleDegrees) {
        /*
        Handling Wrap-Around.
        If the ending angle is less than the starting angle, it means the arc spans over the 0-degree mark (like from 350 degrees to 10 degrees). 
        Adding 360 degrees to finishAngleDegrees corrects this by ensuring it is always greater than or equal to startAngleDegrees.
        */
        if (finishAngleDegrees < startAngleDegrees) {
            finishAngleDegrees += 360;
        }

        /*
        Arc Length Calculation.
        This calculates the angular length of the arc in degrees.
        */
        const arcLengthDegrees = finishAngleDegrees - startAngleDegrees;

        /*
        Full Circle Case.
        If the arc spans a full circle or more (i.e., 360 degrees or more), this returns a path that draws a complete circle. 
        It uses the SVG A (arc) command to draw two semicircles to cover the full circle, effectively creating a complete circle.
        */
        if (arcLengthDegrees >= 360) {
            return `M ${
                radius * 2
            } ${radius} A ${radius} ${radius} 0 0 1 0 ${radius} A ${radius} ${radius} 0 0 1 ${
                radius * 2
            } ${radius}`;
        }

        /*
        Convert Angles to Radians
        */
        const startAngle = 2 * Math.PI * (startAngleDegrees / 360);
        const finishAngle = 2 * Math.PI * (finishAngleDegrees / 360);

        /*
        Calculate Arc Endpoints
        These lines calculate the x and y coordinates for the start and end points of the arc. 
        The zeroAngle adjustment rotates the starting point to ensure the arc starts from the correct position.
        */
        const zeroAngle = -Math.PI / 2.2;
        const x0 = radius + radius * Math.cos(startAngle + zeroAngle);
        const y0 = radius + radius * Math.sin(startAngle + zeroAngle);
        const x1 = radius + radius * Math.cos(finishAngle + zeroAngle);
        const y1 = radius + radius * Math.sin(finishAngle + zeroAngle);

        /*
        Return SVG Path Data.
         - M ${x0} ${y0}: Moves the pen to the start point of the arc.
         - A ${radius} ${radius}: Draws an arc with the given radius.
         - 0 ${arcLengthDegrees >= 180 ? 1 : 0}: The 0 is for the rotation angle of the arc, and the next value (1 if the arc length is 180 degrees or more, otherwise 0) determines the large-arc-flag for the arc drawing (whether to use the longer or shorter arc).
         - 1 ${x1} ${y1}: The 1 indicates that the arc should be drawn as a "positive" sweep (clockwise), and ${x1} ${y1} specifies the endpoint of the arc.
        */
        return `M ${x0} ${y0} A ${radius} ${radius} 0 ${
            arcLengthDegrees >= 180 ? 1 : 0
        } 1 ${x1} ${y1}`;
    }

    getArcAngles(alpha /* 0 to 1 */) {
        // most easing functions start and stop at zero which doesn't look good here.
        // we want the animation sections to slow down but never completely stop.
        // we are using the sigmoidFactory functions because it allows us to control the starting and stopping speeds
        // and allow allow the slope of the function to remain positive at alpha = 0 and alpha = 1
        let start = this.sigmoidFactory(3)(alpha) * 360; // Adjusted sigmoid for start angle
        let finish = this.sigmoidFactory(4.5)((alpha + 0.3) % 1) * 360; // Adjusted sigmoid for finish angle
        if (start < 0) {
            start += 1;
        }
        if (finish < start) {
            finish += 1;
        }
        return [start, finish];
    }

    getValue() {
        return this.value || 0;
    }

    setValue(newValue) {
        this.value = newValue;
        this.requestUpdate(); // Re-render the component when value changes
    }

    tick() {
        this.animationFrameId = requestAnimationFrame(() => {
            let value = (this.getValue() + 1.8) % 100;
            this.setValue(value);
            this.tick();
        });
    }

    removeAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    render() {
        super.render();
        const radius = this.radius;
        const viewBoxSize = this.viewBoxSize;
        let startAngle, finishAngle;

        if (this.indeterminate) {
            [startAngle, finishAngle] = this.getArcAngles(
                this.getValue() / 100
            );
        } else {
            startAngle = 0;
            finishAngle = (this.progress / 100) * 360;
        }

        // SVG attributes like stroke do not inherently support CSS variables (var()) in the same way that styles in HTML elements do.
        // To solve this, we can apply the stroke color using a style attribute instead of directly in the stroke attribute.
        return html`
            <svg
                viewBox="0 0 ${viewBoxSize} ${viewBoxSize}"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="${viewBoxSize / 2}"
                    cy="${viewBoxSize / 2}"
                    r="${radius}"
                    style="stroke: ${this.trackStrokeColor};"
                    stroke-width="${this.strokeWidth}"
                    fill="none"
                ></circle>
                <path
                    d="${this.getSvgArc(radius, startAngle, finishAngle)}"
                    style="stroke: ${this.fillStrokeColor};"
                    stroke-width="${this.strokeWidth}"
                    fill="none"
                    transform="translate(${this.translateBy}, ${this
                        .translateBy})"
                ></path>
            </svg>
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.tick();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeAnimation();
    }
}

export { UxpProgressCircle as ProgressCircle };
