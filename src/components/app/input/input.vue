<script lang="ts" setup>
import { Body, Meta, UppyFile } from '@uppy/core';

type Model = typeof props.type extends `file` ? UppyFile<Meta, Body>[] : string;

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    hint: String,
    type: {
        type: String as () => `text` | `textarea` | `file`,
        default: `text`,
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const model = defineModel<Model>();

</script>

<template>
    <label
        class="app-input"
        :class="{ 'app-input--required': required }"
    >
        <div class="app-input__overview">
            <div class="app-input__description">
                <app-copy
                    class="app-input__label"
                    type="Title/h2"
                    color="light"
                    inline
                    v-text="label"
                />

                <app-copy
                    v-if="hint"
                    class="app-input__hint"
                    type="Label 1"
                    color="mid"
                    v-text="hint"
                />
            </div>

            <div class="app-input__description-extra">
                <slot name="label:after" />
            </div>
        </div>

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
    </label>
</template>

<style lang="scss">
.app-input__description {
    display: flex;
    flex-direction: column;
    row-gap: 9.5px;
    max-width: 500px;
}

.app-input {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &--required {
        .app-input__label {
            &::after {
                color: var(--text-color-mid);
                content: '*';
            }
        }
    }
}

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
