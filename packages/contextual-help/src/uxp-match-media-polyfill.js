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

// MatchMediaController (@spectrum-web-components/reactive-controllers) calls
// window.matchMedia(IS_MOBILE) synchronously in its constructor. UXP has no
// window.matchMedia implementation, so the TypeError is thrown before the component
// can instantiate. Stub it to always return matches:false — UXP plugins run in a
// desktop context, so contextual-help always renders the sp-popover path (not the
// mobile sp-dialog sheet).
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
    window.matchMedia = function matchMedia(query) {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: function () {},
            removeListener: function () {},
            addEventListener: function () {},
            removeEventListener: function () {},
            dispatchEvent: function () {
                return false;
            },
        };
    };
}
