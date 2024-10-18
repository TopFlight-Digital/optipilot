<script lang="ts" setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    hint: String,
    type: {
        type: String as () => `text` | `textarea`,
        default: `text`,
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const model = defineModel<string>();

</script>

<template>
    <label
        class="app-input"
        :class="{ 'app-input--required': required }"
    >
        <div class="app-input__overview">
            <div class="app-input__description">
                <span
                    class="app-input__label"
                    v-text="label"
                />

                <span
                    v-if="hint"
                    class="app-input__hint"
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
    row-gap: 8px;
}

.app-input {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    &--required {
        .app-input__label {
            &::after {
                content: '*';
            }
        }
    }
}

.app-input__label {
    // styleName: Title/h2;
    font-family: Figtree;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--text-color-mid);
}

.app-input__hint {
  //styleName: Title/h4;
  font-family: Figtree;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: var(--text-color-mid);
}

.app-input {
    input,
    textarea {
        //styleName: Body/b1-reg;
        font-family: Figtree;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        padding: 11px 15px 11px 20px;
        border-radius: 12px;
        background-color: #0E1216;
        border: 1px solid #47586E;
        box-shadow: 0px 4px 4px 0px #00000040;
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;
        color: #F6F6FC;
    }

    textarea {
        height: 132px;
        resize: none;
    }
}
</style>
