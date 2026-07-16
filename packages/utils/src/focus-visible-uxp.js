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

// ── UXP shim: focus-visible polyfill replacement ──────────────────────────────
//
// UXP does not support many modern CSS pseudo-class selectors in JS APIs
// (element.matches(), querySelector()).  Known failures:
//   • :focus-visible  — used by HoverController (sp-overlay) and
//                       SpectrumMixin.hasVisibleFocusInTree() in all SWC components
//   • :focus-within   — used by picker/action-menu handleBeforetoggle
//
// Calling matches() or querySelector() with these throws:
//   SyntaxError: "not a valid selector"
//
// Import this file once, before any SWC component module runs, in each
// component entry point (sp-picker.js, sp-action-menu.js, etc.).
// Using try/catch keeps this forward-compatible with any future unsupported
// pseudo-class.
// ─────────────────────────────────────────────────────────────────────────────

if (typeof Element !== 'undefined') {
    const _origMatches = Element.prototype.matches;
    Element.prototype.matches = function uxpMatchesPatch(selector) {
        try {
            return _origMatches.call(this, selector);
        } catch (e) {
            return false;
        }
    };

    const _origQS = Element.prototype.querySelector;
    Element.prototype.querySelector = function uxpQuerySelectorPatch(selector) {
        try {
            return _origQS.call(this, selector);
        } catch (e) {
            return null;
        }
    };
}
