<script setup lang="ts">
import { vTooltip } from 'floating-vue';
import iCircle from '@/icons/i-circle.svg';

</script>

<template>
    <app-icon
        class="app-tooltip__icon"
        :name="iCircle"
    />

    <v-tooltip>
        hello
        <template #popper>
            <span class="app-tooltip__icon">Help me fund my Open Source work!</span>
        </template>
    </v-tooltip>
</template>

<style lang="scss">
.app-tooltip {
    &__icon {
        color: var(--color-f6);
    }
}
</style>
