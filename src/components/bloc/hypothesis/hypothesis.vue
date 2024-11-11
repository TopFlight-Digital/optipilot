<script setup lang="ts">
defineProps({
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
});

const { hostFavicon } = useBloc();
</script>

<template>
    <div class="bloc-hypothesis">
        <div
            class="bloc-hypothesis__image"
            :style="`--background-image: url(${hostFavicon})`"
        >
            <img
                :src=hostFavicon
            />
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
    padding: .5rem;
    gap: 10px;
    border-radius: .75rem;

    &__image {
        width: 94px;
        height: 112px;
        border-radius: 6px;
        border: 1px solid var(--color-47);
    }

    &__title,
    &__index {
        margin-bottom: .5rem;
    }

    &__content {
        margin-right: 2.5rem;
    }
}

.bloc-hypothesis__image::before {
    background-image: var(--background-image);
    background-position: center center;
    background-size: 200%;
    content: '';
    inset: 0;
    position: absolute;
    filter: blur(10px) brightness(.5);
    opacity: .5;
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
    padding: .5rem;
}
</style>
