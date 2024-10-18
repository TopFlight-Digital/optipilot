<script setup lang="ts">
defineProps({
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    inline: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div
        class="app-copy"
    />
</template>
