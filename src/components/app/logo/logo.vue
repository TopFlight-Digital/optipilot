<script lang="ts" setup>
import logo from '@/icons/logo.svg';
</script>

<template>
    <div class="logo">
        <app-icon :name=logo />

        <h2> OptiPilot </h2>
    </div>
</template>

<style lang="scss">
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.125rem;
    width: 9.125rem;
    height: 42.91px;

    svg {
        width: 30px;
        height: 30.65px;
    }

    h2 {
        font-family: Figtree;
        font-size: 20px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: -0.01em;
        text-align: center;
        color: var(--text-color-light);
    }
}
</style>
