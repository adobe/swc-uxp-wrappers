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

/* 
Custom  MatchMediaController Implementation.
MatchMediaController is a class in reactive-controllers conponent of SWC - https://opensource.adobe.com/spectrum-web-components/tools/match-media/
which deploys window.matchMedia(query) to accompalish various tasks, one among that is to find a mobile platform/screen and based on that rendering sp-picker or sp-tray.
since UXP lacks support of window.matchMedia, we have written this custom implementation to overcome missing support in UXP.
Also, UXP targets desktop application we can safely return false as mobile is not a use-case for UXP.
*/

export function MatchMediaController(context, isMobile) {
    return false;
}
export const IS_MOBILE = false;
