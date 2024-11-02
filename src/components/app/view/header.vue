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
