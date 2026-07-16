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

import { Dropzone } from '@swc-uxp-internal/dropzone/src/Dropzone.js';

import styles from './uxp-dropzone.css.js';

// ── UXP detection ─────────────────────────────────────────────────────────
// eval('require') bypasses webpack's static module analysis.
// In UXP:             eval('require')('uxp') succeeds  → _nativeRequire is set.
// In webpack/browser: require('uxp') throws "Cannot find module" → stays null.
let _nativeRequire = null;
(function () {
    try {
        const r = eval('require'); // eslint-disable-line no-eval
        r('uxp');                  // throws in webpack, succeeds in UXP
        _nativeRequire = r;
    } catch (_) {}
}());

// ── Shared file-descriptor helpers ───────────────────────────────────────

// Handles both / (macOS/Linux) and \ (Windows) path separators.
function basename(nativePath) {
    return nativePath.split(/[/\\]/).filter(Boolean).pop() || '';
}

const _EMPTY_FILE = Object.freeze({ name: '', nativePath: '', type: '', size: 0 });

// Converts a UXP Entry object to a normalized file descriptor.
function _fileFromEntry(entry) {
    const nativePath = entry.nativePath || '';
    const name = nativePath ? basename(nativePath) : (entry.name || '');
    return { name, nativePath, type: '', size: 0 };
}

// ── Accept-filter helpers ─────────────────────────────────────────────────
// Extension lists for MIME wildcard fallback when MIME type is unavailable (UXP).
const CATEGORY_EXTS = {
    image: [
        // Standard web formats
        'jpg','jpeg','jfif','pjpeg','pjp','jpe',
        'png','gif','webp','bmp','svg','svgz',
        'tiff','tif','ico','cur','avif','heic','heif','apng',
        // Adobe native formats
        'psd','psb',   // Photoshop
        'ai',          // Illustrator
        'eps',         // Encapsulated PostScript
        'pdf',         // PDF (opened as image in Photoshop)
        'dng',         // Adobe Digital Negative
        // Camera RAW formats (opened via Camera Raw / Lightroom)
        'cr2','cr3',   // Canon
        'nef','nrw',   // Nikon
        'arw','srf',   // Sony
        'raf',         // Fujifilm
        'rw2',         // Panasonic
        'orf',         // Olympus
        'raw','rwl',   // Leica
        'pef',         // Pentax
        '3fr',         // Hasselblad
    ],
    video: [
        // Standard web/container formats
        'mp4','m4v','mov','avi','mkv','webm','wmv',
        'flv','mpeg','mpg','ogv','3gp','3g2',
        // Professional / broadcast formats
        'mxf',         // Material Exchange Format (Premiere Pro, broadcast)
        'r3d',         // RED camera
        'braw',        // Blackmagic RAW
        'mts','m2ts',  // AVCHD (cameras)
        'ts','vob',    // Transport Stream, DVD VOB
        'f4v',         // Flash video
        'divx','xvid', // DivX/Xvid encoded
    ],
    audio: [
        'mp3','wav','ogg','oga','m4a','aac','flac',
        'wma','opus','aiff','aif',
        'amr',         // Adaptive Multi-Rate (mobile)
        'caf',         // Core Audio Format (Apple/Logic)
        'mxf',         // MXF audio-only
    ],
    text: [
        'txt','csv','log','md','markdown','rst',
        'json','xml','yaml','yml','toml','ini','env',
        'html','htm','css','js','mjs','cjs','ts','tsx','jsx',
        'py','rb','php','java','c','cpp','cc','cxx','h','hpp',
        'sh','bash','zsh','bat','cmd','ps1',
        'sql','diff','patch','gitignore',
    ],
};

function extOf(name) {
    const dot = name.lastIndexOf('.');
    return dot >= 0 ? name.slice(dot + 1).toLowerCase() : '';
}

/**
 * Returns true if the file matches the accept string (same syntax as <input accept>).
 * Falls back to extension matching when mimeType is unavailable (UXP drag & drop).
 *
 * @param {string} name     - File name (used for extension matching)
 * @param {string} mimeType - MIME type if known, empty string otherwise
 * @param {string} accept   - Comma-separated accept tokens: MIME types, wildcards, extensions
 */
function isAccepted(name, mimeType, accept) {
    if (!accept || accept === '*') return true;
    const ext = extOf(name);
    const mime = (mimeType || '').toLowerCase();
    return accept.split(',').map(s => s.trim().toLowerCase()).some(token => {
        if (!token) return false;
        if (token.startsWith('.')) return ext === token.slice(1);
        if (token.endsWith('/*')) {
            const cat = token.slice(0, -2);
            if (mime) return mime.startsWith(cat + '/');
            return (CATEGORY_EXTS[cat] || []).includes(ext);
        }
        if (mime) return mime === token;
        for (const [cat, exts] of Object.entries(CATEGORY_EXTS)) {
            if (token.startsWith(cat + '/')) return exts.includes(ext);
        }
        return !token.includes('/');
    });
}

/**
 * Converts an <input accept>-style string to a UXP getFileForOpening `types` array
 * (file extensions without the leading dot).
 *
 * Returns undefined when accept is empty/wildcard so callers can omit the option
 * entirely and let UXP default to showing all files.
 *
 * @param {string} accept
 * @returns {string[] | undefined}
 */
function acceptToUxpTypes(accept) {
    if (!accept || accept === '*') return undefined;
    const types = new Set();
    accept.split(',').map(s => s.trim().toLowerCase()).forEach(token => {
        if (!token) return;
        if (token.startsWith('.')) {
            types.add(token.slice(1));
        } else if (token.endsWith('/*')) {
            (CATEGORY_EXTS[token.slice(0, -2)] || []).forEach(ext => types.add(ext));
        } else if (token.includes('/')) {
            (CATEGORY_EXTS[token.split('/')[0]] || []).forEach(ext => types.add(ext));
        }
    });
    return types.size > 0 ? [...types] : undefined;
}

// ── UxpDropzone ───────────────────────────────────────────────────────────

class UxpDropzone extends Dropzone {
    static get styles() {
        return [...super.styles, styles];
    }

    constructor() {
        super();
        this._accept = '';
    }

    /**
     * Accepted file types — same syntax as the HTML <input accept> attribute.
     * Examples: 'image/*', 'text/*', '.jpg,.png', '' (all files, default).
     */
    get accept() {
        return this._accept;
    }

    set accept(value) {
        this._accept = (value || '').trim();
    }

    // ── Override onDrop: resolve files then fire sp-dropzone-drop ───────────

    onDrop(event) {
        event.preventDefault();

        // In UXP, onDragOver may never fire (OS drags can skip dragover events),
        // so isDragged stays false — always process the drop.
        // In browser, isDragged is only set when sp-dropzone-should-accept was NOT cancelled.
        // If a listener called e.preventDefault() on should-accept, isDragged stays false
        // and we must respect that rejection (same guard placement as upstream onDrop).
        if (!_nativeRequire && !this.isDragged) return;

        // Clear only after confirming we'll process this drop.
        // Upstream also clears inside the isDragged guard — clearing before the guard
        // would suppress the pending drag-leave event for spurious drops.
        this.clearDebouncedDragLeave();
        this.isDragged = false;

        if (_nativeRequire) {
            this._resolveAndFireUXP(event);
        } else {
            const files = Array.from(event.dataTransfer?.files || []).map(f => ({
                name: f.name,
                nativePath: '',
                type: f.type,
                size: f.size,
            }));
            this._fireDropEvent(event, files, 'drop');
        }
    }

    // ── UXP: async file entry resolution ────────────────────────────────────

    _resolveAndFireUXP(event) {
        const lfs = _nativeRequire('uxp').storage.localFileSystem;
        const dt = event.dataTransfer;
        const allItems = dt && dt.items ? Array.from(dt.items) : [];

        // UXP exposes two item kinds for Finder drags:
        //   kind='entry' (type='application/uxp-entry-type') — UXP-native entry
        //   kind='string' (type='com.apple.finder.node')     — macOS file-ref URL
        const uxpEntryItems = allItems.filter(item => item.kind === 'entry');
        const stringItems = allItems.filter(
            item => item.kind === 'string' && typeof item.getAsString === 'function'
        );

        if (uxpEntryItems.length === 0 && stringItems.length === 0) {
            this._fireDropEvent(event, [], 'drop');
            return;
        }

        // Promise.all replaces a manual pending counter, preventing double-finish bugs.
        // Use the length of the branch we actually iterate (not ||) to avoid
        // undercounting when uxpEntryItems.length < stringItems.length.

        // Promisify callback-based getAsString so we can use Promise.all.
        const getAsStringAsync = item =>
            new Promise(resolve => item.getAsString(resolve));

        // Resolve a string item (macOS URL) to a file descriptor.
        const resolveString = async item => {
            const url = await getAsStringAsync(item);
            try {
                const entry = await lfs.getEntryWithUrl(url);
                return _fileFromEntry(entry);
            } catch (_) {
                // getEntryWithUrl failed — store raw URL as nativePath.
                return { name: '', nativePath: url, type: '', size: 0 };
            }
        };

        // Resolve a UXP entry item to a file descriptor, falling back to its
        // paired string item (same index) when uxpGetAsEntry is unavailable.
        const resolveEntry = async (item, pairedStringItem) => {
            try {
                if (typeof item.uxpGetAsEntry === 'function') {
                    const entry = await Promise.resolve(item.uxpGetAsEntry());
                    if (entry) return _fileFromEntry(entry);
                }
            } catch (_) {}

            if (pairedStringItem) return resolveString(pairedStringItem);
            return _EMPTY_FILE;
        };

        const promises = uxpEntryItems.length > 0
            ? uxpEntryItems.map((item, i) => resolveEntry(item, stringItems[i]))
            : stringItems.map(item => resolveString(item));

        Promise.all(promises).then(resolved => {
            this._fireDropEvent(event, resolved, 'drop');
        });
    }

    // ── Fire sp-dropzone-drop with resolved + filtered file list ────────────

    /**
     * Dispatches sp-dropzone-drop.
     *
     * detail shape:
     *   {
     *     dataTransfer : DataTransfer | null,   // native dataTransfer (null for picker)
     *     nativeEvent  : DragEvent   | null,
     *     files        : Array<{ name, nativePath, type, size }>,
     *     source       : 'drop' | 'picker',
     *     rejected     : boolean,               // true if accept filter blocked all files
     *   }
     */
    _fireDropEvent(nativeEvent, files, source) {
        const accepted = (this._accept && files.length > 0)
            ? files.filter(f => isAccepted(f.name, f.type, this._accept))
            : files;
        const rejected = accepted.length === 0 && files.length > 0;

        this.dispatchEvent(new CustomEvent('sp-dropzone-drop', {
            bubbles: true,
            composed: true,
            detail: {
                dataTransfer: nativeEvent ? nativeEvent.dataTransfer : null,
                nativeEvent,
                files: rejected ? [] : accepted,
                source,
                rejected,
            },
        }));
    }

    // ── File picker ──────────────────────────────────────────────────────────

    /**
     * Opens the platform-native file picker.
     * On completion fires sp-dropzone-drop with the same detail shape as a drag drop.
     *
     * @param {object} options
     * @param {boolean} [options.multiple=false] - Allow selecting multiple files
     */
    openFilePicker({ multiple = false } = {}) {
        if (_nativeRequire) {
            // UXP: use localFileSystem.getFileForOpening()
            const lfs = _nativeRequire('uxp').storage.localFileSystem;
            const uxpTypes = acceptToUxpTypes(this._accept);
            const opts = { allowMultiple: multiple };
            if (uxpTypes) opts.types = uxpTypes;
            lfs.getFileForOpening(opts)
                .then(result => {
                    const arr = Array.isArray(result) ? result : (result ? [result] : []);
                    if (arr.length === 0) return; // user cancelled
                    const files = arr.map(f => {
                        const nativePath = f.nativePath || '';
                        const name = nativePath ? basename(nativePath) : (f.name || '');
                        return { name, nativePath, type: '', size: 0 };
                    });
                    this._fireDropEvent(null, files, 'picker');
                })
                .catch(() => { /* user cancelled or picker unavailable */ });
        } else {
            // Chrome: programmatically open a hidden <input type="file">
            const input = document.createElement('input');
            input.type = 'file';
            if (multiple) input.multiple = true;
            if (this._accept) input.accept = this._accept;
            input.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
            document.body.appendChild(input);

            let cleaned = false;
            const cleanup = () => {
                if (cleaned) return;
                cleaned = true;
                window.removeEventListener('focus', onWindowFocus);
                try { document.body.removeChild(input); } catch (_) {}
            };

            // Fallback for WebViews that don't fire 'cancel' (pre-Chromium 113):
            // the window regains focus when the OS file picker closes. A 300 ms delay lets
            // the 'change' event fire first when the user did select a file.
            const onWindowFocus = () => setTimeout(() => {
                if (document.body.contains(input)) cleanup();
            }, 300);
            window.addEventListener('focus', onWindowFocus, { once: true });

            input.addEventListener('change', () => {
                const files = Array.from(input.files || []).map(f => ({
                    name: f.name,
                    nativePath: '',
                    type: f.type,
                    size: f.size,
                }));
                cleanup();
                this._fireDropEvent(null, files, 'picker');
            });
            input.addEventListener('cancel', cleanup);
            input.click();
        }
    }
}

export { UxpDropzone as Dropzone };
