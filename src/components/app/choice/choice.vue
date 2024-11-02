<script lang="ts" setup>
import { FIELD_PROPS } from '../field/field';

const props = defineProps({
    ...FIELD_PROPS,
});

// TODO: replace `string` with type based on props.items
const model = defineModel<string>();

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
    </app-field>
</template>

<style lang="scss">
</style>
