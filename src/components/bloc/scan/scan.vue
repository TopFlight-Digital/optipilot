<script setup lang="ts">
import { Hypothesis } from '@/bloc/hypotheses-prompt';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: [String, Date],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: ``,
    },
    hypotheses: {
        type: Array as () => Hypothesis[],
        required: true,
    },
});

const newTitle = ref(``);
const title = computed(() => props.title || newTitle.value);

if (!props.title) {
    const poll = setInterval(() => {
        const scan = useScanById(props.id);

        if (scan.value?.title) {
            newTitle.value = scan.value.title;
            clearInterval(poll);
        }
    }, 100);
}

const dateTime = useDateFormat(props.date, `YYYY/MM/DD, HH:mm`);
const titles = computed(() => props.hypotheses.map(({ title }) => title).join(`, `));
</script>

<template>
    <div class="bloc-scan">
        <div
            class="bloc-scan__image"
            :style="`--background-image: url(${icon})`"
        >
            <img
                :src="icon"
            />
        </div>

        <div class="bloc-scan__content">
            <app-copy
                class="bloc-scan__index"
                type="Label 2"
                color="cd"
                v-text="dateTime"
            />

            <app-copy
                v-if="title"
                class="bloc-scan__title"
                type="Title/h3"
                color="f6"
                v-text="title"
            />

            <app-shadow
                v-else
                height="12px"
                class="bloc-scan__title-shadow"
            />


            <app-copy
                class="bloc-scan__subtitle"
                type="Body/b1-med"
                color="cd"
                v-text="titles"
            />
        </div>
    </div>
</template>

<style lang="scss">
.bloc-scan {
    display: grid;
    grid-template-columns: auto 1fr;
    background: var(--color-0e);
    border: 1px solid var(--color-47);
    box-shadow: 0px 4px 4px 0px #00000040;
    padding: .5rem;
    gap: 10px;
    border-radius: .75rem;
    cursor: pointer;
    max-width: 100%;

    &__image {
        width: 72px;
        height: 72px;
        border-radius: 6px;
        border: 1px solid var(--color-47);
        position: relative;
        overflow: hidden;
        padding: 1rem;

        &::before {
            background-image: var(--background-image);
            background-position: center center;
            background-size: 200%;
            content: '';
            inset: 0;
            position: absolute;
            filter: blur(10px) brightness(.5);
            opacity: .5;
        }

        img {
            max-width: 100%;
            height: 100%;
            z-index: 1;
            position: relative;
            object-fit: scale-down;
            object-position: center center;
        }
    }

    &__title-shadow {
        width: 20ch;
        height: 24px;
    }

    &__title,
    &__index {
        margin-bottom: .25rem;
    }

    &__content {
        margin-right: 2.5rem;
    }
}

</style>
