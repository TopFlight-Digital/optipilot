import Choice from './choice.vue';

export default {
    component: Choice,
};

export const DeviceTypeChoice = {
    args: {
        label: `Device type`,
        hint: `Choose the device type you would like to analyse.`,
        required: true,
        items: [
            {
                slug: `mobile`,
                label: `Mobile`,
            },
            {
                slug: `desktop`,
                label: `Desktop`,
            },
        ],
    },
};
