<script lang="ts" setup>
defineProps({
    label: String,
    icon: String,
    wide: Boolean,
    size: {
        type: String,
        default: `regular`,
        validator: (value: string) => {
            return [`xsmall`, `small`, `regular`].includes(value);
        },
    },
    leader: {
        type: String,
        default: `text`,
        validator: (value: string) => {
            return [`icon`, `text`].includes(value);
        },
    },
    variant: {
        type: String,
        default: `primary`,
        validator: (value: string) => {
            return [`primary`, `secondary`].includes(value);
        },
    },
});
</script>

<template>
    <button
        type="button"
        class="button"
        :class="[`button__${variant}`, `button__${size}`, { button__wide: wide, 'button__icon-first': leader === `icon` }]"
    >
        {{ label }}
        <app-icon
            v-if="icon"
            :name="icon"
        />
    </button>
</template>

<style lang="scss">
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-primary);
    border-radius: 1.5rem;
    font-family: Figtree;
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: background-color 0.2s;

    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    &__primary {
        background-color: var(--color-primary);
        color: var(--text-color-dark);

        &:hover {
            background-color: var(--color-primary-hover);
        }
    }

    &__secondary {
        background-color: var(--color-secondary);
        color: var(--text-color-light);

        &:hover {
            background-color: var(--color-secondary-hover);
        }
    }

    &__xsmall {
        padding: 2px 17.5px;
        font-size: 0.75rem;
    }

    &__small {
        padding: 3.24px 17.5px;
        font-size: 1rem;
    }

    &__regular {
        padding: 5.5px 17.5px;
        font-size: 1rem;
    }

    &__wide {
        width: 100%;
        gap:0.5rem;
    }

    &__icon-first {
        flex-direction: row-reverse;
    }
}
</style>
