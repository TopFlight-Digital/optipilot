<script lang="ts" setup>
import logo from '@/icons/logo.svg';
</script>

<template>
    <div class="logo">
        <div class="logo__optipilot">
            <app-icon :name=logo />

            <app-copy
                class="logo__optipilot-label"
                type="Body/b1-reg"
                color="f6"
                v-text="`OptiPilot`"
            />
        </div>
    </div>
</template>

<style lang="scss">
.logo {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 3px;

    &__optipilot {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        height: 24px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
