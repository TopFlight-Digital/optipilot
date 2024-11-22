<script lang="ts" setup>
const emit = defineEmits<{
    (event: `back`): void
    (event: `proceed`): void
}>();

const { progress } = useBloc();

const tab = useTab();

</script>

<template>
    <div class="view">
        <div class="view__content">
            <app-copy
                type="Title/h1"
                color="f6"
                v-text="`Scanning page...`"
            />

            <app-copy
                type="Title/h3"
                color="cd"
                class="view__subheader"
                v-text="tab.url"
            />

            <app-copy
                type="Title/h4"
                color="cd"
                v-text="progress.message"
            />

            <app-progress-bar
                class="view__progress"
                :numerator="progress.numerator"
                :denominator="progress.denominator"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.view {
    display: grid;
    height: 100%;
    padding-bottom: 3.75rem;

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        overflow: hidden;
        padding-inline: var(--container-padding);
        row-gap: 44px;
    }

    &__subheader {
        margin-top: -2rem;
    }

    &__progress {
        width: 100%;
        max-width: 460px;
    }
}
</style>

