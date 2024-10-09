<script lang="ts" setup>
defineProps({
    name: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <svg>
        <use
            :xlink:href="`#${name}`"
        />
    </svg>
</template>
