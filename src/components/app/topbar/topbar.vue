<script lang="ts" setup>
</script>

<template>
    <div
        class="app-topbar"
    >
        <app-logo />

        <div
            class="app-topbar__slot"
        >
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app-topbar {
    height: 40px;
    background-color: #0D1013;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    position: relative;
    padding-inline: 0;
    display: grid;
    grid-template-columns: 145px 132px 145px;

    .logo {
        padding-right: 8px;
    }

    &__slot {
    }
}
</style>
