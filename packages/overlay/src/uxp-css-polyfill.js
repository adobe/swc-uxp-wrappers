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

/* UXP does not expose the global CSS object (CSS.supports, CSS.escape, etc.).
   OverlayPopover.js calls CSS.supports("(overlay: auto)") at module top-level,
   which throws ReferenceError on load. We polyfill with a no-op that returns false
   for all feature queries — UXP supports none of the features queried. */
if (typeof CSS === 'undefined') {
    globalThis.CSS = {
        supports: () => false,
        escape: (s) => s,
    };
}
