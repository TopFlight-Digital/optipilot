<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    items: {
        type: Array as () => Array<{
            slug: string;
            label: string;
            component?: Component;
        }>,
        required: true,
    },
    size: {
        type: String,
        validator: (value: string) => {
            return [`small`, `large`].includes(value);
        },
        required: true,
    },
});

const model = defineModel({ type: String });

const gliderTranslationStyle = computed(() => {
    const currentIndex = props.items.findIndex(item => item.slug === model.value);

    return {
        '--app-tabs-glider-translation': `translateX(calc(${currentIndex * 100}% + ${currentIndex} * 10px))`,
    };
});

const activeComponent = computed(() => props.items.find(item => item.slug === model.value)?.component);
</script>

<template>
    <div class="app-tabs">
        <div
            class="app-tabs__tabs"
            :class="{'app-tabs__tabs--small': props.size === 'small'}"
        >
            <button
                v-for="(item, index) in items"
                :key="item.slug"
                class="app-tabs__tab"
                :class="{
                    'app-tabs__tab--active': model === item.slug,
                    'app-tabs__tab--small': props.size === 'small',
                }"
                @click="model = item.slug"
            >
                <div
                    v-if="index === 0"
                    class="app-tabs__glider"
                    :style="gliderTranslationStyle"
                />

                <app-copy
                    :type="size === 'large' ? 'Label 1' : 'Label 2'"
                    color="f6"
                    v-text="item.label"
                />
            </button>
        </div>

        <div
            v-if="activeComponent"
            class="app-tabs__content"
        >
            <component :is="activeComponent" />
        </div>
    </div>
</template>

<style lang="scss">
.app-tabs {
    &__tabs {
        display: flex;
        justify-content: space-between;
        padding: 3px;
        background-color: var(--color-0d);
        border: 1px solid var(--color-47);
        border-radius: 1.5rem;
        height: 54px;
        gap: 10px;

        &--small {
            padding: 2px;
        }
    }

    &__tab {
        position: relative;
        width: 100%;
        padding-inline: 12px;
        border: 1px solid transparent;
        border-radius: 1.25rem;
        background-color: transparent;
        z-index: 1;
        cursor: pointer;

        &--small {
            padding: 11.5px;
        }
    }

    &__glider {
        position: absolute;
        height: calc(100% + 2px);
        width: calc(100% + 2px);
        background: var(--color-18);
        border-radius: 1.25rem;
        border: 1px solid var(--color-47);
        z-index: -1;
        top: -1px;
        left: -1px;
        transition: 0.2s ease-in-out;
        transform: var(--app-tabs-glider-translation);
    }
}
</style>
