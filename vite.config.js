import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    },
});
