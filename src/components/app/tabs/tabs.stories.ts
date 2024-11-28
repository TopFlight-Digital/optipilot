import AppTabs from './tabs.vue';
import PageA from './stories/page-a.vue';
import PageB from './stories/page-b.vue';
import PageC from './stories/page-c.vue';
import { ref } from 'vue';

export default {
    component: AppTabs,
    render: props => ({
        components: { AppTabs, PageA, PageB, PageC },
        setup() {
            const tab = ref(props.items[0].slug);

            return {
                props,
                tab,
            };
        },
        template: `<app-tabs v-bind="props" v-model="tab" />`,
    }),
    args: {
        items: [],
        size: `small`,
    },
};

export const MainTabs = {
    args: {
        size: `large`,
        items: [
            {
                slug: `product`,
                label: `Product`,
                component: PageA,
            },
            {
                slug: `scans`,
                label: `Scans`,
                component: PageB,
            },
            {
                slug: `packages`,
                label: `Packages`,
                component: PageC,
            },
        ],
    },
};

export const CurrentHistoryTabs = {
    args: {
        size: `small`,
        items: [
            {
                slug: `current`,
                label: `Current`,
            },
            {
                slug: `history`,
                label: `History`,
            },
        ],
    },
};

export const MonthlyAnuallyTabs = {
    args: {
        size: `small`,
        items: [
            {
                slug: `monthly`,
                label: `Monthly`,
            },
            {
                slug: `anually`,
                label: `Anually`,
            },
        ],
    },
};

export const Minimalistic = {
    args: {
        size: `large`,
        minimalistic: true,
        items: [
            {
                slug: `website`,
                label: `Website`,
            },
            {
                slug: `analysis`,
                label: `Analysis`,
            },
        ],
    },
};
