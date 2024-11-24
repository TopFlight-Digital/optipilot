<script setup lang="ts">
import Uppy, { Body, Meta, UppyFile } from '@uppy/core';
import DragDrop from '@uppy/vue/lib/drag-drop.js';
import DropTarget from '@uppy/drop-target';
import image from '@/icons/image.svg';
import upload from '@/icons/upload.svg';
import { onMounted, ref } from 'vue';
import { watchDeep } from '@vueuse/core';

const root = ref();
const model = defineModel<UppyFile<Meta, Body>[]>();

const files = ref(new Map<string, UppyFile<Meta, Body>>(
    model.value?.map(file => [file.id, file]) ?? [],
));

const core = new Uppy();

core.on(`files-added`, data => {
    for (const file of data)
        files.value.set(file.id, file);
});

onMounted(() => {
    core.use(DropTarget, {
        target: root.value,
    });
});

watchDeep(
    files,
    now => {
        model.value = [...now.values()];
    },
);
</script>

<template>
    <label
        ref="root"
        class="app-uploader"
    >
        <drag-drop
            class="app-uploader__core"
            :uppy="core"
        />

        <div
            v-if="files.size"
            class="app-uploader__items"
        >
            <div
                v-for="[id, item] in files"
                :key="id"
                class="app-uploader__item"
            >
                <span
                    class="app-uploader__item-title"
                    v-text="item.name"
                />

                <app-icon
                    class="app-uploader__item-icon"
                    :name="image"
                />
            </div>
        </div>

        <app-icon
            v-else
            class="app-uploader__icon"
            :name="upload"
        />
    </label>
</template>

<style lang="scss">
.app-uploader {
    border: 1px solid var(--color-47);
    padding: 18px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: var(--color-0e);
    height: 132px;
    box-sizing: border-box;
    max-width: 500px;
    cursor: pointer;

    &__core {
        display: none;
    }

    &__icon {
        color: var(--color-cd);
        width: 24px;
        height: 24px;
    }

    &__items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        height: 100%;
        width: 100%;
        max-width: 100%;
        overflow: auto;
        grid-template-rows: 20px;
    }

    &__item {
        background: #373F50;
        border-radius: 4px;
        //styleName: Label 2;
        font-family: Figtree;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: -0.01em;
        color: var(--color-f6);
        padding: 2px 2px 2px 4px;
        height: fit-content;
        display: grid;
        column-gap: 4px;
        align-items: center;
        grid-auto-flow: column;
        width: 100%;
        box-sizing: border-box;
    }

    &__item-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &__item-icon {
        width: 17px;
        height: 16.5px;
        justify-self: end;
    }
}
</style>
