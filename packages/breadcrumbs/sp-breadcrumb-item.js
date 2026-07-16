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

import { BreadcrumbItem } from './src/BreadcrumbItem.js';

// defineElement from @spectrum-web-components/base has NO double-registration guard
// — it calls customElements.define() unconditionally, which throws if already defined.
// Use an explicit guard instead. — remove when upstream adds a guard.
if (!customElements.get('sp-breadcrumb-item')) {
    customElements.define('sp-breadcrumb-item', BreadcrumbItem);
}
