<script lang="ts" setup>
import topflight from '@/icons/topflight.svg';
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

        <a
            class="app-topbar__made-by"
            href="https://top-flight-digital.com"
            target="_blank"
        >
            <app-copy
                class="app-topbar__made-by-label"
                type="Label 2"
                color="f6"
                v-text="`by TopFlight Digital`"
            />

            <app-icon :name=topflight />
        </a>
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
    padding-inline: .125rem 1rem;
    display: grid;
    grid-template-columns: 145px 132px 145px;

    .logo {
        padding-right: 8px;
    }

    &__made-by {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        height: 24px;
        user-select: none;

        &-label {
            font-size: 10px !important;
            opacity: .625;
        }

        svg {
            width: 15px;
        }
    }
}
</style>
