# SWC UXP Wrappers — Upgrade to v1.12.1 Status

> **Branch:** `component_upgrade_1.12.0` → merging into `feature/1.12.0`
> **SWC version:** `@spectrum-web-components/*` bumped from `0.37.0` → `1.12.1`
> **Wrapper version:** all packages at `3.0.0`
> **Wiki reference:** [Status of SWC UXP wrappers with spectrum-web-components v1.12.0](https://wiki.corp.adobe.com/pages/viewpage.action?pageId=3908055683)

---

## All PRs in This Upgrade

### Wrapper component PRs

| PR | Branch | Component | Type | Notes |
|---|---|---|---|---|
| [#29](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/29) | button-v1.12.0 | button | upgrade | Gap fix: icon-label spacing (`gap` → `margin-inline-start`) |
| [#30](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/30) | action-button-v1.12.0 | action-button | upgrade | |
| [#31](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/31) | button-group-v1.12.0 | button-group | upgrade | |
| [#32](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/32) | action-group-v1.12.0 | action-group | upgrade | |
| [#37](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/37) | action-bar-v1.12.0 | action-bar | upgrade | |
| [#38](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/38) | alert-banner-v1.12.0 | alert-banner | **new wrapper** | |
| [#39](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/39) | alert-dialog-v1.12.0 | alert-dialog | **new wrapper** | |
| [#40](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/40) | asset-v1.12.0 | asset | upgrade | |
| [#41](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/41) | avatar-v1.12.0 | avatar | upgrade | Bug fix: `setAttribute` crash when size is a Number |
| [#42](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/42) | badge-v1.12.0 | badge | **new wrapper** | Known issue: icon-only size (see §Known Issues) |
| [#43](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/43) | card-v1.12.0 | card | upgrade | |
| [#44](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/44) | checkbox-v1.12.0 | checkbox | upgrade | |
| [#45](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/45) | combobox-v1.12.0 | combobox | **new wrapper** | |
| [#46](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/46) | contextual-help-v1.12.0 | contextual-help | **new wrapper** | |
| [#47](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/47) | dialog-v1.12.0 | dialog | upgrade | |
| [#48](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/48) | divider-v1.12.0 | divider | upgrade | |
| [#49](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/49) | field-group-v1.12.0 | field-group | upgrade | |
| [#50](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/50) | field-label-v1.12.0 | field-label | upgrade | |
| [#51](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/51) | help-text-v1.12.0 | help-text | upgrade | |
| [#52](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/52) | illustrated-message-v1.12.0 | illustrated-message | upgrade | |
| [#53](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/53) | infield-button-v1.12.0 | infield-button | **new wrapper** | Dependency of textfield, number-field, search |
| [#54](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/54) | link-v1.12.0 | link | upgrade | |
| [#55](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/55) | menu-v1.12.0 | menu | upgrade | |
| [#56](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/56) | meter-v1.12.0 | meter | upgrade | |
| [#57](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/57) | number-field-v1.12.0 | number-field | upgrade | |
| [#58](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/58) | overlay-v1.12.0 | overlay | upgrade | |
| [#59](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/59) | picker-button-v1.12.0 | picker-button | upgrade | |
| [#60](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/60) | popover-v1.12.0 | popover | upgrade | |
| [#61](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/61) | radio-v1.12.0 | radio | upgrade | |
| [#62](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/62) | search-v1.12.0 | search | upgrade | |
| [#63](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/63) | shared-v1.12.0 | shared | upgrade | |
| [#64](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/64) | sidenav-v1.12.0 | sidenav | upgrade | |
| [#65](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/65) | status-light-v1.12.0 | status-light | **new wrapper** | |
| [#66](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/66) | swatch-v1.12.0 | swatch | upgrade | Known: `repeating-conic-gradient` unsupported in UXP |
| [#67](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/67) | switch-v1.12.0 | switch | upgrade | |
| [#68](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/68) | table-v1.12.0 | table | upgrade | |
| [#69](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/69) | tabs-v1.12.0 | tabs | upgrade | |
| [#70](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/70) | tags-v1.12.0 | tags | upgrade | |
| [#71](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/71) | textfield-v1.12.0 | textfield | upgrade | |
| [#72](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/72) | theme-v1.12.0 | theme | **new wrapper** | |
| [#73](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/73) | thumbnail-v1.12.0 | thumbnail | **new wrapper** | Known: `repeating-conic-gradient` unsupported in UXP |
| [#74](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/74) | toast-v1.12.0 | toast | upgrade | |
| [#75](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/75) | tooltip-v1.12.0 | tooltip | upgrade | |

### Infrastructure / shared PRs

| PR | Branch | Contents |
|---|---|---|
| [#76](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/76) | utility-v1.12.0 | `packages/utils/` — aliases.js (all new component aliases), webpack-plugins.js, root `package.json` workspace resolutions |
| [#77](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/77) | demo-plugin-upgrade | All `projects/swc-starter-webpack/` changes — resolutions, index.html/js, new component example pages, extended samples |

---

## Inter-Component Dependency Graph

Each component lists which other wrapper packages it directly imports.

```
button          (none)
checkbox        (none)
divider         (none)
popover         (none)
tooltip         (none)
help-text       (none)
field-label     (none)
asset           (none)
shared          (none)
utils           (none)

action-button   ← button
button-group    ← button
infield-button  ← button
picker-button   ← button
tags            ← button
toast           ← button
alert-banner    ← button
switch          ← checkbox
table           ← checkbox
field-group     ← help-text
meter           ← field-label, shared
card            ← asset, checkbox, divider, popover
action-bar      ← popover

action-group    ← action-button
alert-dialog    ← button, button-group, divider
menu            ← action-button, divider
overlay         ← action-button
radio           ← field-group, help-text
tabs            ← action-button

dialog          ← alert-dialog, button, button-group, divider
textfield       ← help-text, overlay, tooltip

combobox        ← action-button, menu, overlay, picker-button, popover, textfield
number-field    ← infield-button, textfield
search          ← button, textfield
```

---

## Merge / Review / Test Order

All PRs within the same layer are **independent** and can be reviewed and merged in parallel.
Each layer must be fully merged before starting the next.

### Layer 1 — No dependencies (merge first, all in parallel)

`#76 utils` · `#63 shared` · `#29 button` · `#44 checkbox` · `#48 divider` · `#60 popover` · `#75 tooltip` · `#51 help-text` · `#50 field-label` · `#40 asset` · `#41 avatar` · `#42 badge` · `#46 contextual-help` · `#52 illustrated-message` · `#54 link` · `#64 sidenav` · `#65 status-light` · `#66 swatch` · `#72 theme` · `#73 thumbnail`

> **Merge `#76 utils` first within this layer** — it carries `aliases.js` and root `package.json` resolutions required by the demo plugin.

### Layer 2 — Depend on Layer 1

| PR | Component | Needs |
|---|---|---|
| #30 | action-button | button |
| #31 | button-group | button |
| #53 | infield-button | button |
| #59 | picker-button | button |
| #38 | alert-banner | button |
| #67 | switch | checkbox |
| #68 | table | checkbox |
| #70 | tags | button |
| #74 | toast | button |
| #49 | field-group | help-text |
| #56 | meter | field-label, shared |
| #43 | card | asset, checkbox, divider, popover |
| #37 | action-bar | popover |

### Layer 3 — Depend on Layer 2

| PR | Component | Needs |
|---|---|---|
| #32 | action-group | action-button |
| #39 | alert-dialog | button, button-group, divider |
| #55 | menu | action-button, divider |
| #58 | overlay | action-button |
| #61 | radio | field-group, help-text |
| #69 | tabs | action-button |

### Layer 4 — Depend on Layer 3

| PR | Component | Needs |
|---|---|---|
| #47 | dialog | alert-dialog, button, button-group, divider |
| #71 | textfield | help-text, overlay, tooltip |

### Layer 5 — Depend on Layer 4

| PR | Component | Needs |
|---|---|---|
| #45 | combobox | action-button, menu, overlay, picker-button, popover, textfield |
| #57 | number-field | infield-button, textfield |
| #62 | search | button, textfield |

### Layer 6 — After all wrappers merged

| PR | Component | Needs |
|---|---|---|
| #77 | demo-plugin-upgrade | All wrapper PRs merged + utils aliases live |

---

## Testing Workflow

### One-time prerequisites (merge before testing anything)

```bash
# 1. Merge these two first into feature/1.12.0
git merge utility-v1.12.0      # PR #76 — webpack aliases + resolutions
git merge demo-plugin-upgrade  # PR #77 — demo plugin setup

# 2. Install and build the demo plugin once
cd projects/swc-starter-webpack
yarn install && yarn build
```

### Per-component test loop (after prerequisites)

```bash
# Merge the component branch
git merge {component}-v1.12.0

# Rebuild (no reinstall needed — yarn workspaces resolves packages/ locally)
cd projects/swc-starter-webpack && yarn build

# Load in UXP Developer Tool → click the component's tab
```

### What each PR includes for demo testing

| Component(s) | Demo files included in PR |
|---|---|
| alert-banner, alert-dialog, badge, contextual-help, status-light, thumbnail | `sp-{comp}.html` + `my-{comp}.js` |
| avatar, button, card, checkbox, combobox, dialog, divider, link, meter, table, tabs | `sp-{comp}.html` |
| number-field | `my-numberfield.js` |
| All others | No demo file changed — existing example in `feature/1.12.0` is sufficient |

---

## Known Issues

### `sp-badge` — icon-only variant renders at wrong size

When `<sp-badge>` is used with an icon but no label, the slotted icon always renders at medium size regardless of the badge's `size` attribute.

**Root cause:** `sp-icon-*` sets `--spectrum-icon-size` on its own `:host`. In UXP, the inner shadow DOM's `:host` has higher cascade priority than `::slotted()` from the outer badge shadow DOM. No CSS-only or JS `setAttribute` fix is effective.

**Workaround:** Set `size` on the icon element directly:
```html
<sp-badge size="s">
    <sp-icon-checkmark-circle size="s" slot="icon"></sp-icon-checkmark-circle>
</sp-badge>
```

Documented in `packages/badge/README.md`.

### `sp-swatch` / `sp-thumbnail` — checkerboard background missing

`repeating-conic-gradient` is not supported in UXP. The checkerboard pattern used for transparent/image backgrounds does not render.

### `sp-button` (icon+label) — gap replaced with margin

SWC uses `gap` on the flex `:host` for icon-label spacing. UXP does not support `gap` in flex containers (UXP-21294). Fixed in this upgrade with `margin-inline-start` on `#label`.

---

## Gap Analysis — Components Still Needing Work

Compared against [wiki status page](https://wiki.corp.adobe.com/pages/viewpage.action?pageId=3908055683). The following components are listed as **EXPLORATION DONE** or **WIP** in the wiki but do not yet have a v1.12.1 upgrade PR.

### Missing upgrade PRs (wrapper exists, not yet at 1.12.1)

| Component | Wiki status | Existing branch | Gap |
|---|---|---|---|
| `coachmark` | EXPLORATION DONE | `coachmark-1.12.0` (PR #21) | PR targets old version; needs new `coachmark-v1.12.0` upgrade PR |
| `dropzone` | EXPLORATION DONE | `dropzone-1.12.0` (PR #22) | PR targets old version; needs new `dropzone-v1.12.0` upgrade PR |

### Missing wrappers entirely (no `packages/{comp}/package.json`)

| Component | Wiki status | Current state | Action needed |
|---|---|---|---|
| `picker` | EXPLORATION DONE | `picker-v1.12.0` branch exists; no `packages/picker/` directory | Create wrapper package at 1.12.1 |
| `progress-bar` | EXPLORATION DONE | `progress-bar-v1.12.0` branch exists; no `packages/progress-bar/` directory | Create wrapper package at 1.12.1 |
| `progress-circle` | EXPLORATION DONE | `progress-circle-v1.12.0` branch exists; no `packages/progress-circle/` directory | Create wrapper package at 1.12.1 |
| `slider` | EXPLORATION DONE | `slider-v1.12.0` branch + `packages/slider/src/` stub; no `package.json` | Complete wrapper package at 1.12.1 |
| `breadcrumbs` | **WIP** | `packages/breadcrumbs/src/` stub; no `package.json` | Complete wrapper package (WIP in wiki) |

### Combobox — wiki update needed

`combobox` is still listed as **WIP** in the wiki but the wrapper is now complete and PR [#45](https://github.com/Govind-gupta75/swc-uxp-wrappers/pull/45) is open. The wiki status should be updated to **EXPLORATION DONE**.

### N/A components (not in SWC, no action needed)

Avatar Group, Checkbox Group, Close Button, In-line Alert, Keyboard Shortcut, Labeled Value, List View, Scroll Bar, Segmented Control, Standard Dialog, Standard Panel, Steplist, Tag Field, Takeover Dialog

---

## PR Health Summary

- **Total open PRs against `feature/1.12.0`:** 47
- **Merge conflicts:** 0
- **Scope violations (out-of-component files):** 0
- **PRs with demo files:** 18 component PRs + PR #77
- **PRs with only wrapper changes:** 26 component PRs (no demo file changed for those components)
