<script lang="ts" setup>
const emit = defineEmits<{
    (event: `return`): void
}>();
</script>

<template>
    <div class="app__container">
        <app-copy
            type="Title/h1"
            color="cd"
            v-text="`An error occurred`"
        />

        <div class="app__container-text">
            <app-copy
                type="Title/h3"
                color="cd"
                v-text="`Something went wrong while processing your scan, please try again.`"
            />
        </div>

        <app-button
            :label="`Return`"
            variant="primary"
            @click="emit(`return`)"
        />
    </div>
</template>

<style lang="scss" scoped>

.app__container {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    align-items: center;
    justify-content: center;
    height: 100%;

    &-text {
        padding: 0 86px;
        text-align: center;
    }
}

</style>

