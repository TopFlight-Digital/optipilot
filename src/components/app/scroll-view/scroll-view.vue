<template>
    <overlay-scrollbars-component
        class="scroll-view"
        :style="{ paddingBottom: overrun, '--overrun': overrun, }"
    >
        <slot />
    </overlay-scrollbars-component>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

defineProps({
    overrun: {
        type: String,
        default: `0`,
    },
});
</script>

<style lang="scss">
.scroll-view {
    overflow-y: scroll;
    padding-right: 2.25rem;
    padding-bottom: 0;

    .os-scrollbar-track {
        height: calc(100% - var(--overrun) + 4px) !important;
        width: 12px;
        position: relative;
        left: -5px;
        background: #0E1216 !important;
        border: 1px solid #47586e !important;
        padding-bottom: 2px !important;
    }

    .os-scrollbar-handle {
        width: 8px !important;
        position: relative;
        left: 1px;
        top: 1px !important;
        background: #ABAEE9 !important;
        border: 1px solid transparent !important;
        transition: .3s;

        &:hover {
            opacity: .75;
        }
    }
}
</style>

