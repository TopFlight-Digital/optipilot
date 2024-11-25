<script lang="ts" setup>
import { DEVICE_TYPE_OPTIONS } from '@/constants';
import backwards from '@/icons/backwards.svg';
import forward from '@/icons/forward.svg';

const emit = defineEmits<{
    (event: `back`): void
    (event: `proceed`): void
}>();

const { scan } = useBloc();

</script>

<template>
    <div class="view">
        <div class="view__content">
            <app-view-header
                class="view__header"
                headline="About the web page"
                subline="Provide details about the specific web page you'd like me to analyse."
            />

            <app-scroll-view
                overrun="2rem"
            >
                <div class="view__form">
                    <app-input
                        v-model="scan.objective"
                        label="Objective"
                        hint="What are your goals for this scan? (e.g., improve usability, increase conversions)."
                        type="text"
                        :required="scan.$validation.objective.required"
                    />


                    <app-input
                        v-model="scan.data"
                        label="Upload webpage data"
                        hint="Upload qualitative and/or quantitative data that show how users interact with the specific web page. Upload as CSV, Excel, PDF, JPG, PNG or MP3."
                        type="file"
                        :required="scan.$validation.data.required"
                    />

                    <app-choice
                        v-model="scan.deviceType"
                        label="Device type"
                        hint="Choose the device type you would like to analyse."
                        required
                        :items="DEVICE_TYPE_OPTIONS"
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
                    label="Next"
                    :icon=forward
                    variant="primary"
                    wide
                    :disabled="scan.$validation.$invalid"
                    @click="emit(`proceed`)"
                />
            </div>

            <div
                class="view__navigation-copy"
            >
                <app-copy
                    type="Label 2"
                    color="cd"
                    v-text="`Step 2 of 2`"
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
        gap: 24px;
        height: 100%;
        overflow: hidden;
        padding-inline: var(--container-padding);
    }

    &__form {
        display: grid;
        gap: 25px;
    }

    &__navigation {
        padding-top: 1.5rem;
        padding-bottom: 1.25rem;
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

