<script setup lang="ts">
import ProductView from '@/views/product.vue';
import ScanView from '@/views/scan.vue';
import LoadingView from '@/views/loading.vue';
import AnalysisView from '@/views/analysis.vue';

const step = ref<`product` | `scan`>(`product`);

const tabs = [
    {
        slug: `website`,
        label: `Website`,
    },
    {
        slug: `analysis`,
        label: `Analysis`,
    },
];

const bloc = defineBloc();

useChromeExtension(tab => {
    initBloc(tab);
});

const submitting = ref(false);

async function submit() {
    submitting.value = true;
    await bloc.submit();
    submitting.value = false;
}

const tab = ref<typeof tabs[number][`slug`]>(`website`);

watchDeep(
    () => bloc.hypotheses,
    now => {
        if (!now.length) return;
        tab.value = `analysis`;
    },
);

</script>

<template>
    <app-topbar />

    <backdrop-light />

    <div class="app__container">
        <template v-if="!submitting">
            <app-tabs
                v-model="tab"
                class="app__nav"
                :items="tabs"
                size="large"
            />

            <div
                v-if="bloc.ready"
                class="app__view"
            >
                <template v-if="tab === `website`">
                    <product-view
                        v-if="step === `product`"
                        @proceed="step = `scan`"
                    />

                    <scan-view
                        v-else
                        @back="step = `product`"
                        @proceed="submit"
                    />
                </template>

                <template v-else-if="tab === `analysis`">
                    <analysis-view />
                </template>
            </div>
        </template>

        <loading-view v-else />
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

.app__container {
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    position: relative;
    z-index: 1;
}

.app__view > * {
    height: 100%;
    overflow: hidden;
}

.app__view {
    height: 100%;
    overflow: hidden;
    padding-top: 2rem;
}

.app__nav {
    width: 20.5rem;
    margin-inline: auto;
    z-index: 1;
    position: relative;
}
</style>
