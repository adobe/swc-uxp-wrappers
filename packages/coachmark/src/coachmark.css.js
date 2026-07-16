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

// Combined stylesheet: upstream SWC coachmark styles + UXP-specific overrides.
// Import this file when you need the full CSS as a CSSResult (e.g. for constructable
// stylesheets or adoptedStyleSheets), rather than going through the component class.
// The component class (Coachmark.js) already includes both via static get styles().
import { unsafeCSS } from '@spectrum-web-components/base';
import swcStyles from '@swc-uxp-internal/coachmark/src/coachmark.css.js';
import uxpStyles from './uxp-coachmark.css.js';

export default unsafeCSS(swcStyles.toString() + '\n' + uxpStyles.toString());
