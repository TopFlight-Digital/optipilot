<script lang="ts" setup>
</script>

<template>
    <div
        class="app-topbar"
    >
        <div
            class="app-topbar__slot"
        >
            <slot />
        </div>

        <app-logo />
    </div>
</template>

<style lang="scss" scoped>
.app-topbar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--container-padding);
    z-index: 1;
    position: relative;

    &__slot {
    }
}
</style>
