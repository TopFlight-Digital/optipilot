<script lang="ts" setup>
import logo from '@/icons/logo.svg';
</script>

<template>
    <div class="logo">
        <app-icon :name=logo />

        <app-copy
            type="Title/h4"
            color="f6"
            v-text="`OptiPilot`"
        />
    </div>
</template>

<style lang="scss">
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    height: 24px;

    svg {
        width: 20px;
        height: 20.43px;
    }
}
</style>
