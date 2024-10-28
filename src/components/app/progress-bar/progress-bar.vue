<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    numerator: {
        type: Number,
        reguired: true,
    },
    denominator: {
        type: Number,
        default: () => 100,
    },
});

const progressBarStyle = computed(() => ({
    '--progress-bar-width': `${(props.numerator as number / props.denominator) * 100}%`,
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
    border: 1px solid var(--color-edge-primary);
    background: var(--color-backdrop-primary);
    border-radius: 24px;

    &__indicator {
        background: var(--color-primary);
        width: var(--progress-bar-width);
        height: 10px;
        border-radius: 20px;
    }
}
</style>
