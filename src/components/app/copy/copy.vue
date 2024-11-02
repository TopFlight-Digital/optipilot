<script setup lang="ts">
import { computed } from 'vue';

/** Typography style names as seen in Figma. */
type Type =
  | `Title/h1`
  | `Title/h2`
  | `Title/h3`
  | `Title/h4`
  | `Label 2`
  | `Button 2/label 1`
  | `Body/b1-med`
  | `Body/b1-reg`;

const props = defineProps({
    type: {
        type: String as () => Type,
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
    '--app-copy-text-color': `var(--color-${props.color})`,
    '--app-copy-display': props.inline ? `inline` : `block`,
}));
</script>

<template>
    <div
        class="app-copy"
        :class="[`app-copy--${props.type.toLowerCase().replace(/[ \/]/g, `-`)}`]"
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
            line-height: 17.5px;
            letter-spacing: 0;
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

        &--body-b1-med {
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            letter-spacing: .003em;
        }

        &--button-2-label-1 {
            font-size: 14px;
            font-weight: 500;
            line-height: 17.5px;
        }
    }
</style>
