<script lang="ts" setup>
import { FIELD_PROPS } from '../field/field';
import type { Item } from './choice';
import circle from '@/icons/circle.svg';
import check_circle from '@/icons/check-circle.svg';

defineProps({
    ...FIELD_PROPS,
    items: {
        type: Array<Item>,
        required: true,
    },
});

const model = defineModel<Item[`slug`]>();

</script>

<template>
    <app-field
        :label="label"
        :hint="hint"
        :required="required"
        class="app-choice"
    >
        <template #label:after>
            <slot name="label:after" />
        </template>

        <div class="app-choice__items">
            <div
                v-for="item in items"
                :key="item.slug"
                class="app-choice__item"
                @click="model = item.slug"
            >
                <app-icon
                    class="app-choice__checkbox"
                    :name="item.slug === model ? check_circle : circle"
                />

                <app-copy
                    type="Body/b1-med"
                    color="f6"
                    v-text="item.label"
                />
            </div>
        </div>
    </app-field>
</template>

<style lang="scss">
.app-choice {
    &__items {
        display: flex;
        gap: 3rem;
        margin-top: 10px;

    }

    &__checkbox {
        width: 1.5rem;
        height: 1.5rem;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: .5rem;
        cursor: pointer;
    }
}
</style>
