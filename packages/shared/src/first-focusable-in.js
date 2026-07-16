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

/* Re-implemented (not a pass-through) so that querySelector/matches use the
   UXP-safe userFocusableSelector from our local focusable-selectors.js.
   The internal version imports userFocusableSelector via a relative path
   ('./focusable-selectors.js') which bypasses the webpack alias, causing UXP
   to throw "SyntaxError: Invalid selector" on :not([inert]). */
import { userFocusableSelector } from './focusable-selectors.js';

export const firstFocusableIn = (el) => el.querySelector(userFocusableSelector);

export const firstFocusableSlottedIn = (el) =>
    el.assignedElements().find((o) => o.matches(userFocusableSelector));
