import { DEFAULT_ARGS } from '@/dev/constants';
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
        ...DEFAULT_ARGS,
    },
};

export const SecondaryObjectiveInput = {
    args: {
        label: `Secondary objective`,
        type: `text`,
        required: false,
        ...DEFAULT_ARGS,
    },
};

export const ScanNameInput = {
    args: {
        label: `Scan name`,
        type: `text`,
        required: true,
        ...DEFAULT_ARGS,
    },
};

export const ScanObjectiveInput = {
    args: {
        label: `Scan objective`,
        hint: `What is the key goal for this scan?`,
        type: `text`,
        required: true,
        ...DEFAULT_ARGS,
    },
};

export const ProductInformationTextarea = {
    args: {
        label: `Product information`,
        hint: `Tell us about your product page`,
        type: `textarea`,
        required: true,
        ...DEFAULT_ARGS,
    },
};
