<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    items: {
        type: Array as () => Readonly<Array<{
            slug: string;
            label: string;
            component?: Component;
        }>>,
        required: true,
    },
    size: {
        type: String,
        validator: (value: string) => {
            return [`small`, `large`].includes(value);
        },
        required: true,
    },
    minimalistic: {
        type: Boolean,
        required: false,
        default: () => false,
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
            :class="{
                'app-tabs__tabs--small': props.size === 'small',
                'app-tabs__tabs--minimalistic': props.minimalistic,
            }"
        >
            <button
                v-for="(item, index) in items"
                :key="item.slug"
                class="app-tabs__tab"
                :class="{
                    'app-tabs__tab--active': model === item.slug,
                    'app-tabs__tab--small': props.size === 'small',
                    'app-tabs__tab--minimalistic': props.minimalistic,
                }"
                @click="model = item.slug"
            >
                <div
                    v-if="index === 0 && !props.minimalistic"
                    class="app-tabs__glider"
                    :style="gliderTranslationStyle"
                />

                <app-copy
                    :type="size === 'large' ? 'Button 2/label 1' : 'Label 2'"
                    :color="props.minimalistic && model !== item.slug ? 'cd' : 'f6'"
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

        &--minimalistic {
            gap: 12px;
            padding: 0;
            height: 20px;
            border-width: 0;
            background-color: transparent;
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

        &--minimalistic {
            width: auto;
            padding-inline: 0;

            .app-copy {
                font-size: 16px;
            }
        }

        &--minimalistic.app-tabs__tab--active {
            .app-copy {
                text-decoration: underline;
            }
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
