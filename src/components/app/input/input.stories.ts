import Input from './input.vue';

export default {
    component: Input,
};

export const PrimaryObjectiveInput = {
    args: {
        label: `Primary objective`,
        hint: `What is the key goal for this product page?`,
        type: `text`,
        required: true,
    },
};

export const SecondaryObjectiveInput = {
    args: {
        label: `Secondary objective`,
        type: `text`,
        required: false,
    },
};

export const SupportingDataInput = {
    args: {
        label: `Supporting data`,
        hint: `Upload data-driven findings that show how users interact with the product page. Upload as images.`,
        type: `file`,
        required: true,
    },
};

export const ScanNameInput = {
    args: {
        label: `Scan name`,
        type: `text`,
        required: true,
    },
};

export const ScanObjectiveInput = {
    args: {
        label: `Scan objective`,
        hint: `What is the key goal for this scan?`,
        type: `text`,
        required: true,
    },
};

export const ProductInformationTextarea = {
    args: {
        label: `Product information`,
        hint: `Tell us about your product page`,
        type: `textarea`,
        required: true,
    },
};
