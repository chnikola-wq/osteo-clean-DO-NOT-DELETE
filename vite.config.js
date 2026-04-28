import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Short legal banner prepended to every emitted JS chunk. Written as a
// `/*! ... */` "legal comment" so it is preserved by esbuild's minifier
// and by anyone who later runs the bundle through a beautifier. The
// full terms live in /LICENSE at the repository root; the banner only
// has to put copy/reuse on notice.
const LICENSE_BANNER = `/*!
 * Locked Plating: Clinical Guidelines & Biomechanics
 * Copyright (c) 2026 chnikola-wq. All rights reserved.
 *
 * Proprietary and confidential. No license is granted to copy,
 * redistribute, reverse-engineer, de-minify, or use this code (or any
 * bundled textual content) to train machine-learning models. See the
 * LICENSE file in the source repository for the full terms.
 *
 * This application is a teaching aid and is NOT a medical device.
 */`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Disable source maps in production so the compiled JSX
        // bundle ships without an accompanying readable copy of
        // the React source.
        sourcemap: false,
        // Use esbuild's default minification (fast, mangles names).
        minify: 'esbuild',
        target: 'es2020',
        rollupOptions: {
            output: {
                // Rollup adds the banner AFTER esbuild minification, so
                // it survives regardless of esbuild's `legalComments`
                // setting and lands as the first bytes of every JS
                // chunk that downstream viewers see.
                banner: LICENSE_BANNER,
            },
        },
    },
});
