<script lang="ts" setup>
import backwards from '@/icons/backwards.svg';

const emit = defineEmits<{
    (event: `back`): void
    (event: `submit`): void
}>();

const { feedback } = useBloc();

</script>

<template>
    <div class="view">
        <div class="view__content">
            <app-view-header
                class="view__header"
                headline="Feedback"
                subline="Tell me about what you would like changed in these proposals."
            />

            <app-scroll-view
                overrun="2rem"
            >
                <div class="view__form">
                    <app-input
                        v-model="feedback.message"
                        label="Feedback"
                        hint="Tell me what I should amend in my proposals."
                        type="textarea"
                        :required="!!feedback.$validation.message.required"
                    />
                </div>
            </app-scroll-view>
        </div>


        <div class="view__navigation">
            <div class="view__navigation-buttons">
                <app-button
                    label="Back"
                    :icon=backwards
                    variant="secondary"
                    leader="icon"
                    @click="emit(`back`)"
                />

                <app-button
                    label="Submit"
                    variant="primary"
                    wide
                    :disabled="feedback.$validation.$invalid"
                    @click="emit(`submit`)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.view {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__content {
        display: grid;
        gap: 24px;
        height: 100%;
        overflow: hidden;
        padding-inline: var(--container-padding);
        align-items: baseline;
    }

    &__form {
        display: grid;
        gap: 25px;
    }

    &__navigation {
        padding-top: 1.5rem;
        padding-bottom: 1.75rem;
        background: #000;
        padding-inline: var(--container-padding);
        display: flex;
        flex-direction: column;
        gap: .75rem;
        align-items: center;

        &-buttons {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: 27px;
            width: 100%;
        }
    }
}
</style>

