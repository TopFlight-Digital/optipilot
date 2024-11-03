<script setup lang="ts">
import ProductView from '@/views/product.vue';
import ScanView from '@/views/scan.vue';

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

</script>

<template>
    <app-topbar />

    <backdrop-light />

    <div class="app__container">
        <app-tabs
            class="app__nav"
            :items="tabs"
            size="large"
            model-value="website"
        />

        <div
            v-if="bloc.ready"
            class="app__view"
        >
            <product-view
                v-if="step === `product`"
                @proceed="step = `scan`"
            />

            <scan-view
                v-else
                @back="step = `product`"
            />
        </div>
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
