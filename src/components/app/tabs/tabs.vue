<script setup lang="ts">
defineProps({
    items: {
        type: Array,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
});

const model = defineModel();
</script>

<template>
    <div class="app-tabs" />
</template>
