<script lang="ts" setup>
import forward from '@/icons/forward.svg';

const emit = defineEmits<{
    (event: `proceed`): void
}>();

const { product } = useBloc();

</script>

<template>
    <div class="view">
        <div class="view__content">
            <app-scroll-view
                overrun="2rem"
            >
                <app-view-header
                    class="view__header"
                    headline="About your product"
                    subline="Help me understand your product so I can scan and analyse it effectively."
                />

                <div class="view__form">
                    <app-input
                        v-model="product.overview"
                        label="Business details"
                        hint="Tell me about your business or brand."
                        type="textarea"
                        :required="product.$validation.overview.required"
                    />

                    <app-input
                        v-model="product.details"
                        label="Page details"
                        hint="Optionally provide some additional details about this page."
                        type="textarea"
                        :required="product.$validation.details.required"
                    />
                </div>

                <div class="view__navigation">
                    <app-button
                        label="Next"
                        :icon=forward
                        variant="primary"
                        wide
                        :disabled="product.$validation.$invalid"
                        @click="emit(`proceed`)"
                    />

                    <div
                        class="view__navigation-copy"
                    >
                        <app-copy
                            type="Label 2"
                            color="cd"
                            v-text="`Step 1 of 2`"
                        />
                    </div>
                </div>
            </app-scroll-view>
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
        padding-top: 4.75rem;
        margin-bottom: -1.75rem;
        display: flex;
        flex-direction: column;
        gap: .75rem;
        align-items: center;
    }
}
</style>

