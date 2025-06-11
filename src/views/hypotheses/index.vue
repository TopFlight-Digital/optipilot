<script lang="ts" setup>
import useScansByIds from '@/composables/scan';
import backwards from '@/icons/backwards.svg';
import forward from '@/icons/forward.svg';
import HypothesisView from '@/views/hypothesis.vue';
import { type TabSlug, tabs } from '.';

const props = defineProps({
    tab: {
        type: String as () => TabSlug,
        required: true,
    },
});

const emit = defineEmits<{
    (event: `edit`, scanId?: string): void
    (event: `update:tab`, value: TabSlug): void
}>();

const tabModel = useModel(props, `tab`);

const bloc = useBloc();
const hypothesisIndex = ref<number>();

const scans = useScansByIds(bloc.scanIds);
const scanIndex = ref<number>();

const scan = computed(() => {
    const index = scanIndex.value;

    if (index === undefined) {
        return;
    }

    return scans.value[index];
});

</script>

<template>
    <div
        v-if="hypothesisIndex === undefined"
        class="view"
    >
        <div class="view__content">
            <div class="view__header">
                <app-view-header
                    headline="Analysis results"
                    subline="Discover how to improve your website through the proposed changes below."
                />

                <app-tabs
                    v-model="tabModel"
                    size="small"
                    :items="tabs"
                />
            </div>

            <app-scroll-view
                overrun="0.5rem"
            >
                <div class="view__items">
                    <template v-if="tabModel === tabs[0].slug">
                        <bloc-hypothesis
                            v-for="(item, index) in bloc.hypotheses"
                            :key="item.title"
                            :index="index + 1"
                            :title="item.title"
                            :subtitle="item.description"
                            @click="hypothesisIndex = index"
                        />
                    </template>

                    <template v-else>
                        <template v-if="scan !== undefined">
                            <bloc-hypothesis
                                v-for="(item, index) in scan.value.hypotheses"
                                :key="item.title"
                                :index="index + 1"
                                :title="item.title"
                                :subtitle="item.description"
                                :icon="scan.value.icon"
                                @click="hypothesisIndex = index"
                            />
                        </template>

                        <template v-else>
                            <bloc-scan
                                v-for="(item, index) in scans"
                                :id="item.value.id"
                                :key="item.value.id"
                                :title="item.value.title"
                                :date="item.value.date"
                                :icon="item.value.icon"
                                :hypotheses="item.value.hypotheses"
                                @click="scanIndex = index"
                            />
                        </template>
                    </template>
                </div>

                <div
                    v-if="tabModel === tabs[0].slug || scan !== undefined"
                    class="view__navigation"
                    :class="{
                        'view__navigation--scan': scan !== undefined,
                    }"
                >
                    <app-button
                        v-if="scan !== undefined"
                        label="Back"
                        :icon=backwards
                        variant="secondary"
                        wide
                        leader="icon"
                        @click="scanIndex = undefined"
                    />

                    <app-button
                        label="Feedback"
                        :icon=forward
                        :variant="scan !== undefined ? `primary` : `secondary`"
                        wide
                        @click="scan ? emit(`edit`, scan.value.id) : emit(`edit`)"
                    />
                </div>
            </app-scroll-view>
        </div>
    </div>

    <hypothesis-view
        v-else
        :index="hypothesisIndex"
        :scan-id="tabModel === tabs[1].slug ? scan?.value.id : undefined"
        @back="hypothesisIndex = undefined"
    />
</template>

<style lang="scss" scoped>
.view {
    display: grid;
    height: 100%;

    &__header {
        display: grid;
        grid-template-columns: 2fr 1.2fr;
    }

    &__content {
        display: grid;
        gap: 24px;
        height: 100%;
        overflow: hidden;
        padding-inline: var(--container-padding);
    }

    &__items {
        display: grid;
        gap: 1.5rem;
    }

    &__navigation {
        padding-top: 1.75rem;
        padding-bottom: 1.75rem;
        display: flex;
        flex-direction: column;
        gap: .75rem;
        align-items: center;

        &--scan {
            display: grid;
            grid-template-columns: 1fr 3fr;
        }
    }
}
</style>
