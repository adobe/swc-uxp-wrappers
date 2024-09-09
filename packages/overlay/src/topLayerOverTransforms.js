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

'use strict';
import {
    getContainingBlock,
    getWindow,
    isContainingBlock,
} from '@floating-ui/utils/dom';
import { VirtualTrigger } from './VirtualTrigger.dev.js';
export const topLayerOverTransforms = () => ({
    name: 'topLayer',
    async fn(middlewareArguments) {
        const {
            x,
            y,
            elements: { reference, floating },
        } = middlewareArguments;
        //Making it by default since we don't have a way to check if the floating is on top layer in UXP.
        let onTopLayer = true;
        let topLayerIsFloating = false;
        let withinReference = false;
        const diffCoords = {
            x: 0,
            y: 0,
        };
        try {
            onTopLayer = onTopLayer || floating.matches(':popover-open');
        } catch (error) {}
        try {
            onTopLayer = onTopLayer || floating.matches(':open');
        } catch (error) {}
        try {
            onTopLayer = onTopLayer || floating.matches(':modal');
        } catch (error) {}
        topLayerIsFloating = onTopLayer;
        const dialogAncestorQueryEvent = new Event('floating-ui-dialog-test', {
            composed: true,
            bubbles: true,
        });
        floating.addEventListener(
            'floating-ui-dialog-test',
            (event) => {
                event.composedPath().forEach((el) => {
                    withinReference = withinReference || el === reference;
                    if (el === floating || el.localName !== 'dialog') return;
                    try {
                        onTopLayer = onTopLayer || el.matches(':modal');
                    } catch (error) {}
                });
            },
            { once: true }
        );
        floating.dispatchEvent(dialogAncestorQueryEvent);
        let overTransforms = false;
        if (!(reference instanceof VirtualTrigger)) {
            const root = withinReference ? reference : floating;
            const containingBlock = isContainingBlock(root)
                ? root
                : getContainingBlock(root);
            if (
                containingBlock !== null &&
                getWindow(containingBlock) !== containingBlock
            ) {
                const css = getComputedStyle(containingBlock);
                overTransforms =
                    css.transform !== 'none' || css.filter
                        ? css.filter !== 'none'
                        : false;
            }
            if (onTopLayer && overTransforms && containingBlock) {
                const rect = containingBlock.getBoundingClientRect();
                diffCoords.x = rect.x;
                diffCoords.y = rect.y;
            }
        }
        if (onTopLayer && topLayerIsFloating) {
            return {
                x: x + diffCoords.x,
                y: y + diffCoords.y,
                data: diffCoords,
            };
        }
        if (onTopLayer) {
            return {
                x,
                y,
                data: diffCoords,
            };
        }
        return {
            x: x - diffCoords.x,
            y: y - diffCoords.y,
            data: diffCoords,
        };
    },
});
