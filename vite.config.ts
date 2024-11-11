import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig({
    define: {
        OPENAI_API_KEY: JSON.stringify(``),
    },
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
                `src/composables/**`,
            ],
            vueTemplate: false,
        }),
        createSvgSpritePlugin({
            symbolId: `icon-[name]-[hash]`,
        }),
        Unfonts({
            google: {
                families: [
                    {
                        name: `Figtree`,
                        styles: `ital,wght@0,300..900;1,300..900`,
                        defer: false,
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL(`src`, import.meta.url)),
        },
    },
});
