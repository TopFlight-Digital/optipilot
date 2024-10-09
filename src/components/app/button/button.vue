<script lang="ts" setup>
defineProps({
    label: String,
    icon: String,
});
</script>

<template>
    <button
        type="button"
    >
        {{ label }}
        <app-icon
            v-if="icon"
            :name="icon"
        />
    </button>
</template>
