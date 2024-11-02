<script setup lang="ts">
defineProps({
    /**
     * The ordinal number of the hypothesis, starting from 1.
     */
    index: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div class="bloc-hypothesis" />
</template>
