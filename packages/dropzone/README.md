## Description

---

<br />
This is UXP wrapper for `@spectrum-web-components/dropzone` package (v1.12.x).
<br />

-   For detailed README regarding `@spectrum-web-components/dropzone` [refer this link](https://www.npmjs.com/package/@spectrum-web-components/dropzone)

-   Detailed specification regarding `@spectrum-web-components/dropzone` support in UXP through `@swc-uxp-wrappers/dropzone` [refer this link](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/)

## Usage

---

<br />

```
yarn add @swc-uxp-wrappers/dropzone
```

Import the side effectful registration of `<sp-dropzone>` via:

```
import '@swc-uxp-wrappers/dropzone/sp-dropzone.js';
```

When looking to leverage the `Dropzone` base class as a type and/or for extension purposes, do so via:

```
import { Dropzone } from '@swc-uxp-wrappers/dropzone';
```

<br />

## Example

---

<br />

Basic dropzone:

```html
<sp-dropzone>
    <sp-illustrated-message>
        <svg><!-- upload illustration --></svg>
        <div slot="heading">Drag and drop your file</div>
    </sp-illustrated-message>
</sp-dropzone>
```

With accept filter (same syntax as `<input accept>`):

```javascript
const dz = document.querySelector('sp-dropzone');
dz.accept = 'image/*';           // images only
dz.accept = '.psd,.ai,.pdf';     // specific extensions
dz.accept = '';                  // all files (default)
```

Open native file picker:

```javascript
dz.openFilePicker({ multiple: true });
```

Handle the drop event:

```javascript
dz.addEventListener('sp-dropzone-drop', (e) => {
    const { files, source, rejected } = e.detail;
    // files: Array<{ name, nativePath, type, size }>
    // source: 'drop' | 'picker'
    // rejected: true if accept filter blocked all files
    files.forEach(f => console.log(f.nativePath || f.name));
});
```

## UXP Behavior

---

<br />

The following UXP limitations are transparently handled by this wrapper — no changes to markup are required:

-   **File path resolution** — UXP drag & drop provides `Entry` objects rather than browser `File` objects. The wrapper resolves each entry to `{ name, nativePath, type, size }` before firing `sp-dropzone-drop`. In Chrome (dev preview), standard `File` objects are used instead.

-   **`sp-dropzone-drop` detail shape** — The wrapper replaces the upstream detail (native `DragEvent`) with a structured object: `{ dataTransfer, nativeEvent, files, source, rejected }`. This provides the resolved file list and accept-filter result in both UXP and browser environments.

-   **`accept` property** — Works like `<input accept>`: MIME types (`image/*`), wildcards, and file extensions (`.jpg,.png`). The wrapper handles extension-based matching when MIME type is unavailable during UXP drags.

-   **`openFilePicker({ multiple })`** — Opens the platform file picker. In UXP uses `localFileSystem.getFileForOpening()`; in Chrome uses a hidden `<input type="file">`.

-   **CSS logical properties** — `inline-size`, `block-size`, `padding-block-*`, `margin-block` are replaced with physical equivalents (`width`, `height`, `padding-top/bottom`, `margin-top/bottom`).

-   **Dragged/filled background** — Upstream uses `rgba(var(--rgb-triple), opacity)` for the active state background color, which is invalid in UXP. The wrapper overrides with `rgba(20, 115, 230, 0.1)` (default Spectrum blue). Override `--mod-drop-zone-background-color` to match your plugin's accent color.

## Known Issues

-   Tab navigation is not supported.
-   Folder drops are not supported — only individual files are resolved.
