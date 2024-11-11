<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    numerator: {
        type: Number,
        required: true,
    },
    denominator: {
        type: Number,
        default: 100,
    },
});

const progressBarStyle = computed(() => ({
    '--progress-indicator-width': `${(Math.min(props.numerator / props.denominator, 1)) * 100}%`,
}));
</script>

<template>
    <div class="app-progress-bar">
        <div
            class="app-progress-bar__indicator"
            :style="progressBarStyle"
        />
    </div>
</template>

<style lang="scss">
.app-progress-bar {
    --progress-bar-height: 12px;
    --progress-indicator-height: calc(var(--progress-bar-height) - 2px);

    height: var(--progress-bar-height);
    border: 1px solid var(--color-47);
    background: var(--color-0e);
    border-radius: 24px;

    &__indicator {
        background: var(--color-ab);
        width: var(--progress-indicator-width);
        height: var(--progress-indicator-height);
        border-radius: 20px;
        transition: width .3s;
    }
}
</style>
