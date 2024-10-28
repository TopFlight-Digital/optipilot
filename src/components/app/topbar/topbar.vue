<script lang="ts" setup>
import x from "@/icons/x.svg";
const window = globalThis;
</script>

<template>
    <div
        class="app-topbar"
    >
        <app-icon
            class="app-topbar__close"
            :name=x
            role="button"
            @click="window.close"
        />

        <app-logo />
    </div>
</template>

<style lang="scss" scoped>
.app-topbar {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--container-padding);
    background: #0D1013;
    z-index: 1;
    position: relative;

    &__close {
        width: 14px;
        height: 14px;
        cursor: pointer;
        color: var(--text-color-mid);
    }
}
</style>
