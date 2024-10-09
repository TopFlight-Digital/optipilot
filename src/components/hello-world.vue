<script setup lang="ts">
const { x, y, sourceType } = useMouse();

const count = ref(0);
</script>

<template>
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
        <div>
            <p v-text="`x: ${x}`" />

            <p v-text="`y: ${y}`" />
        </div>

        <app-button
            type="button"
            @click="count++"
            v-text="`Increment ${count}`"
        />
    </div>
</template>
