<script lang="ts" setup>
import forward from '@/icons/forward.svg';
import HypothesisView from '@/views/hypothesis.vue';

const emit = defineEmits<{
    (event: `edit`): void
}>();

const { hypotheses } = useBloc();

const hypothesisIndex = ref<number>();

</script>

<template>
    <div
        v-if="hypothesisIndex === undefined"
        class="view"
    >
        <div class="view__content">
            <app-view-header
                class="view__header"
                headline="Analysis results"
                subline="Discover how to improve your website through the proposed changes below."
            />

            <app-scroll-view
                overrun="2rem"
            >
                <div class="view__items">
                    <bloc-hypothesis
                        v-for="(item, index) in hypotheses"
                        :key="item.title"
                        :index="index + 1"
                        :title="item.title"
                        :subtitle="item.description"
                        @click="hypothesisIndex = index"
                    />
                </div>
            </app-scroll-view>
        </div>


        <div class="view__navigation">
            <app-button
                label="Feedback"
                :icon=forward
                variant="secondary"
                wide
                @click="emit(`edit`)"
            />
        </div>
    </div>

    <hypothesis-view
        v-else
        :index="hypothesisIndex"
        @back="hypothesisIndex = undefined"
    />
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

    &__items {
        display: grid;
        gap: 1.5rem;
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

