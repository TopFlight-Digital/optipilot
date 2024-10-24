<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    inline: {
        type: Boolean,
        default: false,
    },
});

const style = computed(() => ({
    '--app-copy-text-color': `var(--text-color-${props.color})`,
    '--app-copy-display': props.inline ? `inline` : `block`,
}));
</script>

<template>
    <div
        class="app-copy"
        :class="[`app-copy--${props.type.toLowerCase().replace(` `, `-`).replace(`/`, `-`)}`]"
        :style="style"
    />
</template>

<style lang="scss">
    .app-copy {
        display: var(--app-copy-display);
        color: var(--app-copy-text-color);
        font-family: Figtree;
        font-weight: 500;
        line-height: 1.5rem;
        letter-spacing: -0.01em;

        &--title {
            &-h1 {
                font-size: 24px;
                line-height: 27.6px;
            }

            &-h2 {
                font-size: 20px;
                line-height: 23px;

            }

            &-h3 {
                font-size: 18px;
                line-height: 27px;
            }

            &-h4 {
                font-size: 16px;
                line-height: 24px;
            }
        }

        &--label-1 {
            font-size: 14px;
            line-height: 18px;
        }

        &--label-2 {
            font-size: 12px;
            line-height: 15px;
        }

        &--body-b1-reg {
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            letter-spacing: normal;
        }
    }
</style>
