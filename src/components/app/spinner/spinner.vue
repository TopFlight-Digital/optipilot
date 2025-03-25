<script lang="ts" setup>
import VSpinner from 'vue-spinner/src/RingLoader.vue';

defineProps({
    color: {
        type: String,
        default: `#090B0E`,
    },
    size: {
        type: String,
        default: `24px`,
    },
});

</script>

<template>
    <v-spinner
        :color="color"
        :size="size"
    />
</template>
