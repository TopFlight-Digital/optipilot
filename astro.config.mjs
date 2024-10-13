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
            // eslint-disable-next-line unicorn/no-unreadable-iife
            (config => ({
                name: `gfa`,
                async load(source, { ssr }) {
                    console.log(`source`, source);
                    if (ssr || !source.endsWith(`.mjs`))
                        return;

                    const baseURL = `https://fonts.googleapis.com/css2`;
                    const { families } = config;

                    const fontParameters = families.map(({ name, styles }) => {
                        return `family=${encodeURIComponent(name)}:${styles}`;
                    }).join(`&`);

                    const googleFontLink = `${baseURL}?${fontParameters}&display=swap`;
                    const codeToReturn = `document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="${googleFontLink}">');`;

                    return {
                        code: codeToReturn,
                        moduleSideEffects: true, // Add this line
                    };
                },
            }))({
                families: [
                    {
                        name: `Figtree`,
                        styles: `ital,wght@0,300..900;1,300..900`,
                    },
                ],
            }),
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
