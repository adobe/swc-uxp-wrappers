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

    sigmoidFactory(k) {
        const correction = 0.5 / (1 / (1 + Math.exp(-k)) - 0.5);
        return (t) => {
            t = this.clamp(t, 0, 1);
            return (
                correction * (1 / (1 + Math.exp(-k * (2 * t - 1))) - 0.5) + 0.5
            );
        };
    }

    clamp(val, lower, upper) {
        return Math.max(Math.min(val, upper), lower);
    }

    getSvgArc(radius, startAngleDegrees, finishAngleDegrees) {
        if (finishAngleDegrees < startAngleDegrees) {
            finishAngleDegrees += 360;
        }
        const arcLengthDegrees = finishAngleDegrees - startAngleDegrees;
        if (arcLengthDegrees >= 360) {
            return `M ${
                radius * 2
            } ${radius} A ${radius} ${radius} 0 0 1 0 ${radius} A ${radius} ${radius} 0 0 1 ${
                radius * 2
            } ${radius}`;
        }
        const startAngle = 2 * Math.PI * (startAngleDegrees / 360);
        const finishAngle = 2 * Math.PI * (finishAngleDegrees / 360);
        const zeroAngle = -Math.PI / 2.2;
        const x0 = radius + radius * Math.cos(startAngle + zeroAngle);
        const y0 = radius + radius * Math.sin(startAngle + zeroAngle);
        const x1 = radius + radius * Math.cos(finishAngle + zeroAngle);
        const y1 = radius + radius * Math.sin(finishAngle + zeroAngle);
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
