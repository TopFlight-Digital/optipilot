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
    <div class="view__header">
        <app-copy
            v-if="headline"
            type="Title/h1"
            color="light"
            v-text="headline"
        />

        <app-copy
            v-if="subline"
            type="Title/h4"
            color="mid"
            v-text="subline"
        />
    </div>
</template>
