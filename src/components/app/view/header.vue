<script lang="ts" setup>
defineProps({
    headline: {
        type: String,
    },
    subline: {
        type: String,
    },
});
</script>

<template>
    <div class="app-view-header">
        <app-copy
            v-if="headline"
            type="Title/h1"
            color="f6"
            v-text="headline"
        />

        <app-copy
            v-if="subline"
            type="Title/h4"
            color="cd"
            v-text="subline"
        />
    </div>
</template>

<style lang="scss" scoped>
.app-view-header {
    display: grid;
    gap: 13px;
    padding-right: 1.5rem;
}
</style>
