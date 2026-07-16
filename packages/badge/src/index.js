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

export * from './Badge.js';

// Re-export upstream public constants so that consumers who import via the
// @spectrum-web-components/badge alias get the same public API surface.
// BADGE_VARIANTS and FIXED_VALUES are deprecated by upstream but still shipped
// in Badge.js exports and must be available for backward compatibility.
// BADGE_VALID_SIZES lists the supported size values ('s'|'m'|'l'|'xl').
export { BADGE_VARIANTS, FIXED_VALUES } from '@swc-uxp-internal/badge/src/Badge.js';

// BADGE_VALID_SIZES is defined in @swc-uxp-internal/badge/src/Badge.types.js,
// which is not listed in that package's exports field and therefore cannot be
// imported directly. We re-declare the same value here for API compatibility.
export const BADGE_VALID_SIZES = ['s', 'm', 'l', 'xl'];
