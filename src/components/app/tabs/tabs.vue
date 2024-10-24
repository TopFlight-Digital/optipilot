<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    items: {
        type: Array as () => Array<{
            slug: string;
            label: string;
            component: any;
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
const gliderTranslationStyle = computed(() => ({
    '--app-tabs-glider-translation': `translateX(${props.items.findIndex(item => item.slug === model.value) * 100}%)`,
}));
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
                    color="light"
                    v-text="item.label"
                />
            </button>
        </div>

        <div
            v-if="items.find(item => item.slug === model)?.component"
            class="app-tabs__content"
        >
            <component :is="items.find(item => item.slug === model)?.component" />
        </div>
    </div>
</template>

<style lang="scss">
.app-tabs {
    &__tabs {
        display: flex;
        justify-content: space-between;
        padding: 4px;
        background-color: #0D1013;
        border: 1px solid #47586E;
        border-radius: 1.5rem;

        &--small {
            padding: 2px;
        }
    }

    &__tab {
        position: relative;
        width: 100%;
        padding: 12px;
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
        height: 100%;
        width: 100%;
        background: #181C21;
        border-radius: 1.25rem;
        border: 1px solid #47586E;
        z-index: -1;
        top: -1px;
        left: -1px;
        transition: 0.2s ease-in-out;
        transform: var(--app-tabs-glider-translation);
    }
}
</style>
