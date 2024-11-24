<script lang="ts" setup>
import download from '@/icons/download.svg';
import backwards from '@/icons/backwards.svg';

const props = defineProps({
    index: {
        type: Number,
        required: true,
    },
    scanId: {
        type: String,
        required: false,
    },
});

const emit = defineEmits<{
    (event: `edit`): void
}>();

const { hypotheses } = useBloc();

const scan = computed(() => {
    if (!props.scanId) return;
    return useScanById(props.scanId).value;
});

const item = computed(() => {
    return (scan.value?.hypotheses ?? hypotheses)[props.index];
});

function downloadProposal() {}

</script>

<template>
    <div class="view">
        <div class="view__content">
            <div class="view__header">
                <app-copy
                    class="view__preheading"
                    type="Button 2/label 1"
                    v-text="`Proposal ${index + 1}`"
                />

                <app-view-header
                    :headline="item.title"
                    :subline="item.description"
                />
            </div>

            <app-scroll-view
                overrun="2rem"
            >
                <div class="view__items" />
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
                    label="Download proposal"
                    :icon=download
                    variant="primary"
                    wide
                    @click="downloadProposal"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.view {
    display: grid;
    height: 100%;

    &__preheading {
        margin-bottom: .5rem;
    }

    &__header {
        border-bottom: 1px solid var(--color-47);
        padding-bottom: 1.25rem;
    }

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

        &-buttons {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: 27px;
            width: 100%;
        }
    }
}
</style>

