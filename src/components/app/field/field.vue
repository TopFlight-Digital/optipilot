<script lang="ts" setup>
import { FIELD_PROPS } from './field';
defineProps(FIELD_PROPS);
</script>

<template>
    <div
        class="app-field"
        :class="{ 'app-field--required': required }"
    >
        <div class="app-field__overview">
            <div class="app-field__description">
                <app-copy
                    class="app-field__label"
                    type="Title/h2"
                    color="light"
                    inline
                    v-text="label"
                />

                <app-copy
                    v-if="hint"
                    class="app-field__hint"
                    type="Label 1"
                    color="mid"
                    v-text="hint"
                />
            </div>

            <div class="app-field__description-extra">
                <slot name="label:after" />
            </div>
        </div>

        <slot />
    </div>
</template>

<style lang="scss">
.app-field__description {
    display: flex;
    flex-direction: column;
    row-gap: 9.5px;
    max-width: 500px;
}

.app-field {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &--required {
        .app-field__label {
            &::after {
                color: var(--text-color-mid);
                content: '*';
            }
        }
    }
}

</style>
