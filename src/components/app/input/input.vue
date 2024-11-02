<script lang="ts" setup>
import { Body, Meta, UppyFile } from '@uppy/core';
import { FIELD_PROPS } from '../field/field';

type Model = typeof props.type extends `file` ? UppyFile<Meta, Body>[] : string;

const props = defineProps({
    ...FIELD_PROPS,
    type: {
        type: String as () => `text` | `textarea` | `file`,
        default: `text`,
    },
});

const model = defineModel<Model>();

</script>

<template>
    <app-field
        :label="label"
        :hint="hint"
        :required="required"
        class="app-input"
    >
        <template #label:after>
            <slot name="label:after" />
        </template>

        <textarea
            v-if="type === `textarea`"
            v-model="model"
        />

        <app-uploader
            v-else-if="type === `file`"
            v-model="model"
        />

        <input
            v-else
            v-model="model"
            :type="type"
        />
    </app-field>
</template>

<style lang="scss">
.app-input {
    input,
    textarea {
        //styleName: Body/b1-reg;
        font-family: Figtree;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        padding: 10.5px 15px 10.5px 20px;
        border-radius: 12px;
        background-color: var(--color-backdrop-primary);
        border: 1px solid var(--color-edge-primary);
        box-shadow: 0px 4px 4px 0px #00000040;
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;
        color: var(--text-color-light);
    }

    textarea {
        height: 132px;
        resize: none;
    }
}
</style>
