## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/picker` package
<br />

-   For detailed README regarding `@spectrum-web-components/picker` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/picker/v/1.12.2)

-   Detailed specification regarding `@spectrum-web-components/picker` support in UXP through `@swc-uxp-wrappers/picker` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/picker
```

Import the side effectful registration of `<sp-picker>` via:

```
import '@swc-uxp-wrappers/picker/sp-picker.js';
```

When looking to leverage the `Picker` base class as a type and/or for extension purposes, do so via:

```
import { Picker } from '@swc-uxp-wrappers/picker';
```

<br />

## Example

---

<br />

```html
<sp-picker label="Select an option">
    <sp-menu-item value="1">Option 1</sp-menu-item>
    <sp-menu-item value="2">Option 2</sp-menu-item>
    <sp-menu-item value="3">Option 3</sp-menu-item>
</sp-picker>
```

## Known Issues

### 1. Pointer events blocked after menu item selection

After selecting a menu item, all subsequent pointer interactions with the page are swallowed.

**Root cause (two bugs in `@swc-uxp-wrappers/overlay`):**

-   `sp-overlay.manageOpen()` registers a `{ once: true }` `document.pointerup` listener to remove the `.not-immediately-closable` class from `.dialog`. In UXP, `pointerup` does not bubble to `document`, so the listener never fires and `.dialog::before` (a full-screen invisible backdrop with `pointer-events: auto !important`) remains permanently active.
    **Fix needed in `Overlay.js`**: remove `.not-immediately-closable` unconditionally when `open` becomes `false`, not only via the `pointerup` listener.

-   The upstream overlay CSS uses an `@supports (not selector(:open)) and (not selector(:popover-open))` fallback to set `pointer-events: none` on the closed `.dialog`. UXP does not reliably evaluate `@supports selector()` queries, so the fallback block is skipped and the closed `.dialog` retains `pointer-events: auto`, blocking interactions.
    **Fix needed in `uxp-overlay.css.js`**: add `.dialog:not([is-visible]) { pointer-events: none !important; }`.

### 2. Re-opening the picker after item selection requires two clicks

After selecting a menu item, clicking the picker face once does not open the menu. A second click is required.

**Root cause (bug in `@swc-uxp-wrappers/overlay`):**

When item selection closes the overlay, `handleChange` sets `strategy.preventNextToggle = "no"`. The overlay close transition runs asynchronously in UXP, so a stale `beforetoggle(newState=closed)` event can arrive while the picker is already re-opening (`this.open = true`). `handleBeforetoggle` sees `this.open === true` and `preventNextToggle === "no"` and immediately resets `this.open = false`, cancelling the re-open. The user must click a second time to open normally.

**Fix needed in `@swc-uxp-wrappers/overlay`**: ensure pending `beforetoggle` events from a closing transition are not dispatched after the overlay has already been asked to re-open.

### 3. Space / Enter key opens the menu then immediately closes it (on the third press)

After two normal open/close cycles, pressing Space or Enter opens the menu and it closes on its own without user input.

**Root cause (bug in `@swc-uxp-wrappers/overlay`):**

Every keypress triggers `Overlay.managePopoverOpen()` → `OverlayNoPopover.makeTransition()`, which throws an `Unhandled Promise` rejection in UXP. The rejection handler in `makeTransition` resets `picker.open = false` asynchronously, while `strategy.open` is left as `true`. This state desync causes `handleBeforetoggle` to see `newState=closed` on what should be an open cycle, making the menu close immediately.

**Fix needed in `@swc-uxp-wrappers/overlay`**: ensure `makeTransition` handles Promise rejections cleanly and keeps `strategy.open` in sync with `picker.open`.

### 4. `pending` state: `sp-progress-circle` not rendered

The `pending` attribute on `sp-picker` is intended to show a loading spinner (`sp-progress-circle`) inside the picker face while data is loading. UXP does not support `sp-progress-circle` (CSS animations are not available), so the pending state renders nothing in the picker face. The `pending` attribute still blocks `toggle()` as expected, but the visual indicator is absent.