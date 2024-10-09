import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            directoryAsNamespace: true,
            collapseSamePrefixes: true,
        }),
        AutoImport({
            imports: [
                `vue`,
                `@vueuse/core`,
            ],
            dirs: [
                `src/use/**`,
            ],
            vueTemplate: false,
        }),
        createSvgSpritePlugin({
            symbolId: `icon-[name]-[hash]`,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL(`src`, import.meta.url)),
        },
    },
});
