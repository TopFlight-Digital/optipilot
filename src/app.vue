<script setup lang="ts">
import ProductView from '@/views/product.vue';
import ScanView from '@/views/scan.vue';
import LoadingView from '@/views/loading.vue';
import AnalysisView from '@/views/analysis.vue';
import ErrorView from '@/views/error.vue';

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

const tab = ref<typeof tabs[number][`slug`]>(`website`);

watchDeep(
    () => bloc.hypotheses,
    now => {
        if (!now.length) return;
        tab.value = `analysis`;
    },
);

const resetError = () => {
    bloc.resetError();
    step.value = `product`;
};

</script>

<template>
    <app-topbar>
        <app-tabs
            v-model="tab"
            class="app__nav"
            :items="tabs"
            size="large"
            minimalistic
        />
    </app-topbar>

    <backdrop-light />

    <div class="app__container">
        <template v-if="bloc.backendErrorOccured">
            <div class="app__view">
                <error-view
                    @return="resetError"
                />
            </div>
        </template>

        <template v-else-if="!bloc.pending">
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
                        @proceed="bloc.submit"
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
    height: calc(100% - 85px);
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
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
}

.app__nav {
    margin-inline: auto;
    z-index: 1;
    position: relative;
}
</style>
