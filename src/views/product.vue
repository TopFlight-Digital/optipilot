<script lang="ts" setup>
import forward from '@/icons/forward.svg';

const emit = defineEmits<{
    (event: `proceed`): void
}>();
</script>

<template>
    <div class="view">
        <div class="view__content">
            <div class="view__header">
                <app-view-header
                    headline="About your website"
                    subline="Help me understand your website so I can scan and analyse it effectively."
                />
            </div>

            <app-scroll-view
                overrun="2rem"
            >
                <div class="view__form">
                    <app-input
                        label="Website address"
                        hint="Enter your website’s URL."
                        type="text"
                        required
                    />

                    <app-input
                        label="Primary goal"
                        hint="What is the main purpose of your website?"
                        type="text"
                        required
                    />

                    <app-input
                        label="Additional goals"
                        hint="Does your website have any other goals?"
                        type="text"
                    />

                    <app-input
                        label="Business details"
                        hint="Tell me about your business or brand."
                        type="textarea"
                        required
                    />

                    <app-input
                        label="Upload website data"
                        hint="Upload qualitative and/or quantitative data that show how users interact with your website. Upload as CSV, Excel, PDF, JPG, PNG or MP3."
                        type="file"
                        required
                    />
                </div>
            </app-scroll-view>
        </div>


        <div class="view__navigation">
            <app-button
                label="Next"
                :icon=forward
                variant="primary"
                wide
                @click="emit(`proceed`)"
            />

            <div
                class="view__navigation-copy"
            >
                <app-copy
                    type="Label 2"
                    color="mid"
                    v-text="`Step 1 of 2`"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.view {
    display: grid;
    height: 100%;

    &__content {
        display: grid;
        gap: 40.5px;
        height: 100%;
        overflow: hidden;
        padding-inline: var(--container-padding);
    }

    &__header {
        display: grid;
        gap: 13px;
        padding-right: 1.5rem;
    }

    &__form {
        display: grid;
        gap: 25px;
    }

    &__navigation {
        padding-top: 2.5rem;
        padding-bottom: 1.75rem;
        background: #000;
        padding-inline: var(--container-padding);
        display: flex;
        flex-direction: column;
        gap: .75rem;
        align-items: center;
    }
}
</style>

