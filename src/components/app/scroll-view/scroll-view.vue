<template>
    <overlay-scrollbars-component
        ref="scrollContainer"
        class="scroll-view"
        :style="{ paddingBottom: overrun, '--overrun': overrun, '--scroll-color': scrollColor}"
        @os-scroll="onScroll"
    >
        <slot />
    </overlay-scrollbars-component>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { watchOnce } from '@vueuse/core';
import { OverlayScrollbars } from "overlayscrollbars";

defineProps({
    overrun: {
        type: String,
        default: `0`,
    },
});

const scrollColor = ref(`var(--color-ab)`);
const scrollContainer = ref();
const osInstance = ref<OverlayScrollbars>();

watchOnce(
    () => !!scrollContainer.value,
    () => {
        osInstance.value = scrollContainer.value.osInstance();
    },
);

function onScroll() {
    if (osInstance.value) {
        const { scrollTop } = osInstance.value.elements().viewport;
        console.log( scrollTop, osInstance.value.state().scrollCoordinates.end.y, osInstance.value.state());
        scrollColor.value = scrollTop + 1 >= osInstance.value.state().scrollCoordinates.end.y
            ? `var(--color-47)`
            : `var(--color-ab)`;
    }
};

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
        background: var(--scroll-color) !important;
        border: 1px solid transparent !important;
        transition: .3s;

        &:hover {
            opacity: .75;
        }
    }
}
</style>

