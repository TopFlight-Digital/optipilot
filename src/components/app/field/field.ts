import { ComponentObjectPropsOptions } from "vue";

export const FIELD_PROPS = {
    label: {
        type: String,
        required: true,
    },
    hint: String,
    required: {
        type: Boolean,
        default: false,
    },
} as const satisfies ComponentObjectPropsOptions;
