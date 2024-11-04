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
</script>

<template>
    <div class="bloc-hypothesis">
        <img
            class="bloc-hypothesis__image"
            src="https://s3-alpha-sig.figma.com/img/f10a/4220/74db58c8d23fc4016d3fddacf0f80d7c?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wt8jB-SCsVtY-Zitk8hlvrAPRY8LTMB8-rxDoWX2MvKUt1DmArxTz4O~XnX4WeQ0b5guQBYydY6Ui5k-OUcC1LouGZKdu0NqCw6lVvN6SOSlexyXCkQJijxy0oGz6odg9FTbDO0cpBEbDV6qwi6oOMUcZICDmsCMO2Nb4d~yPGbuNbNW~YbDLkHT6NotswLGs1xX5LG2KJBwqP~BpN56jAyp0-Dm7wqeQ2ry2mIo6m9Q1yjkNd~gtk~7qLclWHjITMkx40RcY0l2FvL2mfi3I10DRaRbZhuFNJGLma8saD0v847J1EapS2UDRXCbiXm1ivxQNNvteWfh8AqGf5rmOg__"
        />

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
</style>
