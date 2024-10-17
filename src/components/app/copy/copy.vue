<script setup lang="ts">
defineProps({
    type: {
        type: String,
        required: true,
    },
    inline: {
        type: Boolean,
        default: false,
    },
})
</script>

<!-- TODO: Remove hardcoded [style] -->
<template>
    <div class="app-copy" style="color:#fff" />
</template>
