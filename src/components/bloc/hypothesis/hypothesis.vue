<script setup lang="ts">
const props = defineProps({
    /**
     * The ordinal number of the hypothesis, starting from 1.
     */
    index: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    liked: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(["toggle-like"]);

const { hostFavicon, scanId } = useBloc();
const scan = useScanById(scanId);
const iconSource = computed(
    () => props.icon ?? scan.value?.icon ?? hostFavicon,
);
</script>

<template>
    <div class="bloc-hypothesis">
        <!-- Heart Icon at Top Right -->
        <button
            class="heart-btn"
            :aria-label="props.liked ? 'Unlike' : 'Like'"
            @click.stop="emit('toggle-like')"
        >
            <svg
                v-if="props.liked"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
            </svg>
            <svg
                v-else
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
            </svg>
        </button>
        <!-- End Heart Icon -->
        <div
            class="bloc-hypothesis__image"
            :style="`--background-image: url(${iconSource})`"
        >
            <img :src="iconSource" />
        </div>

        <div class="bloc-hypothesis__content">
            <app-copy
                class="bloc-hypothesis__index"
                type="Label 2"
                color="cd"
                v-text="`Proposal ${index}`"
            />

            <app-copy
                class="bloc-hypothesis__title"
                type="Title/h3"
                color="f6"
                v-text="title"
            />

            <app-copy
                class="bloc-hypothesis__subtitle"
                type="Body/b1-med"
                color="cd"
                v-text="subtitle"
            />
        </div>
    </div>
</template>

<style lang="scss">
.bloc-hypothesis {
    display: grid;
    grid-template-columns: auto 1fr;
    background: var(--color-0e);
    border: 1px solid var(--color-47);
    box-shadow: 0px 4px 4px 0px #00000040;
    padding: 0.5rem;
    gap: 10px;
    border-radius: 0.75rem;
    cursor: pointer;
    position: relative;

    &__image {
        width: 94px;
        height: 112px;
        border-radius: 6px;
        border: 1px solid var(--color-47);
    }

    &__title,
    &__index {
        margin-bottom: 0.5rem;
    }

    &__content {
        margin-right: 2.5rem;
    }
}

.bloc-hypothesis__image::before {
    background-image: var(--background-image);
    background-position: center center;
    background-size: 200%;
    content: "";
    inset: 0;
    position: absolute;
    filter: blur(10px) brightness(0.5);
    opacity: 0.5;
}

.bloc-hypothesis__image img {
    max-width: 100%;
    height: 100%;
    z-index: 1;
    position: relative;
    object-fit: scale-down;
    object-position: center center;
}

.bloc-hypothesis__image {
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
}

.heart-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 2;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s;
}
.heart-btn:active {
    transform: scale(1.1);
}
</style>
