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

// Combiner: merges the upstream SWC badge stylesheet with the UXP override
// sheet so that consumers who import ./src/badge.css.js directly receive the
// full combined stylesheet, not just the UXP delta.
import { unsafeCSS } from '@spectrum-web-components/base';
import swcBadgeStyles from '@swc-uxp-internal/badge/src/badge.css.js';

import uxpBadgeStyles from './uxp-badge.css.js';

const combinedBadgeStyles = unsafeCSS(
    swcBadgeStyles.toString() + '\n' + uxpBadgeStyles.toString()
);

export default combinedBadgeStyles;
