<script lang="ts" setup>
import HypothesesView from '@/views/hypotheses.vue';
import FeedbackView from '@/views/feedback.vue';

const view = ref(`hypotheses`);
const { submitFeedback } = useBloc();
</script>

<template>
    <hypotheses-view
        v-if="view === `hypotheses`"
        @edit="view = `feedback`"
    />

    <feedback-view
        v-else-if="view === `feedback`"
        @back="view = `hypotheses`"
        @submit="submitFeedback"
    />
</template>

<style lang="scss" scoped>
</style>

