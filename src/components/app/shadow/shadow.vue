<script setup lang="ts">
defineProps({
    aspectRatio: {
        type: Number,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div
        class="skeleton-box"
        :style="{ height }"
    >
        <div :style="{ paddingBottom: aspectRatio ? `${aspectRatio}%` : undefined }" />
    </div>
</template>

<style lang="scss" scoped>
.skeleton-box {
    display: inline-block;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    box-sizing: border-box;
    overflow: hidden;
    max-width: 100%;
    border-radius: .25rem;

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
        );
        animation: shimmer 1.5s infinite;
        content: '';
    }

    div {
        width: 100%;
        background: #cecece;
    }
}

@keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
}
</style>

