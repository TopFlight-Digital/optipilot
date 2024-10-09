import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import astrobook from "astrobook";
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

/**
 * https://astro.build/config
 */
export default defineConfig({
    integrations: [vue(), astrobook()],
    vite: {
        resolve: {
            alias: {
                '@': fileURLToPath(new URL(`src`, import.meta.url)),
            },
        },
        plugins: [
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
    },
});
