<script lang="ts" setup>
import FeedbackView from '@/views/feedback.vue';
import HypothesesView from '@/views/hypotheses/index.vue';
import { TabSlug } from './hypotheses';
const view = ref(`hypotheses`);
const { submitFeedback } = useBloc();
const scanId = ref<string>();

function onEdit(id?: string) {
    scanId.value = id;
    view.value = `feedback`;
}

const tab = ref<TabSlug>(`current`);
</script>

<template>
    <hypotheses-view
        v-if="view === `hypotheses`"
        v-model:tab="tab"
        @edit="onEdit"
    />

    <feedback-view
        v-else-if="view === `feedback`"
        @back="view = `hypotheses`"
        @submit="submitFeedback(scanId)"
    />
</template>

<style lang="scss" scoped>
</style>
